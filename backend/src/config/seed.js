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
{ 
titulo: 'Exibir mensagem',
descricao: 'Qual comando usamos para mostrar uma mensagem ou valor na tela em Portugol?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Leia', 'Escreva', 'Se', 'Enquanto'],
respostaCorreta: 'Escreva',
pontos: 10
},

{ 
titulo: 'Entrada de dados',
descricao: 'Qual comando permite receber um valor digitado pelo usuário?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Escreva', 'Leia', 'Fim', 'Para'],
respostaCorreta: 'Leia',
pontos: 10
},

{ 
titulo: 'Estrutura inicial',
descricao: 'Qual palavra representa o começo de um algoritmo em Portugol?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Fim', 'Inicio', 'Leia', 'Escreva'],
respostaCorreta: 'Inicio',
pontos: 10
},

{ 
titulo: 'Tomada de decisão',
descricao: 'Qual estrutura usamos quando o algoritmo precisa escolher entre duas possibilidades?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Enquanto', 'Se', 'Leia', 'Escreva'],
respostaCorreta: 'Se',
pontos: 10
},

{ 
titulo: 'Repetição de comandos',
descricao: 'Qual estrutura permite repetir comandos enquanto uma condição for verdadeira?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Se', 'Enquanto', 'Leia', 'Fim'],
respostaCorreta: 'Enquanto',
pontos: 10
},

{ 
titulo: 'Guardar informações',
descricao: 'O que é uma variável em um algoritmo?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'Um espaço para armazenar dados',
'Uma tela do programa',
'Um comando de repetição',
'Um erro do algoritmo'
],
respostaCorreta: 'Um espaço para armazenar dados',
pontos: 10
},

{ 
titulo: 'Número inteiro',
descricao: 'Qual tipo de dado usamos para guardar números sem casas decimais?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Real', 'Inteiro', 'Cadeia', 'Logico'],
respostaCorreta: 'Inteiro',
pontos: 10
},

{ 
titulo: 'Texto no algoritmo',
descricao: 'Qual tipo de dado representa textos em Portugol?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Inteiro', 'Real', 'Cadeia', 'Logico'],
respostaCorreta: 'Cadeia',
pontos: 10
},

{ 
titulo: 'Estrutura Senão',
descricao: 'Complete a estrutura: Se condição Então ... ______',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['Enquanto', 'Senão', 'Leia', 'Fim'],
respostaCorreta: 'Senão',
pontos: 10
},

{ 
titulo: 'Atribuição de valores',
descricao: 'Qual operador usamos para colocar um valor dentro de uma variável em Portugol?',
tipo: 'pergunta',
linguagem: 'algoritmos',
dificuldade: 'iniciante',
nivel: 1,
opcoes: ['==', '=', '<-', '>='],
respostaCorreta: '<-',
pontos: 10
},

// ==================== ALGORITMOS - INTERMEDIÁRIO (10) ====================
{
titulo: 'Desenvolva: Soma de dois números',
descricao: 'Complete o algoritmo que lê dois números e mostra a soma deles.',
tipo: 'desenvolvimento',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio
  Inteiro a, b, soma

  Leia(a)
  Leia(b)

  soma <- a ___ b

  Escreva(soma)
Fim`,
opcoes: ['+', '-', '*', '/'],
respostaCorreta: '+',
pontos: 20
},


{
titulo: 'Desenvolva: Média de notas',
descricao: 'Complete o algoritmo para calcular a média de duas notas.',
tipo: 'desenvolvimento',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio
  Real nota1, nota2, media

  Leia(nota1)
  Leia(nota2)

  media <- (nota1 + nota2) ___ 2

  Escreva(media)
Fim`,
opcoes: ['/', '*', '+', '-'],
respostaCorreta: '/',
pontos: 20
},


