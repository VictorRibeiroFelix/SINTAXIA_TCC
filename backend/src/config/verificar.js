import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Desafio from '../models/Desafio.js'

dotenv.config()

await mongoose.connect(process.env.MONGO_URI)

const todos = await Desafio.find({})
console.log('Total:', todos.length)
todos.forEach(d => console.log(`${d.titulo} | ${d.linguagem}`))

process.exit(0)