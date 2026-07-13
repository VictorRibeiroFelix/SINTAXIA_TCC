import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import desafioRoutes from './routes/desafio.routes.js'
import perfilRoutes from './routes/perfil.routes.js'
import amigosRoutes from './routes/amigos.routes.js'

dotenv.config()

connectDB();

const app = express()

// ===== SEGURANÇA =====

// Helmet — adiciona headers de segurança HTTP
app.use(helmet())

// CORS — só permite o frontend acessar
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))

// Limite geral — 100 requisições por 15 minutos por IP
const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Muitas requisições. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
})

// Limite de autenticação — 10 tentativas por 15 minutos
const limiteAuth = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: { message: 'Muitas tentativas de login. Tente novamente em 15 minutos.' },
  standardHeaders: true,
  legacyHeaders: false,
})

app.use(limiteGeral)
app.use(express.json({ limit: '10kb' })) // Limita tamanho do body

// ===== ROTAS =====
app.use('/api/auth', limiteAuth, authRoutes)
app.use('/api/desafios', desafioRoutes)
app.use('/api/perfil', perfilRoutes)
app.use('/api/amigos', amigosRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Sintaxia rodando!' })
})

// ===== HANDLER DE ERROS =====
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Erro interno do servidor' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})