{
titulo: 'Corrija: Mensagem invertida',
descricao: 'O algoritmo deveria mostrar uma mensagem na tela, mas existe um comando incorreto.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio
  Inteiro idade

  Leia(idade)

  Se idade >= 18 Entao
      Leia("Maior de idade")
  FimSe

Fim`,
opcoes: [
'Trocar Leia por Escreva',
'Trocar >= por <=',
'Remover o Se',
'Adicionar Enquanto'
],
respostaCorreta: 'Trocar Leia por Escreva',
pontos: 20
},


{
titulo: 'Desenvolva: Verificar número par',
descricao: 'Complete o algoritmo que verifica se um número é par utilizando o resto da divisão.',
tipo: 'desenvolvimento',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio

  Inteiro numero

  Leia(numero)

  Se numero ___ 2 = 0 Entao
      Escreva("Par")
  Senao
      Escreva("Impar")
  FimSe

Fim`,
opcoes: ['MOD', '/', '*', '+'],
respostaCorreta: 'MOD',
pontos: 20
},


{
titulo: 'Corrija: Loop infinito',
descricao: 'O algoritmo abaixo nunca termina. Identifique o problema.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio

  Inteiro contador

  contador <- 1

  Enquanto contador <= 5 Faca

      Escreva(contador)

  FimEnquanto

Fim`,
opcoes: [
'Adicionar contador <- contador + 1 dentro do Enquanto',
'Trocar Enquanto por Se',
'Remover a variável contador',
'Mudar <= para ='
],
respostaCorreta: 'Adicionar contador <- contador + 1 dentro do Enquanto',
pontos: 20
},


{
titulo: 'Corrija: Operador errado',
descricao: 'O algoritmo possui erro na atribuição de valor para uma variável.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio

  Cadeia nome

  nome == "Victor"

  Escreva(nome)

Fim`,
opcoes: [
'Usar <- no lugar de ==',
'Trocar Escreva por Leia',
'Remover as aspas',
'Adicionar Enquanto'
],
respostaCorreta: 'Usar <- no lugar de ==',
pontos: 20
},


{
titulo: 'Desenvolva: Maior número',
descricao: 'Complete o algoritmo que mostra qual número é maior.',
tipo: 'desenvolvimento',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio

  Inteiro a, b

  Leia(a)
  Leia(b)

  Se a ___ b Entao

      Escreva("A maior")

  Senao

      Escreva("B maior")

  FimSe

Fim`,
opcoes: ['>', '<', '=', '<>'],
respostaCorreta: '>',
pontos: 20
},


{
titulo: 'Corrija: Variável inexistente',
descricao: 'O algoritmo possui uma variável sendo usada sem ter recebido valor.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio

  Inteiro idade

  Leia(idade)

  Se idade >= 18 Entao

      Escreva(mensagem)

  FimSe

Fim`,
opcoes: [
'A variável mensagem não foi criada',
'Trocar idade por texto',
'Remover o Se',
'Trocar Escreva por Leia'
],
respostaCorreta: 'A variável mensagem não foi criada',
pontos: 20
},


{
titulo: 'Crie: Calculadora de IMC',
descricao: 'Crie um algoritmo em Portugol que leia peso e altura e calcule o IMC usando a fórmula peso / (altura * altura).',
tipo: 'criar',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio

  Real peso, altura, imc

  Leia(peso)
  Leia(altura)


  // Calcule o IMC


  Escreva(imc)

Fim`,
entradaTeste: '70 1.75',
respostaCorreta: '22.85',
opcoes: [],
pontos: 25
},


{
titulo: 'Crie: Soma dos números pares',
descricao: 'Crie um algoritmo que leia um número N e calcule a soma de todos os números pares entre 1 e N.',
tipo: 'criar',
linguagem: 'algoritmos',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `Inicio

  Inteiro n, i, soma

  Leia(n)

  soma <- 0


  Para i <- 1 ate n Faca


      // complete


  FimPara


  Escreva(soma)

Fim`,
entradaTeste: '10',
respostaCorreta: '30',
opcoes: [],
pontos: 25
},

// ==================== ALGORITMOS - EXPERIENTE (10) ====================
{
titulo: 'Corrija: Verificação de números pares',
descricao: 'O algoritmo deveria mostrar apenas números pares de 1 até 10, mas possui um erro na condição.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Inteiro i

  Para i <- 1 ate 10 Faca

      Se i MOD 2 <> 0 Entao

          Escreva(i)

      FimSe

  FimPara

Fim`,
opcoes: [
'Trocar <> por = na condição do MOD',
'Trocar Para por Enquanto',
'Remover o MOD',
'Trocar Escreva por Leia'
],
respostaCorreta: 'Trocar <> por = na condição do MOD',
pontos: 30
},


