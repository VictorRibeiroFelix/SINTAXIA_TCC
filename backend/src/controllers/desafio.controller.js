import Desafio from '../models/Desafio.js'

export const getDesafios = async (req, res) => {
  try {
    const { linguagem, dificuldade } = req.query
    const filtro = {}
    if (linguagem) filtro.linguagem = linguagem
    if (dificuldade) filtro.dificuldade = dificuldade
    const desafios = await Desafio.find(filtro).sort({ nivel: 1 }).lean()
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json(desafios)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar desafios', error: error.message })
  }
}

export const getDesafioById = async (req, res) => {
  try {
    const desafio = await Desafio.findById(req.params.id).lean()
    if (!desafio) return res.status(404).json({ message: 'Desafio não encontrado' })
    return res.status(200).json(desafio)
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao buscar desafio', error: error.message })
  }
}

export const responderDesafio = async (req, res) => {
  try {
    const { resposta } = req.body
    const desafio = await Desafio.findById(req.params.id).lean()
    if (!desafio) return res.status(404).json({ message: 'Desafio não encontrado' })
    const correto = resposta.trim().toLowerCase() === desafio.respostaCorreta.trim().toLowerCase()
    return res.status(200).json({
      correto,
      respostaCorreta: desafio.respostaCorreta,
      pontos: correto ? desafio.pontos : 0
    })
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao responder desafio', error: error.message })
  }
}