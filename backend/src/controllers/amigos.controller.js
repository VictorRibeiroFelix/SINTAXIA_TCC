import Usuario from '../models/Usuario.js'

const gerarCodigoAmigo = () => {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
  const nums = '23456789'
  const parte1 = Array.from({ length: 4 }, () => letras[Math.floor(Math.random() * letras.length)]).join('')
  const parte2 = Array.from({ length: 4 }, () => nums[Math.floor(Math.random() * nums.length)]).join('')
  return `${parte1}-${parte2}`
}

export const getMeuCodigo = async (req, res) => {
  try {
    let usuario = await Usuario.findById(req.usuarioId)
    if (!usuario.codigoAmigo) {
      let codigo, existe
      do {
        codigo = gerarCodigoAmigo()
        existe = await Usuario.findOne({ codigoAmigo: codigo })
      } while (existe)
      usuario.codigoAmigo = codigo
      await usuario.save()
    }
    res.json({ codigoAmigo: usuario.codigoAmigo })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar código', error: error.message })
  }
}

export const adicionarAmigo = async (req, res) => {
  try {
    const { codigo } = req.body
    const usuario = await Usuario.findById(req.usuarioId)
    const amigo = await Usuario.findOne({ codigoAmigo: codigo.trim().toUpperCase() })

    if (!amigo) return res.status(404).json({ message: 'Código inválido. Usuário não encontrado.' })
    if (amigo._id.equals(usuario._id)) return res.status(400).json({ message: 'Você não pode se adicionar!' })
    if (usuario.amigos.includes(amigo._id)) return res.status(400).json({ message: 'Esse usuário já é seu amigo!' })

    usuario.amigos.push(amigo._id)
    amigo.amigos.push(usuario._id)
    await usuario.save()
    await amigo.save()

    res.json({
      message: `${amigo.nome} adicionado com sucesso!`,
      amigo: {
        id: amigo._id,
        nome: amigo.nome,
        pontuacaoTotal: amigo.pontuacaoTotal,
        nivel: amigo.nivel,
      }
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar amigo', error: error.message })
  }
}

export const getAmigos = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).populate('amigos', 'nome pontuacaoTotal nivel codigoAmigo')
    const ranking = [
      {
        id: usuario._id,
        nome: usuario.nome + ' (você)',
        pontuacaoTotal: usuario.pontuacaoTotal,
        nivel: usuario.nivel,
        voce: true,
      },
      ...usuario.amigos.map(a => ({
        id: a._id,
        nome: a.nome,
        pontuacaoTotal: a.pontuacaoTotal,
        nivel: a.nivel,
        voce: false,
      }))
    ].sort((a, b) => b.pontuacaoTotal - a.pontuacaoTotal)

    res.json({ ranking, codigoAmigo: usuario.codigoAmigo })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar amigos', error: error.message })
  }
}

export const removerAmigo = async (req, res) => {
  try {
    const { amigoId } = req.params
    const usuario = await Usuario.findById(req.usuarioId)
    const amigo = await Usuario.findById(amigoId)

    usuario.amigos = usuario.amigos.filter(id => !id.equals(amigoId))
    amigo.amigos = amigo.amigos.filter(id => !id.equals(req.usuarioId))
    await usuario.save()
    await amigo.save()

    res.json({ message: 'Amigo removido.' })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover amigo', error: error.message })
  }
}