{
titulo: 'Desenvolva: Fatorial',
descricao: 'Complete o algoritmo que calcula o fatorial de um número informado pelo usuário.',
tipo: 'desenvolvimento',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Inteiro n, i, fat

  Leia(n)

  fat <- 1


  Para i <- 1 ate n Faca

      fat <- fat ___ i

  FimPara


  Escreva(fat)

Fim`,
opcoes: ['*', '+', '-', '/'],
respostaCorreta: '*',
pontos: 30
},


{
titulo: 'Corrija: Condição de aprovação',
descricao: 'O aluno deve ser aprovado somente se tiver nota maior ou igual a 7 e frequência maior ou igual a 75. Corrija a lógica.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Real nota
  Inteiro frequencia

  Leia(nota)
  Leia(frequencia)


  Se nota >= 7 OU frequencia >= 75 Entao

      Escreva("Aprovado")

  Senao

      Escreva("Reprovado")

  FimSe

Fim`,
opcoes: [
'Trocar OU por E',
'Trocar >= por >',
'Remover frequência',
'Trocar Senao por Se'
],
respostaCorreta: 'Trocar OU por E',
pontos: 30
},


{
titulo: 'Corrija: Troca de valores',
descricao: 'O algoritmo deveria trocar os valores de duas variáveis. Identifique o erro.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Inteiro a, b

  Leia(a)
  Leia(b)


  a <- b

  b <- a


  Escreva(a,b)

Fim`,
opcoes: [
'Usar uma variável auxiliar para guardar o valor de a',
'Trocar Leia por Escreva',
'Remover a variável b',
'Adicionar Enquanto'
],
respostaCorreta: 'Usar uma variável auxiliar para guardar o valor de a',
pontos: 30
},


{
titulo: 'Desenvolva: Contagem regressiva',
descricao: 'Complete o algoritmo para mostrar os números de 10 até 1.',
tipo: 'desenvolvimento',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Inteiro i

  i <- 10


  Enquanto i ___ 1 Faca

      Escreva(i)

      i <- i - 1

  FimEnquanto

Fim`,
opcoes: ['>=', '<=', '=', '<>'],
respostaCorreta: '>=',
pontos: 30
},


{
titulo: 'Corrija: Divisão por zero',
descricao: 'O algoritmo pode gerar erro quando o segundo número for zero. Como corrigir?',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Real a,b,resultado

  Leia(a)
  Leia(b)


  resultado <- a / b


  Escreva(resultado)

Fim`,
opcoes: [
'Verificar se b é diferente de zero antes da divisão',
'Trocar divisão por multiplicação',
'Usar MOD',
'Inicializar b com 1'
],
respostaCorreta: 'Verificar se b é diferente de zero antes da divisão',
pontos: 30
},


{
titulo: 'Desenvolva: Maior valor do vetor',
descricao: 'Complete o algoritmo que encontra o maior número dentro de um vetor com 5 posições.',
tipo: 'desenvolvimento',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Inteiro i, maior

  maior <- vetor[1]


  Para i <- 2 ate 5 Faca

      Se vetor[i] ___ maior Entao

          maior <- vetor[i]

      FimSe

  FimPara


  Escreva(maior)

Fim`,
opcoes: ['>', '<', '=', '<>'],
respostaCorreta: '>',
pontos: 30
},


