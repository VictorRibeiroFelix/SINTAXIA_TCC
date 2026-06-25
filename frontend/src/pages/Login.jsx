import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await login(email, senha)
      navigate('/desafios')
    } catch (error) {
      setErro('Email ou senha incorretos')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0520] flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md border border-purple-500/30 rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-purple-300 text-sm mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="nome@exemplo.com"
              className="w-full bg-white/5 border border-purple-500/40 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          <div>
            <label className="text-purple-300 text-sm mb-1 block">Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              className="w-full bg-white/5 border border-purple-500/40 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-cyan-400"
              required
            />
          </div>

          {erro && <p className="text-red-400 text-sm text-center">{erro}</p>}

          <button
            type="submit"
            disabled={carregando}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl mt-2 transition-all disabled:opacity-50"
          >
            {carregando ? 'Entrando...' : 'Entrar'}
          </button>

          <p className="text-center text-cyan-400 text-sm">
            <Link to="/cadastro">Não tem conta? Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  )
}