import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import desafioRoutes from './routes/desafio.routes.js'
import perfilRoutes from './routes/perfil.routes.js'

dotenv.config()

const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.use(express.json())

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/desafios', desafioRoutes)
app.use('/api/perfil', perfilRoutes)


app.get('/', (req, res) => {
  res.json({ message: 'API Sintaxia rodando!' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})