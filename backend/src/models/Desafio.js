import mongoose from 'mongoose'

const desafioSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  tipo: String,
  linguagem: String,
  nivel: Number,
  opcoes: [String],
  respostaCorreta: String,
  pontos: Number
}, { 
  collection: 'desafios',
  timestamps: true 
})

export default mongoose.model('Desafio', desafioSchema)