{
titulo: 'Corrija: Comparação de texto',
descricao: 'O algoritmo deve verificar se o nome digitado é Victor, mas existe um erro.',
tipo: 'correcao',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Cadeia nome

  Leia(nome)


  Se nome = Victor Entao

      Escreva("Olá Victor")

  FimSe

Fim`,
opcoes: [
'Colocar Victor entre aspas: "Victor"',
'Trocar = por <-',
'Remover o Se',
'Trocar Leia por Escreva'
],
respostaCorreta: 'Colocar Victor entre aspas: "Victor"',
pontos: 30
},


{
titulo: 'Crie: Verificar número primo',
descricao: 'Crie um algoritmo que leia um número e informe se ele é primo ou não.',
tipo: 'criar',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Inteiro n, i
  Logico primo


  Leia(n)


  primo <- Verdadeiro


  // Números menores ou iguais a 1 não são primos


  Para i <- 2 ate n-1 Faca

      // verifique divisões


  FimPara


  Se primo = Verdadeiro Entao

      Escreva("primo")

  Senao

      Escreva("nao primo")

  FimSe

Fim`,
entradaTeste: '17',
respostaCorreta: 'primo',
opcoes: [],
pontos: 35
},


{
titulo: 'Crie: Sequência de Fibonacci',
descricao: 'Crie um algoritmo que leia N e mostre os primeiros números da sequência de Fibonacci.',
tipo: 'criar',
linguagem: 'algoritmos',
dificuldade: 'experiente',
nivel: 3,
codigoBase: `Inicio

  Inteiro n, i, a, b, temp


  Leia(n)


  a <- 0
  b <- 1


  Para i <- 1 ate n Faca


      // mostre o valor atual

      // atualize os próximos valores


  FimPara

Fim`,
entradaTeste: '6',
respostaCorreta: '0\n1\n1\n2\n3\n5',
opcoes: [],
pontos: 35
},

// ==================== JAVASCRIPT - INICIANTE (10) ====================
{
titulo: 'Exibir mensagem no console',
descricao: 'Qual comando usamos para mostrar uma mensagem no console do navegador ou Node.js?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'print()',
'console.log()',
'echo()',
'write()'
],
respostaCorreta: 'console.log()',
pontos: 10
},


{
titulo: 'Criar variável',
descricao: 'Qual palavra-chave usamos para criar uma variável que pode receber novos valores no JavaScript moderno?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'let',
'int',
'string',
'variable'
],
respostaCorreta: 'let',
pontos: 10
},


{
titulo: 'Criar constante',
descricao: 'Qual palavra-chave cria uma variável que não pode receber outro valor depois de definida?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'let',
'const',
'fixed',
'final'
],
respostaCorreta: 'const',
pontos: 10
},


{
titulo: 'Descobrir tipo de variável',
descricao: 'Qual operador usamos para descobrir o tipo de um valor em JavaScript?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'typeof',
'type()',
'getType()',
'datatype'
],
respostaCorreta: 'typeof',
pontos: 10
},


{
titulo: 'Criar função',
descricao: 'Qual palavra-chave cria uma função tradicional em JavaScript?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'function',
'def',
'func',
'method'
],
respostaCorreta: 'function',
pontos: 10
},


{
titulo: 'Condicional IF',
descricao: 'Qual estrutura usamos para executar código somente quando uma condição for verdadeira?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'if',
'when',
'check',
'condition'
],
respostaCorreta: 'if',
pontos: 10
},


{
titulo: 'Laço FOR',
descricao: 'Qual estrutura usamos para repetir um bloco de código uma quantidade definida de vezes?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'for',
'loop',
'repeat',
'whileOnly'
],
respostaCorreta: 'for',
pontos: 10
},


{
titulo: 'Concatenar textos',
descricao: 'Qual operador usamos para juntar duas strings em JavaScript?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'+',
'&',
'.',
','
],
respostaCorreta: '+',
pontos: 10
},


