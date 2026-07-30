// ============================================================
// Interpretador Portugol — Sintaxia
// Suporta: variáveis, condicionais, laços, entrada/saída
// ============================================================

export function interpretarPortugol(codigo, entradas = '') {
  // Entrada tokenizada por espaço/quebra de linha, para suportar
  // múltiplos valores na mesma linha (ex: Leia(peso, altura) <- "70 1.75")
  const tokensEntrada = entradas.split(/\s+/).map(t => t.trim()).filter(t => t !== '')
  let indiceEntrada = 0
  const saidas = []
  const variaveis = {}

  const lerEntrada = () => {
    if (indiceEntrada < tokensEntrada.length) {
      return tokensEntrada[indiceEntrada++]
    }
    return ''
  }

  // Remove comentários e limpa linhas
  const linhas = codigo
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('//') && !l.startsWith('{'))

  let cursor = 0

  // ---- FUNÇÕES MATEMÁTICAS EMBUTIDAS ----
  const FUNCOES = {
    RAIZ: (a) => Math.sqrt(Number(a[0])),
    ABS: (a) => Math.abs(Number(a[0])),
    POT: (a) => Math.pow(Number(a[0]), Number(a[1])),
    POTENCIA: (a) => Math.pow(Number(a[0]), Number(a[1])),
    ARREDONDAR: (a) => {
      const casas = a[1] !== undefined ? Number(a[1]) : 0
      const fator = Math.pow(10, casas)
      return Math.round(Number(a[0]) * fator) / fator
    },
    TRUNCA: (a) => Math.trunc(Number(a[0])),
    INT: (a) => Math.trunc(Number(a[0])),
  }

  // ---- TOKENIZADOR DE EXPRESSÕES ----
  const tokenizar = (expr) => {
    const tokens = []
    let i = 0
    while (i < expr.length) {
      const c = expr[i]
      if (/\s/.test(c)) { i++; continue }

      // String literal
      if (c === '"' || c === "'") {
        const aspas = c
        let j = i + 1
        let str = ''
        while (j < expr.length && expr[j] !== aspas) { str += expr[j]; j++ }
        tokens.push({ tipo: 'string', valor: str })
        i = j + 1
        continue
      }

      // Número (inteiro ou decimal)
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(expr[i + 1] || ''))) {
        let j = i
        let num = ''
        while (j < expr.length && /[0-9.]/.test(expr[j])) { num += expr[j]; j++ }
        tokens.push({ tipo: 'numero', valor: parseFloat(num) })
        i = j
        continue
      }

      // Identificador (variável, palavra-chave, nome de função)
      if (/[A-Za-zÀ-ÖØ-öø-ÿ_]/.test(c)) {
        let j = i
        let ident = ''
        while (j < expr.length && /[A-Za-zÀ-ÖØ-öø-ÿ0-9_]/.test(expr[j])) { ident += expr[j]; j++ }
        tokens.push({ tipo: 'ident', valor: ident })
        i = j
        continue
      }

      // Operadores de dois caracteres
      if (c === '<' && expr[i + 1] === '=') { tokens.push({ tipo: 'op', valor: '<=' }); i += 2; continue }
      if (c === '>' && expr[i + 1] === '=') { tokens.push({ tipo: 'op', valor: '>=' }); i += 2; continue }
      if (c === '<' && expr[i + 1] === '>') { tokens.push({ tipo: 'op', valor: '<>' }); i += 2; continue }

      // Operadores de um caractere
      if ('+-*/=<>(),'.includes(c)) { tokens.push({ tipo: 'op', valor: c }); i++; continue }

      // Caractere desconhecido: ignora
      i++
    }
    return tokens
  }

  // ---- PARSER DE EXPRESSÕES (recursive descent, com precedência correta) ----
  const parseExpressao = (tokens) => {
    let pos = 0
    const peek = () => tokens[pos]
    const proximo = () => tokens[pos++]
    const ehIdent = (tok, palavra) => tok && tok.tipo === 'ident' && tok.valor.toUpperCase() === palavra
    const ehOp = (tok, valor) => tok && tok.tipo === 'op' && tok.valor === valor

    const buscarVariavel = (nome) => {
      if (nome in variaveis) return variaveis[nome]
      const chave = Object.keys(variaveis).find(k => k.toLowerCase() === nome.toLowerCase())
      return chave !== undefined ? variaveis[chave] : ''
    }

    const parseArgs = () => {
      const args = []
      if (!ehOp(peek(), ')')) {
        args.push(parseOu())
        while (ehOp(peek(), ',')) { proximo(); args.push(parseOu()) }
      }
      if (ehOp(peek(), ')')) proximo()
      return args
    }

    function parseOu() {
      let esq = parseE()
      while (ehIdent(peek(), 'OU')) {
        proximo()
        const dir = parseE()
        esq = Boolean(esq) || Boolean(dir)
      }
      return esq
    }
    function parseE() {
      let esq = parseNao()
      while (ehIdent(peek(), 'E')) {
        proximo()
        const dir = parseNao()
        esq = Boolean(esq) && Boolean(dir)
      }
      return esq
    }
    function parseNao() {
      if (ehIdent(peek(), 'NAO') || ehIdent(peek(), 'NÃO')) {
        proximo()
        return !Boolean(parseNao())
      }
      return parseRelacional()
    }
    function parseRelacional() {
      let esq = parseAditiva()
      while (peek() && peek().tipo === 'op' && ['=', '<>', '<=', '>=', '<', '>'].includes(peek().valor)) {
        const op = proximo().valor
        const dir = parseAditiva()
        if (op === '=') esq = esq == dir
        else if (op === '<>') esq = esq != dir
        else if (op === '<') esq = esq < dir
        else if (op === '>') esq = esq > dir
        else if (op === '<=') esq = esq <= dir
        else if (op === '>=') esq = esq >= dir
      }
      return esq
    }
    function parseAditiva() {
      let esq = parseMultiplicativa()
      while (ehOp(peek(), '+') || ehOp(peek(), '-')) {
        const op = proximo().valor
        const dir = parseMultiplicativa()
        if (op === '+') {
          esq = (typeof esq === 'string' || typeof dir === 'string')
            ? String(esq) + String(dir)
            : Number(esq) + Number(dir)
        } else {
          esq = Number(esq) - Number(dir)
        }
      }
      return esq
    }
    function parseMultiplicativa() {
      let esq = parseUnaria()
      while (ehOp(peek(), '*') || ehOp(peek(), '/') || ehIdent(peek(), 'MOD')) {
        let op
        if (peek().tipo === 'op') op = proximo().valor
        else { proximo(); op = 'MOD' }
        const dir = parseUnaria()
        if (op === '*') esq = Number(esq) * Number(dir)
        else if (op === '/') esq = Number(esq) / Number(dir)
        else esq = Number(esq) % Number(dir)
      }
      return esq
    }
    function parseUnaria() {
      if (ehOp(peek(), '-')) { proximo(); return -Number(parseUnaria()) }
      if (ehOp(peek(), '+')) { proximo(); return Number(parseUnaria()) }
      return parsePrimaria()
    }
    function parsePrimaria() {
      const tok = peek()
      if (!tok) return ''

      if (tok.tipo === 'numero') { proximo(); return tok.valor }
      if (tok.tipo === 'string') { proximo(); return tok.valor }

      if (ehOp(tok, '(')) {
        proximo()
        const val = parseOu()
        if (ehOp(peek(), ')')) proximo()
        return val
      }

      if (tok.tipo === 'ident') {
        proximo()
        const upper = tok.valor.toUpperCase()
        if (upper === 'VERDADEIRO') return true
        if (upper === 'FALSO') return false

        // Chamada de função embutida: NOME(args)
        if (FUNCOES[upper] && ehOp(peek(), '(')) {
          proximo()
          const args = parseArgs()
          return FUNCOES[upper](args)
        }

        return buscarVariavel(tok.valor)
      }

      proximo()
      return ''
    }

    return parseOu()
  }

  const avaliarExpressao = (expr) => {
    expr = (expr || '').trim()
    if (expr === '') return ''
    const tokens = tokenizar(expr)
    if (tokens.length === 0) return ''
    return parseExpressao(tokens)
  }

  // Resolve parênteses em chamadas (Leia, Escreva)
  const resolverArgs = (str) => {
    const inicio = str.indexOf('(')
    const fim = str.lastIndexOf(')')
    if (inicio === -1 || fim === -1) return ''
    return str.slice(inicio + 1, fim).trim()
  }

  // Separa argumentos respeitando strings e parênteses aninhados
  const separarArgs = (str) => {
    const args = []
    let atual = ''
    let inStr = false
    let depth = 0
    for (const c of str) {
      if (c === '"') inStr = !inStr
      if (!inStr && c === '(') depth++
      if (!inStr && c === ')') depth--
      if (!inStr && depth === 0 && c === ',') {
        args.push(atual)
        atual = ''
      } else {
        atual += c
      }
    }
    if (atual.trim() || args.length) args.push(atual)
    return args.filter((a, idx) => a.trim() !== '' || idx < args.length)
  }

  // ---- EXECUTAR BLOCO ----
  const executarBloco = (limite) => {
    while (cursor < limite) {
      const linha = linhas[cursor]
      cursor++
      const linhaLower = linha.toLowerCase()

      // Ignorar declarações e marcadores estruturais
      if (!linha ||
          linhaLower === 'início' ||
          linhaLower === 'inicio' ||
          linhaLower === 'fim' ||
          linhaLower.startsWith('var') ||
          linhaLower.startsWith('inteiro') ||
          linhaLower.startsWith('real') ||
          linhaLower.startsWith('caractere') ||
          linhaLower.startsWith('lógico') ||
          linhaLower.startsWith('logico') ||
          linhaLower.startsWith('algoritmo') ||
          linhaLower.startsWith('fimalgoritmo')
      ) continue

      // Escreva
      if (/^escreva\s*\(/i.test(linha)) {
        const args = resolverArgs(linha)
        const partes = separarArgs(args)
        const resultado = partes.map(p => {
          const v = avaliarExpressao(p.trim())
          return v === true ? 'Verdadeiro' : v === false ? 'Falso' : String(v)
        }).join('')
        saidas.push(resultado)
        continue
      }

      // Leia
      if (/^leia\s*\(/i.test(linha)) {
        const args = resolverArgs(linha)
        const nomes = separarArgs(args).map(a => a.trim()).filter(Boolean)
        for (const nome of nomes) {
          const val = lerEntrada()
          variaveis[nome] = (val === '' || isNaN(val)) ? val : parseFloat(val)
        }
        continue
      }

      // Se ... Então  (checar ANTES da atribuição genérica, pois a condição
      // pode conter "<-" dentro de sub-expressões improváveis, e para não
      // depender de ordem incorreta)
      if (/^se\s+/i.test(linha)) {
        const condicaoStr = linha
          .replace(/^se\s+/i, '')
          .replace(/\s+então\s*$/i, '')
          .replace(/\s+entao\s*$/i, '')
          .trim()

        let profundidade = 1
        let fimSeIdx = -1
        let senaoIdx = -1
        let i = cursor

        while (i < linhas.length && profundidade > 0) {
          const l = linhas[i].toLowerCase()
          if (/^se\s+/.test(l)) profundidade++
          if (l === 'fimse' || l === 'fim se') {
            profundidade--
            if (profundidade === 0) fimSeIdx = i
          }
          if (profundidade === 1 && (l === 'senão' || l === 'senao' || l === 'else')) {
            senaoIdx = i
          }
          i++
        }

        const cond = avaliarExpressao(condicaoStr)

        if (cond) {
          const fim = senaoIdx !== -1 ? senaoIdx : fimSeIdx
          executarBloco(fim)
        } else if (senaoIdx !== -1) {
          cursor = senaoIdx + 1
          executarBloco(fimSeIdx)
        }
        cursor = fimSeIdx + 1
        continue
      }

      // Senão / FimSe isolados (já tratados dentro do bloco Se acima)
      if (/^(senão|senao|fimse|fim se)$/i.test(linha)) continue

      // Enquanto ... Faça
      if (/^enquanto\s+/i.test(linha)) {
        const condicaoStr = linha
          .replace(/^enquanto\s+/i, '')
          .replace(/\s+faça\s*$/i, '')
          .replace(/\s+faca\s*$/i, '')
          .trim()

        let profundidade = 1
        let fimEnqIdx = -1
        let i = cursor
        while (i < linhas.length && profundidade > 0) {
          const l = linhas[i].toLowerCase()
          if (/^enquanto\s+/.test(l)) profundidade++
          if (l === 'fimenquanto' || l === 'fim enquanto') {
            profundidade--
            if (profundidade === 0) fimEnqIdx = i
          }
          i++
        }

        const inicioBloco = cursor
        let iteracoes = 0
        while (avaliarExpressao(condicaoStr) && iteracoes < 100000) {
          cursor = inicioBloco
          executarBloco(fimEnqIdx)
          iteracoes++
        }
        cursor = fimEnqIdx + 1
        continue
      }

      // FimEnquanto isolado
      if (/^(fimenquanto|fim enquanto)$/i.test(linha)) continue

      // Para i <- ini até fim [Passo p] Faça
      if (/^para\s+/i.test(linha)) {
        const semPara = linha.replace(/^para\s+/i, '').replace(/\s+faça\s*$/i, '').replace(/\s+faca\s*$/i, '').trim()
        const matchAte = semPara.match(/^(\w+)\s*<-\s*(.+?)\s+at[ée]\s+(.+?)(?:\s+passo\s+(.+))?$/i)

        if (matchAte) {
          const [, varNome, iniStr, fimStr, passoStr] = matchAte
          const iniVal = avaliarExpressao(iniStr.trim())
          const fimVal = avaliarExpressao(fimStr.trim())
          const passo = passoStr ? Number(avaliarExpressao(passoStr.trim())) : 1

          let profundidade = 1
          let fimParaIdx = -1
          let i = cursor
          while (i < linhas.length && profundidade > 0) {
            const l = linhas[i].toLowerCase()
            if (/^para\s+/.test(l)) profundidade++
            if (l === 'fimpara' || l === 'fim para') {
              profundidade--
              if (profundidade === 0) fimParaIdx = i
            }
            i++
          }

          const inicioBloco = cursor
          variaveis[varNome] = iniVal
          let iteracoes = 0
          while ((passo >= 0 ? variaveis[varNome] <= fimVal : variaveis[varNome] >= fimVal) && iteracoes < 100000) {
            cursor = inicioBloco
            executarBloco(fimParaIdx)
            variaveis[varNome] += passo
            iteracoes++
          }
          cursor = fimParaIdx + 1
        } else {
          // Não reconheceu o padrão do Para: pula até o FimPara correspondente
          // para não deixar a leitura "vazar" para fora do laço.
          let profundidade = 1
          let i = cursor
          while (i < linhas.length && profundidade > 0) {
            const l = linhas[i].toLowerCase()
            if (/^para\s+/.test(l)) profundidade++
            if (l === 'fimpara' || l === 'fim para') profundidade--
            i++
          }
          cursor = i
        }
        continue
      }

      // FimPara isolado
      if (/^(fimpara|fim para)$/i.test(linha)) continue

      // Atribuição: variavel <- expressao (checada por último, depois de
      // todas as estruturas de controle que também podem conter "<-")
      if (linha.includes('<-')) {
        const idx = linha.indexOf('<-')
        const nome = linha.slice(0, idx).trim()
        const exprStr = linha.slice(idx + 2).trim()
        variaveis[nome] = avaliarExpressao(exprStr)
        continue
      }
    }
  }

  try {
    executarBloco(linhas.length)
  } catch (e) {
    return { sucesso: false, saida: '', erro: `Erro de execução: ${e.message}` }
  }

  return { sucesso: true, saida: saidas.join('\n'), erro: null }
}