import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'

const CONQUISTAS = [
  // Primeiros passos
  { id: 'primeiro_desafio',    icone: '🎯', nome: 'Primeiro Passo',      desc: 'Complete seu primeiro desafio',           condicao: (s) => s.totalConcluidos >= 1 },
  { id: 'cinco_desafios',      icone: '🔥', nome: 'Pegando o Ritmo',     desc: 'Complete 5 desafios',                     condicao: (s) => s.totalConcluidos >= 5 },
  { id: 'dez_desafios',        icone: '⚡', nome: 'Imparável',           desc: 'Complete 10 desafios',                    condicao: (s) => s.totalConcluidos >= 10 },
  { id: 'vinte_desafios',      icone: '💪', nome: 'Determinado',         desc: 'Complete 20 desafios',                    condicao: (s) => s.totalConcluidos >= 20 },
  { id: 'todos_desafios',      icone: '👑', nome: 'Mestre Supremo',      desc: 'Complete todos os desafios disponíveis',  condicao: (s) => s.totalConcluidos >= 60 },

  // Algoritmos
  { id: 'algo_iniciante',      icone: '🌱', nome: 'Algoritmista Júnior', desc: 'Complete todos os desafios iniciantes de Algoritmos',       condicao: (s) => s.algoIniciante >= 10 },
  { id: 'algo_intermediario',  icone: '⚙️', nome: 'Lógico',              desc: 'Complete todos os desafios intermediários de Algoritmos',   condicao: (s) => s.algoIntermediario >= 10 },
  { id: 'algo_experiente',     icone: '🧠', nome: 'Mestre dos Algoritmos', desc: 'Complete todos os desafios experientes de Algoritmos',   condicao: (s) => s.algoExperiente >= 10 },
  { id: 'algo_completo',       icone: '🏆', nome: 'Rei dos Algoritmos',  desc: 'Complete todos os níveis de Algoritmos',                    condicao: (s) => s.algoIniciante >= 10 && s.algoIntermediario >= 10 && s.algoExperiente >= 10 },

  // JavaScript
  { id: 'js_iniciante',        icone: '🌿', nome: 'Dev Júnior',          desc: 'Complete todos os desafios iniciantes de JavaScript',       condicao: (s) => s.jsIniciante >= 10 },
  { id: 'js_intermediario',    icone: '💻', nome: 'Dev em Formação',     desc: 'Complete todos os desafios intermediários de JavaScript',   condicao: (s) => s.jsIntermediario >= 10 },
  { id: 'js_experiente',       icone: '🚀', nome: 'Dev Sênior',          desc: 'Complete todos os desafios experientes de JavaScript',      condicao: (s) => s.jsExperiente >= 10 },
  { id: 'js_completo',         icone: '🌟', nome: 'Mestre do JavaScript', desc: 'Complete todos os níveis de JavaScript',                   condicao: (s) => s.jsIniciante >= 10 && s.jsIntermediario >= 10 && s.jsExperiente >= 10 },

  // XP
  { id: 'xp_100',              icone: '💰', nome: 'Caçador de XP',       desc: 'Acumule 100 XP',                          condicao: (s) => s.xp >= 100 },
  { id: 'xp_300',              icone: '💎', nome: 'Colecionador',        desc: 'Acumule 300 XP',                          condicao: (s) => s.xp >= 300 },
  { id: 'xp_500',              icone: '👾', nome: 'Lendário',            desc: 'Acumule 500 XP',                          condicao: (s) => s.xp >= 500 },
  { id: 'xp_1000',             icone: '🌌', nome: 'Épico',               desc: 'Acumule 1000 XP',                         condicao: (s) => s.xp >= 1000 },

  // Nível
  { id: 'nivel_2',             icone: '📈', nome: 'Evoluindo',           desc: 'Alcance o Nível 2',                       condicao: (s) => s.nivel >= 2 },
  { id: 'nivel_3',             icone: '🎖️', nome: 'Veterano',            desc: 'Alcance o Nível 3',                       condicao: (s) => s.nivel >= 3 },

  // Especiais
  { id: 'todos_linguagens',    icone: '🌍', nome: 'Poliglota',           desc: 'Complete pelo menos 1 desafio em cada linguagem',           condicao: (s) => s.algoIniciante >= 1 && s.jsIniciante >= 1 },
  { id: 'perfeito',            icone: '💯', nome: 'Perfeicionista',      desc: 'Complete 30 desafios sem errar',          condicao: (s) => s.semErros >= 30 },
]

