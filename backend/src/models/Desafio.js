import mongoose from 'mongoose'

const desafioSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  tipo: {
    type: String,
    enum: ['pergunta', 'correcao', 'desenvolvimento'],
    required: true
  },
  linguagem: {
    type: String,
    enum: ['algoritmos', 'javascript'],
    required: true
  },
  dificuldade: {
    type: String,
    enum: ['iniciante', 'intermediario', 'experiente'],
    required: true
  },
  nivel: Number,
  opcoes: [String],
  respostaCorreta: String,
  codigoBase: String,
  pontos: Number
}, {
  collection: 'desafios',
  timestamps: true
})

export default mongoose.model('Desafio', desafioSchema)