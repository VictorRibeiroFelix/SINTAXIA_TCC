import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)
console.log('MongoDB conectado!')

const db = mongoose.connection.db
await db.collection('desafios').deleteMany({})
console.log('Desafios antigos removidos!')

await db.collection('desafios').insertMany([
  {
    titulo: 'Escrever na tela',
    descricao: 'Qual palavra é usada para mostrar uma mensagem na tela em um algoritmo?',
    tipo: 'pergunta',
    linguagem: 'algoritmos',
    nivel: 1,
    opcoes: ['Leia', 'Escreva', 'Se', 'Enquanto'],
    respostaCorreta: 'Escreva',
    pontos: 10
  },
  {
    titulo: 'Ler dados do usuário',
    descricao: 'Qual comando é usado para receber dados digitados pelo usuário?',
    tipo: 'pergunta',
    linguagem: 'algoritmos',
    nivel: 1,
    opcoes: ['Escreva', 'Repita', 'Leia', 'Início'],
    respostaCorreta: 'Leia',
    pontos: 10
  },
  {
    titulo: 'Estrutura condicional',
    descricao: 'Qual estrutura usamos para tomar uma decisão em um algoritmo?',
    tipo: 'pergunta',
    linguagem: 'algoritmos',
    nivel: 2,
    opcoes: ['Enquanto', 'Para', 'Se', 'Leia'],
    respostaCorreta: 'Se',
    pontos: 20
  },
  {
    titulo: 'Laço de repetição',
    descricao: 'Qual estrutura usamos para repetir um bloco de código várias vezes?',
    tipo: 'pergunta',
    linguagem: 'algoritmos',
    nivel: 2,
    opcoes: ['Se', 'Escreva', 'Enquanto', 'Leia'],
    respostaCorreta: 'Enquanto',
    pontos: 20
  },
  {
    titulo: 'Console no JavaScript',
    descricao: 'Qual comando usamos para exibir uma mensagem no console em JavaScript?',
    tipo: 'pergunta',
    linguagem: 'javascript',
    nivel: 1,
    opcoes: ['print()', 'console.log()', 'echo()', 'write()'],
    respostaCorreta: 'console.log()',
    pontos: 10
  },
  {
    titulo: 'Declarar variável',
    descricao: 'Qual palavra-chave usamos para declarar uma variável em JavaScript moderno?',
    tipo: 'pergunta',
    linguagem: 'javascript',
    nivel: 1,
    opcoes: ['var', 'let', 'int', 'string'],
    respostaCorreta: 'let',
    pontos: 10
  },
  {
    titulo: 'Função em JavaScript',
    descricao: 'Qual palavra-chave usamos para criar uma função em JavaScript?',
    tipo: 'pergunta',
    linguagem: 'javascript',
    nivel: 2,
    opcoes: ['def', 'func', 'function', 'method'],
    respostaCorreta: 'function',
    pontos: 20
  },
  {
    titulo: 'Tipo de dado',
    descricao: 'Qual função usamos para descobrir o tipo de uma variável em JavaScript?',
    tipo: 'pergunta',
    linguagem: 'javascript',
    nivel: 2,
    opcoes: ['typeOf()', 'typeof', 'getType()', 'type()'],
    respostaCorreta: 'typeof',
    pontos: 20
  }
])

console.log('Desafios inseridos com sucesso!')
process.exit(0)