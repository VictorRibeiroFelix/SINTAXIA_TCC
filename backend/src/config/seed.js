import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
console.log('MongoDB conectado!')

const db = mongoose.connection.db
await db.collection('desafios').deleteMany({})
console.log('Desafios antigos removidos!')

await db.collection('desafios').insertMany([

  // ==================== ALGORITMOS - INICIANTE (10) ====================
  { titulo: 'Escrever na tela', descricao: 'Qual palavra é usada para mostrar uma mensagem na tela em um algoritmo?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Leia', 'Escreva', 'Se', 'Enquanto'], respostaCorreta: 'Escreva', pontos: 10 },
  { titulo: 'Ler dados do usuário', descricao: 'Qual comando é usado para receber dados digitados pelo usuário?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Escreva', 'Repita', 'Leia', 'Início'], respostaCorreta: 'Leia', pontos: 10 },
  { titulo: 'Início do algoritmo', descricao: 'Todo algoritmo começa com qual palavra reservada?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Fim', 'Início', 'Escreva', 'Leia'], respostaCorreta: 'Início', pontos: 10 },
  { titulo: 'Estrutura condicional', descricao: 'Qual estrutura usamos para tomar uma decisão em um algoritmo?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Enquanto', 'Para', 'Se', 'Leia'], respostaCorreta: 'Se', pontos: 10 },
  { titulo: 'Laço de repetição', descricao: 'Qual estrutura usamos para repetir um bloco de código várias vezes?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Se', 'Escreva', 'Enquanto', 'Leia'], respostaCorreta: 'Enquanto', pontos: 10 },
  { titulo: 'Tipo de dado texto', descricao: 'Como chamamos o tipo de dado que armazena textos em algoritmos?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Inteiro', 'Real', 'Lógico', 'Caractere'], respostaCorreta: 'Caractere', pontos: 10 },
  { titulo: 'Tipo de dado número inteiro', descricao: 'Qual tipo de dado usamos para armazenar números sem casas decimais?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Real', 'Inteiro', 'Caractere', 'Lógico'], respostaCorreta: 'Inteiro', pontos: 10 },
  { titulo: 'Senão no condicional', descricao: 'No condicional "Se... Então... ___ ...", qual palavra completa a estrutura?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Mas', 'Porém', 'Senão', 'Depois'], respostaCorreta: 'Senão', pontos: 10 },
  { titulo: 'O que é uma variável?', descricao: 'O que é uma variável em um algoritmo?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['Um comando para exibir dados', 'Um espaço na memória para guardar dados', 'Uma estrutura de repetição', 'O fim do algoritmo'], respostaCorreta: 'Um espaço na memória para guardar dados', pontos: 10 },
  { titulo: 'Operador de atribuição', descricao: 'Qual símbolo usamos para atribuir um valor a uma variável em algoritmos?', tipo: 'pergunta', linguagem: 'algoritmos', dificuldade: 'iniciante', nivel: 1, opcoes: ['==', '=', '<-', '=>'], respostaCorreta: '<-', pontos: 10 },

  // ==================== ALGORITMOS - INTERMEDIÁRIO (10) ====================
  { titulo: 'Desenvolva: Soma de dois números', descricao: 'Complete o algoritmo que lê dois números e exibe a soma deles. Preencha com a operação correta no lugar do ___.', tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  soma <- a ___ b\n  Escreva(soma)\nFim', opcoes: ['+', '-', '*', '/'], respostaCorreta: '+', pontos: 20 },
  { titulo: 'Desenvolva: Média de notas', descricao: 'Para calcular a média de duas notas, qual operação está correta?', tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  Leia(nota1)\n  Leia(nota2)\n  media <- (nota1 + nota2) ___ 2\n  Escreva(media)\nFim', opcoes: ['/ 2', '* 2', '+ 2', '- 2'], respostaCorreta: '/ 2', pontos: 20 },
  { titulo: 'Corrija: Condicional com erro', descricao: 'Encontre o erro no algoritmo que verifica se um número é positivo.', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  Leia(num)\n  Se num > 0 Então\n    Leia("Positivo")\n  FimSe\nFim', opcoes: ['Trocar Leia por Escreva na linha 4', 'Trocar > por < na condição', 'Remover o FimSe', 'Trocar Início por Começo'], respostaCorreta: 'Trocar Leia por Escreva na linha 4', pontos: 20 },
  { titulo: 'Desenvolva: Par ou Ímpar', descricao: 'Qual operador usamos para verificar se um número é par (resto da divisão por 2)?', tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  Leia(num)\n  Se num ___ 2 = 0 Então\n    Escreva("Par")\n  Senão\n    Escreva("Ímpar")\n  FimSe\nFim', opcoes: ['MOD', '/', '*', '+'], respostaCorreta: 'MOD', pontos: 20 },
  { titulo: 'Corrija: Laço infinito', descricao: 'O algoritmo abaixo tem um erro que causa laço infinito. Qual é o problema?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  i <- 1\n  Enquanto i < 5 Faça\n    Escreva(i)\n  FimEnquanto\nFim', opcoes: ['Falta incrementar i dentro do laço', 'A condição deveria ser i > 5', 'Falta Leia(i)', 'O Enquanto deveria ser Para'], respostaCorreta: 'Falta incrementar i dentro do laço', pontos: 20 },
  { titulo: 'Corrija: Atribuição incorreta', descricao: 'Qual erro existe no algoritmo abaixo?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  nome == "Victor"\n  Escreva(nome)\nFim', opcoes: ['Usar <- em vez de == para atribuição', 'Trocar Escreva por Leia', 'Remover as aspas do nome', 'Adicionar Leia antes de Escreva'], respostaCorreta: 'Usar <- em vez de == para atribuição', pontos: 20 },
  { titulo: 'Desenvolva: Maior entre dois', descricao: 'Complete o algoritmo que exibe o maior entre dois números.', tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  Se a ___ b Então\n    Escreva("A é maior")\n  Senão\n    Escreva("B é maior")\n  FimSe\nFim', opcoes: ['> b', '< b', '= b', '<> b'], respostaCorreta: '> b', pontos: 20 },
  { titulo: 'Corrija: Variável não definida', descricao: 'O algoritmo abaixo tem um erro. Qual é ele?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2, codigoBase: 'Início\n  Leia(idade)\n  Se idade >= 18 Então\n    Escreva(mensagem)\n  FimSe\nFim', opcoes: ['A variável mensagem não foi definida', 'Trocar >= por <=', 'Falta FimAlgoritmo no final', 'Leia deveria ser Escreva'], respostaCorreta: 'A variável mensagem não foi definida', pontos: 20 },
  {
    titulo: 'Crie: Calculadora de IMC',
    descricao: 'Escreva um programa em Python que recebe peso (kg) e altura (m) separados por espaço e calcula o IMC. Fórmula: IMC = peso / (altura * altura). Imprima apenas o valor com 2 casas decimais.\n\nExemplo: entrada "70 1.75" → saída "22.86"',
    tipo: 'criar', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: '# Leia peso e altura separados por espaço\npeso, altura = map(float, input().split())\n\n# Calcule o IMC e imprima com 2 casas decimais\n# Dica: use print(f"{valor:.2f}")\n',
    entradaTeste: '70 1.75', respostaCorreta: '22.86', opcoes: [], pontos: 25
  },
  {
    titulo: 'Crie: Soma dos números pares',
    descricao: 'Escreva um programa em Python que recebe um número N e imprime a soma de todos os números pares de 1 até N (incluindo N se for par).\n\nExemplo: entrada "10" → saída "30" (2+4+6+8+10)',
    tipo: 'criar', linguagem: 'algoritmos', dificuldade: 'intermediario', nivel: 2,
    codigoBase: '# Leia o número N\nn = int(input())\n\n# Some todos os pares de 1 até N e imprima\nsomaTotal = 0\n# Complete o código aqui\n\nprint(somaTotal)\n',
    entradaTeste: '10', respostaCorreta: '30', opcoes: [], pontos: 25
  },

  // ==================== ALGORITMOS - EXPERIENTE (10) ====================
  { titulo: 'Corrija: Lógica invertida', descricao: 'O algoritmo deveria exibir apenas números pares de 1 a 10, mas está errado. Qual o problema?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  Para i <- 1 até 10 Faça\n    Se i MOD 2 <> 0 Então\n      Escreva(i)\n    FimSe\n  FimPara\nFim', opcoes: ['Trocar <> por = na condição do MOD', 'Trocar Para por Enquanto', 'Remover o MOD', 'Trocar Escreva por Leia'], respostaCorreta: 'Trocar <> por = na condição do MOD', pontos: 30 },
  { titulo: 'Desenvolva: Fatorial', descricao: 'Complete o algoritmo que calcula o fatorial de um número.', tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  Leia(n)\n  fat <- 1\n  Para i <- 1 até n Faça\n    fat <- fat ___ i\n  FimPara\n  Escreva(fat)\nFim', opcoes: ['*', '+', '-', '/'], respostaCorreta: '*', pontos: 30 },
  { titulo: 'Corrija: Condição composta', descricao: 'O algoritmo deveria aprovar apenas quem tem nota >= 7 E frequência >= 75. Qual o erro?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  Leia(nota)\n  Leia(freq)\n  Se nota >= 7 OU freq >= 75 Então\n    Escreva("Aprovado")\n  Senão\n    Escreva("Reprovado")\n  FimSe\nFim', opcoes: ['Trocar OU por E na condição', 'Trocar >= 7 por > 7', 'Remover a segunda condição', 'Trocar Senão por SeFalso'], respostaCorreta: 'Trocar OU por E na condição', pontos: 30 },
  { titulo: 'Corrija: Troca de variáveis', descricao: 'O algoritmo deveria trocar os valores de A e B, mas está errado. Qual o problema?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  a <- b\n  b <- a\n  Escreva(a, b)\nFim', opcoes: ['Falta usar variável auxiliar antes de trocar', 'Trocar Leia por Escreva', 'A ordem das atribuições está certa', 'Falta declarar as variáveis'], respostaCorreta: 'Falta usar variável auxiliar antes de trocar', pontos: 30 },
  { titulo: 'Desenvolva: Contagem regressiva', descricao: 'Complete o Enquanto para fazer contagem regressiva de 10 até 1.', tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  i <- 10\n  Enquanto i ___ Faça\n    Escreva(i)\n    i <- i - 1\n  FimEnquanto\nFim', opcoes: ['>= 1', '<= 1', '= 1', '<> 1'], respostaCorreta: '>= 1', pontos: 30 },
  { titulo: 'Corrija: Divisão por zero', descricao: 'O algoritmo abaixo pode causar erro de divisão por zero. Como corrigir?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  Leia(a)\n  Leia(b)\n  resultado <- a / b\n  Escreva(resultado)\nFim', opcoes: ['Verificar se b <> 0 antes de dividir', 'Trocar / por *', 'Usar MOD em vez de /', 'Inicializar b com 1'], respostaCorreta: 'Verificar se b <> 0 antes de dividir', pontos: 30 },
  { titulo: 'Desenvolva: Maior do vetor', descricao: 'Complete o algoritmo que encontra o maior valor de um vetor de 5 elementos.', tipo: 'desenvolvimento', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  maior <- vetor[1]\n  Para i <- 2 até 5 Faça\n    Se vetor[i] ___ Então\n      maior <- vetor[i]\n    FimSe\n  FimPara\n  Escreva(maior)\nFim', opcoes: ['> maior', '< maior', '= maior', '<> maior'], respostaCorreta: '> maior', pontos: 30 },
  { titulo: 'Corrija: Comparação de strings', descricao: 'O algoritmo deveria verificar se o nome é "Victor", mas tem um erro. Qual é?', tipo: 'correcao', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3, codigoBase: 'Início\n  Leia(nome)\n  Se nome = Victor Então\n    Escreva("Olá Victor!")\n  FimSe\nFim', opcoes: ['Victor deveria estar entre aspas: "Victor"', 'Trocar = por ==', 'Remover o Então', 'Trocar Leia por Escreva'], respostaCorreta: 'Victor deveria estar entre aspas: "Victor"', pontos: 30 },
  {
    titulo: 'Crie: Verificar número primo',
    descricao: 'Escreva um programa em Python que recebe um número N e imprime "primo" se for primo ou "nao primo" caso contrário.\n\nExemplo: entrada "17" → saída "primo"\nExemplo: entrada "4" → saída "nao primo"',
    tipo: 'criar', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'n = int(input())\n\n# Verifique se n é primo\n# Um número é primo se só é divisível por 1 e por ele mesmo\nprimo = True\n\n# Complete o código aqui\n\nif primo:\n    print("primo")\nelse:\n    print("nao primo")\n',
    entradaTeste: '17', respostaCorreta: 'primo', opcoes: [], pontos: 35
  },
  {
    titulo: 'Crie: Sequência de Fibonacci',
    descricao: 'Escreva um programa em Python que recebe um número N e imprime os N primeiros termos da sequência de Fibonacci, um por linha.\n\nExemplo: entrada "6" → saída:\n0\n1\n1\n2\n3\n5',
    tipo: 'criar', linguagem: 'algoritmos', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'n = int(input())\n\n# Gere os N primeiros termos de Fibonacci\na, b = 0, 1\n# Complete o código aqui\n',
    entradaTeste: '6', respostaCorreta: '0\n1\n1\n2\n3\n5', opcoes: [], pontos: 35
  },

  // ==================== JAVASCRIPT - INICIANTE (10) ====================
  { titulo: 'Console no JavaScript', descricao: 'Qual comando usamos para exibir uma mensagem no console em JavaScript?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['print()', 'console.log()', 'echo()', 'write()'], respostaCorreta: 'console.log()', pontos: 10 },
  { titulo: 'Declarar variável', descricao: 'Qual palavra-chave usamos para declarar uma variável que pode mudar em JavaScript moderno?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['var', 'let', 'int', 'string'], respostaCorreta: 'let', pontos: 10 },
  { titulo: 'Constante em JavaScript', descricao: 'Qual palavra-chave usamos para declarar um valor que não pode ser alterado?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['let', 'fixed', 'const', 'final'], respostaCorreta: 'const', pontos: 10 },
  { titulo: 'Tipo de dado', descricao: 'Qual função usamos para descobrir o tipo de uma variável em JavaScript?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['typeOf()', 'typeof', 'getType()', 'type()'], respostaCorreta: 'typeof', pontos: 10 },
  { titulo: 'Criar uma função', descricao: 'Qual palavra-chave usamos para criar uma função em JavaScript?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['def', 'func', 'function', 'method'], respostaCorreta: 'function', pontos: 10 },
  { titulo: 'Condicional if', descricao: 'Como escrevemos uma condição em JavaScript?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['if (condição)', 'se (condição)', 'when (condição)', 'check (condição)'], respostaCorreta: 'if (condição)', pontos: 10 },
  { titulo: 'Laço for', descricao: 'Qual é a estrutura correta de um laço for em JavaScript?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['for (let i = 0; i < 10; i++)', 'for i in range(10)', 'for (i = 0 to 10)', 'loop (i < 10)'], respostaCorreta: 'for (let i = 0; i < 10; i++)', pontos: 10 },
  { titulo: 'Concatenar strings', descricao: 'Como concatenamos duas strings em JavaScript moderno?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['usando o operador +', 'usando concat() apenas', 'usando & entre as strings', 'usando . entre as strings'], respostaCorreta: 'usando o operador +', pontos: 10 },
  { titulo: 'Array em JavaScript', descricao: 'Como criamos um array vazio em JavaScript?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['let arr = {}', 'let arr = []', 'let arr = ()', 'let arr = <>'], respostaCorreta: 'let arr = []', pontos: 10 },
  { titulo: 'Comentário em JavaScript', descricao: 'Como escrevemos um comentário de uma linha em JavaScript?', tipo: 'pergunta', linguagem: 'javascript', dificuldade: 'iniciante', nivel: 1, opcoes: ['# comentário', '// comentário', '/* comentário', '-- comentário'], respostaCorreta: '// comentário', pontos: 10 },

  // ==================== JAVASCRIPT - INTERMEDIÁRIO (10) ====================
  { titulo: 'Corrija: Comparação incorreta', descricao: 'O código deveria verificar se idade é exatamente igual ao número 18, mas tem um erro. Qual?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'let idade = 18\nif (idade == "18") {\n  console.log("Maior de idade")\n}', opcoes: ['Usar === em vez de == para comparar sem coerção de tipo', 'Trocar let por const', 'Remover as aspas do 18', 'Adicionar ; no final de cada linha'], respostaCorreta: 'Usar === em vez de == para comparar sem coerção de tipo', pontos: 20 },
  { titulo: 'Desenvolva: Função soma', descricao: 'Complete a função que retorna a soma de dois números.', tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'function soma(a, b) {\n  ___ a + b\n}\nconsole.log(soma(3, 4))', opcoes: ['return', 'console.log', 'let', 'var'], respostaCorreta: 'return', pontos: 20 },
  { titulo: 'Corrija: Escopo de variável', descricao: 'O código tem um erro de escopo. Qual é o problema?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'function saudacao() {\n  let nome = "Victor"\n}\nconsole.log(nome)', opcoes: ['nome não é acessível fora da função, mover para fora', 'Trocar let por var', 'Adicionar return nome na função', 'Remover a função e usar só o console.log'], respostaCorreta: 'nome não é acessível fora da função, mover para fora', pontos: 20 },
  { titulo: 'Desenvolva: Filter em array', descricao: 'Complete o código que filtra apenas os números maiores que 5.', tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'const nums = [1, 3, 7, 9, 2, 8]\nconst maiores = nums.___(n => n > 5)\nconsole.log(maiores)', opcoes: ['filter', 'map', 'find', 'reduce'], respostaCorreta: 'filter', pontos: 20 },
  { titulo: 'Corrija: Loop infinito', descricao: 'O while abaixo vai causar loop infinito. Como corrigir?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'let i = 0\nwhile (i < 5) {\n  console.log(i)\n}', opcoes: ['Adicionar i++ dentro do while', 'Trocar while por for', 'Trocar i < 5 por i > 5', 'Remover o console.log'], respostaCorreta: 'Adicionar i++ dentro do while', pontos: 20 },
  { titulo: 'Desenvolva: Map em array', descricao: 'Complete o código que dobra todos os valores do array.', tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'const nums = [1, 2, 3, 4]\nconst dobrados = nums.___(n => n * 2)\nconsole.log(dobrados)', opcoes: ['map', 'filter', 'forEach', 'find'], respostaCorreta: 'map', pontos: 20 },
  { titulo: 'Corrija: Objeto com erro', descricao: 'O objeto JavaScript abaixo tem um erro de sintaxe. Qual é?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'const pessoa = {\n  nome: "Victor"\n  idade: 26\n  cidade: "Assis"\n}', opcoes: ['Falta vírgula após cada propriedade', 'Trocar const por let', 'Remover as aspas dos valores', 'Usar = em vez de :'], respostaCorreta: 'Falta vírgula após cada propriedade', pontos: 20 },
  { titulo: 'Corrija: Async sem await', descricao: 'A função assíncrona abaixo está com erro. Qual é o problema?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2, codigoBase: 'async function buscarDados() {\n  const dados = fetch("https://api.exemplo.com")\n  console.log(dados)\n}', opcoes: ['Falta await antes do fetch', 'Remover o async', 'Trocar const por let', 'Adicionar return antes do console.log'], respostaCorreta: 'Falta await antes do fetch', pontos: 20 },
  {
    titulo: 'Crie: Inverter uma string',
    descricao: 'Escreva um programa JavaScript que recebe uma palavra e imprime ela ao contrário.\n\nExemplo: entrada "sintaxia" → saída "aixatnis"',
    tipo: 'criar', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (linha) => {\n  const palavra = linha.trim();\n  \n  // Inverta a palavra e imprima\n  // Dica: use split(""), reverse() e join("")\n  \n  rl.close();\n});\n',
    entradaTeste: 'sintaxia', respostaCorreta: 'aixatnis', opcoes: [], pontos: 25
  },
  {
    titulo: 'Crie: Soma dos elementos',
    descricao: 'Escreva um programa JavaScript que recebe números separados por espaço e imprime a soma de todos eles.\n\nExemplo: entrada "1 2 3 4 5" → saída "15"',
    tipo: 'criar', linguagem: 'javascript', dificuldade: 'intermediario', nivel: 2,
    codigoBase: 'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (linha) => {\n  const nums = linha.trim().split(" ").map(Number);\n  \n  // Some todos os números e imprima o resultado\n  \n  rl.close();\n});\n',
    entradaTeste: '1 2 3 4 5', respostaCorreta: '15', opcoes: [], pontos: 25
  },

  // ==================== JAVASCRIPT - EXPERIENTE (10) ====================
  { titulo: 'Corrija: Closure com var', descricao: 'O código deveria imprimir 0,1,2 mas imprime 3,3,3. Por quê?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100)\n}', opcoes: ['Trocar var por let para criar escopo de bloco', 'Remover o setTimeout', 'Trocar i++ por ++i', 'Usar console.log fora do setTimeout'], respostaCorreta: 'Trocar var por let para criar escopo de bloco', pontos: 30 },
  { titulo: 'Desenvolva: Promise', descricao: 'Complete a Promise que resolve com o valor "sucesso".', tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'const p = new Promise((resolve, reject) => {\n  ___("sucesso")\n})\np.then(v => console.log(v))', opcoes: ['resolve', 'reject', 'return', 'console.log'], respostaCorreta: 'resolve', pontos: 30 },
  { titulo: 'Corrija: This perdido', descricao: 'O this está retornando undefined dentro do setTimeout. Como corrigir?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'const obj = {\n  nome: "Victor",\n  saudar: function() {\n    setTimeout(function() {\n      console.log(this.nome)\n    }, 100)\n  }\n}', opcoes: ['Usar arrow function no setTimeout', 'Trocar const por let', 'Remover o setTimeout', 'Usar nome diretamente sem this'], respostaCorreta: 'Usar arrow function no setTimeout', pontos: 30 },
  { titulo: 'Desenvolva: Destructuring', descricao: 'Complete o destructuring para extrair nome e idade do objeto.', tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'const pessoa = { nome: "Victor", idade: 26 }\nconst { ___ } = pessoa\nconsole.log(nome, idade)', opcoes: ['nome, idade', 'nome: n, idade: i', '"nome", "idade"', 'pessoa.nome, pessoa.idade'], respostaCorreta: 'nome, idade', pontos: 30 },
  { titulo: 'Corrija: Mutação de array', descricao: 'O código deveria criar um novo array sem modificar o original, mas está mutando. Como corrigir?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'const original = [1, 2, 3]\nconst novo = original\nnovo.push(4)\nconsole.log(original)', opcoes: ['Usar [...original] para criar cópia', 'Usar const em vez de let', 'Remover o push', 'Usar var em vez de const'], respostaCorreta: 'Usar [...original] para criar cópia', pontos: 30 },
  { titulo: 'Corrija: Comparação NaN', descricao: 'O código deveria verificar se o valor é NaN, mas não funciona. Por quê?', tipo: 'correcao', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'const valor = NaN\nif (valor === NaN) {\n  console.log("É NaN")\n}', opcoes: ['Usar isNaN(valor) pois NaN !== NaN', 'Trocar === por ==', 'Trocar NaN por "NaN"', 'Adicionar typeof antes do valor'], respostaCorreta: 'Usar isNaN(valor) pois NaN !== NaN', pontos: 30 },
  { titulo: 'Desenvolva: Nullish coalescing', descricao: 'Complete com o operador que retorna "Visitante" quando nome for null ou undefined.', tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'const nome = null\nconst exibir = nome ___ "Visitante"\nconsole.log(exibir)', opcoes: ['??', '||', '&&', '?.'], respostaCorreta: '??', pontos: 30 },
  { titulo: 'Desenvolva: Spread operator', descricao: 'Complete com spread operator para juntar os dois arrays.', tipo: 'desenvolvimento', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3, codigoBase: 'const a = [1, 2, 3]\nconst b = [4, 5, 6]\nconst juntos = [___a, ...b]\nconsole.log(juntos)', opcoes: ['...', '..', '.', '->'], respostaCorreta: '...', pontos: 30 },
  {
    titulo: 'Crie: FizzBuzz',
    descricao: 'Escreva um programa JavaScript que recebe N e imprime números de 1 a N. Para múltiplos de 3 imprima "Fizz", de 5 imprima "Buzz", de ambos imprima "FizzBuzz".\n\nExemplo: entrada "5" → saída:\n1\n2\nFizz\n4\nBuzz',
    tipo: 'criar', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (linha) => {\n  const n = parseInt(linha.trim());\n  \n  // Implemente o FizzBuzz de 1 até n\n  \n  rl.close();\n});\n',
    entradaTeste: '5', respostaCorreta: '1\n2\nFizz\n4\nBuzz', opcoes: [], pontos: 35
  },
  {
    titulo: 'Crie: Palíndromo',
    descricao: 'Escreva um programa JavaScript que verifica se uma palavra é palíndromo (lida igual de frente e de trás). Imprima "sim" ou "nao".\n\nExemplo: entrada "arara" → saída "sim"\nExemplo: entrada "sintaxia" → saída "nao"',
    tipo: 'criar', linguagem: 'javascript', dificuldade: 'experiente', nivel: 3,
    codigoBase: 'const readline = require("readline");\nconst rl = readline.createInterface({ input: process.stdin });\n\nrl.on("line", (linha) => {\n  const palavra = linha.trim().toLowerCase();\n  \n  // Verifique se é palíndromo e imprima "sim" ou "nao"\n  \n  rl.close();\n});\n',
    entradaTeste: 'arara', respostaCorreta: 'sim', opcoes: [], pontos: 35
  },
])

console.log('60 desafios inseridos com sucesso! (10 por nível)')
process.exit(0)