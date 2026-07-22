import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'
import { enviarEmailVerificacao } from '../config/email.js'

const gerarCodigo = () => String(Math.floor(100000 + Math.random() * 900000))

export const register = async (req, res) => {
  try {
    const { nome, email, senha } = req.body

    const usuarioExiste = await Usuario.findOne({ email })
    if (usuarioExiste) {
      return res.status(400).json({ message: 'Email já cadastrado' })
    }

    const senhaCriptografada = await bcrypt.hash(senha, 10)
    const codigo = gerarCodigo()
    const expiracao = new Date(Date.now() + 15 * 60 * 1000)

    const usuario = await Usuario.create({
      nome,
      email,
      senha: senhaCriptografada,
      emailVerificado: false,
      codigoVerificacao: codigo,
      codigoExpiracao: expiracao,
    })

    // Responde IMEDIATAMENTE — não espera o email
    res.status(201).json({
      message: 'Cadastro realizado! Verifique seu email.',
      usuarioId: usuario._id,
      email: usuario.email,
    })

    // Envia email em background com log
    console.log(`Tentando enviar email para: ${email} com código: ${codigo}`)
    enviarEmailVerificacao(email, nome, codigo)
      .then(() => console.log(`Email enviado com sucesso para: ${email}`))
      .catch(err => console.error(`ERRO ao enviar email para ${email}:`, err.message))

  } catch (error) {
    console.error('Erro no register:', error.message)
    res.status(500).json({ message: 'Erro no servidor', error: error.message })
  }
}

export const verificarEmail = async (req, res) => {
  try {
    const { usuarioId, codigo } = req.body

    const usuario = await Usuario.findById(usuarioId)
    if (!usuario) {
      return res.status(404).json({ message: 'Usuário não encontrado' })
    }

    if (usuario.emailVerificado) {
      return res.status(400).json({ message: 'Email já verificado' })
    }

    if (new Date() > usuario.codigoExpiracao) {
      return res.status(400).json({ message: 'Código expirado. Faça o cadastro novamente.' })
    }

    if (usuario.codigoVerificacao !== codigo) {
      return res.status(400).json({ message: 'Código incorreto' })
    }

    usuario.emailVerificado = true
    usuario.codigoVerificacao = null
    usuario.codigoExpiracao = null
    await usuario.save()

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
      message: 'Email confirmado com sucesso!',
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel,
        pontuacaoTotal: usuario.pontuacaoTotal,
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message })
  }
}

export const reenviarCodigo = async (req, res) => {
  try {
    const { usuarioId } = req.body
    const usuario = await Usuario.findById(usuarioId)
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' })

    const codigo = gerarCodigo()
    usuario.codigoVerificacao = codigo
    usuario.codigoExpiracao = new Date(Date.now() + 15 * 60 * 1000)
    await usuario.save()

    console.log(`Reenviando código ${codigo} para ${usuario.email}`)
    await enviarEmailVerificacao(usuario.email, usuario.nome, codigo)
    console.log(`Email reenviado com sucesso para ${usuario.email}`)

    res.json({ message: 'Código reenviado!' })
  } catch (error) {
    console.error('Erro ao reenviar código:', error.message)
    res.status(500).json({ message: 'Erro ao reenviar código', error: error.message })
  }
}

export const login = async (req, res) => {
  try {
    const { email, senha } = req.body

    const usuario = await Usuario.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ message: 'Email ou senha incorretos' })
    }

    if (!usuario.emailVerificado) {
      return res.status(403).json({
        message: 'Email não verificado',
        naoVerificado: true,
        usuarioId: usuario._id,
        email: usuario.email,
      })
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha)
    if (!senhaCorreta) {
      return res.status(400).json({ message: 'Email ou senha incorretos' })
    }

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '7d' })

    res.json({
      token,
      usuario: {
        id: usuario._id,
        nome: usuario.nome,
        email: usuario.email,
        nivel: usuario.nivel,
        pontuacaoTotal: usuario.pontuacaoTotal,
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message })
  }
}