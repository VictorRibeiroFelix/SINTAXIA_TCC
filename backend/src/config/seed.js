import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
console.log('MongoDB conectado!')

const db = mongoose.connection.db
await db.collection('desafios').deleteMany({})
console.log('Desafios antigos removidos!')

await db.collection('desafios').insertMany([

  // ==================== ALGORITMOS - INICIANTE ====================
  {
    titulo: 'Escrever na tela',
    descricao: 'Qual palavra é usada para mostrar uma mensagem na tela em um algoritmo?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Leia', 'Escreva', 'Se', 'Enquanto'],
    respostaCorreta: 'Escreva', pontos: 10
  },
  {
    titulo: 'Ler dados do usuário',
    descricao: 'Qual comando é usado para receber dados digitados pelo usuário?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Escreva', 'Repita', 'Leia', 'Início'],
    respostaCorreta: 'Leia', pontos: 10
  },
  {
    titulo: 'Início do algoritmo',
    descricao: 'Todo algoritmo começa com qual palavra reservada?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Fim', 'Início', 'Escreva', 'Leia'],
    respostaCorreta: 'Início', pontos: 10
  },
  {
    titulo: 'Estrutura condicional',
    descricao: 'Qual estrutura usamos para tomar uma decisão em um algoritmo?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Enquanto', 'Para', 'Se', 'Leia'],
    respostaCorreta: 'Se', pontos: 10
  },
  {
    titulo: 'Laço de repetição',
    descricao: 'Qual estrutura usamos para repetir um bloco de código várias vezes?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Se', 'Escreva', 'Enquanto', 'Leia'],
    respostaCorreta: 'Enquanto', pontos: 10
  },
  {
    titulo: 'Tipo de dado texto',
    descricao: 'Como chamamos o tipo de dado que armazena textos em algoritmos?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Inteiro', 'Real', 'Lógico', 'Caractere'],
    respostaCorreta: 'Caractere', pontos: 10
  },
  {
    titulo: 'Tipo de dado número inteiro',
    descricao: 'Qual tipo de dado usamos para armazenar números sem casas decimais?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Real', 'Inteiro', 'Caractere', 'Lógico'],
    respostaCorreta: 'Inteiro', pontos: 10
  },
  {
    titulo: 'Senão no condicional',
    descricao: 'No condicional "Se... Então... ___ ...", qual palavra completa a estrutura?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['Mas', 'Porém', 'Senão', 'Depois'],
    respostaCorreta: 'Senão', pontos: 10
  },
  {
    titulo: 'Variável',
    descricao: 'O que é uma variável em um algoritmo?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: [
      'Um comando para exibir dados',
      'Um espaço na memória para guardar dados',
      'Uma estrutura de repetição',
      'O fim do algoritmo'
    ],
    respostaCorreta: 'Um espaço na memória para guardar dados', pontos: 10
  },
  {
    titulo: 'Operador de atribuição',
    descricao: 'Qual símbolo usamos para atribuir um valor a uma variável em algoritmos?',
    tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['==', '=', '<-', '=>'],
    respostaCorreta: '<-', pontos: 10
  },

  // ==================== ALGORITMOS - INTERMEDIÁRIO ====================
  {
    titulo: 'Desenvolva: Soma de dois números',
    descricao: 'Complete o algoritmo que lê dois números e exibe a soma deles. Preencha com a operação correta no lugar do ___.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  soma <- a ___ b\n  Escreva(soma)\nFim',
    opcoes: ['+', '-', '*', '/'],
    respostaCorreta: '+', pontos: 20
  },
  {
    titulo: 'Desenvolva: Média de notas',
    descricao: 'Para calcular a média de duas notas, qual operação e divisor estão corretos?',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  Leia(nota1)\n  Leia(nota2)\n  media <- (nota1 + nota2) ___ 2\n  Escreva(media)\nFim',
    opcoes: ['/ 2', '* 2', '+ 2', '- 2'],
    respostaCorreta: '/ 2', pontos: 20
  },
  {
    titulo: 'Corrija: Condicional com erro',
    descricao: 'Encontre o erro no algoritmo abaixo que verifica se um número é positivo.',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  Leia(num)\n  Se num > 0 Então\n    Leia("Positivo")\n  FimSe\nFim',
    opcoes: [
      'Trocar Leia por Escreva na linha 4',
      'Trocar > por < na condição',
      'Remover o FimSe',
      'Trocar Início por Começo'
    ],
    respostaCorreta: 'Trocar Leia por Escreva na linha 4', pontos: 20
  },
  {
    titulo: 'Desenvolva: Verificar par ou ímpar',
    descricao: 'Qual operador usamos para verificar se um número é par (resto da divisão por 2 igual a zero)?',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  Leia(num)\n  Se num ___ 2 = 0 Então\n    Escreva("Par")\n  Senão\n    Escreva("Ímpar")\n  FimSe\nFim',
    opcoes: ['MOD', '/', '*', '+'],
    respostaCorreta: 'MOD', pontos: 20
  },
  {
    titulo: 'Corrija: Laço infinito',
    descricao: 'O algoritmo abaixo tem um erro que causa laço infinito. Qual é o problema?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  i <- 1\n  Enquanto i < 5 Faça\n    Escreva(i)\n  FimEnquanto\nFim',
    opcoes: [
      'Falta incrementar i dentro do laço',
      'A condição deveria ser i > 5',
      'Falta Leia(i)',
      'O Enquanto deveria ser Para'
    ],
    respostaCorreta: 'Falta incrementar i dentro do laço', pontos: 20
  },
  {
    titulo: 'Desenvolva: Contagem com Para',
    descricao: 'Complete a estrutura Para que conta de 1 a 10.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  Para i <- 1 ___ 10 Faça\n    Escreva(i)\n  FimPara\nFim',
    opcoes: ['até', 'para', 'de', 'em'],
    respostaCorreta: 'até', pontos: 20
  },
  {
    titulo: 'Corrija: Atribuição incorreta',
    descricao: 'Qual erro existe no algoritmo abaixo?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  nome == "Victor"\n  Escreva(nome)\nFim',
    opcoes: [
      'Usar <- em vez de == para atribuição',
      'Trocar Escreva por Leia',
      'Remover as aspas do nome',
      'Adicionar Leia antes de Escreva'
    ],
    respostaCorreta: 'Usar <- em vez de == para atribuição', pontos: 20
  },
  {
    titulo: 'Desenvolva: Maior entre dois',
    descricao: 'Complete o algoritmo que exibe o maior entre dois números.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  Se a ___ b Então\n    Escreva("A é maior")\n  Senão\n    Escreva("B é maior")\n  FimSe\nFim',
    opcoes: ['> b', '< b', '= b', '<> b'],
    respostaCorreta: '> b', pontos: 20
  },
  {
    titulo: 'Corrija: Variável não declarada',
    descricao: 'O algoritmo abaixo tem um erro. Qual é ele?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  Leia(idade)\n  Se idade >= 18 Então\n    Escreva(mensagem)\n  FimSe\nFim',
    opcoes: [
      'A variável mensagem não foi definida',
      'Trocar >= por <=',
      'Falta FimAlgoritmo no final',
      'Leia deveria ser Escreva'
    ],
    respostaCorreta: 'A variável mensagem não foi definida', pontos: 20
  },
  {
    titulo: 'Desenvolva: Acumulador',
    descricao: 'Complete o algoritmo que soma os números de 1 a 5 usando acumulador.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'Início\n  soma <- 0\n  Para i <- 1 até 5 Faça\n    soma <- soma ___ i\n  FimPara\n  Escreva(soma)\nFim',
    opcoes: ['+', '-', '*', '/'],
    respostaCorreta: '+', pontos: 20
  },

  // ==================== ALGORITMOS - EXPERIENTE ====================
  {
    titulo: 'Corrija: Lógica invertida',
    descricao: 'O algoritmo deveria exibir apenas números pares de 1 a 10, mas está errado. Qual o problema?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  Para i <- 1 até 10 Faça\n    Se i MOD 2 <> 0 Então\n      Escreva(i)\n    FimSe\n  FimPara\nFim',
    opcoes: [
      'Trocar <> por = na condição do MOD',
      'Trocar Para por Enquanto',
      'Remover o MOD',
      'Trocar Escreva por Leia'
    ],
    respostaCorreta: 'Trocar <> por = na condição do MOD', pontos: 30
  },
  {
    titulo: 'Desenvolva: Fatorial',
    descricao: 'Complete o algoritmo que calcula o fatorial de um número.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  Leia(n)\n  fat <- 1\n  Para i <- 1 até n Faça\n    fat <- fat ___ i\n  FimPara\n  Escreva(fat)\nFim',
    opcoes: ['*', '+', '-', '/'],
    respostaCorreta: '*', pontos: 30
  },
  {
    titulo: 'Corrija: Condição composta',
    descricao: 'O algoritmo deveria aprovar apenas quem tem nota >= 7 E frequência >= 75. Qual o erro?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  Leia(nota)\n  Leia(freq)\n  Se nota >= 7 OU freq >= 75 Então\n    Escreva("Aprovado")\n  Senão\n    Escreva("Reprovado")\n  FimSe\nFim',
    opcoes: [
      'Trocar OU por E na condição',
      'Trocar >= 7 por > 7',
      'Remover a segunda condição',
      'Trocar Senão por SeFalso'
    ],
    respostaCorreta: 'Trocar OU por E na condição', pontos: 30
  },
  {
    titulo: 'Desenvolva: Busca no vetor',
    descricao: 'Complete o algoritmo que procura um valor num vetor de 5 posições.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  Leia(busca)\n  Para i <- 1 até 5 Faça\n    Se vetor[i] ___ busca Então\n      Escreva("Encontrado!")\n    FimSe\n  FimPara\nFim',
    opcoes: ['=', '<>', '>', '<'],
    respostaCorreta: '=', pontos: 30
  },
  {
    titulo: 'Corrija: Troca de variáveis',
    descricao: 'O algoritmo deveria trocar os valores de A e B, mas está errado. Qual o problema?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  a <- b\n  b <- a\n  Escreva(a, b)\nFim',
    opcoes: [
      'Falta usar variável auxiliar antes de trocar',
      'Trocar Leia por Escreva',
      'A ordem das atribuições está certa',
      'Falta declarar as variáveis'
    ],
    respostaCorreta: 'Falta usar variável auxiliar antes de trocar', pontos: 30
  },
  {
    titulo: 'Desenvolva: Contagem regressiva',
    descricao: 'Complete o Enquanto para fazer contagem regressiva de 10 até 1.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  i <- 10\n  Enquanto i ___ 1 Faça\n    Escreva(i)\n    i <- i - 1\n  FimEnquanto\nFim',
    opcoes: ['>= 1', '<= 1', '= 1', '<> 1'],
    respostaCorreta: '>= 1', pontos: 30
  },
  {
    titulo: 'Corrija: Divisão por zero',
    descricao: 'O algoritmo abaixo pode causar erro de divisão por zero. Como corrigir?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  resultado <- a / b\n  Escreva(resultado)\nFim',
    opcoes: [
      'Verificar se b <> 0 antes de dividir',
      'Trocar / por *',
      'Usar MOD em vez de /',
      'Inicializar b com 1'
    ],
    respostaCorreta: 'Verificar se b <> 0 antes de dividir', pontos: 30
  },
  {
    titulo: 'Desenvolva: Sequência de Fibonacci',
    descricao: 'Complete o algoritmo para calcular o próximo número de Fibonacci.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  a <- 0\n  b <- 1\n  proximo <- a ___ b\n  Escreva(proximo)\nFim',
    opcoes: ['+', '-', '*', '/'],
    respostaCorreta: '+', pontos: 30
  },
  {
    titulo: 'Corrija: Comparação de strings',
    descricao: 'O algoritmo deveria verificar se o nome é "Victor", mas tem um erro. Qual é?',
    tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  Leia(nome)\n  Se nome = Victor Então\n    Escreva("Olá Victor!")\n  FimSe\nFim',
    opcoes: [
      'Victor deveria estar entre aspas: "Victor"',
      'Trocar = por ==',
      'Remover o Então',
      'Trocar Leia por Escreva'
    ],
    respostaCorreta: 'Victor deveria estar entre aspas: "Victor"', pontos: 30
  },
  {
    titulo: 'Desenvolva: Maior do vetor',
    descricao: 'Complete o algoritmo que encontra o maior valor de um vetor de 5 elementos.',
    tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'Início\n  maior <- vetor[1]\n  Para i <- 2 até 5 Faça\n    Se vetor[i] ___ maior Então\n      maior <- vetor[i]\n    FimSe\n  FimPara\n  Escreva(maior)\nFim',
    opcoes: ['> maior', '< maior', '= maior', '<> maior'],
    respostaCorreta: '> maior', pontos: 30
  },

  // ==================== JAVASCRIPT - INICIANTE ====================
  {
    titulo: 'Console no JavaScript',
    descricao: 'Qual comando usamos para exibir uma mensagem no console em JavaScript?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['print()', 'console.log()', 'echo()', 'write()'],
    respostaCorreta: 'console.log()', pontos: 10
  },
  {
    titulo: 'Declarar variável moderna',
    descricao: 'Qual palavra-chave usamos para declarar uma variável que pode mudar em JavaScript moderno?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['var', 'let', 'int', 'string'],
    respostaCorreta: 'let', pontos: 10
  },
  {
    titulo: 'Constante em JavaScript',
    descricao: 'Qual palavra-chave usamos para declarar um valor que não pode ser alterado?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['let', 'fixed', 'const', 'final'],
    respostaCorreta: 'const', pontos: 10
  },
  {
    titulo: 'Tipo de dado',
    descricao: 'Qual função usamos para descobrir o tipo de uma variável em JavaScript?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['typeOf()', 'typeof', 'getType()', 'type()'],
    respostaCorreta: 'typeof', pontos: 10
  },
  {
    titulo: 'Criar uma função',
    descricao: 'Qual palavra-chave usamos para criar uma função em JavaScript?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['def', 'func', 'function', 'method'],
    respostaCorreta: 'function', pontos: 10
  },
  {
    titulo: 'Condicional if',
    descricao: 'Como escrevemos uma condição em JavaScript?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['if (condição)', 'se (condição)', 'when (condição)', 'check (condição)'],
    respostaCorreta: 'if (condição)', pontos: 10
  },
  {
    titulo: 'Laço for',
    descricao: 'Qual é a estrutura correta de um laço for em JavaScript?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: [
      'for (let i = 0; i < 10; i++)',
      'for i in range(10)',
      'for (i = 0 to 10)',
      'loop (i < 10)'
    ],
    respostaCorreta: 'for (let i = 0; i < 10; i++)', pontos: 10
  },
  {
    titulo: 'Concatenar strings',
    descricao: 'Como concatenamos duas strings em JavaScript moderno?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: [
      'usando o operador +',
      'usando concat() apenas',
      'usando & entre as strings',
      'usando . entre as strings'
    ],
    respostaCorreta: 'usando o operador +', pontos: 10
  },
  {
    titulo: 'Array em JavaScript',
    descricao: 'Como criamos um array vazio em JavaScript?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['let arr = {}', 'let arr = []', 'let arr = ()', 'let arr = <>'],
    respostaCorreta: 'let arr = []', pontos: 10
  },
  {
    titulo: 'Comentário em JavaScript',
    descricao: 'Como escrevemos um comentário de uma linha em JavaScript?',
    tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1,
    opcoes: ['# comentário', '// comentário', '/* comentário', '-- comentário'],
    respostaCorreta: '// comentário', pontos: 10
  },

  // ==================== JAVASCRIPT - INTERMEDIÁRIO ====================
  {
    titulo: 'Corrija: Comparação incorreta',
    descricao: 'O código deveria verificar se idade é exatamente igual ao número 18, mas tem um erro. Qual?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'let idade = 18\nif (idade == "18") {\n  console.log("Maior de idade")\n}',
    opcoes: [
      'Usar === em vez de == para comparar sem coerção de tipo',
      'Trocar let por const',
      'Remover as aspas do 18',
      'Adicionar ; no final de cada linha'
    ],
    respostaCorreta: 'Usar === em vez de == para comparar sem coerção de tipo', pontos: 20
  },
  {
    titulo: 'Desenvolva: Função soma',
    descricao: 'Complete a função que retorna a soma de dois números.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'function soma(a, b) {\n  ___ a + b\n}\nconsole.log(soma(3, 4))',
    opcoes: ['return', 'console.log', 'let', 'var'],
    respostaCorreta: 'return', pontos: 20
  },
  {
    titulo: 'Desenvolva: Arrow function',
    descricao: 'Complete a arrow function que multiplica um número por 2.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'const dobro = ___ => num * 2\nconsole.log(dobro(5))',
    opcoes: ['(num)', 'function(num)', 'num =>', 'def num'],
    respostaCorreta: '(num)', pontos: 20
  },
  {
    titulo: 'Corrija: Escopo de variável',
    descricao: 'O código tem um erro de escopo. Qual é o problema?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'function saudacao() {\n  let nome = "Victor"\n}\nconsole.log(nome)',
    opcoes: [
      'nome não é acessível fora da função, mover para fora',
      'Trocar let por var',
      'Adicionar return nome na função',
      'Remover a função e usar só o console.log'
    ],
    respostaCorreta: 'nome não é acessível fora da função, mover para fora', pontos: 20
  },
  {
    titulo: 'Desenvolva: Filter em array',
    descricao: 'Complete o código que filtra apenas os números maiores que 5.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'const nums = [1, 3, 7, 9, 2, 8]\nconst maiores = nums.___(n => n > 5)\nconsole.log(maiores)',
    opcoes: ['filter', 'map', 'find', 'reduce'],
    respostaCorreta: 'filter', pontos: 20
  },
  {
    titulo: 'Corrija: Loop infinito',
    descricao: 'O while abaixo vai causar loop infinito. Como corrigir?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'let i = 0\nwhile (i < 5) {\n  console.log(i)\n}',
    opcoes: [
      'Adicionar i++ dentro do while',
      'Trocar while por for',
      'Trocar i < 5 por i > 5',
      'Remover o console.log'
    ],
    respostaCorreta: 'Adicionar i++ dentro do while', pontos: 20
  },
  {
    titulo: 'Desenvolva: Map em array',
    descricao: 'Complete o código que dobra todos os valores do array.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'const nums = [1, 2, 3, 4]\nconst dobrados = nums.___(n => n * 2)\nconsole.log(dobrados)',
    opcoes: ['map', 'filter', 'forEach', 'find'],
    respostaCorreta: 'map', pontos: 20
  },
  {
    titulo: 'Corrija: Objeto com erro',
    descricao: 'O objeto JavaScript abaixo tem um erro de sintaxe. Qual é?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'const pessoa = {\n  nome: "Victor"\n  idade: 26\n  cidade: "Assis"\n}',
    opcoes: [
      'Falta vírgula após cada propriedade',
      'Trocar const por let',
      'Remover as aspas dos valores',
      'Usar = em vez de :'
    ],
    respostaCorreta: 'Falta vírgula após cada propriedade', pontos: 20
  },
  {
    titulo: 'Desenvolva: Reduce',
    descricao: 'Complete o código que soma todos os elementos do array com reduce.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'const nums = [1, 2, 3, 4, 5]\nconst total = nums.reduce((acc, n) => acc ___ n, 0)\nconsole.log(total)',
    opcoes: ['+', '-', '*', '/'],
    respostaCorreta: '+', pontos: 20
  },
  {
    titulo: 'Corrija: Async sem await',
    descricao: 'A função assíncrona abaixo está com erro. Qual é o problema?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'async function buscarDados() {\n  const dados = fetch("https://api.exemplo.com")\n  console.log(dados)\n}',
    opcoes: [
      'Falta await antes do fetch',
      'Remover o async',
      'Trocar const por let',
      'Adicionar return antes do console.log'
    ],
    respostaCorreta: 'Falta await antes do fetch', pontos: 20
  },

  // ==================== JAVASCRIPT - EXPERIENTE ====================
  {
    titulo: 'Corrija: Closure com var',
    descricao: 'O código deveria imprimir 0,1,2 mas imprime 3,3,3. Por quê?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100)\n}',
    opcoes: [
      'Trocar var por let para criar escopo de bloco',
      'Remover o setTimeout',
      'Trocar i++ por ++i',
      'Usar console.log fora do setTimeout'
    ],
    respostaCorreta: 'Trocar var por let para criar escopo de bloco', pontos: 30
  },
  {
    titulo: 'Desenvolva: Promise',
    descricao: 'Complete a Promise que resolve com o valor "sucesso".',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const p = new Promise((resolve, reject) => {\n  ___("sucesso")\n})\np.then(v => console.log(v))',
    opcoes: ['resolve', 'reject', 'return', 'console.log'],
    respostaCorreta: 'resolve', pontos: 30
  },
  {
    titulo: 'Corrija: This perdido',
    descricao: 'O this está retornando undefined dentro do setTimeout. Como corrigir?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const obj = {\n  nome: "Victor",\n  saudar: function() {\n    setTimeout(function() {\n      console.log(this.nome)\n    }, 100)\n  }\n}',
    opcoes: [
      'Usar arrow function no setTimeout',
      'Trocar const por let',
      'Remover o setTimeout',
      'Usar nome diretamente sem this'
    ],
    respostaCorreta: 'Usar arrow function no setTimeout', pontos: 30
  },
  {
    titulo: 'Desenvolva: Destructuring',
    descricao: 'Complete o destructuring para extrair nome e idade do objeto.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const pessoa = { nome: "Victor", idade: 26 }\nconst { ___ } = pessoa\nconsole.log(nome, idade)',
    opcoes: ['nome, idade', 'nome: n, idade: i', '"nome", "idade"', 'pessoa.nome, pessoa.idade'],
    respostaCorreta: 'nome, idade', pontos: 30
  },
  {
    titulo: 'Corrija: Mutação de array',
    descricao: 'O código deveria criar um novo array sem modificar o original, mas está mutando. Como corrigir?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const original = [1, 2, 3]\nconst novo = original\nnovo.push(4)\nconsole.log(original)',
    opcoes: [
      'Usar [...original] para criar cópia',
      'Usar const em vez de let',
      'Remover o push',
      'Usar var em vez de const'
    ],
    respostaCorreta: 'Usar [...original] para criar cópia', pontos: 30
  },
  {
    titulo: 'Desenvolva: Optional chaining',
    descricao: 'Complete com optional chaining para acessar nome sem erro se usuario for null.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const usuario = null\nconst nome = usuario___nome\nconsole.log(nome)',
    opcoes: ['?.', '.', '??', '||'],
    respostaCorreta: '?.', pontos: 30
  },
  {
    titulo: 'Corrija: Comparação NaN',
    descricao: 'O código deveria verificar se o valor é NaN, mas não funciona. Por quê?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const valor = NaN\nif (valor === NaN) {\n  console.log("É NaN")\n}',
    opcoes: [
      'Usar isNaN(valor) pois NaN !== NaN',
      'Trocar === por ==',
      'Trocar NaN por "NaN"',
      'Adicionar typeof antes do valor'
    ],
    respostaCorreta: 'Usar isNaN(valor) pois NaN !== NaN', pontos: 30
  },
  {
    titulo: 'Desenvolva: Nullish coalescing',
    descricao: 'Complete com o operador que retorna "Visitante" quando nome for null ou undefined.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const nome = null\nconst exibir = nome ___ "Visitante"\nconsole.log(exibir)',
    opcoes: ['??', '||', '&&', '?.'],
    respostaCorreta: '??', pontos: 30
  },
  {
    titulo: 'Corrija: Event listener duplicado',
    descricao: 'O botão está chamando a função duas vezes. Qual é o problema?',
    tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const btn = document.querySelector("button")\nbtn.addEventListener("click", handleClick)\nbtn.addEventListener("click", handleClick)',
    opcoes: [
      'addEventListener foi chamado duas vezes com a mesma função',
      'Trocar addEventListener por onclick',
      'Usar removeEventListener antes',
      'Trocar "click" por "onclick"'
    ],
    respostaCorreta: 'addEventListener foi chamado duas vezes com a mesma função', pontos: 30
  },
  {
    titulo: 'Desenvolva: Spread operator',
    descricao: 'Complete com spread operator para juntar os dois arrays.',
    tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const a = [1, 2, 3]\nconst b = [4, 5, 6]\nconst juntos = [___a, ...b]\nconsole.log(juntos)',
    opcoes: ['...', '..', '.', '->'],
    respostaCorreta: '...', pontos: 30
  },
])

console.log('60 desafios inseridos com sucesso!')
process.exit(0)