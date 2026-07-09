// ============================================================
// Interpretador Portugol — Sintaxia
// Suporta: variáveis, condicionais, laços, entrada/saída
// ============================================================

export function interpretarPortugol(codigo, entradas = '') {
  const linhasEntrada = entradas.split('\n').map(l => l.trim()).filter(l => l !== '')
  let indiceEntrada = 0
  const saidas = []
  const variaveis = {}

  const lerEntrada = () => {
    if (indiceEntrada < linhasEntrada.length) {
      return linhasEntrada[indiceEntrada++]
    }
    return ''
  }

  // Remove comentários e limpa linhas
  const linhas = codigo
    .split('\n')
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('//') && !l.startsWith('{'))

  let cursor = 0

  // ---- AVALIADOR DE EXPRESSÕES ----
  const avaliarExpressao = (expr) => {
    expr = expr.trim()

    // String literal
    if ((expr.startsWith('"') && expr.endsWith('"')) ||
        (expr.startsWith("'") && expr.endsWith("'"))) {
      return expr.slice(1, -1)
    }

    // Booleano
    if (expr.toLowerCase() === 'verdadeiro') return true
    if (expr.toLowerCase() === 'falso') return false

    // Concatenação com +
    if (expr.includes('+') || expr.includes('-') || expr.includes('*') ||
        expr.includes('/') || expr.includes('MOD') || expr.includes('mod') ||
        expr.includes('E') || expr.includes('OU') || expr.includes('NAO') ||
        expr.includes('=') || expr.includes('<') || expr.includes('>')) {
      return avaliarComOperadores(expr)
    }

    // Número
    if (!isNaN(expr) && expr !== '') return parseFloat(expr)

    // Variável
    if (expr in variaveis) return variaveis[expr]

    return expr
  }

  const avaliarComOperadores = (expr) => {
    // Operadores lógicos
    const ouIdx = encontrarOperador(expr, [' OU ', ' ou '])
    if (ouIdx !== -1) {
      const esq = avaliarExpressao(expr.slice(0, ouIdx).trim())
      const dir = avaliarExpressao(expr.slice(ouIdx + 3).trim())
      return Boolean(esq) || Boolean(dir)
    }

    const eIdx = encontrarOperador(expr, [' E ', ' e '])
    if (eIdx !== -1) {
      const esq = avaliarExpressao(expr.slice(0, eIdx).trim())
      const dir = avaliarExpressao(expr.slice(eIdx + 2).trim())
      return Boolean(esq) && Boolean(dir)
    }

    // NAO
    if (expr.toUpperCase().startsWith('NAO ')) {
      return !avaliarExpressao(expr.slice(4).trim())
    }

    // Operadores relacionais
    const relacionais = ['<>', '<=', '>=', '<', '>', '=']
    for (const op of relacionais) {
      const idx = encontrarOperador(expr, [op])
      if (idx !== -1) {
        const esq = avaliarExpressao(expr.slice(0, idx).trim())
        const dir = avaliarExpressao(expr.slice(idx + op.length).trim())
        if (op === '=')  return esq == dir
        if (op === '<>') return esq != dir
        if (op === '<')  return esq < dir
        if (op === '>')  return esq > dir
        if (op === '<=') return esq <= dir
        if (op === '>=') return esq >= dir
      }
    }

    // Operadores aritméticos (respeita precedência)
    // Primeiro + e -
    const addIdx = encontrarOperadorAritmetico(expr, ['+', '-'])
    if (addIdx !== null) {
      const { idx, op } = addIdx
      const esq = avaliarExpressao(expr.slice(0, idx).trim())
      const dir = avaliarExpressao(expr.slice(idx + op.length).trim())
      if (op === '+') {
        if (typeof esq === 'string' || typeof dir === 'string')
          return String(esq) + String(dir)
        return Number(esq) + Number(dir)
      }
      if (op === '-') return Number(esq) - Number(dir)
    }

    // Depois * / MOD
    const mulIdx = encontrarOperadorAritmetico(expr, ['*', '/', ' MOD ', ' mod '])
    if (mulIdx !== null) {
      const { idx, op } = mulIdx
      const esq = avaliarExpressao(expr.slice(0, idx).trim())
      const dir = avaliarExpressao(expr.slice(idx + op.length).trim())
      if (op === '*') return Number(esq) * Number(dir)
      if (op === '/') return Number(esq) / Number(dir)
      if (op.trim().toUpperCase() === 'MOD') return Number(esq) % Number(dir)
    }

    return avaliarExpressao(expr)
  }

  // Encontra operador fora de parênteses e strings
  const encontrarOperador = (expr, ops) => {
    let depth = 0
    let inStr = false
    for (let i = 0; i < expr.length; i++) {
      if (expr[i] === '"') inStr = !inStr
      if (inStr) continue
      if (expr[i] === '(') depth++
      if (expr[i] === ')') depth--
      if (depth === 0) {
        for (const op of ops) {
          if (expr.slice(i).startsWith(op)) return i
        }
      }
    }
    return -1
  }

  const encontrarOperadorAritmetico = (expr, ops) => {
    let depth = 0
    let inStr = false
    // Percorre da direita para esquerda (menor precedência primeiro)
    for (let i = expr.length - 1; i >= 0; i--) {
      if (expr[i] === '"') inStr = !inStr
      if (inStr) continue
      if (expr[i] === ')') depth++
      if (expr[i] === '(') depth--
      if (depth === 0) {
        for (const op of ops) {
          const trecho = expr.slice(i, i + op.length)
          if (trecho === op && i > 0) {
            return { idx: i, op }
          }
        }
      }
    }
    return null
  }

  // Resolve parênteses em chamadas
  const resolverArgs = (str) => {
    const inicio = str.indexOf('(')
    const fim = str.lastIndexOf(')')
    if (inicio === -1 || fim === -1) return ''
    return str.slice(inicio + 1, fim).trim()
  }

  // ---- EXECUTAR BLOCO ----
  const executarBloco = (limite) => {
    while (cursor < limite) {
      const linha = linhas[cursor]
      cursor++

      // Ignorar
      if (!linha ||
          linha.toLowerCase() === 'início' ||
          linha.toLowerCase() === 'inicio' ||
          linha.toLowerCase() === 'fim' ||
          linha.toLowerCase().startsWith('var') ||
          linha.toLowerCase().startsWith('inteiro') ||
          linha.toLowerCase().startsWith('real') ||
          linha.toLowerCase().startsWith('caractere') ||
          linha.toLowerCase().startsWith('lógico') ||
          linha.toLowerCase().startsWith('logico') ||
          linha.toLowerCase().startsWith('algoritmo') ||
          linha.toLowerCase().startsWith('fimalgoritmo')
      ) continue

      // Escreva / escreval
      if (/^escreva\s*\(/i.test(linha) || /^escreval\s*\(/i.test(linha)) {
        const args = resolverArgs(linha)
        // Suporta múltiplos argumentos separados por vírgula
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
        const nomes = separarArgs(args).map(a => a.trim())
        for (const nome of nomes) {
          const val = lerEntrada()
          // Tenta converter para número
          variaveis[nome] = isNaN(val) || val === '' ? val : parseFloat(val)
        }
        continue
      }

      // Atribuição: variavel <- expressao
      if (linha.includes('<-')) {
        const [nomeRaw, ...restoArr] = linha.split('<-')
        const nome = nomeRaw.trim()
        const exprStr = restoArr.join('<-').trim()
        variaveis[nome] = avaliarExpressao(exprStr)
        continue
      }

      // Se ... Então
      if (/^se\s+/i.test(linha)) {
        const condicaoStr = linha
          .replace(/^se\s+/i, '')
          .replace(/\s+então\s*$/i, '')
          .replace(/\s+entao\s*$/i, '')
          .trim()

        // Encontra o FimSe correspondente e o Senão
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
          if (l === 'senão' || l === 'senao' || l === 'else') {
            if (profundidade === 1) senaoIdx = i
          }
          i++
        }

        const cond = avaliarExpressao(condicaoStr)

        if (cond) {
          const fim = senaoIdx !== -1 ? senaoIdx : fimSeIdx
          executarBloco(fim)
          cursor = fimSeIdx + 1
        } else {
          if (senaoIdx !== -1) {
            cursor = senaoIdx + 1
            executarBloco(fimSeIdx)
          }
          cursor = fimSeIdx + 1
        }
        continue
      }

      // Senão / FimSe — skip (já tratados acima)
      if (/^(senão|senao|fimse|fim se)$/i.test(linha)) continue

      // Enquanto ... Faça
      if (/^enquanto\s+/i.test(linha)) {
        const condicaoStr = linha
          .replace(/^enquanto\s+/i, '')
          .replace(/\s+faça\s*$/i, '')
          .replace(/\s+faca\s*$/i, '')
          .trim()

        // Encontra FimEnquanto
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
        while (avaliarExpressao(condicaoStr) && iteracoes < 10000) {
          cursor = inicioBloco
          executarBloco(fimEnqIdx)
          iteracoes++
        }
        cursor = fimEnqIdx + 1
        continue
      }

      // FimEnquanto
      if (/^(fimenquanto|fim enquanto)$/i.test(linha)) break

      // Para i <- ini até fim Faça
      if (/^para\s+/i.test(linha)) {
        const semPara = linha.replace(/^para\s+/i, '').replace(/\s+faça\s*$/i, '').replace(/\s+faca\s*$/i, '').trim()
        const matchAte = semPara.match(/^(\w+)\s*<-\s*(.+?)\s+até\s+(.+)$/i) ||
                          semPara.match(/^(\w+)\s*<-\s*(.+?)\s+ate\s+(.+)$/i)

        if (matchAte) {
          const [, varNome, iniStr, fimStr] = matchAte
          let iniVal = avaliarExpressao(iniStr.trim())
          const fimVal = avaliarExpressao(fimStr.trim())

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
          while (variaveis[varNome] <= fimVal) {
            cursor = inicioBloco
            executarBloco(fimParaIdx)
            variaveis[varNome]++
          }
          cursor = fimParaIdx + 1
        }
        continue
      }

      // FimPara
      if (/^(fimpara|fim para)$/i.test(linha)) break
    }
  }

  // Separa argumentos respeitando strings
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
    if (atual.trim()) args.push(atual)
    return args
  }

  try {
    executarBloco(linhas.length)
  } catch (e) {
    return { sucesso: false, saida: '', erro: `Erro de execução: ${e.message}` }
  }

  return { sucesso: true, saida: saidas.join('\n'), erro: null }
}