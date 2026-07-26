import { Router } from 'express'
import { getPerfil, atualizarXP, excluirConta } from '../controllers/perfil.controller.js'
import { autenticar } from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', autenticar, getPerfil)
router.patch('/xp', autenticar, atualizarXP)
router.delete('/excluir', autenticar, excluirConta)

export default router