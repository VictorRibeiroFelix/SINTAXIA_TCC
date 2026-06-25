import { Router } from 'express'
import { getDesafios, getDesafioById, responderDesafio } from '../controllers/desafio.controller.js'
import { autenticar } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', autenticar, getDesafios)
router.get('/:id', autenticar, getDesafioById)
router.post('/:id/responder', autenticar, responderDesafio)

export default router