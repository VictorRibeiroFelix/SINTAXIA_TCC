import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true
  },
  nivel: {
    type: Number,
    default: 1
  },
  pontuacaoTotal: {
    type: Number,
    default: 0
  }
}, { timestamps: true })

export default mongoose.model('Usuario', usuarioSchema)