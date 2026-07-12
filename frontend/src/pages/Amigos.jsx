import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

const MEDALHAS_NIVEL = { 1: '🌱', 2: '🔥', 3: '⚡' }

export default function Amigos() {
  const [ranking, setRanking] = useState([])
  const [codigoAmigo, setCodigoAmigo] = useState('')
  const [inputCodigo, setInputCodigo] = useState('')
  const [carregando, setCarregando] = useState(true)
  const [adicionando, setAdicionando] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')
  const [copiado, setCopiado] = useState(false)
  const navigate = useNavigate()

  const linkConvite = `${window.location.origin}/cadastro?convite=${codigoAmigo}`

  useEffect(() => {
    buscarDados()
  }, [])

  const buscarDados = async () => {
    try {
      setCarregando(true)
      const [{ data: amigosData }, { data: codigoData }] = await Promise.all([
        api.get('/amigos'),
        api.get('/amigos/codigo'),
      ])
      setRanking(amigosData.ranking)
      setCodigoAmigo(codigoData.codigoAmigo)
    } catch (error) {
      console.error('Erro ao buscar amigos:', error)
    } finally {
      setCarregando(false)
    }
  }

  const adicionarAmigo = async () => {
    if (!inputCodigo.trim()) return
    setAdicionando(true)
    setErro('')
    setSucesso('')
    try {
      const { data } = await api.post('/amigos/adicionar', { codigo: inputCodigo })
      setSucesso(data.message)
      setInputCodigo('')
      buscarDados()
      setTimeout(() => setSucesso(''), 3000)
    } catch (error) {
      setErro(error.response?.data?.message || 'Erro ao adicionar amigo')
    } finally {
      setAdicionando(false)
    }
  }

  const removerAmigo = async (amigoId) => {
    try {
      await api.delete(`/amigos/${amigoId}`)
      buscarDados()
    } catch (error) {
      console.error('Erro ao remover:', error)
    }
  }

  const copiarCodigo = () => {
    navigator.clipboard.writeText(codigoAmigo)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  const copiarLink = () => {
    navigator.clipboard.writeText(linkConvite)
    setSucesso('Link copiado!')
    setTimeout(() => setSucesso(''), 2000)
  }

  const getLiga = (nivel) => {
    if (nivel >= 3) return 'Avançado'
    if (nivel >= 2) return 'Intermediário'
    return 'Iniciante'
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, overflowY: 'auto', fontFamily: 'sans-serif'
    }}>
      <div style={{
        background: 'linear-gradient(135deg,#0f0a2e,#0a0520)',
        border: '1px solid rgba(139,92,246,0.4)',
        borderRadius: 20, width: '100%', maxWidth: 500,
        boxShadow: '0 0 60px rgba(100,60,220,0.3)',
        overflow: 'hidden', margin: 'auto'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '14px 20px',
          background: 'rgba(139,92,246,0.1)',
          borderBottom: '1px solid rgba(139,92,246,0.2)'
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0', margin: 0 }}>
            👥 Amigos
          </h2>
          <button onClick={() => navigate('/desafios')} style={{
            background: 'none', border: 'none', color: '#7c3aed', fontSize: 20, cursor: 'pointer'
          }}>✕</button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Meu código */}
          <div style={{
            background: 'rgba(124,58,237,0.1)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: 14, padding: 16
          }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>
              Seu código de amigo
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <div style={{
                flex: 1, background: 'rgba(10,5,40,0.8)',
                border: '1px solid rgba(139,92,246,0.3)',
                borderRadius: 10, padding: '10px 14px',
                fontFamily: 'monospace', fontSize: 20,
                fontWeight: 900, color: '#a78bfa',
                letterSpacing: 4, textAlign: 'center'
              }}>
                {codigoAmigo || '...'}
              </div>
              <button onClick={copiarCodigo} style={{
                background: copiado ? 'rgba(34,197,94,0.2)' : 'rgba(124,58,237,0.2)',
                border: `1px solid ${copiado ? '#22c55e' : 'rgba(139,92,246,0.4)'}`,
                borderRadius: 10, padding: '10px 14px',
                color: copiado ? '#4ade80' : '#c4b5fd',
                fontSize: 13, cursor: 'pointer', fontWeight: 600,
                transition: 'all 0.2s', whiteSpace: 'nowrap'
              }}>
                {copiado ? '✓ Copiado!' : '📋 Copiar'}
              </button>
            </div>

            {/* Link de convite */}
            <button onClick={copiarLink} style={{
              width: '100%',
              background: 'rgba(139,92,246,0.1)',
              border: '1px solid rgba(139,92,246,0.2)',
              borderRadius: 10, padding: '9px 14px',
              color: '#94a3b8', fontSize: 12, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6
            }}>
              🔗 Copiar link de convite
            </button>
          </div>

          {/* Adicionar amigo */}
          <div style={{
            background: 'rgba(20,10,55,0.6)',
            border: '1px solid rgba(139,92,246,0.2)',
            borderRadius: 14, padding: 16
          }}>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
              Adicionar amigo pelo código
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={inputCodigo}
                onChange={e => setInputCodigo(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && adicionarAmigo()}
                placeholder="Ex: ABCD-1234"
                maxLength={9}
                style={{
                  flex: 1, background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(139,92,246,0.3)',
                  borderRadius: 10, padding: '10px 14px',
                  color: '#fff', fontSize: 15, outline: 'none',
                  fontFamily: 'monospace', letterSpacing: 2,
                  textTransform: 'uppercase'
                }}
              />
              <button onClick={adicionarAmigo} disabled={adicionando} style={{
                background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                border: 'none', borderRadius: 10, padding: '10px 16px',
                color: '#fff', fontWeight: 700, fontSize: 13,
                cursor: adicionando ? 'not-allowed' : 'pointer',
                opacity: adicionando ? 0.7 : 1, whiteSpace: 'nowrap'
              }}>
                {adicionando ? '...' : '+ Adicionar'}
              </button>
            </div>

            {erro && (
              <div style={{ color: '#f87171', fontSize: 12, marginTop: 8 }}>❌ {erro}</div>
            )}
            {sucesso && (
              <div style={{ color: '#4ade80', fontSize: 12, marginTop: 8 }}>✅ {sucesso}</div>
            )}
          </div>

          {/* Ranking */}
          <div>
            <div style={{ fontSize: 11, color: '#64748b', marginBottom: 10, textTransform: 'uppercase', letterSpacing: 1 }}>
              🏆 Ranking de amigos
            </div>

            {carregando ? (
              <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
                Carregando...
              </div>
            ) : ranking.length === 0 ? (
              <div style={{ color: '#64748b', fontSize: 13, textAlign: 'center', padding: 20 }}>
                Adicione amigos para ver o ranking!
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {ranking.map((pessoa, index) => {
                  const medalha = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}º`
                  return (
                    <div key={String(pessoa.id)} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      background: pessoa.voce
                        ? 'rgba(124,58,237,0.15)'
                        : 'rgba(20,10,55,0.5)',
                      border: `1px solid ${pessoa.voce ? 'rgba(139,92,246,0.4)' : 'rgba(139,92,246,0.1)'}`,
                      borderRadius: 12, padding: '12px 14px',
                      transition: 'all 0.2s'
                    }}>
                      {/* Posição */}
                      <div style={{ fontSize: 18, minWidth: 28, textAlign: 'center' }}>
                        {medalha}
                      </div>

                      {/* Avatar */}
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: pessoa.voce
                          ? 'linear-gradient(135deg,#7c3aed,#a855f7)'
                          : 'linear-gradient(135deg,#1d4ed8,#6d28d9)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, flexShrink: 0
                      }}>
                        {MEDALHAS_NIVEL[pessoa.nivel] || '🌱'}
                      </div>

                      {/* Nome e liga */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 13, fontWeight: 700,
                          color: pessoa.voce ? '#c4b5fd' : '#e2e8f0',
                          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                        }}>
                          {pessoa.nome}
                        </div>
                        <div style={{ fontSize: 11, color: '#64748b', marginTop: 1 }}>
                          {getLiga(pessoa.nivel)}
                        </div>
                      </div>

                      {/* XP */}
                      <div style={{
                        fontSize: 13, fontWeight: 700,
                        color: '#fcd34d', flexShrink: 0
                      }}>
                        ⚡ {pessoa.pontuacaoTotal} XP
                      </div>

                      {/* Remover (só para amigos, não para si mesmo) */}
                      {!pessoa.voce && (
                        <button onClick={() => removerAmigo(pessoa.id)} style={{
                          background: 'rgba(239,68,68,0.1)',
                          border: '1px solid rgba(239,68,68,0.2)',
                          borderRadius: 8, padding: '4px 8px',
                          color: '#f87171', fontSize: 11,
                          cursor: 'pointer', flexShrink: 0
                        }}>✕</button>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}