{
titulo: 'Criar array vazio',
descricao: 'Qual sintaxe cria um array vazio em JavaScript?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'[]',
'{}',
'()',
'< >'
],
respostaCorreta: '[]',
pontos: 10
},


{
titulo: 'Comentário de uma linha',
descricao: 'Como fazemos um comentário de uma linha em JavaScript?',
tipo: 'pergunta',
linguagem: 'javascript',
dificuldade: 'iniciante',
nivel: 1,
opcoes: [
'// comentário',
'# comentário',
'-- comentário',
'<!-- comentário -->'
],
respostaCorreta: '// comentário',
pontos: 10
},



// ==================== JAVASCRIPT - INTERMEDIÁRIO (10) ====================
{
titulo: 'Corrija: Comparação de valores',
descricao: 'O código deve verificar se idade é exatamente o número 18.',
tipo: 'correcao',
linguagem: 'javascript',
dificuldade: 'intermediario',
nivel: 2,
codigoBase: `let idade = "18"

if (idade == 18) {
 console.log("Idade correta")
}`,
opcoes:[
'Usar === para comparar valor e tipo',
'Trocar let por const',
'Remover o if',
'Adicionar um for'
],
respostaCorreta:'Usar === para comparar valor e tipo',
pontos:20
},

{
titulo:'Desenvolva: Função soma',
descricao:'Complete a função para retornar a soma de dois números.',
tipo:'desenvolvimento',
linguagem:'javascript',
dificuldade:'intermediario',
nivel:2,
codigoBase:`function soma(a,b){

 ___ a + b

}

console.log(soma(3,4))`,
opcoes:[
'return',
'console.log',
'let',
'const'
],
respostaCorreta:'return',
pontos:20
},

{
titulo:'Corrija: Escopo da variável',
descricao:'A variável nome não pode ser acessada fora da função.',
tipo:'correcao',
linguagem:'javascript',
dificuldade:'intermediario',
nivel:2,
codigoBase:`function mensagem(){

 let nome = "Victor"

}

console.log(nome)`,
opcoes:[
'Mover a variável para fora da função',
'Trocar let por const',
'Adicionar for',
'Remover console.log'
],
respostaCorreta:'Mover a variável para fora da função',
pontos:20
},

{
titulo:'Desenvolva: Filter',
descricao:'Use filter para retornar apenas números maiores que 5.',
tipo:'desenvolvimento',
linguagem:'javascript',
dificuldade:'intermediario',
nivel:2,
codigoBase:`const numeros = [1,3,7,9,2,8]

const maiores = numeros.___(n => n > 5)

console.log(maiores)`,
opcoes:[
'filter',
'map',
'reduce',
'find'
],
respostaCorreta:'filter',
pontos:20
},

{
titulo:'Corrija: While infinito',
descricao:'O while abaixo nunca termina. Qual correção deve ser feita?',
tipo:'correcao',
linguagem:'javascript',
dificuldade:'intermediario',
nivel:2,
codigoBase:`let i = 0

while(i < 5){

 console.log(i)

}`,
opcoes:[
'Adicionar i++ dentro do while',
'Trocar while por if',
'Remover console.log',
'Mudar let para const'
],
respostaCorreta:'Adicionar i++ dentro do while',
pontos:20
},

{
titulo:'Desenvolva: Map',
descricao:'Use map para criar um novo array com valores dobrados.',
tipo:'desenvolvimento',
linguagem:'javascript',
dificuldade:'intermediario',
nivel:2,
codigoBase:`const numeros=[1,2,3,4]

const dobro=numeros.___(n=>n*2)

console.log(dobro)`,
opcoes:[
'map',
'filter',
'find',
'push'
],
respostaCorreta:'map',
pontos:20
},

