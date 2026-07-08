import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setCarregando(true)
    try {
      await register(nome, email, senha)
      navigate('/desafios')
    } catch (error) {
      setErro('Erro ao cadastrar. Tente novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: 'radial-gradient(ellipse at 60% 10%, #2d0b6b 0%, #0a0520 55%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>

      {/* Grade de fundo */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.07,
        backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      <div style={{
        background: 'rgba(20,10,60,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: 20,
        padding: '36px 32px',
        width: '100%',
        maxWidth: 420,
        margin: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        <h1 style={{
          fontSize: 28, fontWeight: 700, textAlign: 'center', marginBottom: 24,
          background: 'linear-gradient(135deg,#f472b6,#a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>Cadastrar</h1>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ color: '#c4b5fd', fontSize: 13, display: 'block', marginBottom: 6 }}>Nome Usuário</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Seu nome"
              required
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: 12, padding: '12px 16px',
                color: '#fff', fontSize: 14, outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#c4b5fd', fontSize: 13, display: 'block', marginBottom: 6 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@gmail.com"
              required
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: 12, padding: '12px 16px',
                color: '#fff', fontSize: 14, outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ color: '#c4b5fd', fontSize: 13, display: 'block', marginBottom: 6 }}>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Sua senha"
              required
              style={{
                width: '100%', background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: 12, padding: '12px 16px',
                color: '#fff', fontSize: 14, outline: 'none',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {erro && <p style={{ color: '#f87171', fontSize: 13, textAlign: 'center' }}>{erro}</p>}

          <button type="submit" disabled={carregando} style={{
            width: '100%', background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
            border: 'none', borderRadius: 12, padding: '14px',
            color: '#fff', fontWeight: 700, fontSize: 15,
            cursor: carregando ? 'not-allowed' : 'pointer',
            opacity: carregando ? 0.6 : 1, marginTop: 4
          }}>
            {carregando ? 'Cadastrando...' : 'Cadastrar'}
          </button>

          <p style={{ textAlign: 'center', fontSize: 13 }}>
            <Link to="/login" style={{ color: '#22d3ee' }}>Já possui conta? Fazer Login</Link>
          </p>
        </form>
      </div>
    </div>
  )
}