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
import morgan from 'morgan'

dotenv.config()

console.log('==============================')
console.log('NODE_ENV:', process.env.NODE_ENV)
console.log('FRONTEND_URL:', process.env.FRONTEND_URL)
console.log('PORT:', process.env.PORT)
console.log('==============================')

try {
  await connectDB();
} catch (err) {
  console.error('Erro ao conectar ao MongoDB:', err);
  process.exit(1);
}

const app = express()

// ===== SEGURANÇA =====
app.use(express.json({ limit: '10kb' }))
// Loga todas as requisições no desenvolvimento
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(helmet({crossOriginResourcePolicy: {policy: 'cross-origin',},}))

const allowedOrigins = [process.env.FRONTEND_URL,'http://localhost:5173'].filter(Boolean)

const corsOptions = {
    origin(origin, callback) {
        console.log('Origin recebida:', origin)
        console.log('Origins permitidas:', allowedOrigins)
        if (!origin)
            return callback(null, true)
        if (allowedOrigins.includes(origin)) {
            console.log('Origin permitida')
            return callback(null, true)
        }
        console.log('Origin bloqueada')
        return callback(null, false)
    },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))

app.use((req, res, next) => {
  console.log('==========================')
  console.log(req.method, req.originalUrl)
  console.log('Origin:', req.headers.origin)
  console.log('==========================')
  next()
})

// ===== SANITIZAÇÃO MANUAL contra NoSQL Injection =====
const sanitizarMongo = (obj) => {
  if (obj && typeof obj === 'object') {
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key]
      } else {
        sanitizarMongo(obj[key])
      }
    }
  }
  return obj
}

app.use((req, res, next) => {
    if (req.body) sanitizarMongo(req.body)
    if (req.params) sanitizarMongo(req.params)
    if (req.query) sanitizarMongo(req.query)
    next()
})

app.set('trust proxy', 1)

// ===== TIMEOUT — evita requisições travadas =====
app.use((req, res, next) => {
  res.setTimeout(15000, () => {
    if (!res.headersSent) {
      res.status(408).json({
        message: 'Requisição expirou. Tente novamente.'
      })
    }
  })
  next()
})

// Limite geral — protege contra DDoS
// 300 requisições por 15 minutos por IP
const limiteGeral = rateLimit({
  windowMs: 15 * 60 * 1000, max: 300,
  skip: (req) => req.method === 'OPTIONS',
  skipSuccessfulRequests: true,
  message: {message: 'Muitas requisições. Tente novamente em alguns minutos.'},
  standardHeaders: true, legacyHeaders: false,
})

// Bloqueia apenas tentativas ERRADAS de login
const limiteTentativasLogin = rateLimit({
  windowMs: 15 * 60 * 1000,max: 3,
  skipSuccessfulRequests: true,
  message: {message: 'Você errou 3 vezes. Aguarde 15 minutos para tentar novamente.'},
  standardHeaders: true,legacyHeaders: false,
  keyGenerator: (req) => {
    const ip = ipKeyGenerator(req)
    const email = req.body?.email?.toLowerCase().trim() || ''
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

app.use((req, res) => {
  res.status(404).json({
    message: 'Rota não encontrada'
  });
});

// ===== HANDLER DE ERROS GLOBAL =====
app.use((err, req, res, next) => {
  console.error('Erro:', err.message)
  const status = err.status || 500
  const message = process.env.NODE_ENV === 'production'
    ? 'Erro interno do servidor'
    : err.message
  res.status(status).json({ message })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
}).on('error', err => {console.error(err)})