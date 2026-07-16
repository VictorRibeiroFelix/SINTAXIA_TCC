import { Router } from 'express'
import { body, validationResult } from 'express-validator'
import { register, login, verificarEmail, reenviarCodigo } from '../controllers/auth.controller.js'

const router = Router()

// Middleware que verifica os erros de validação
const validar = (req, res, next) => {
  const erros = validationResult(req)
  if (!erros.isEmpty()) {
    return res.status(400).json({ message: erros.array()[0].msg })
  }
  next()
}

// Validações de cadastro
const validarCadastro = [
  body('nome')
    .trim()
    .notEmpty().withMessage('Nome é obrigatório')
    .isLength({ min: 2, max: 50 }).withMessage('Nome deve ter entre 2 e 50 caracteres'),
  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(),
  body('senha')
    .notEmpty().withMessage('Senha é obrigatória')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres')
    .matches(/\d/).withMessage('Senha deve conter pelo menos um número'),
]

// Validações de login
const validarLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email é obrigatório')
    .isEmail().withMessage('Email inválido')
    .normalizeEmail(), body('senha')
    .notEmpty().withMessage('Senha é obrigatória'),
]

router.post('/register', validarCadastro, validar, register)
router.post('/login', validarLogin, validar, login)
router.post('/verificar-email', verificarEmail)
router.post('/reenviar-codigo', reenviarCodigo)

export default router