import { useState, useEffect } from 'react'
import { AuthContext } from './AuthContext'
import api from '../services/api'

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
    localStorage.setItem('token', data.token)
    localStorage.setItem('usuario', JSON.stringify(data.usuario))
    setUsuario(data.usuario)
    return data
  }

  const register = async (nome, email, senha) => {
  const { data } = await api.post('/auth/register', { nome, email, senha })
  return data // retorna usuarioId e email
}

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('usuario')
    setUsuario(null)
  }

  return (
    <AuthContext.Provider value={{ usuario, login, register, logout, carregando }}>
      {children}
    </AuthContext.Provider>
  )
}