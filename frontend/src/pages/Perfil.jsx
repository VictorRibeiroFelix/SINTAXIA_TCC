import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

export default function Perfil() {
  const [perfil, setPerfil] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [concluidosAlgo, setConcluidosAlgo] = useState([])
  const [concluidosJS, setConcluidosJS] = useState([])
  const [totalAlgo, setTotalAlgo] = useState(0)
  const [totalJS, setTotalJS] = useState(0)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    buscarDados()
  }, [])

  const buscarDados = async () => {
    try {
      const [{ data: perfilData }, { data: algo }, { data: js }] = await Promise.all([
        api.get('/perfil'),
        api.get('/desafios?linguagem=algoritmos'),
        api.get('/desafios?linguagem=javascript'),
      ])
      setPerfil(perfilData)
      setTotalAlgo(algo.length)
      setTotalJS(js.length)

      const salvoAlgo = JSON.parse(localStorage.getItem('concluidos_algoritmos') || '[]')
      const salvoJS = JSON.parse(localStorage.getItem('concluidos_javascript') || '[]')
      setConcluidosAlgo(salvoAlgo)
      setConcluidosJS(salvoJS)
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
    } finally {
      setCarregando(false)
    }
  }

  const getLiga = (nivel) => {
    if (nivel >= 3) return 'Avançado'
    if (nivel >= 2) return 'Intermediário'
    return 'Iniciante'
  }

  const getPorcentagem = (concluidos, total) => {
    if (!total) return 0
    return Math.round((concluidos.length / total) * 100)
  }

  const getMedalhas = () => {
    const medalhasAlgo = concluidosAlgo.length
    const medalhasJS = concluidosJS.length
    return { algo: medalhasAlgo, js: medalhasJS, total: medalhasAlgo + medalhasJS }
  }

  const getXPInfo = (xp) => {
    if (xp < 80) return { atual: xp, necessario: 80, proximo: 2 }
    if (xp < 200) return { atual: xp - 80, necessario: 120, proximo: 3 }
    return { atual: xp, necessario: xp, proximo: null }
  }

  if (carregando) return (
    <div style={{
      minHeight: '100vh', background: '#0a0520',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#a78bfa', fontSize: 18
    }}>Carregando perfil...</div>
  )

  const xpInfo = getXPInfo(perfil?.pontuacaoTotal || 0)
  const porcentagemXP = Math.min(100, Math.round((xpInfo.atual / xpInfo.necessario) * 100))
  const medalhas = getMedalhas()
  const pctAlgo = getPorcentagem(concluidosAlgo, totalAlgo)
  const pctJS = getPorcentagem(concluidosJS, totalJS)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 60% 10%, #2d0b6b 0%, #0a0520 55%)',
      color: 'white', fontFamily: 'sans-serif'
    }}>
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.07,
        backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      {/* Topbar */}
      <div style={{
        position: 'fixed', top: 0, left: 130, right: 130, zIndex: 100,
        background: 'rgba(10,5,32,0.97)',
        borderBottom: '1px solid rgba(139,92,246,0.25)',
        height: 56, display: 'flex', alignItems: 'center',
        padding: '0 24px', gap: 12
      }}>
        <span style={{
          fontSize: 22, fontWeight: 900, marginRight: 'auto',
          background: 'linear-gradient(135deg,#f472b6,#a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>Sintaxia</span>

        <button onClick={() => navigate('/desafios')} style={{
          background: 'rgba(139,92,246,0.2)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: 10, padding: '6px 16px',
          color: '#c4b5fd', fontSize: 13, cursor: 'pointer'
        }}>🗺️ Mapa</button>

        <button onClick={() => { logout(); navigate('/login') }} style={{
          background: 'none', border: 'none',
          color: '#f87171', fontSize: 13, cursor: 'pointer'
        }}>Sair</button>
      </div>

      <div style={{ paddingTop: 80, paddingBottom: 60, maxWidth: 560, margin: '0 auto', padding: '80px 24px 60px' }}>

        <h2 style={{ fontSize: 22, fontWeight: 700, textAlign: 'center', marginBottom: 24, color: '#e2e8f0' }}>
          Perfil
        </h2>

        {/* Card principal */}
        <div style={{
          background: 'rgba(20,10,55,0.7)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: 20, padding: 24, marginBottom: 16,
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 20 }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%',
              background: 'linear-gradient(135deg,#6d28d9,#1d4ed8)',
              border: '2px solid rgba(139,92,246,0.6)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 24
            }}>🤖</div>

            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: '#e2e8f0' }}>{perfil?.nome}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                <span style={{ color: '#fcd34d', fontSize: 13, flexShrink: 0 }}>
                  ⚡ {perfil?.pontuacaoTotal || 0} XP
                </span>
                <div style={{
                  flex: 1, height: 6,
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: 3, overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', borderRadius: 3,
                    background: 'linear-gradient(90deg,#7c3aed,#60a5fa)',
                    width: `${porcentagemXP}%`,
                    transition: 'width 0.5s ease'
                  }}/>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ color: '#fcd34d', fontSize: 14 }}>🏅</span>
                <span style={{ color: '#e2e8f0', fontWeight: 700 }}>
                  {medalhas.total} Medalha(s)
                </span>
              </div>
              <span style={{
                background: 'rgba(100,80,200,0.2)',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: 20, padding: '3px 12px',
                fontSize: 11, color: '#c4b5fd'
              }}>Liga: {getLiga(perfil?.nivel || 1)}</span>
            </div>
          </div>

          {/* Nível */}
          <div style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 12, padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8
          }}>
            <span style={{ color: '#c4b5fd', fontSize: 13 }}>Nível atual</span>
            <span style={{ color: '#fff', fontWeight: 700 }}>Nível {perfil?.nivel || 1}</span>
            {xpInfo.proximo && (
              <span style={{ color: '#64748b', fontSize: 12 }}>
                {xpInfo.necessario - xpInfo.atual} XP para nível {xpInfo.proximo}
              </span>
            )}
          </div>
        </div>

        {/* Certificados */}
        <div style={{
          background: 'rgba(20,10,55,0.7)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: 16, padding: 18, marginBottom: 16,
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12, textAlign: 'center' }}>
            Certificados
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

            {/* Algoritmos */}
            <div style={{
              background: 'rgba(30,20,80,0.5)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 10, padding: 12,
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <span style={{ fontSize: 20 }}>📜</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Algoritmos</div>
                <div style={{
                  height: 4, background: 'rgba(255,255,255,0.1)',
                  borderRadius: 2, marginTop: 6, overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', background: '#818cf8', borderRadius: 2,
                    width: `${pctAlgo}%`, transition: 'width 0.5s'
                  }}/>
                </div>
              </div>
              <span style={{
                fontSize: 12, color: '#818cf8', fontWeight: 700,
                minWidth: 36, textAlign: 'right'
              }}>{pctAlgo}%</span>
            </div>

            {/* JavaScript */}
            <div style={{
              background: 'rgba(30,20,80,0.5)',
              border: '1px solid rgba(139,92,246,0.25)',
              borderRadius: 10, padding: 12,
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <span style={{ fontSize: 20 }}>📜</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>JavaScript</div>
                <div style={{
                  height: 4, background: 'rgba(255,255,255,0.1)',
                  borderRadius: 2, marginTop: 6, overflow: 'hidden'
                }}>
                  <div style={{
                    height: '100%', background: '#fcd34d', borderRadius: 2,
                    width: `${pctJS}%`, transition: 'width 0.5s'
                  }}/>
                </div>
              </div>
              <span style={{
                fontSize: 12, color: '#fcd34d', fontWeight: 700,
                minWidth: 36, textAlign: 'right'
              }}>{pctJS}%</span>
            </div>
          </div>
        </div>

        {/* Conquistas */}
        <div style={{
          background: 'rgba(20,10,55,0.7)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: 16, padding: 18, marginBottom: 24,
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ fontSize: 13, color: '#94a3b8', marginBottom: 12, textAlign: 'center' }}>
            Conquistas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>

            <div style={{
              background: medalhas.algo > 0 ? 'rgba(250,196,75,0.1)' : 'rgba(30,20,80,0.5)',
              border: `1px solid ${medalhas.algo > 0 ? 'rgba(250,196,75,0.4)' : 'rgba(139,92,246,0.2)'}`,
              borderRadius: 10, padding: 12,
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: medalhas.algo > 0 ? 1 : 0.4
            }}>
              <span style={{ fontSize: 20 }}>🏅</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>Primeiro Passo</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Algoritmos</div>
              </div>
            </div>

            <div style={{
              background: medalhas.js > 0 ? 'rgba(250,196,75,0.1)' : 'rgba(30,20,80,0.5)',
              border: `1px solid ${medalhas.js > 0 ? 'rgba(250,196,75,0.4)' : 'rgba(139,92,246,0.2)'}`,
              borderRadius: 10, padding: 12,
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: medalhas.js > 0 ? 1 : 0.4
            }}>
              <span style={{ fontSize: 20 }}>🏅</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>Dev em Formação</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>JavaScript</div>
              </div>
            </div>

            <div style={{
              background: medalhas.total >= 5 ? 'rgba(34,211,238,0.1)' : 'rgba(30,20,80,0.5)',
              border: `1px solid ${medalhas.total >= 5 ? 'rgba(34,211,238,0.4)' : 'rgba(139,92,246,0.2)'}`,
              borderRadius: 10, padding: 12,
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: medalhas.total >= 5 ? 1 : 0.4
            }}>
              <span style={{ fontSize: 20 }}>⚡</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>Imparável</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>5 desafios</div>
              </div>
            </div>

            <div style={{
              background: medalhas.total >= 8 ? 'rgba(168,85,247,0.2)' : 'rgba(30,20,80,0.5)',
              border: `1px solid ${medalhas.total >= 8 ? 'rgba(168,85,247,0.5)' : 'rgba(139,92,246,0.2)'}`,
              borderRadius: 10, padding: 12,
              display: 'flex', alignItems: 'center', gap: 8,
              opacity: medalhas.total >= 8 ? 1 : 0.4
            }}>
              <span style={{ fontSize: 20 }}>👑</span>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, color: '#e2e8f0' }}>Mestre</div>
                <div style={{ fontSize: 11, color: '#94a3b8' }}>Todos concluídos</div>
              </div>
            </div>

          </div>
        </div>

        <button onClick={() => navigate('/desafios')} style={{
          width: '100%',
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          border: 'none', borderRadius: 14,
          padding: '14px', color: '#fff',
          fontWeight: 700, fontSize: 15, cursor: 'pointer'
        }}>Continuar</button>
      </div>
    </div>
  )
}