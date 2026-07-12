import mongoose from 'mongoose'

const usuarioSchema = new mongoose.Schema({
  nome: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  senha: { type: String, required: true },
  nivel: { type: Number, default: 1 },
  pontuacaoTotal: { type: Number, default: 0 },
  emailVerificado: { type: Boolean, default: false },
  codigoVerificacao: { type: String, default: null },
  codigoExpiracao: { type: Date, default: null },
  codigoAmigo: { type: String, unique: true, sparse: true },
  amigos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
}, { timestamps: true })

export default mongoose.model('Usuario', usuarioSchema)