{
titulo:'Corrija: Objeto JavaScript',
descricao:'O objeto possui erro de sintaxe.',
tipo:'correcao',
linguagem:'javascript',
dificuldade:'intermediario',
nivel:2,
codigoBase:`const pessoa={
 nome:"Victor"
 idade:26
}`,
opcoes:[
'Adicionar vírgula entre propriedades',
'Trocar const por let',
'Remover aspas',
'Usar ='
],
respostaCorreta:'Adicionar vírgula entre propriedades',
pontos:20
},

{
titulo:'Corrija: Promise',
descricao:'A Promise abaixo deveria retornar uma mensagem de erro quando algo falhar.',
tipo:'correcao',
linguagem:'javascript',
dificuldade:'intermediario',
nivel:2,
codigoBase:`const promessa = new Promise((resolve,reject)=>{

 console.log("Executando")

})`,
opcoes:[
'Adicionar resolve ou reject dentro da Promise',
'Trocar const por let',
'Remover Promise',
'Usar var'
],
respostaCorreta:'Adicionar resolve ou reject dentro da Promise',
pontos:20
},

{
titulo: 'Crie: Inverter uma string',

descricao: 'Escreva um programa JavaScript que recebe uma palavra e imprime ela invertida.\n\nExemplo:\nEntrada: "sintaxia"\nSaída: "aixatnis"',

tipo: 'criar',
linguagem: 'javascript',
dificuldade: 'intermediario',
nivel: 2,

codigoBase: `const readline = require("readline");

const rl = readline.createInterface({
 input: process.stdin
});


rl.on("line", (linha) => {

 const palavra = linha.trim();


 // Inverta a palavra aqui


 rl.close();

});`,

entradaTeste: 'sintaxia',

respostaCorreta: 'aixatnis',

opcoes: [],

pontos: 25
},

{
titulo: 'Crie: Soma dos elementos',

descricao: 'Escreva um programa JavaScript que recebe vários números separados por espaço e imprime a soma de todos eles.\n\nExemplo:\nEntrada: "1 2 3 4 5"\nSaída: "15"',

tipo: 'criar',
linguagem: 'javascript',
dificuldade: 'intermediario',
nivel: 2,

codigoBase: `const readline = require("readline");

const rl = readline.createInterface({
 input: process.stdin
});


rl.on("line", (linha) => {

 const numeros = linha
   .trim()
   .split(" ")
   .map(Number);


 // Faça a soma dos números aqui


 rl.close();

});`,

entradaTeste: '1 2 3 4 5',

respostaCorreta: '15',

opcoes: [],

pontos: 25
},

// ==================== JAVASCRIPT - EXPERIENTE (10) ====================

{
titulo: 'Corrija: Closure com var',

descricao: 'O código deveria imprimir 0, 1 e 2, mas imprime 3, 3 e 3. Qual é o problema?',

tipo: 'correcao',
linguagem: 'javascript',
dificuldade: 'experiente',
nivel: 3,

codigoBase: `for (var i = 0; i < 3; i++) {

 setTimeout(() => {
   console.log(i)
 },100)

}`,

opcoes:[
'Trocar var por let para criar escopo de bloco',
'Remover o setTimeout',
'Trocar i++ por ++i',
'Colocar console.log fora do loop'
],

respostaCorreta:'Trocar var por let para criar escopo de bloco',

pontos:30
},

{
titulo:'Desenvolva: Criar Promise',

descricao:'Complete a Promise para retornar o valor "sucesso".',

tipo:'desenvolvimento',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const promessa = new Promise((resolve,reject)=>{

 ___("sucesso")

})


promessa.then(valor=>{
 console.log(valor)
})`,

opcoes:[
'resolve',
'reject',
'return',
'console.log'
],

respostaCorreta:'resolve',

pontos:30
},

{
titulo:'Corrija: Contexto do this',

descricao:'O this dentro do setTimeout não acessa o objeto corretamente. Como corrigir?',

tipo:'correcao',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const pessoa={

 nome:"Victor",

 falar:function(){

  setTimeout(function(){

   console.log(this.nome)

  },100)

 }

}`,

opcoes:[
'Usar arrow function no setTimeout',
'Trocar const por let',
'Remover o setTimeout',
'Criar uma variável global'
],

respostaCorreta:'Usar arrow function no setTimeout',

pontos:30
},

