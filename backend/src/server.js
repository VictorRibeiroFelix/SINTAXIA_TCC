import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import rateLimit, { ipKeyGenerator } from 'express-rate-limit'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import desafioRoutes from './routes/desafio.routes.js'
import perfilRoutes from './routes/perfil.routes.js'
import amigosRoutes from './routes/amigos.routes.js'
import mongoSanitize from 'express-mongo-sanitize'
import xss from 'xss-clean'
import morgan from 'morgan'

dotenv.config()

connectDB();

const app = express()

app.use(mongoSanitize()) // bloqueia { $gt: '' } no body/params
app.use(xss()) // limpa HTML/scripts maliciosos dos inputs

// ===== SEGURANÇA =====
app.use(helmet())
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json({ limit: '10kb' }))

// Loga todas as requisições no desenvolvimento
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}


// Limite geral — protege contra DDoS
// 300 requisições por 15 minutos por IP
const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  skipSuccessfulRequests: false,
  message: {
    message: 'Muitas requisições. Tente novamente em alguns minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// Bloqueia apenas tentativas ERRADAS de login
const limiteTentativasLogin = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  skipSuccessfulRequests: true,
  message: {
    message: 'Você errou 3 vezes. Aguarde 15 minutos para tentar novamente.'
  },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: (req) => {
    const ip = ipKeyGenerator(req)
    const email = req.body?.email || ''
    return `${ip}_${email}`
  },
})

// Aplica o limite geral em todas as rotas
app.use(limiteGeral)

// ===== ROTAS =====
app.use('/api/auth/login', limiteTentativasLogin) // só login tem limite
app.use('/api/auth', authRoutes)
app.use('/api/desafios', desafioRoutes)
app.use('/api/perfil', perfilRoutes)
app.use('/api/amigos', amigosRoutes)

app.get('/', (req, res) => {
  res.json({ message: 'API Sintaxia rodando!' })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Erro interno do servidor' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})