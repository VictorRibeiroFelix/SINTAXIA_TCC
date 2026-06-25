import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    const usuarioExiste = await Usuario.findOne({ email })
    if (usuarioExiste) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada
    })

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.status(201).json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel,
        pontuacaoTotal: usuario.pontuacaoTotal
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ message: 'Email ou senha incorretos' })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
      return res.status(400).json({ message: 'Email ou senha incorretos' })
    }

    const token = jwt.sign(
      { id: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel,
        pontuacaoTotal: usuario.pontuacaoTotal
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message })
  }
}