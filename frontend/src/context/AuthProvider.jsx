import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import api from '../services/api'

const CHAVES_PROGRESSO = [
  'concluidos_algoritmos_iniciante',
  'concluidos_algoritmos_intermediario',
  'concluidos_algoritmos_experiente',
  'concluidos_javascript_iniciante',
  'concluidos_javascript_intermediario',
  'concluidos_javascript_experiente',
  'introducao_algoritmos',
  'introducao_javascript',
  'acertos_sem_erro',
]

const limparProgresso = () => {
  CHAVES_PROGRESSO.forEach(chave => localStorage.removeItem(chave))
}

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const usuarioSalvo = localStorage.getItem('usuario')
    if (token && usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo))
    }
    setCarregando(false)
  }, [])

  const login = async (email, senha) => {
    const { data } = await api.post('/auth/login', { email, senha })

    // Verifica se é um usuário diferente do atual
    const usuarioAnterior = localStorage.getItem('usuario')
    if (usuarioAnterior) {
      const anterior = JSON.parse(usuarioAnterior)
      if (anterior.id !== data.usuario.id) {
        limparProgresso()
      }
    } else {
      limparProgresso()
    }

    localStorage.setItem('token', data.token)
    localStorage.setItem('usuario', JSON.stringify(data.usuario))
    setUsuario(data.usuario)
    return data
  }

  const register = async (nome, email, senha) => {
    const { data } = await api.post('/auth/register', { nome, email, senha })
    return data
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    limparProgresso()
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, register, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  )
}