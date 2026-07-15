import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import EditorCodigo from '../components/EditorCodigo'
import api from '../services/api'

const linguagens = [
  { key: 'algoritmos', label: 'Algoritmos', cor: '#7c3aed' },
  { key: 'javascript', label: 'JavaScript', cor: '#eab308' },
]

const niveis = [
  { key: 'iniciante',     label: 'Iniciante', desc: 'Conceitos básicos' },
  { key: 'intermediario', label: 'Intermediário', desc: 'Aprofundando o conhecimento' },
  { key: 'experiente',    label: 'Experiente', desc: 'Desafios avançados' },
]

export default function Desafios() {
  const { usuario, logout } = useAuth()
  const navigate = useNavigate()
  const menuRef   = useRef(null)
  const scrollRef = useRef(null)

  const [desafios,           setDesafios]           = useState([])
  const [linguagem,          setLinguagem]          = useState('algoritmos')
  const [nivel,              setNivel]              = useState('iniciante')
  const [desafioAtual,       setDesafioAtual]       = useState(null)
  const [respostaSelecionada,setRespostaSelecionada]= useState(null)
  const [resultado,          setResultado]          = useState(null)
  const [carregando,         setCarregando]         = useState(true)
  const [concluidos,         setConcluidos]         = useState([])
  const [xpAtual,            setXpAtual]            = useState(usuario?.pontuacaoTotal || 0)
  const [menuAberto,         setMenuAberto]         = useState(false)
  const [submenuLang,        setSubmenuLang]        = useState(null)
  const [showScrollDown,     setShowScrollDown]     = useState(false)
  const [showScrollUp,       setShowScrollUp]       = useState(false)
  const [headerH,            setHeaderH]            = useState(100)
  const [editorAberto, setEditorAberto] = useState(false)

  // Mede a altura real do header (topbar + barra seleção)
  const topbarRef  = useRef(null)
  const barraRef   = useRef(null)

  useEffect(() => {
    const calc = () => {
      const t = topbarRef.current?.offsetHeight  || 52
      const b = barraRef.current?.offsetHeight   || 48
      setHeaderH(t + b)
    }
    calc()
    window.addEventListener('resize', calc)
    return () => window.removeEventListener('resize', calc)
  }, [])

  // Detecta se pode rolar para baixo ou cima
  const handleScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setShowScrollUp(el.scrollTop > 40)
    setShowScrollDown(el.scrollTop + el.clientHeight < el.scrollHeight - 40)
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    // checa logo após carregar
    setTimeout(() => {
      handleScroll()
    }, 300)
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [carregando, desafios])

  // Posições do mapa em % (relativo ao container 600×820)
const MAP_W = 560
const MAP_H = 820

const getPosicoes = () => {
  const w = Math.min(window.innerWidth, MAP_W)

  return [
    { x: w * 0.10, y: 40 },  
    { x: w * 0.30, y: 90 },   
    { x: w * 0.55, y: 140 }, 
    { x: w * 0.80, y: 190 },  
    { x: w * 0.70, y: 280 },  
    { x: w * 0.45, y: 330 }, 
    { x: w * 0.20, y: 390 },  
    { x: w * 0.30, y: 490 }, 
    { x: w * 0.55, y: 560 },  
    { x: w * 0.75, y: 640 },  
    { x: w * 0.88, y: 740 },  
  ]
}

const [posicoes, setPosicoes] = useState(getPosicoes())

