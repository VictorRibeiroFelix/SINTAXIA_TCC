import { Router } from 'express'
import { getMeuCodigo, adicionarAmigo, getAmigos, removerAmigo } from '../controllers/amigos.controller.js'
import { autenticar } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/codigo', autenticar, getMeuCodigo)
router.get('/', autenticar, getAmigos)
router.post('/adicionar', autenticar, adicionarAmigo)
router.delete('/:amigoId', autenticar, removerAmigo)

export default router