{
titulo:'Desenvolva: Destructuring',

descricao:'Complete o código para extrair nome e idade do objeto.',

tipo:'desenvolvimento',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const pessoa = {
 nome:"Victor",
 idade:26
}


const { ___ } = pessoa


console.log(nome,idade)`,

opcoes:[
'nome, idade',
'nome: n, idade: i',
'pessoa.nome,pessoa.idade',
'"nome","idade"'
],

respostaCorreta:'nome, idade',

pontos:30
},

{
titulo:'Corrija: Cópia de array',

descricao:'O código altera o array original. Como criar uma cópia independente?',

tipo:'correcao',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const original=[1,2,3]


const novo = original


novo.push(4)


console.log(original)`,

opcoes:[
'Usar [...original] para criar uma cópia',
'Trocar const por var',
'Remover o push',
'Usar JSON no lugar do array'
],

respostaCorreta:'Usar [...original] para criar uma cópia',

pontos:30
},

{
titulo:'Corrija: Comparação com NaN',

descricao:'O código não consegue verificar se o valor é NaN.',

tipo:'correcao',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const valor = NaN


if(valor === NaN){

 console.log("É NaN")

}`,

opcoes:[
'Usar Number.isNaN(valor)',
'Trocar === por ==',
'Transformar NaN em texto',
'Usar typeof valor'
],

respostaCorreta:'Usar Number.isNaN(valor)',

pontos:30
},

{
titulo:'Desenvolva: Nullish Operator',

descricao:'Complete usando o operador que retorna "Visitante" somente quando o valor for null ou undefined.',

tipo:'desenvolvimento',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const nome = null


const usuario = nome ___ "Visitante"


console.log(usuario)`,

opcoes:[
'??',
'||',
'&&',
'?.'
],

respostaCorreta:'??',

pontos:30
},

{
titulo:'Desenvolva: Spread Operator',

descricao:'Complete usando spread para juntar dois arrays.',

tipo:'desenvolvimento',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const a=[1,2,3]

const b=[4,5,6]


const resultado=[___]


console.log(resultado)`,

opcoes:[
'...a,...b',
'a+b',
'a,b',
'...'
],

respostaCorreta:'...a,...b',

pontos:30
},

{
titulo:'Crie: FizzBuzz',

descricao:'Crie um programa JavaScript que leia um número N e mostre de 1 até N.\n\nMúltiplos de 3 mostram Fizz.\nMúltiplos de 5 mostram Buzz.\nMúltiplos de 3 e 5 mostram FizzBuzz.',

tipo:'criar',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const readline = require("readline");


const rl = readline.createInterface({
 input:process.stdin
});


rl.on("line",(linha)=>{

 const n = Number(linha);


 // Faça o FizzBuzz aqui


 rl.close();

});`,

entradaTeste:'5',

respostaCorreta:'1\\n2\\nFizz\\n4\\nBuzz',

opcoes:[],

pontos:35
},

{
titulo:'Crie: Verificar Palíndromo',

descricao:'Crie um programa JavaScript que verifica se uma palavra é igual quando lida ao contrário.\n\nRetorne "sim" ou "nao".',

tipo:'criar',
linguagem:'javascript',
dificuldade:'experiente',
nivel:3,

codigoBase:`const readline = require("readline");


const rl = readline.createInterface({
 input:process.stdin
});


rl.on("line",(linha)=>{

 const palavra = linha.trim();


 // Verifique se é palíndromo


 rl.close();

});`,

entradaTeste:'arara',

respostaCorreta:'sim',

opcoes:[],

pontos:35
},
])

console.log('60 desafios inseridos com sucesso! (10 por nível)')
process.exit(0)