useEffect(() => {
  const atualizar = () => setPosicoes(getPosicoes())
  window.addEventListener('resize', atualizar)
  return () => window.removeEventListener('resize', atualizar)
}, [])
const NODE    = 64
const INTRO_W = 100
const INTRO_H = 40

  const cores = {
    concluido:  { bg: 'rgba(34,211,238,0.15)',  border: '#22d3ee', shadow: '0 0 20px rgba(34,211,238,0.5)',  color: '#22d3ee' },
    disponivel: { bg: 'rgba(250,196,75,0.15)',   border: '#fac44b', shadow: '0 0 20px rgba(250,196,75,0.5)',  color: '#fac44b' },
    bloqueado:  { bg: 'rgba(20,10,60,0.7)',      border: 'rgba(100,80,180,0.2)', shadow: 'none',              color: '#4c3a8a' },
  }

  const buscarDesafios = async () => {
    try {
      setCarregando(true)
      const { data } = await api.get(`/desafios?linguagem=${linguagem}&dificuldade=${nivel}`)
      setDesafios(data)
      const salvo = JSON.parse(localStorage.getItem(`concluidos_${linguagem}_${nivel}`) || '[]')
      setConcluidos(salvo)
    } catch (err) { console.error(err) }
    finally { setCarregando(false) }
  }

  useEffect(() => {
    const jaViu = localStorage.getItem(`introducao_${linguagem}`)
    if (!jaViu) { navigate('/introducao', { state: { linguagem } }); return }
    buscarDesafios()
  }, [linguagem, nivel])

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem('usuario') || '{}')
    setXpAtual(u.pontuacaoTotal || 0)
  }, [linguagem])

  useEffect(() => {
    const fn = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuAberto(false); setSubmenuLang(null)
      }
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const selLangNivel = (lang, niv) => {
    setLinguagem(lang); setNivel(niv)
    setMenuAberto(false); setSubmenuLang(null)
    if (scrollRef.current) scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const abrirDesafio = (d, i) => {
  if (i > 0 && !concluidos.includes(desafios[i - 1]._id)) return
  setDesafioAtual(d)
  setRespostaSelecionada(null)
  setResultado(null)
  if (d.tipo === 'criar') {
    setEditorAberto(true)
  }
}

  const responder = async (opcao) => {
    if (resultado) return
    setRespostaSelecionada(opcao)
    try {
      const { data } = await api.post(`/desafios/${desafioAtual._id}/responder`, { resposta: opcao })
      setResultado(data)
      if (data.correto && !concluidos.includes(desafioAtual._id)) {
        const nc = [...concluidos, desafioAtual._id]
        setConcluidos(nc)
        localStorage.setItem(`concluidos_${linguagem}_${nivel}`, JSON.stringify(nc))
        const { data: pf } = await api.patch('/perfil/xp', { pontos: data.pontos })
        const ua = { ...JSON.parse(localStorage.getItem('usuario') || '{}'), pontuacaoTotal: pf.pontuacaoTotal, nivel: pf.nivel }
        localStorage.setItem('usuario', JSON.stringify(ua))
        setXpAtual(pf.pontuacaoTotal)
      }
    } catch (err) { console.error(err) }
  }

  const fecharDesafio = () => { setDesafioAtual(null); setRespostaSelecionada(null); setResultado(null) }

  const getStatus = (d, i) => {
    if (concluidos.includes(d._id)) return 'concluido'
    if (i === 0 || concluidos.includes(desafios[i - 1]?._id)) return 'disponivel'
    return 'bloqueado'
  }

  const jaViuIntro  = localStorage.getItem(`introducao_${linguagem}`)
  const langAtual   = linguagens.find(l => l.key === linguagem)
  const nivelAtual  = niveis.find(n => n.key === nivel)
  const pctCompleto = desafios.length > 0 ? Math.round((concluidos.length / desafios.length) * 100) : 0

  return (
    <div style={{
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'radial-gradient(ellipse at 60% 10%, #2d0b6b 0%, #0a0520 55%)',
  color: 'white',
  fontFamily: 'sans-serif',
  position: 'relative',
  overflow: 'hidden'
}}>

      {/* Grade */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.07,
        backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      {/* ===== TOPBAR ===== */}
      <div ref={topbarRef} style={{
        flexShrink: 0, zIndex: 100,
        background: 'rgba(10,5,32,0.97)',
        borderBottom: '1px solid rgba(139,92,246,0.25)',
        display: 'flex', alignItems: 'center',
        boxSizing: 'border-box', width: '100%',
        padding: '0 16px', gap: 10, height: 52
      }}>
        <span style={{
          fontSize: 20, fontWeight: 900, marginRight: 'auto',
          background: 'linear-gradient(135deg,#f472b6,#a78bfa)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', letterSpacing: 1
        }}>Sintaxia</span>

        <button onClick={() => navigate('/amigos')} style={{
          background: 'rgba(139,92,246,0.2)',
          border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: 8, padding: '5px 12px',
          color: '#c4b5fd', fontSize: 12, cursor: 'pointer',
          whiteSpace: 'nowrap'
        }}>👥 Amigos</button>

        <button onClick={() => navigate('/perfil')} style={{
          background: 'rgba(139,92,246,0.2)', border: '1px solid rgba(139,92,246,0.4)',
          borderRadius: 8, padding: '5px 12px', color: '#c4b5fd', fontSize: 12, cursor: 'pointer'
        }}>👤 {usuario?.nome}</button>

        <span style={{
          background: 'rgba(180,120,30,0.25)', border: '1px solid rgba(210,160,50,0.5)',
          borderRadius: 16, padding: '4px 10px', color: '#fcd34d', fontSize: 12, fontWeight: 700
        }}>⚡ {xpAtual} XP</span>

        <span style={{ color: '#22d3ee', fontSize: 12 }}>
          🏅{concluidos.length}/{desafios.length}
        </span>

        <button onClick={() => { logout(); navigate('/login') }} style={{
          background: 'none', border: 'none', color: '#f87171', fontSize: 12, cursor: 'pointer'
        }}>Sair</button>
      </div>

      {/* ===== BARRA SELEÇÃO ===== */}
      <div ref={barraRef} style={{
        flexShrink: 0, zIndex: 90,
        background: 'rgba(10,5,32,0.95)',
        borderBottom: '1px solid rgba(139,92,246,0.15)',
        display: 'flex', alignItems: 'center',
        boxSizing: 'border-box', width: '100%',
        padding: '0 16px', gap: 10, height: 48, position: 'relative'
      }}>

        {/* Sanduíche */}
        <div ref={menuRef} style={{ position: 'relative', flexShrink: 0 }}>
          <button onClick={() => { setMenuAberto(m => !m); setSubmenuLang(null) }} style={{
            width: 36, height: 36, borderRadius: 8,
            background: menuAberto ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.15)',
            border: `1px solid ${menuAberto ? '#7c3aed' : 'rgba(139,92,246,0.3)'}`,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 4,
            cursor: 'pointer', transition: 'all 0.2s'
          }}>
            {[0,1,2].map(i => <span key={i} style={{ display: 'block', width: 16, height: 2, background: '#c4b5fd', borderRadius: 2 }}/>)}
          </button>

          {menuAberto && (
            <div style={{
              position: 'absolute', top: 44, left: 0, zIndex: 300,
              background: 'rgba(10,5,40,0.99)', border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 14, padding: 8, minWidth: 190,
              boxShadow: '0 8px 40px rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)'
            }}>
              <div style={{ fontSize: 10, color: '#4c3a8a', padding: '4px 10px', letterSpacing: 1, textTransform: 'uppercase' }}>Linguagens</div>
              {linguagens.map(lang => (
                <div key={lang.key} style={{ position: 'relative' }}
                  onMouseEnter={() => setSubmenuLang(lang.key)}
                  onMouseLeave={() => setSubmenuLang(null)}
                >
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
                    background: linguagem === lang.key ? `${lang.cor}22` : submenuLang === lang.key ? 'rgba(139,92,246,0.1)' : 'transparent',
                    border: linguagem === lang.key ? `1px solid ${lang.cor}44` : '1px solid transparent',
                    transition: 'all 0.15s'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 16 }}>{lang.icone}</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: linguagem === lang.key ? lang.cor : '#e2e8f0' }}>{lang.label}</span>
                    </div>
                    <span style={{ color: '#4c3a8a', fontSize: 12 }}>›</span>
                  </div>

                  {submenuLang === lang.key && (
                    <div style={{
                      position: 'absolute', left: '100%', top: 0, marginLeft: 3,
                      background: 'rgba(10,5,40,0.99)', border: '1px solid rgba(139,92,246,0.3)',
                      borderRadius: 14, padding: 8, minWidth: 210,
                      boxShadow: '0 8px 40px rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)'
                    }}>
                      <div style={{ fontSize: 10, color: '#4c3a8a', padding: '4px 10px', letterSpacing: 1, textTransform: 'uppercase' }}>Nível — {lang.label}</div>
                      {niveis.map(niv => {
                        const ativo = linguagem === lang.key && nivel === niv.key
                        return (
                          <div key={niv.key} onClick={() => selLangNivel(lang.key, niv.key)} style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            padding: '9px 12px', borderRadius: 10, cursor: 'pointer',
                            background: ativo ? `${lang.cor}22` : 'transparent',
                            border: ativo ? `1px solid ${lang.cor}44` : '1px solid transparent',
                            transition: 'all 0.15s'
                          }}
                          onMouseEnter={e => { if (!ativo) e.currentTarget.style.background = 'rgba(139,92,246,0.1)' }}
                          onMouseLeave={e => { if (!ativo) e.currentTarget.style.background = 'transparent' }}
                          >
                            <span style={{ fontSize: 18 }}>{niv.icone}</span>
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 700, color: ativo ? lang.cor : '#e2e8f0' }}>{niv.label}</div>
                              <div style={{ fontSize: 11, color: '#64748b' }}>{niv.desc}</div>
                            </div>
                            {ativo && <span style={{ marginLeft: 'auto', color: lang.cor }}>✓</span>}
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

        {/* Centro */}
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ fontSize: 15 }}>{langAtual?.icone}</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: langAtual?.cor }}>{langAtual?.label}</span>
          <span style={{ color: 'rgba(139,92,246,0.4)' }}>•</span>
          <span style={{ fontSize: 12, color: '#94a3b8' }}>{nivelAtual?.icone} {nivelAtual?.label}</span>
          <span style={{ color: 'rgba(139,92,246,0.4)' }}>•</span>
          <span style={{ fontSize: 12, color: '#64748b' }}>{pctCompleto}%</span>
        </div>

        <div style={{ width: 36, flexShrink: 0 }}/>
      </div>

      {/* ===== ÁREA DO MAPA (scrollável) ===== */}
      <div ref={scrollRef} style={{
  flex: 1,
  overflowY: 'auto',
  overflowX: 'hidden',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  padding: '0 20px',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
}}>
  <style>{`::-webkit-scrollbar{display:none}`}</style>

  {carregando ? (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', color: '#a78bfa', fontSize: 16, minHeight: 200 }}>
      Carregando mapa...
    </div>
  ) : (
    <div style={{
  position: 'relative',
  width: '100%',
  maxWidth: MAP_W,
  height: MAP_H,
  margin: '0 auto',
  flexShrink: 0,
}}>

            {/* Label no topo */}
            <div style={{ textAlign: 'center', padding: '12px 0 0', color: 'rgba(167,139,250,0.5)', fontSize: 11 }}>
              {langAtual?.label} — {nivelAtual?.label} — {pctCompleto}% completo
            </div>

            {/* SVG linhas */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', pointerEvents: 'none' }}>
  <line
    x1={posicoes[0].x + INTRO_W / 2} y1={posicoes[0].y + INTRO_H}
    x2={posicoes[1].x + NODE / 2}     y2={posicoes[1].y}
    stroke={jaViuIntro ? '#22d3ee' : 'rgba(139,92,246,0.2)'}
    strokeWidth={jaViuIntro ? 2.5 : 2}
    strokeDasharray={jaViuIntro ? '0' : '8 5'}
    style={{ filter: jaViuIntro ? 'drop-shadow(0 0 5px #22d3ee)' : 'none' }}
  />
  {desafios.map((d, i) => {
    if (i >= desafios.length - 1) return null
    const a = posicoes[i + 1], b = posicoes[i + 2]
    if (!a || !b) return null
    const ok = concluidos.includes(d._id)
    return (
      <line key={i}
        x1={a.x + NODE / 2} y1={a.y + NODE / 2}
        x2={b.x + NODE / 2} y2={b.y + NODE / 2}
        stroke={ok ? '#22d3ee' : 'rgba(139,92,246,0.2)'}
        strokeWidth={ok ? 2.5 : 2}
        strokeDasharray={ok ? '0' : '8 5'}
        style={{ filter: ok ? 'drop-shadow(0 0 5px #22d3ee)' : 'none' }}
      />
    )
  })}
</svg>

            {/* Nó Introdução */}
            <div onClick={() => navigate('/introducao', { state: { linguagem } })} style={{
              position: 'absolute', left: posicoes[0].x, top: posicoes[0].y,
              width: INTRO_W, height: INTRO_H, borderRadius: 10,
              background: jaViuIntro ? 'rgba(34,211,238,0.15)' : 'rgba(250,196,75,0.15)',
              border: `2px solid ${jaViuIntro ? '#22d3ee' : '#fac44b'}`,
              boxShadow: jaViuIntro ? '0 0 16px rgba(34,211,238,0.4)' : '0 0 16px rgba(250,196,75,0.4)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'transform 0.15s', userSelect: 'none', gap: 2,
              backdropFilter: 'blur(8px)'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 11 }}>📖</span>
                <span style={{ fontSize: 11, fontWeight: 700, color: jaViuIntro ? '#22d3ee' : '#fac44b' }}>Introdução</span>
              </div>
              <span style={{ fontSize: 9, color: jaViuIntro ? '#22d3ee' : '#fac44b', opacity: 0.8 }}>
              </span>
            </div>

            {/* Nós dos desafios */}
            {desafios.map((d, i) => {
              const pos = posicoes[i + 1]
              if (!pos) return null
              const status = getStatus(d, i)
              const c = cores[status]
              return (
                <div key={d._id} onClick={() => abrirDesafio(d, i)} style={{
                  position: 'absolute', left: pos.x, top: pos.y,
                  width: NODE, height: NODE, borderRadius: 16,
                  background: c.bg, border: `2px solid ${c.border}`, boxShadow: c.shadow,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  cursor: status === 'bloqueado' ? 'not-allowed' : 'pointer',
                  transition: 'transform 0.15s', userSelect: 'none', backdropFilter: 'blur(8px)'
                }}
                onMouseEnter={e => { if (status !== 'bloqueado') e.currentTarget.style.transform = 'scale(1.1)' }}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                  <span style={{ fontSize: status === 'bloqueado' ? 24 : 20, lineHeight: 1 }}>
                    {status === 'concluido' ? '⚡' : status === 'bloqueado' ? '🔒' : i + 1}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: c.color, marginTop: 3 }}>+{d.pontos}XP</span>
                </div>
              )
            })}

            {/* Espaço no final */}
            <div style={{ height: 40 }}/>
          </div>
        )}
      </div>

      {/* ===== SETA PARA BAIXO ===== */}
      {showScrollDown && (
        <button onClick={() => scrollRef.current?.scrollBy({ top: 200, behavior: 'smooth' })} style={{
          position: 'fixed',
          bottom: 20, left: '50%', transform: 'translateX(-50%)',
          zIndex: 80,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(10,5,40,0.9)',
          border: '1.5px solid rgba(139,92,246,0.5)',
          boxShadow: '0 0 16px rgba(139,92,246,0.3)',
          color: '#a78bfa', fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', backdropFilter: 'blur(8px)'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.4)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,5,40,0.9)'}
        >↓</button>
      )}

      {/* ===== SETA PARA CIMA ===== */}
      {showScrollUp && (
        <button onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })} style={{
          position: 'fixed',
          bottom: showScrollDown ? 72 : 20, left: '50%', transform: 'translateX(-50%)',
          zIndex: 80,
          width: 44, height: 44, borderRadius: '50%',
          background: 'rgba(10,5,40,0.9)',
          border: '1.5px solid rgba(139,92,246,0.5)',
          boxShadow: '0 0 16px rgba(139,92,246,0.3)',
          color: '#a78bfa', fontSize: 20, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s', backdropFilter: 'blur(8px)'
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(124,58,237,0.4)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(10,5,40,0.9)'}
        >↑</button>
      )}

      {/* ===== EDITOR DE CÓDIGO ===== */}
      {editorAberto && desafioAtual?.tipo === 'criar' && (
        <EditorCodigo
          desafio={desafioAtual}
          linguagem={linguagem}
          onFechar={() => { setEditorAberto(false); fecharDesafio() }}
          onConcluir={(pontos) => {
            if (!concluidos.includes(desafioAtual._id)) {
              const nc = [...concluidos, desafioAtual._id]
              setConcluidos(nc)
              localStorage.setItem(`concluidos_${linguagem}_${nivel}`, JSON.stringify(nc))
              api.patch('/perfil/xp', { pontos }).then(({ data: pf }) => {
                const ua = { ...JSON.parse(localStorage.getItem('usuario') || '{}'), pontuacaoTotal: pf.pontuacaoTotal, nivel: pf.nivel }
                localStorage.setItem('usuario', JSON.stringify(ua))
                setXpAtual(pf.pontuacaoTotal)
              })
            }
            setTimeout(() => { setEditorAberto(false); setResultado({ correto: true, pontos }) }, 1500)
          }}
        />
      )}

      {/* ===== MODAL DO DESAFIO ===== */}
      {desafioAtual && !resultado && !editorAberto && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 300,
          background: 'rgba(0,0,0,0.82)', backdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 16, overflowY: 'auto'
        }}>
          <div style={{
            background: 'linear-gradient(135deg,#1a0a40,#0f0630)',
            border: '1px solid rgba(139,92,246,0.4)',
            borderRadius: 20, padding: '22px 20px',
            width: '100%', maxWidth: 500,
            boxShadow: '0 0 60px rgba(100,60,220,0.3)', margin: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ display: 'flex', gap: 6 }}>
                <span style={{ fontSize: 11, color: '#a78bfa', background: 'rgba(139,92,246,0.2)', padding: '3px 10px', borderRadius: 20 }}>
                  {desafioAtual.tipo === 'pergunta' ? '❓ Pergunta' : desafioAtual.tipo === 'correcao' ? '🔧 Correção' : '💻 Desenvolvimento'}
                </span>
                <span style={{ fontSize: 11, color: '#fcd34d', background: 'rgba(250,196,75,0.1)', padding: '3px 10px', borderRadius: 20 }}>
                  +{desafioAtual.pontos} XP
                </span>
              </div>
              <button onClick={fecharDesafio} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: 20, cursor: 'pointer' }}>✕</button>
            </div>

            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{desafioAtual.titulo}</h2>
            <p style={{ color: '#c4b5fd', fontSize: 13, marginBottom: 14, lineHeight: 1.6 }}>{desafioAtual.descricao}</p>

            {desafioAtual.codigoBase && (
              <div style={{
                background: '#050310', border: '1px solid rgba(139,92,246,0.3)',
                borderRadius: 10, padding: '12px 14px', marginBottom: 14,
                fontFamily: 'monospace', fontSize: 12, lineHeight: 1.8,
                color: '#e2e8f0', whiteSpace: 'pre-wrap', overflowX: 'auto'
              }}>{desafioAtual.codigoBase}</div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 12 }}>
              {desafioAtual.opcoes.map(opcao => {
                let bg = 'rgba(255,255,255,0.05)', border = 'rgba(139,92,246,0.3)', color = '#fff', opacity = 1
                if (respostaSelecionada) {
                  if (opcao === desafioAtual.respostaCorreta) { bg = 'rgba(34,197,94,0.2)'; border = '#22c55e'; color = '#86efac' }
                  else if (opcao === respostaSelecionada && !resultado?.correto) { bg = 'rgba(239,68,68,0.2)'; border = '#ef4444'; color = '#fca5a5' }
                  else { opacity = 0.35 }
                }
                return (
                  <button key={opcao} onClick={() => responder(opcao)} style={{
                    background: bg, border: `1.5px solid ${border}`,
                    borderRadius: 10, padding: '11px 8px', color,
                    fontWeight: 600, fontSize: 13, cursor: respostaSelecionada ? 'default' : 'pointer',
                    opacity, transition: 'all 0.2s', textAlign: 'left',
                    fontFamily: desafioAtual.tipo !== 'pergunta' ? 'monospace' : 'inherit'
                  }}>{opcao}</button>
                )
              })}
            </div>

            <p style={{ textAlign: 'center', color: 'rgba(167,139,250,0.5)', fontSize: 11 }}>
              ⓘ {desafioAtual.tipo === 'correcao' ? 'Identifique o erro no código' : desafioAtual.tipo === 'desenvolvimento' ? 'Escolha a opção que completa o código' : 'Toque na resposta correta'}
            </p>
          </div>
        </div>
      )}

      {/* ===== TELA DE RESULTADO ===== */}
      {resultado && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 400,
          background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16
        }}>
          <div style={{
            background: resultado.correto ? 'linear-gradient(135deg,#0a2010,#0f3020)' : 'linear-gradient(135deg,#200a0a,#300f0f)',
            border: `2px solid ${resultado.correto ? '#22c55e' : '#ef4444'}`,
            borderRadius: 24, padding: 36, width: '100%', maxWidth: 420,
            textAlign: 'center',
            boxShadow: resultado.correto ? '0 0 80px rgba(34,197,94,0.3)' : '0 0 80px rgba(239,68,68,0.3)',
            position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: -40, right: -40, width: 150, height: 150, borderRadius: '50%', background: resultado.correto ? 'rgba(34,197,94,0.06)' : 'rgba(239,68,68,0.06)', pointerEvents: 'none' }}/>
            <div style={{ position: 'absolute', bottom: -50, left: -30, width: 180, height: 180, borderRadius: '50%', background: resultado.correto ? 'rgba(34,197,94,0.04)' : 'rgba(239,68,68,0.04)', pointerEvents: 'none' }}/>

            <div style={{ fontSize: 60, marginBottom: 10, filter: resultado.correto ? 'drop-shadow(0 0 16px rgba(34,197,94,0.6))' : 'drop-shadow(0 0 16px rgba(239,68,68,0.6))' }}>
              {resultado.correto ? '✅' : '❌'}
            </div>

            <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8, color: resultado.correto ? '#4ade80' : '#f87171', letterSpacing: 1 }}>
              {resultado.correto ? 'Correto!' : 'Errado!'}
            </h2>

            {resultado.correto ? (
              <>
                <div style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: 16, padding: '16px 20px', marginBottom: 16, marginTop: 8 }}>
                  <div style={{ fontSize: 12, color: '#86efac', marginBottom: 4 }}>Pontos ganhos</div>
                  <div style={{ fontSize: 42, fontWeight: 900, color: '#4ade80', lineHeight: 1, filter: 'drop-shadow(0 0 8px rgba(74,222,128,0.5))' }}>+{resultado.pontos}</div>
                  <div style={{ fontSize: 13, color: '#86efac', fontWeight: 700 }}>XP</div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 20 }}>
                  {[
                    { icone: '🎯', label: 'Desafio', val: 'Concluído!', cor: '#86efac' },
                    { icone: '⚡', label: 'Nível', val: resultado.pontos >= 30 ? 'Experiente' : resultado.pontos >= 20 ? 'Intermediário' : 'Iniciante', cor: '#fcd34d' },
                  ].map((s, i) => (
                    <div key={i} style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)', borderRadius: 12, padding: '10px 8px' }}>
                      <div style={{ fontSize: 18, marginBottom: 3 }}>{s.icone}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{s.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: s.cor, marginTop: 2 }}>{s.val}</div>
                    </div>
                  ))}
                </div>

                <button onClick={fecharDesafio} style={{
                  width: '100%', background: 'linear-gradient(135deg,#16a34a,#22c55e)',
                  border: 'none', borderRadius: 14, padding: '14px',
                  color: '#fff', fontWeight: 900, fontSize: 15, cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(34,197,94,0.4)', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >Continuar →</button>
              </>
            ) : (
              <>
                <p style={{ color: '#fca5a5', fontSize: 13, marginBottom: 10, marginTop: 6 }}>A resposta correta era:</p>
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: '12px 14px', marginBottom: 14, fontFamily: desafioAtual?.tipo !== 'pergunta' ? 'monospace' : 'inherit', fontSize: 14, fontWeight: 700, color: '#fff' }}>
                  {resultado.respostaCorreta}
                </div>
                <div style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 12, padding: '10px 14px', marginBottom: 18, fontSize: 12, color: '#fca5a5' }}>
                  💡 Não desanime! Tente novamente e aprenda com o erro.
                </div>
                <button onClick={fecharDesafio} style={{
                  width: '100%', background: 'linear-gradient(135deg,#991b1b,#ef4444)',
                  border: 'none', borderRadius: 14, padding: '14px',
                  color: '#fff', fontWeight: 900, fontSize: 15, cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(239,68,68,0.3)', transition: 'all 0.2s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >Tentar novamente</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}