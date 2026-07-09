import { useState } from 'react'
import Editor from '@monaco-editor/react'
import { interpretarPortugol } from '../utils/interpretadorPortugol'

const JUDGE0_KEY = '2877bc76aemshcb45e685c6f6dbfp1ccc52jsnd3458e4a2731'

export default function EditorCodigo({ desafio, linguagem, onConcluir, onFechar }) {
  const [codigo, setCodigo] = useState(desafio.codigoBase || '')
  const [saida, setSaida] = useState(null)
  const [rodando, setRodando] = useState(false)
  const [erro, setErro] = useState(null)
  const [acertou, setAcertou] = useState(false)

  const isPortugol = linguagem === 'algoritmos'

  const normalizar = (str) =>
    (str || '').trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n')

  const rodarPortugol = () => {
    const entradas = desafio.entradaTeste || ''
    const resultado = interpretarPortugol(codigo, entradas)
    if (!resultado.sucesso) throw new Error(resultado.erro)
    return normalizar(resultado.saida)
  }

  const rodarJavaScript = async () => {
    const response = await fetch(
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': JUDGE0_KEY,
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        body: JSON.stringify({
          language_id: 63,
          source_code: codigo,
          stdin: desafio.entradaTeste || '',
        }),
      }
    )
    const data = await response.json()
    if (data.stderr && data.stderr.trim()) throw new Error(data.stderr)
    if (data.compile_output && data.compile_output.trim()) throw new Error(data.compile_output)
    return normalizar(data.stdout)
  }

  const rodarCodigo = async () => {
    setRodando(true)
    setSaida(null)
    setErro(null)
    setAcertou(false)

    try {
      const resultado = isPortugol ? rodarPortugol() : await rodarJavaScript()

      setSaida(resultado)

      const esperado = normalizar(desafio.respostaCorreta)
      if (resultado === esperado) {
        setAcertou(true)
        setTimeout(() => onConcluir(desafio.pontos), 1200)
      }
    } catch (err) {
      setErro(err.message || 'Erro ao executar o código.')
    } finally {
      setRodando(false)
    }
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 16, overflowY: 'auto'
    }}>
      <div style={{
        background: 'linear-gradient(135deg,#0f0a2e,#0a0520)',
        border: '1px solid rgba(139,92,246,0.4)',
        borderRadius: 20, width: '100%', maxWidth: 820,
        boxShadow: '0 0 60px rgba(100,60,220,0.3)',
        overflow: 'hidden', margin: 'auto'
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '12px 20px',
          background: 'rgba(139,92,246,0.1)',
          borderBottom: '1px solid rgba(139,92,246,0.2)'
        }}>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 11, color: '#a78bfa', background: 'rgba(139,92,246,0.2)', padding: '3px 10px', borderRadius: 20 }}>
              💻 Compilador {isPortugol ? 'Portugol' : 'JavaScript'}
            </span>
            <span style={{ fontSize: 11, color: '#fcd34d', background: 'rgba(250,196,75,0.1)', padding: '3px 10px', borderRadius: 20 }}>
              +{desafio.pontos} XP
            </span>
            <span style={{ fontSize: 11, color: isPortugol ? '#a78bfa' : '#fcd34d', background: 'rgba(255,255,255,0.05)', padding: '3px 10px', borderRadius: 20 }}>
              {isPortugol ? 'Portugol' : 'JavaScript'}
            </span>
          </div>
          <button onClick={onFechar} style={{ background: 'none', border: 'none', color: '#7c3aed', fontSize: 20, cursor: 'pointer' }}>✕</button>
        </div>

        {/* Enunciado */}
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(139,92,246,0.1)' }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{desafio.titulo}</h2>
          <p style={{ color: '#c4b5fd', fontSize: 13, lineHeight: 1.7, whiteSpace: 'pre-line' }}>{desafio.descricao}</p>

          {desafio.entradaTeste && (
            <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
              <div style={{
                background: 'rgba(10,5,40,0.8)', border: '1px solid rgba(139,92,246,0.2)',
                borderRadius: 8, padding: '8px 12px', flex: 1
              }}>
                <div style={{ fontSize: 10, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Entrada de teste</div>
                <code style={{ color: '#e2e8f0', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'pre' }}>{desafio.entradaTeste}</code>
              </div>
              <div style={{
                background: 'rgba(10,5,40,0.8)', border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: 8, padding: '8px 12px', flex: 1
              }}>
                <div style={{ fontSize: 10, color: '#64748b', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Saída esperada</div>
                <code style={{ color: '#4ade80', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'pre' }}>{desafio.respostaCorreta}</code>
              </div>
            </div>
          )}
        </div>

        {/* Barra do editor */}
        <div style={{
          padding: '6px 16px', background: 'rgba(5,3,20,0.9)',
          display: 'flex', alignItems: 'center', gap: 8
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ef4444' }}/>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#f59e0b' }}/>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e' }}/>
          </div>
          <span style={{ color: '#4c3a8a', fontSize: 11 }}>
            main.{isPortugol ? 'por' : 'js'}
          </span>
        </div>

        {/* Monaco Editor */}
        <Editor
          height="260px"
          language={isPortugol ? 'plaintext' : 'javascript'}
          value={codigo}
          onChange={(val) => setCodigo(val || '')}
          theme="vs-dark"
          options={{
            fontSize: 13,
            minimap: { enabled: false },
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 10 },
          }}
        />

        {/* Área de saída */}
        <div style={{
          padding: '12px 20px', minHeight: 72,
          background: 'rgba(5,3,20,0.8)',
          borderTop: '1px solid rgba(139,92,246,0.1)'
        }}>
          <div style={{ fontSize: 10, color: '#4c3a8a', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
            Saída do programa
          </div>

          {rodando && (
            <div style={{ color: '#a78bfa', fontSize: 13, fontFamily: 'monospace' }}>
              ⏳ Executando...
            </div>
          )}

          {erro && !rodando && (
            <div style={{ color: '#f87171', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
              ❌ {erro}
            </div>
          )}

          {saida !== null && !erro && !rodando && (
            <div>
              <div style={{
                color: acertou ? '#4ade80' : '#e2e8f0',
                fontSize: 13, fontFamily: 'monospace',
                whiteSpace: 'pre-wrap', lineHeight: 1.6
              }}>
                {saida || '(sem saída)'}
              </div>
              {acertou && (
                <div style={{ marginTop: 8, color: '#4ade80', fontWeight: 700, fontSize: 13 }}>
                  ✅ Saída correta! +{desafio.pontos} XP conquistados!
                </div>
              )}
              {!acertou && saida !== null && (
                <div style={{ marginTop: 6, color: '#f87171', fontSize: 12 }}>
                  ❌ Saída diferente do esperado. Revise e tente novamente!
                </div>
              )}
            </div>
          )}

          {saida === null && !rodando && !erro && (
            <div style={{ color: '#334155', fontSize: 12, fontFamily: 'monospace' }}>
              {'>'} Clique em Executar para ver o resultado...
            </div>
          )}
        </div>

        {/* Botões */}
        <div style={{
          padding: '12px 20px',
          borderTop: '1px solid rgba(139,92,246,0.1)',
          display: 'flex', gap: 10,
          background: 'rgba(10,5,32,0.6)'
        }}>
          <button onClick={onFechar} style={{
            background: 'rgba(139,92,246,0.1)',
            border: '1px solid rgba(139,92,246,0.3)',
            borderRadius: 10, padding: '10px 20px',
            color: '#c4b5fd', fontSize: 13, cursor: 'pointer'
          }}>← Voltar</button>

          <button
            onClick={rodarCodigo}
            disabled={rodando || acertou}
            style={{
              flex: 1,
              background: acertou
                ? 'linear-gradient(135deg,#16a34a,#22c55e)'
                : rodando
                ? 'rgba(124,58,237,0.4)'
                : 'linear-gradient(135deg,#7c3aed,#a855f7)',
              border: 'none', borderRadius: 10, padding: '10px 20px',
              color: '#fff', fontWeight: 700, fontSize: 14,
              cursor: rodando || acertou ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {acertou ? '✅ Correto!' : rodando ? '⏳ Executando...' : '▶ Executar código'}
          </button>
        </div>
      </div>
    </div>
  )
}