const CERTIFICADOS = [
  { id: 'algo_iniciante',     nome: 'Algoritmos — Iniciante',      icone: '📜', cor: '#7c3aed', chave: 'concluidos_algoritmos_iniciante',     total: 10 },
  { id: 'algo_intermediario', nome: 'Algoritmos — Intermediário',  icone: '📋', cor: '#6d28d9', chave: 'concluidos_algoritmos_intermediario',  total: 10 },
  { id: 'algo_experiente',    nome: 'Algoritmos — Experiente',     icone: '🏅', cor: '#4c1d95', chave: 'concluidos_algoritmos_experiente',     total: 10 },
  { id: 'js_iniciante',       nome: 'JavaScript — Iniciante',      icone: '📜', cor: '#b45309', chave: 'concluidos_javascript_iniciante',      total: 10 },
  { id: 'js_intermediario',   nome: 'JavaScript — Intermediário',  icone: '📋', cor: '#92400e', chave: 'concluidos_javascript_intermediario',  total: 10 },
  { id: 'js_experiente',      nome: 'JavaScript — Experiente',     icone: '🏅', cor: '#78350f', chave: 'concluidos_javascript_experiente',     total: 10 },
]

export default function Perfil() {
  const [perfil, setPerfil] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [abaAtiva, setAbaAtiva] = useState('resumo')
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    buscarDados()
  }, [])

  const buscarDados = async () => {
    try {
      const { data } = await api.get('/perfil')
      setPerfil(data)
    } catch (error) {
      console.error('Erro ao buscar perfil:', error)
    } finally {
      setCarregando(false)
    }
  }

  const getStats = () => {
    const algoIniciante     = JSON.parse(localStorage.getItem('concluidos_algoritmos_iniciante') || '[]').length
    const algoIntermediario = JSON.parse(localStorage.getItem('concluidos_algoritmos_intermediario') || '[]').length
    const algoExperiente    = JSON.parse(localStorage.getItem('concluidos_algoritmos_experiente') || '[]').length
    const jsIniciante       = JSON.parse(localStorage.getItem('concluidos_javascript_iniciante') || '[]').length
    const jsIntermediario   = JSON.parse(localStorage.getItem('concluidos_javascript_intermediario') || '[]').length
    const jsExperiente      = JSON.parse(localStorage.getItem('concluidos_javascript_experiente') || '[]').length
    const totalConcluidos   = algoIniciante + algoIntermediario + algoExperiente + jsIniciante + jsIntermediario + jsExperiente
    const semErros          = parseInt(localStorage.getItem('acertos_sem_erro') || '0')
    return {
      algoIniciante, algoIntermediario, algoExperiente,
      jsIniciante, jsIntermediario, jsExperiente,
      totalConcluidos, semErros,
      xp: perfil?.pontuacaoTotal || 0,
      nivel: perfil?.nivel || 1
    }
  }

  const getLiga = (nivel) => {
    if (nivel >= 3) return 'Avançado'
    if (nivel >= 2) return 'Intermediário'
    return 'Iniciante'
  }

  const getXPInfo = (xp) => {
    if (xp < 80)  return { atual: xp,      necessario: 80,  proximo: 2 }
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

  const stats    = getStats()
  const xpInfo   = getXPInfo(perfil?.pontuacaoTotal || 0)
  const pctXP    = Math.min(100, Math.round((xpInfo.atual / xpInfo.necessario) * 100))
  const conquistas = CONQUISTAS.map(c => ({ ...c, desbloqueada: c.condicao(stats) }))
  const desbloqueadas = conquistas.filter(c => c.desbloqueada).length

  const abas = [
    { key: 'resumo',     label: '📊 Resumo' },
    { key: 'certificados', label: '📜 Certificados' },
    { key: 'conquistas', label: '🏅 Conquistas' },
  ]

  const card = (children, extra = {}) => (
    <div style={{
      background: 'rgba(20,10,55,0.7)',
      border: '1px solid rgba(139,92,246,0.3)',
      borderRadius: 16, padding: 20,
      backdropFilter: 'blur(10px)',
      ...extra
    }}>{children}</div>
  )

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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
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

      <div style={{ paddingTop: 72, paddingBottom: 60, maxWidth: 600, margin: '0 auto', padding: '72px 20px 60px' }}>

        {/* Card do usuário */}
        {card(
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'linear-gradient(135deg,#6d28d9,#1d4ed8)',
                border: '2px solid rgba(139,92,246,0.6)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26
              }}>🤖</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#e2e8f0' }}>{perfil?.nome}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                  <span style={{ color: '#fcd34d', fontSize: 13, flexShrink: 0 }}>⚡ {perfil?.pontuacaoTotal || 0} XP</span>
                  <div style={{ flex: 1, height: 6, background: 'rgba(255,255,255,0.1)', borderRadius: 3, overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg,#7c3aed,#60a5fa)', width: `${pctXP}%`, transition: 'width 0.5s' }}/>
                  </div>
                  <span style={{ color: '#64748b', fontSize: 11 }}>{pctXP}%</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                <span style={{ color: '#fcd34d', fontSize: 13, fontWeight: 700 }}>🏅 {desbloqueadas} conquistas</span>
                <span style={{
                  background: 'rgba(100,80,200,0.2)', border: '1px solid rgba(139,92,246,0.4)',
                  borderRadius: 20, padding: '3px 12px', fontSize: 11, color: '#c4b5fd'
                }}>Liga: {getLiga(perfil?.nivel || 1)}</span>
              </div>
            </div>

            {/* Stats rápidos */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10 }}>
              {[
                { label: 'Total concluídos', valor: stats.totalConcluidos, cor: '#22d3ee' },
                { label: 'Nível atual',       valor: `Nível ${perfil?.nivel || 1}`, cor: '#a78bfa' },
                { label: 'XP acumulado',      valor: `${perfil?.pontuacaoTotal || 0} XP`, cor: '#fcd34d' },
              ].map((s, i) => (
                <div key={i} style={{
                  background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.15)',
                  borderRadius: 12, padding: '10px 12px', textAlign: 'center'
                }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: s.cor }}>{s.valor}</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </>
        , { marginBottom: 16 })}

        {/* Abas */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {abas.map(aba => (
            <button key={aba.key} onClick={() => setAbaAtiva(aba.key)} style={{
              flex: 1, padding: '10px 8px', borderRadius: 12,
              fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer',
              background: abaAtiva === aba.key ? 'rgba(124,58,237,0.4)' : 'rgba(139,92,246,0.1)',
              color: abaAtiva === aba.key ? '#fff' : '#94a3b8',
              border: abaAtiva === aba.key ? '1px solid rgba(139,92,246,0.6)' : '1px solid transparent',
              transition: 'all 0.2s'
            }}>{aba.label}</button>
          ))}
        </div>

        {/* ABA RESUMO */}
        {abaAtiva === 'resumo' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { lang: 'Algoritmos', cor: '#7c3aed', itens: [
                { label: 'Iniciante',     val: stats.algoIniciante,     total: 10 },
                { label: 'Intermediário', val: stats.algoIntermediario, total: 10 },
                { label: 'Experiente',    val: stats.algoExperiente,    total: 10 },
              ]},
              { lang: 'JavaScript', cor: '#eab308', itens: [
                { label: 'Iniciante',     val: stats.jsIniciante,     total: 10 },
                { label: 'Intermediário', val: stats.jsIntermediario, total: 10 },
                { label: 'Experiente',    val: stats.jsExperiente,    total: 10 },
              ]},
            ].map(({ lang, cor, itens }) => card(
              <>
                <div style={{ fontSize: 14, fontWeight: 700, color: cor, marginBottom: 12 }}>{lang}</div>
                {itens.map(({ label, val, total }) => (
                  <div key={label} style={{ marginBottom: 10 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 12, color: '#94a3b8' }}>{label}</span>
                      <span style={{ fontSize: 12, color: '#e2e8f0', fontWeight: 700 }}>{val}/{total}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: `linear-gradient(90deg, ${cor}, ${cor}88)`,
                        width: `${Math.round((val / total) * 100)}%`,
                        transition: 'width 0.5s'
                      }}/>
                    </div>
                  </div>
                ))}
              </>
            , { marginBottom: 0 }))}
          </div>
        )}

        {/* ABA CERTIFICADOS */}
        {abaAtiva === 'certificados' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {CERTIFICADOS.map(cert => {
              const concluidos = JSON.parse(localStorage.getItem(cert.chave) || '[]').length
              const pct = Math.round((concluidos / cert.total) * 100)
              const completo = concluidos >= cert.total
              return card(
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                    background: completo ? `${cert.cor}33` : 'rgba(30,20,80,0.5)',
                    border: `1px solid ${completo ? cert.cor : 'rgba(139,92,246,0.2)'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, opacity: completo ? 1 : 0.5
                  }}>{cert.icone}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: completo ? '#e2e8f0' : '#64748b', marginBottom: 6 }}>
                      {cert.nome}
                      {completo && <span style={{ marginLeft: 8, color: '#4ade80', fontSize: 11 }}>✓ Completo</span>}
                    </div>
                    <div style={{ height: 5, background: 'rgba(255,255,255,0.08)', borderRadius: 3, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: 3,
                        background: completo ? '#4ade80' : `linear-gradient(90deg, ${cert.cor}, ${cert.cor}88)`,
                        width: `${pct}%`, transition: 'width 0.5s'
                      }}/>
                    </div>
                  </div>
                  <div style={{
                    fontSize: 13, fontWeight: 700, minWidth: 40, textAlign: 'right',
                    color: completo ? '#4ade80' : '#94a3b8'
                  }}>{pct}%</div>
                </div>
              , { marginBottom: 0 })
            })}
          </div>
        )}

        {/* ABA CONQUISTAS */}
        {abaAtiva === 'conquistas' && (
          <>
            <div style={{ textAlign: 'center', marginBottom: 14, color: '#64748b', fontSize: 12 }}>
              {desbloqueadas}/{CONQUISTAS.length} conquistas desbloqueadas
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {conquistas.map(c => (
                <div key={c.id} style={{
                  background: c.desbloqueada ? 'rgba(250,196,75,0.08)' : 'rgba(20,10,60,0.5)',
                  border: `1px solid ${c.desbloqueada ? 'rgba(250,196,75,0.3)' : 'rgba(139,92,246,0.15)'}`,
                  borderRadius: 14, padding: '14px 12px',
                  opacity: c.desbloqueada ? 1 : 0.45,
                  transition: 'all 0.2s'
                }}>
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{c.icone}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: c.desbloqueada ? '#e2e8f0' : '#4c3a8a', marginBottom: 4 }}>
                    {c.nome}
                    {c.desbloqueada && <span style={{ marginLeft: 4, color: '#4ade80' }}>✓</span>}
                  </div>
                  <div style={{ fontSize: 11, color: '#475569', lineHeight: 1.4 }}>{c.desc}</div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Botão continuar */}
        <button onClick={() => navigate('/desafios')} style={{
          width: '100%', marginTop: 20,
          background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
          border: 'none', borderRadius: 14, padding: '14px',
          color: '#fff', fontWeight: 700, fontSize: 15, cursor: 'pointer'
        }}>Continuar</button>
      </div>
    </div>
  )
}