import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const posicoes = [
  { x: '10%',  y: 30  },
  { x: '45%',  y: 30  },
  { x: '65%',  y: 130 },
  { x: '45%',  y: 230 },
  { x: '10%',  y: 230 },
  { x: '5%',   y: 340 },
  { x: '30%',  y: 440 },
  { x: '60%',  y: 440 },
]

export default function Desafios() {
  const { usuario, logout } = useAuth()
const navigate = useNavigate()

const [desafios, setDesafios] = useState([])
const [linguagem, setLinguagem] = useState('algoritmos')
const [desafioAtual, setDesafioAtual] = useState(null)
const [respostaSelecionada, setRespostaSelecionada] = useState(null)
const [resultado, setResultado] = useState(null)
const [carregando, setCarregando] = useState(true)
const [concluidos, setConcluidos] = useState([])
const [xpAtual, setXpAtual] = useState(usuario?.pontuacaoTotal || 0)

const buscarDesafios = async () => {
  try {
    setCarregando(true)
    const { data } = await api.get(`/desafios?linguagem=${linguagem}`)
    setDesafios(data)
    const salvo = JSON.parse(localStorage.getItem(`concluidos_${linguagem}`) || '[]')
    setConcluidos(salvo)
  } catch (error) {
    console.error('Erro:', error)
  } finally {
    setCarregando(false)
  }
}

useEffect(() => {
  buscarDesafios()
}, [linguagem])

useEffect(() => {
  const u = JSON.parse(localStorage.getItem('usuario') || '{}')
  setXpAtual(u.pontuacaoTotal || 0)
}, [linguagem])

  const abrirDesafio = (desafio, index) => {
    if (index > 0 && !concluidos.includes(desafios[index - 1]._id)) return
    setDesafioAtual(desafio)
    setRespostaSelecionada(null)
    setResultado(null)
  }

const responder = async (opcao) => {
  if (resultado) return
  setRespostaSelecionada(opcao)
  try {
    const { data } = await api.post(`/desafios/${desafioAtual._id}/responder`, { resposta: opcao })
    setResultado(data)

    if (data.correto && !concluidos.includes(desafioAtual._id)) {
      const novosConcluidos = [...concluidos, desafioAtual._id]
      setConcluidos(novosConcluidos)
      localStorage.setItem(`concluidos_${linguagem}`, JSON.stringify(novosConcluidos))

      const { data: perfilAtualizado } = await api.patch('/perfil/xp', { pontos: data.pontos })

      const usuarioAtualizado = {
        ...JSON.parse(localStorage.getItem('usuario') || '{}'),
        pontuacaoTotal: perfilAtualizado.pontuacaoTotal,
        nivel: perfilAtualizado.nivel
      }
      localStorage.setItem('usuario', JSON.stringify(usuarioAtualizado))
      setXpAtual(perfilAtualizado.pontuacaoTotal)
    }
  } catch (error) {
    console.error('Erro ao responder:', error)
  }
}

  const fecharDesafio = () => {
    setDesafioAtual(null)
    setRespostaSelecionada(null)
    setResultado(null)
  }

  const getStatus = (desafio, index) => {
    if (concluidos.includes(desafio._id)) return 'concluido'
    if (index === 0 || concluidos.includes(desafios[index - 1]?._id)) return 'disponivel'
    return 'bloqueado'
  }

  const cores = {
    concluido:  { bg: 'rgba(34,211,238,0.15)',  border: '#22d3ee', shadow: '0 0 24px rgba(34,211,238,0.5)',  color: '#22d3ee' },
    disponivel: { bg: 'rgba(250,196,75,0.15)',   border: '#fac44b', shadow: '0 0 24px rgba(250,196,75,0.5)',  color: '#fac44b' },
    bloqueado:  { bg: 'rgba(20,10,60,0.7)',      border: 'rgba(100,80,180,0.2)', shadow: 'none',              color: '#4c3a8a' },
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 60% 10%, #2d0b6b 0%, #0a0520 55%)',
      color: 'white',
      fontFamily: 'sans-serif',
      overflowX: 'hidden'
    }}>

      {/* Grade de fundo */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.07,
        backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      {/* TOPBAR */}
      <div style={{
        position: 'fixed', top: 0, left: 130, right: 130, zIndex: 100,
        background: 'rgba(10,5,32,0.97)',
        borderBottom: '1px solid rgba(139,92,246,0.25)',
        height: 56,
        display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 12
      }}>
        <span style={{
          fontSize: 22, fontWeight: 900, marginRight: 'auto',
          background: 'linear-gradient(135deg,#f472b6,#a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          letterSpacing: 1
        }}>Sintaxia</span>

        <button onClick={() => navigate('/perfil')} style={{
          background: 'rgba(139,92,246,0.2)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: 10, padding: '6px 16px',
          color: '#c4b5fd', fontSize: 13, cursor: 'pointer'
        }}>👤 Perfil</button>

        <span style={{
  background: 'rgba(180,120,30,0.25)',
  border: '1px solid rgba(210,160,50,0.5)',
  borderRadius: 20, padding: '4px 14px',
  color: '#fcd34d', fontSize: 13, fontWeight: 700
}}>⚡ {xpAtual} XP</span>

        <span style={{ color: '#22d3ee', fontSize: 13 }}>
  🏅 {concluidos.length}/{desafios.length}
</span>

        <button onClick={() => { logout(); navigate('/login') }} style={{
          background: 'none', border: 'none',
          color: '#f87171', fontSize: 13, cursor: 'pointer'
        }}>Sair</button>
      </div>

      {/* SELETOR LINGUAGEM */}
      <div style={{
        position: 'fixed', top: 56, left: 130, right: 130, zIndex: 90,
        background: 'rgba(10,5,32,0.9)',
        borderBottom: '1px solid rgba(139,92,246,0.1)',
        height: 52,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12
      }}>
        {[
          { key: 'algoritmos', label: 'Algoritmos', cor: '#7c3aed', sombra: 'rgba(124,58,237,0.5)' },
          { key: 'javascript', label: 'JavaScript', cor: '#eab308', sombra: 'rgba(234,179,8,0.4)', corTexto: '#000' },
        ].map(({ key, label, cor, sombra, corTexto }) => {
          const ativo = linguagem === key
          return (
            <button key={key} onClick={() => setLinguagem(key)} style={{
              padding: '8px 28px', borderRadius: 12,
              fontWeight: 700, fontSize: 14, border: 'none', cursor: 'pointer',
              background: ativo ? cor : 'rgba(255,255,255,0.08)',
              color: ativo ? (corTexto || '#fff') : key === 'javascript' ? '#fcd34d' : '#c4b5fd',
              boxShadow: ativo ? `0 0 20px ${sombra}` : 'none',
              transition: 'all 0.2s'
            }}>{label}</button>
          )
        })}
      </div>

      {/* MAPA */}
      <div style={{
        paddingTop: 128, paddingBottom: 80,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', minHeight: '100vh'
      }}>
        {carregando ? (
          <div style={{ marginTop: 140, color: '#a78bfa', fontSize: 18 }}>
            Carregando mapa...
          </div>
        ) : (
          <>
            <p style={{ color: 'rgba(167,139,250,0.5)', fontSize: 12, marginBottom: 16 }}>
              Introdução de {linguagem === 'algoritmos' ? 'Algoritmos' : 'JavaScript'} — {Math.round((concluidos.length / desafios.length) * 100)}% completo
            </p>

            <div style={{ position: 'relative', width: '100%', maxWidth: '100vw', height: 560, padding: '0 40px' }}>

              {/* SVG linhas */}
              <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
  {desafios.map((desafio, index) => {
    if (index >= desafios.length - 1) return null
    const a = posicoes[index]
    const b = posicoes[index + 1]
    if (!a || !b) return null
    const ok = concluidos.includes(desafio._id)
    return (
      <line key={index}
        x1={a.x} y1={a.y + 32}
        x2={b.x} y2={b.y + 32}
        stroke={ok ? '#22d3ee' : 'rgba(139,92,246,0.2)'}
        strokeWidth={ok ? 3 : 2}
        strokeDasharray={ok ? '0' : '8 5'}
        style={{ filter: ok ? 'drop-shadow(0 0 6px #22d3ee)' : 'none' }}
      />
    )
  })}
</svg>

              {/* Nós */}
              {desafios.map((desafio, index) => {
                const pos = posicoes[index]
                if (!pos) return null
                const status = getStatus(desafio, index)
                const c = cores[status]

                return (
                  <div key={desafio._id}
                    onClick={() => abrirDesafio(desafio, index)}
                    style={{
                      position: 'absolute', left: pos.x, top: pos.y,
                      display: 'flex', flexDirection: 'column', alignItems: 'center',
                      cursor: status === 'bloqueado' ? 'not-allowed' : 'pointer',
                      transition: 'transform 0.15s',
                      userSelect: 'none'
                    }}
                    onMouseEnter={e => { if (status !== 'bloqueado') e.currentTarget.style.transform = 'scale(1.12)' }}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{
                      width: 64, height: 64, borderRadius: 16,
                      background: c.bg,
                      border: `2px solid ${c.border}`,
                      boxShadow: c.shadow,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: status === 'bloqueado' ? 24 : 20,
                      fontWeight: 700, color: c.color,
                      backdropFilter: 'blur(8px)'
                    }}>
                      {status === 'concluido' ? '⚡' : status === 'bloqueado' ? '🔒' : index + 1}
                    </div>
                    <span style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: c.color }}>
                      +{desafio.pontos} XP
                    </span>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* MODAL */}
      {desafioAtual && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{
            background: 'linear-gradient(135deg,#1a0a40,#0f0630)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: 20, padding: 32, width: '100%', maxWidth: 480,
            boxShadow: '0 0 60px rgba(100,60,220,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <span style={{
                fontSize: 11, color: '#a78bfa',
                background: 'rgba(139,92,246,0.2)',
                padding: '4px 12px', borderRadius: 20
              }}>Nível {desafioAtual.nivel} • +{desafioAtual.pontos} XP</span>
              <button onClick={fecharDesafio} style={{
                background: 'none', border: 'none', color: '#7c3aed', fontSize: 20, cursor: 'pointer'
              }}>✕</button>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
              {desafioAtual.titulo}
            </h2>
            <p style={{ color: '#c4b5fd', fontSize: 14, marginBottom: 24, lineHeight: 1.6 }}>
              {desafioAtual.descricao}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {desafioAtual.opcoes.map((opcao) => {
                let bg = 'rgba(255,255,255,0.05)'
                let border = 'rgba(139,92,246,0.3)'
                let color = '#fff'
                let opacity = 1
                if (respostaSelecionada) {
                  if (opcao === desafioAtual.respostaCorreta) {
                    bg = 'rgba(34,197,94,0.2)'; border = '#22c55e'; color = '#86efac'
                  } else if (opcao === respostaSelecionada && !resultado?.correto) {
                    bg = 'rgba(239,68,68,0.2)'; border = '#ef4444'; color = '#fca5a5'
                  } else { opacity = 0.35 }
                }
                return (
                  <button key={opcao} onClick={() => responder(opcao)} style={{
                    background: bg, border: `1.5px solid ${border}`,
                    borderRadius: 12, padding: '14px 10px',
                    color, fontWeight: 700, fontSize: 14,
                    cursor: respostaSelecionada ? 'default' : 'pointer',
                    opacity, transition: 'all 0.2s'
                  }}>{opcao}</button>
                )
              })}
            </div>

            {resultado ? (
              <div style={{
                borderRadius: 12, padding: 16, textAlign: 'center',
                background: resultado.correto ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                border: `1px solid ${resultado.correto ? '#22c55e' : '#ef4444'}`
              }}>
                <p style={{ fontWeight: 700, fontSize: 18, marginBottom: 4,
                  color: resultado.correto ? '#86efac' : '#fca5a5' }}>
                  {resultado.correto ? '✅ Correto!' : '❌ Errado!'}
                </p>
                {resultado.correto
                  ? <p style={{ color: '#4ade80', fontSize: 13 }}>+{resultado.pontos} XP ganhos!</p>
                  : <p style={{ color: '#f87171', fontSize: 13 }}>
                      Resposta: <strong style={{ color: '#fff' }}>{resultado.respostaCorreta}</strong>
                    </p>
                }
                <button onClick={fecharDesafio} style={{
                  marginTop: 12, background: '#7c3aed', border: 'none',
                  borderRadius: 12, padding: '10px 32px',
                  color: '#fff', fontWeight: 700, fontSize: 14, cursor: 'pointer'
                }}>Continuar</button>
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: 'rgba(167,139,250,0.5)', fontSize: 12 }}>
                ⓘ Toque na resposta correta
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}