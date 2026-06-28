import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

const db = mongoose.connection.db
const todos = await db.collection('desafios').find({}).toArray()
console.log('Total:', todos.length)

const grupos = {}
todos.forEach(d => {
  const chave = `${d.linguagem} - ${d.dificuldade}`
  grupos[chave] = (grupos[chave] || 0) + 1
})

Object.entries(grupos).forEach(([chave, total]) => {
  console.log(`${chave}: ${total} desafios`)
})

process.exit(0)