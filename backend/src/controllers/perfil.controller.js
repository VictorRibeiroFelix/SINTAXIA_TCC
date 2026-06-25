import Usuario from '../models/Usuario.js'

export const getPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuarioId).select('-senha')
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' })
    res.status(200).json(usuario)
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar perfil', error: error.message })
  }
}

export const atualizarXP = async (req, res) => {
  try {
    const { pontos } = req.body
    const usuario = await Usuario.findById(req.usuarioId)
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' })

    usuario.pontuacaoTotal += pontos

    if (usuario.pontuacaoTotal >= 200) usuario.nivel = 3
    else if (usuario.pontuacaoTotal >= 80) usuario.nivel = 2
    else usuario.nivel = 1

    await usuario.save()
    res.status(200).json({
      pontuacaoTotal: usuario.pontuacaoTotal,
      nivel: usuario.nivel
    })
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar XP', error: error.message })
  }
}