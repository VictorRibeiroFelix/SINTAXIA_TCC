import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function VerificarEmail() {
  const [codigos, setCodigos] = useState(['', '', '', '', '', ''])
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [reenviando, setReenviando] = useState(false)
  const [timer, setTimer] = useState(900) // 15 min
  const refs = useRef([])
  const navigate = useNavigate()
  const location = useLocation()
  const { login: loginCtx } = useAuth()

  const usuarioId = location.state?.usuarioId
  const email = location.state?.email

  useEffect(() => {
    if (!usuarioId) navigate('/cadastro')
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(t => t > 0 ? t - 1 : 0)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatarTimer = () => {
    const m = Math.floor(timer / 60).toString().padStart(2, '0')
    const s = (timer % 60).toString().padStart(2, '0')
    return `${m}:${s}`
  }

  const handleDigito = (index, valor) => {
    if (!/^\d*$/.test(valor)) return
    const novos = [...codigos]
    novos[index] = valor.slice(-1)
    setCodigos(novos)
    if (valor && index < 5) refs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !codigos[index] && index > 0) {
      refs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const texto = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (texto.length === 6) {
      setCodigos(texto.split(''))
      refs.current[5]?.focus()
    }
  }

  const verificar = async () => {
    const codigo = codigos.join('')
    if (codigo.length !== 6) {
      setErro('Digite os 6 dígitos do código')
      return
    }
    setCarregando(true)
    setErro('')
    try {
      const { data } = await api.post('/auth/verificar-email', { usuarioId, codigo })
      localStorage.setItem('token', data.token)
      localStorage.setItem('usuario', JSON.stringify(data.usuario))
      setSucesso('Email confirmado! Redirecionando...')
      setTimeout(() => navigate('/desafios'), 1500)
    } catch (error) {
      setErro(error.response?.data?.message || 'Código incorreto')
    } finally {
      setCarregando(false)
    }
  }

  const reenviar = async () => {
    setReenviando(true)
    setErro('')
    try {
      await api.post('/auth/reenviar-codigo', { usuarioId })
      setSucesso('Novo código enviado!')
      setTimer(900)
      setCodigos(['', '', '', '', '', ''])
      refs.current[0]?.focus()
      setTimeout(() => setSucesso(''), 3000)
    } catch {
      setErro('Erro ao reenviar. Tente novamente.')
    } finally {
      setReenviando(false)
    }
  }

  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'radial-gradient(ellipse at 60% 10%, #2d0b6b 0%, #0a0520 55%)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      overflow: 'hidden', position: 'relative', fontFamily: 'sans-serif'
    }}>

      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.07,
        backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      <div style={{
        background: 'rgba(20,10,60,0.7)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(139,92,246,0.3)',
        borderRadius: 20, padding: '40px 32px',
        width: '100%', maxWidth: 440,
        margin: '0 20px', position: 'relative', zIndex: 1,
        textAlign: 'center'
      }}>

        {/* Ícone */}
        <div style={{ fontSize: 48, marginBottom: 16 }}>📧</div>

        <h1 style={{
          fontSize: 22, fontWeight: 700, marginBottom: 8,
          background: 'linear-gradient(135deg,#f472b6,#a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>Confirme seu email</h1>

        <p style={{ color: '#94a3b8', fontSize: 13, marginBottom: 6, lineHeight: 1.6 }}>
          Enviamos um código de 6 dígitos para
        </p>
        <p style={{ color: '#c4b5fd', fontSize: 14, fontWeight: 600, marginBottom: 28 }}>
          {email}
        </p>

        {/* Inputs dos dígitos */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 24 }}>
          {codigos.map((d, i) => (
            <input
              key={i}
              ref={el => refs.current[i] = el}
              value={d}
              onChange={e => handleDigito(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              onPaste={handlePaste}
              maxLength={1}
              style={{
                width: 48, height: 56,
                textAlign: 'center', fontSize: 22, fontWeight: 700,
                background: d ? 'rgba(124,58,237,0.2)' : 'rgba(255,255,255,0.05)',
                border: `2px solid ${d ? '#7c3aed' : 'rgba(139,92,246,0.3)'}`,
                borderRadius: 12, color: '#fff', outline: 'none',
                transition: 'all 0.15s'
              }}
            />
          ))}
        </div>

        {/* Timer */}
        <p style={{ color: timer > 0 ? '#64748b' : '#f87171', fontSize: 12, marginBottom: 16 }}>
          {timer > 0
            ? `Código expira em ${formatarTimer()}`
            : 'Código expirado — reenvie um novo'}
        </p>

        {erro && (
          <div style={{
            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 10, padding: '10px 16px', marginBottom: 16,
            color: '#f87171', fontSize: 13
          }}>{erro}</div>
        )}

        {sucesso && (
          <div style={{
            background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 10, padding: '10px 16px', marginBottom: 16,
            color: '#4ade80', fontSize: 13
          }}>{sucesso}</div>
        )}

        {/* Botão confirmar */}
        <button onClick={verificar} disabled={carregando} style={{
          width: '100%', background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          border: 'none', borderRadius: 12, padding: '14px',
          color: '#fff', fontWeight: 700, fontSize: 15,
          cursor: carregando ? 'not-allowed' : 'pointer',
          opacity: carregando ? 0.7 : 1, marginBottom: 14
        }}>
          {carregando ? 'Verificando...' : 'Confirmar código'}
        </button>

        {/* Reenviar */}
        <button onClick={reenviar} disabled={reenviando} style={{
          background: 'none', border: 'none',
          color: '#7c3aed', fontSize: 13, cursor: 'pointer',
          textDecoration: 'underline'
        }}>
          {reenviando ? 'Reenviando...' : 'Não recebi o código — reenviar'}
        </button>
      </div>
    </div>
  )
}