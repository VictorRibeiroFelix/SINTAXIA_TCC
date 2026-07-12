import { Router } from 'express'
import { register, login, verificarEmail, reenviarCodigo } from '../controllers/auth.controller.js'

const router = Router()

router.post('/register', register)
router.post('/login', login)
router.post('/verificar-email', verificarEmail)
router.post('/reenviar-codigo', reenviarCodigo)

export default router