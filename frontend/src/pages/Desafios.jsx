import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const posicoes = [
  { x: 5,  y: 30  },
  { x: 100,  y: 180 },
  { x: 340, y: 200 },
  { x: 400, y: 400 },
  { x: 360, y: 600 },
  { x: 30,  y: 550 },
  { x: 30,  y: 820 },
  { x: 260, y: 1020 },
  { x: 560, y: 1020 },
  
];

const linguagens = [
  {
    key: 'algoritmos',
    label: 'Algoritmos',
    cor: '#7c3aed',
  },
  {
    key: 'javascript',
    label: 'JavaScript',
    cor: '#eab308',
  },
]

const niveis = [
  { key: 'iniciante',     label: 'Iniciante', desc: 'Conceitos básicos' },
  { key: 'intermediario', label: 'Intermediário', desc: 'Aprofundando o conhecimento' },
  { key: 'experiente',    label: 'Experiente', desc: 'Desafios avançados' },
]

export default function Desafios() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const menuRef = useRef(null)

  const [desafios, setDesafios] = useState([])
  const [linguagem, setLinguagem] = useState('algoritmos')
  const [nivel, setNivel] = useState('iniciante')
  const [desafioAtual, setDesafioAtual] = useState(null)
  const [respostaSelecionada, setRespostaSelecionada] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [concluidos, setConcluidos] = useState([])
  const [xpAtual, setXpAtual] = useState(usuario?.pontuacaoTotal || 0)
  const [menuAberto, setMenuAberto] = useState(false)
  const [submenuLang, setSubmenuLang] = useState(null)

  const buscarDesafios = async () => {
    try {
      setCarregando(true)
      const { data } = await api.get(`/desafios?linguagem=${linguagem}&dificuldade=${nivel}`)
      setDesafios(data)
      const salvo = JSON.parse(localStorage.getItem(`concluidos_${linguagem}_${nivel}`) || '[]')
      setConcluidos(salvo)
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    const jaViu = localStorage.getItem(`introducao_${linguagem}`)
    if (!jaViu) {
      navigate('/introducao', { state: { linguagem } })
      return
    }
    buscarDesafios()
  }, [linguagem, nivel])

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('usuario') || '{}')
    setXpAtual(u.pontuacaoTotal || 0)
  }, [linguagem])

  // Fechar menu ao clicar fora
  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false)
        setSubmenuLang(null)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const selecionarLinguagemNivel = (lang, niv) => {
    setLinguagem(lang)
    setNivel(niv)
    setMenuAberto(false)
    setSubmenuLang(null)
  }

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
        localStorage.setItem(`concluidos_${linguagem}_${nivel}`, JSON.stringify(novosConcluidos))
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

  const jaViuIntroducao = localStorage.getItem(`introducao_${linguagem}`)
  const langAtual = linguagens.find(l => l.key === linguagem)
  const nivelAtual = niveis.find(n => n.key === nivel)

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 60% 10%, #2d0b6b 0%, #0a0520 55%)',
      color: 'white', fontFamily: 'sans-serif', overflowX: 'hidden'
    }}>

      {/* Grade de fundo */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.07,
        backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      {/* TOPBAR */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: 'rgba(10,5,32,0.97)',
        borderBottom: '1px solid rgba(139,92,246,0.25)',
        height: 56, display: 'flex', alignItems: 'center',
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
        }}>👤 {usuario?.nome}</button>

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

      {/* BARRA DE SELEÇÃO COM MENU SANDUÍCHE */}
      <div style={{
        position: 'fixed', top: 56, left: 0, right: 0, zIndex: 90,
        background: 'rgba(10,5,32,0.95)',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        height: 52,
        display: 'flex', alignItems: 'center',
        padding: '0 20px',
      }}>

        {/* Botão sanduíche */}
        <div ref={menuRef} style={{ position: 'relative' }}>
          <button
            onClick={() => { setMenuAberto(m => !m); setSubmenuLang(null) }}
            style={{
              width: 40, height: 40, borderRadius: 10,
              background: menuAberto ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.15)',
              border: `1px solid ${menuAberto ? '#7c3aed' : 'rgba(139,92,246,0.3)'}`,
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: 5,
              cursor: 'pointer', transition: 'all 0.2s'
            }}
          >
            <span style={{ display: 'block', width: 18, height: 2, background: '#c4b5fd', borderRadius: 2 }}/>
            <span style={{ display: 'block', width: 18, height: 2, background: '#c4b5fd', borderRadius: 2 }}/>
            <span style={{ display: 'block', width: 18, height: 2, background: '#c4b5fd', borderRadius: 2 }}/>
          </button>

          {/* DROPDOWN MENU */}
          {menuAberto && (
            <div style={{
              position: 'absolute', top: 48, left: 0, zIndex: 200,
              background: 'rgba(10,5,40,0.98)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 14,
              padding: 8, minWidth: 200,
              boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
              backdropFilter: 'blur(12px)'
            }}>
              <div style={{ fontSize: 10, color: '#4c3a8a', padding: '6px 12px 4px', letterSpacing: 1, textTransform: 'uppercase' }}>
                Linguagens
              </div>

              {linguagens.map(lang => (
                <div
                  key={lang.key}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => setSubmenuLang(lang.key)}
                  onMouseLeave={() => setSubmenuLang(null)}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                    background: linguagem === lang.key
                      ? `${lang.cor}22`
                      : submenuLang === lang.key ? 'rgba(139,92,246,0.1)' : 'transparent',
                    border: linguagem === lang.key ? `1px solid ${lang.cor}44` : '1px solid transparent',
                    transition: 'all 0.15s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{lang.icone}</span>
                      <span style={{ fontSize: 14, fontWeight: 600, color: linguagem === lang.key ? lang.cor : '#e2e8f0' }}>
                        {lang.label}
                      </span>
                    </div>
                    <span style={{ color: '#4c3a8a', fontSize: 12 }}>›</span>
                  </div>

                  {/* SUBMENU DE NÍVEIS */}
                  {submenuLang === lang.key && (
                    <div style={{
                      position: 'absolute', left: '100%', top: 0, marginLeft: 8,
                      background: 'rgba(10,5,40,0.98)',
                      border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: 14, padding: 8, minWidth: 220,
                      boxShadow: '0 8px 40px rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(12px)'
                    }}>
                      <div style={{ fontSize: 10, color: '#4c3a8a', padding: '6px 12px 4px', letterSpacing: 1, textTransform: 'uppercase' }}>
                        Nível — {lang.label}
                      </div>

                      {niveis.map(niv => {
                        const ativo = linguagem === lang.key && nivel === niv.key
                        return (
                          <div
                            key={niv.key}
                            onClick={() => selecionarLinguagemNivel(lang.key, niv.key)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: 12,
                              padding: '10px 14px', borderRadius: 10, cursor: 'pointer',
                              background: ativo ? `${lang.cor}22` : 'transparent',
                              border: ativo ? `1px solid ${lang.cor}44` : '1px solid transparent',
                              transition: 'all 0.15s'
                            }}
                            onMouseEnter={e => { if (!ativo) e.currentTarget.style.background = 'rgba(139,92,246,0.1)' }}
                            onMouseLeave={e => { if (!ativo) e.currentTarget.style.background = 'transparent' }}
                          >
                            <span style={{ fontSize: 20 }}>{niv.icone}</span>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: ativo ? lang.cor : '#e2e8f0' }}>
                                {niv.label}
                              </div>
                              <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>
                                {niv.desc}
                              </div>
                            </div>
                            {ativo && (
                              <span style={{ marginLeft: 'auto', color: lang.cor, fontSize: 14 }}>✓</span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CENTRO — Nome da linguagem e nível */}
        <div style={{
          flex: 1, display: 'flex', alignItems: 'center',
          justifyContent: 'center', gap: 10
        }}>
          <span style={{ fontSize: 18 }}>{langAtual?.icone}</span>
          <span style={{
            fontSize: 15, fontWeight: 700,
            color: langAtual?.cor
          }}>{langAtual?.label}</span>
          <span style={{ color: 'rgba(139,92,246,0.4)', fontSize: 14 }}>•</span>
          <span style={{ fontSize: 13, color: '#94a3b8' }}>{nivelAtual?.icone} {nivelAtual?.label}</span>
        </div>

        {/* Espaço para balancear */}
        <div style={{ width: 40 }}/>
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
              {langAtual?.label} — {nivelAtual?.label} — {desafios.length > 0 ? Math.round((concluidos.length / desafios.length) * 100) : 0}% completo
            </p>

            <div style={{ position: 'relative', width: 560, height: 660 }}>

              {/* SVG com todas as linhas */}
              <svg style={{
                position: 'absolute', inset: 0, width: '100%', height: '100%',
                overflow: 'visible', zIndex: 0, pointerEvents: 'none'
              }}>
                <line
                  x1={posicoes[0].x + 48} y1={posicoes[0].y + 20}
                  x2={posicoes[1].x + 32} y2={posicoes[1].y}
                  stroke={jaViuIntroducao ? '#22d3ee' : 'rgba(139,92,246,0.2)'}
                  strokeWidth={jaViuIntroducao ? 3 : 2}
                  strokeDasharray={jaViuIntroducao ? '0' : '8 5'}
                  style={{ filter: jaViuIntroducao ? 'drop-shadow(0 0 6px #22d3ee)' : 'none' }}
                />
                {desafios.map((desafio, index) => {
                  if (index >= desafios.length - 1) return null
                  const a = posicoes[index + 1]
                  const b = posicoes[index + 2]
                  if (!a || !b) return null
                  const ok = concluidos.includes(desafio._id)
                  return (
                    <line key={index}
                      x1={a.x + 32} y1={a.y + 32}
                      x2={b.x + 32} y2={b.y + 32}
                      stroke={ok ? '#22d3ee' : 'rgba(139,92,246,0.2)'}
                      strokeWidth={ok ? 3 : 2}
                      strokeDasharray={ok ? '0' : '8 5'}
                      style={{ filter: ok ? 'drop-shadow(0 0 6px #22d3ee)' : 'none' }}
                    />
                  )
                })}
              </svg>

              {/* Nó Introdução */}
              <div
                onClick={() => navigate('/introducao', { state: { linguagem } })}
                style={{
                  position: 'absolute', left: posicoes[0].x, top: posicoes[0].y,
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  cursor: 'pointer', transition: 'transform 0.15s', userSelect: 'none', zIndex: 1
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.12)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <div style={{
                  width: 96, height: 40, borderRadius: 12,
                  background: jaViuIntroducao ? 'rgba(34,211,238,0.15)' : 'rgba(250,196,75,0.15)',
                  border: `2px solid ${jaViuIntroducao ? '#22d3ee' : '#fac44b'}`,
                  boxShadow: jaViuIntroducao ? '0 0 20px rgba(34,211,238,0.4)' : '0 0 20px rgba(250,196,75,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backdropFilter: 'blur(8px)', gap: 6
                }}>
                  <span style={{ fontSize: 14 }}>📖</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: jaViuIntroducao ? '#22d3ee' : '#fac44b' }}>
                    Introdução
                  </span>
                </div>
                <span style={{ marginTop: 6, fontSize: 11, fontWeight: 700, color: jaViuIntroducao ? '#22d3ee' : '#fac44b' }}>
                </span>
              </div>

              {/* Nós dos desafios */}
              {desafios.map((desafio, index) => {
                const pos = posicoes[index + 1]
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
                      transition: 'transform 0.15s', userSelect: 'none', zIndex: 1
                    }}
                    onMouseEnter={e => { if (status !== 'bloqueado') e.currentTarget.style.transform = 'scale(1.12)' }}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                  >
                    <div style={{
                      width: 64, height: 64, borderRadius: 16,
                      background: c.bg, border: `2px solid ${c.border}`,
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
    position: 'fixed', inset: 0, zIndex: 300,
    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16,
    overflowY: 'auto'
  }}>
    <div style={{
      background: 'linear-gradient(135deg,#1a0a40,#0f0630)',
      border: '1px solid rgba(139,92,246,0.4)',
      borderRadius: 20, padding: 32, width: '100%', maxWidth: 520,
      boxShadow: '0 0 60px rgba(100,60,220,0.3)',
      margin: '20px auto'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <span style={{
            fontSize: 11, color: '#a78bfa',
            background: 'rgba(139,92,246,0.2)',
            padding: '4px 12px', borderRadius: 20
          }}>
            {desafioAtual.tipo === 'pergunta' ? '❓ Pergunta' :
            desafioAtual.tipo === 'correcao' ? '🔧 Correção' : '💻 Desenvolvimento'}
          </span>
          <span style={{
            fontSize: 11, color: '#fcd34d',
            background: 'rgba(250,196,75,0.1)',
            padding: '4px 12px', borderRadius: 20
          }}>+{desafioAtual.pontos} XP</span>
        </div>
        <button onClick={fecharDesafio} style={{
          background: 'none', border: 'none', color: '#7c3aed', fontSize: 20, cursor: 'pointer'
        }}>✕</button>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>
        {desafioAtual.titulo}
      </h2>
      <p style={{ color: '#c4b5fd', fontSize: 13, marginBottom: 16, lineHeight: 1.6 }}>
        {desafioAtual.descricao}
      </p>

      {/* Código base para desenvolvimento e correção */}
      {desafioAtual.codigoBase && (
        <div style={{
          background: '#0a0520',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: 12, padding: '14px 16px',
          marginBottom: 16, fontFamily: 'monospace',
          fontSize: 13, lineHeight: 1.8, color: '#e2e8f0',
          whiteSpace: 'pre-wrap'
        }}>
          {desafioAtual.codigoBase}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
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
              borderRadius: 12, padding: '12px 10px',
              color, fontWeight: 600, fontSize: 13,
              cursor: respostaSelecionada ? 'default' : 'pointer',
              opacity, transition: 'all 0.2s',
              textAlign: 'left', fontFamily: desafioAtual.tipo !== 'pergunta' ? 'monospace' : 'inherit'
            }}>{opcao}</button>
          )
        })}
      </div>

      {resultado ? (
  <div style={{
    position: 'fixed', inset: 0, zIndex: 400,
    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
  }}>
    <div style={{
      background: resultado.correto
        ? 'linear-gradient(135deg, #0a2010, #0f3020)'
        : 'linear-gradient(135deg, #200a0a, #300f0f)',
      border: `2px solid ${resultado.correto ? '#22c55e' : '#ef4444'}`,
      borderRadius: 24, padding: 40, width: '100%', maxWidth: 440,
      textAlign: 'center',
      boxShadow: resultado.correto
        ? '0 0 80px rgba(34,197,94,0.3)'
        : '0 0 80px rgba(239,68,68,0.3)',
      position: 'relative', overflow: 'hidden'
    }}>

      {/* Círculos decorativos de fundo */}
      <div style={{
        position: 'absolute', top: -40, right: -40,
        width: 160, height: 160, borderRadius: '50%',
        background: resultado.correto ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)',
        pointerEvents: 'none'
      }}/>
      <div style={{
        position: 'absolute', bottom: -60, left: -40,
        width: 200, height: 200, borderRadius: '50%',
        background: resultado.correto ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)',
        pointerEvents: 'none'
      }}/>

      {/* Ícone principal */}
      <div style={{
        fontSize: 72, marginBottom: 16,
        filter: resultado.correto
          ? 'drop-shadow(0 0 20px rgba(34,197,94,0.6))'
          : 'drop-shadow(0 0 20px rgba(239,68,68,0.6))',
        animation: 'pulse 1s ease-in-out'
      }}>
        {resultado.correto ? '✅' : '❌'}
      </div>

      {/* Título */}
      <h2 style={{
        fontSize: 28, fontWeight: 900, marginBottom: 8,
        color: resultado.correto ? '#4ade80' : '#f87171',
        letterSpacing: 1
      }}>
        {resultado.correto ? 'Correto!' : 'Errado!'}
      </h2>

      {resultado.correto ? (
        <>
          {/* Pontos ganhos */}
          <div style={{
            background: 'rgba(34,197,94,0.1)',
            border: '1px solid rgba(34,197,94,0.3)',
            borderRadius: 16, padding: '20px 24px',
            marginBottom: 20, marginTop: 12
          }}>
            <div style={{ fontSize: 13, color: '#86efac', marginBottom: 8 }}>Pontos ganhos</div>
            <div style={{
              fontSize: 48, fontWeight: 900, color: '#4ade80',
              lineHeight: 1, marginBottom: 4,
              filter: 'drop-shadow(0 0 10px rgba(74,222,128,0.5))'
            }}>
              +{resultado.pontos}
            </div>
            <div style={{ fontSize: 14, color: '#86efac', fontWeight: 700 }}>XP</div>
          </div>

          {/* Stats da sessão */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
            <div style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 12, padding: '12px 10px'
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>🎯</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Desafio</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#86efac', marginTop: 2 }}>
                Concluído!
              </div>
            </div>
            <div style={{
              background: 'rgba(34,197,94,0.08)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 12, padding: '12px 10px'
            }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>⚡</div>
              <div style={{ fontSize: 11, color: '#64748b' }}>Nível</div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#fcd34d', marginTop: 2 }}>
                {resultado.pontos >= 30 ? 'Experiente' : resultado.pontos >= 20 ? 'Intermediário' : 'Iniciante'}
              </div>
            </div>
          </div>

          {/* Botão continuar */}
          <button onClick={fecharDesafio} style={{
            width: '100%',
            background: 'linear-gradient(135deg, #16a34a, #22c55e)',
            border: 'none', borderRadius: 16,
            padding: '16px',
            color: '#fff', fontWeight: 900, fontSize: 16,
            cursor: 'pointer', letterSpacing: 1,
            boxShadow: '0 4px 20px rgba(34,197,94,0.4)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Continuar →
          </button>
        </>
      ) : (
        <>
          {/* Resposta correta */}
          <p style={{ color: '#fca5a5', fontSize: 14, marginBottom: 16, marginTop: 8 }}>
            A resposta correta era:
          </p>
          <div style={{
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: 12, padding: '14px 20px',
            marginBottom: 24,
            fontFamily: desafioAtual.tipo !== 'pergunta' ? 'monospace' : 'inherit',
            fontSize: 15, fontWeight: 700, color: '#fff'
          }}>
            {resultado.respostaCorreta}
          </div>

          <div style={{
            background: 'rgba(239,68,68,0.06)',
            border: '1px solid rgba(239,68,68,0.15)',
            borderRadius: 12, padding: '12px 16px',
            marginBottom: 20, fontSize: 13, color: '#fca5a5'
          }}>
            💡 Não desanime! Tente novamente e aprenda com o erro.
          </div>

          {/* Botão tentar novamente */}
          <button onClick={fecharDesafio} style={{
            width: '100%',
            background: 'linear-gradient(135deg, #991b1b, #ef4444)',
            border: 'none', borderRadius: 16,
            padding: '16px',
            color: '#fff', fontWeight: 900, fontSize: 16,
            cursor: 'pointer', letterSpacing: 1,
            boxShadow: '0 4px 20px rgba(239,68,68,0.3)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            Tentar novamente
          </button>
        </>
      )}
    </div>
  </div>
) : (
  <p style={{ textAlign: 'center', color: 'rgba(167,139,250,0.5)', fontSize: 12 }}>
    ⓘ {desafioAtual.tipo === 'correcao' ? 'Identifique o erro no código' :
        desafioAtual.tipo === 'desenvolvimento' ? 'Escolha a opção que completa o código' :
        'Toque na resposta correta'}
  </p>
)}
    </div>
  </div>
)}
    </div>
  )
}