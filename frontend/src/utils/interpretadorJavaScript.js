// ============================================================
// Sandbox de execução de JavaScript — Sintaxia
// Roda o código no navegador, dentro de um
// Web Worker isolado (sem acesso ao DOM/rede) e com timeout contra
// laços infinitos. Não depende de nenhuma API externa (gratuito).
//
// Simula o suficiente da API do Node (require('readline'),
// process.stdin/stdout, console.log) para rodar os desafios que
// leem entrada via readline linha a linha.
// ============================================================

const WORKER_CODE = `
self.onmessage = function (e) {
  const { codigo, linhas } = e.data
  const saidas = []
  let erro = null

  const formatar = (a) => {
    if (typeof a === 'object' && a !== null) {
      try { return JSON.stringify(a) } catch (_) { return String(a) }
    }
    return String(a)
  }

  const consoleFake = {
    log: (...args) => saidas.push(args.map(formatar).join(' ')),
    error: (...args) => saidas.push(args.map(formatar).join(' ')),
    warn: (...args) => saidas.push(args.map(formatar).join(' ')),
  }

  // ---- Mock de readline no estilo Node ----
  let lineCallback = null
  let closeCallback = null
  const rlFake = {
    on: (evento, cb) => {
      if (evento === 'line') lineCallback = cb
      if (evento === 'close') closeCallback = cb
      return rlFake
    },
    close: () => { if (closeCallback) closeCallback() },
    question: () => {
      // pergunta interativa não é suportada neste ambiente de teste
    },
  }
  const readlineFake = { createInterface: () => rlFake }

  const requireFake = (modulo) => {
    if (modulo === 'readline') return readlineFake
    throw new Error('Módulo não suportado neste ambiente de desafio: ' + modulo)
  }

  const processFake = {
    stdin: {},
    stdout: { write: (s) => saidas.push(String(s).replace(/\\n$/, '')) },
    argv: [],
    env: {},
  }

  try {
    const fn = new Function('require', 'console', 'process', codigo)
    fn(requireFake, consoleFake, processFake)

    // Alimenta as linhas de entrada, uma por evento 'line' (como o Node faz)
    for (const linha of linhas) {
      if (lineCallback) lineCallback(linha)
    }
    if (closeCallback) closeCallback()
  } catch (e) {
    erro = e && e.message ? e.message : String(e)
  }

  self.postMessage({ saida: saidas.join('\\n'), erro })
}
`

/**
 * Executa código JavaScript do aluno em um Web Worker isolado.
 * @param {string} codigo - código-fonte digitado pelo aluno
 * @param {string} entradaTeste - entrada de teste (uma "linha" por quebra de linha)
 * @param {number} timeoutMs - tempo máximo de execução antes de abortar (laço infinito)
 * @returns {Promise<{sucesso: boolean, saida: string, erro: string|null}>}
 */
export function executarJavaScript(codigo, entradaTeste = '', timeoutMs = 5000) {
  return new Promise((resolve) => {
    const linhas = (entradaTeste || '')
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l !== '')

    let worker
    try {
      const blob = new Blob([WORKER_CODE], { type: 'application/javascript' })
      worker = new Worker(URL.createObjectURL(blob))
    } catch (e) {
      resolve({ sucesso: false, saida: '', erro: 'Não foi possível iniciar o ambiente de execução: ' + e.message })
      return
    }

    const timer = setTimeout(() => {
      worker.terminate()
      resolve({
        sucesso: false,
        saida: '',
        erro: 'Tempo limite excedido (mais de ' + (timeoutMs / 1000) + 's). Verifique se não há laço infinito.',
      })
    }, timeoutMs)

    worker.onmessage = (e) => {
      clearTimeout(timer)
      worker.terminate()
      const { saida, erro } = e.data
      if (erro) {
        resolve({ sucesso: false, saida: '', erro })
      } else {
        resolve({ sucesso: true, saida, erro: null })
      }
    }

    worker.onerror = (e) => {
      clearTimeout(timer)
      worker.terminate()
      resolve({ sucesso: false, saida: '', erro: e.message || 'Erro desconhecido ao executar o código.' })
    }

    worker.postMessage({ codigo, linhas })
  })
}