import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const conteudos = {
  algoritmos: {
    titulo: 'Algoritmos',
    cor: '#7c3aed',
    icone: '⚙️',
    video: 'https://www.youtube.com/embed/mstMhMT_UeA',
    paginas: [
      {
        titulo: 'O que é um Algoritmo?',
        texto: 'Um algoritmo é uma sequência lógica de passos para resolver um problema. Pense em uma receita de bolo — ela tem passos em ordem, ingredientes e um resultado final. Na programação é a mesma ideia: você diz ao computador exatamente o que fazer, passo a passo.',
        topicos: null,
        exemplo: null
      },
      {
        titulo: 'O que você vai aprender',
        texto: 'Para começar a programar com algoritmos, você precisa entender os seguintes conceitos fundamentais:',
        topicos: [
          { icone: '📥', titulo: 'Entrada e Saída', desc: 'Leia (receber dados) e Escreva (mostrar resultado)' },
          { icone: '📦', titulo: 'Variáveis', desc: 'Guardar informações na memória do computador' },
          { icone: '🔀', titulo: 'Condicionais', desc: 'Tomar decisões com Se... Então... Senão' },
          { icone: '🔁', titulo: 'Repetição', desc: 'Repetir ações com Enquanto e Para' },
        ],
        exemplo: null
      },
      {
        titulo: 'Exemplo: Algoritmo simples',
        texto: 'Veja como funciona um algoritmo que pede o nome do usuário e exibe uma saudação:',
        topicos: null,
        exemplo: {
          codigo: [
            { linha: 'Início', cor: '#a78bfa' },
            { linha: '  Escreva("Qual é o seu nome?")', cor: '#e2e8f0' },
            { linha: '  Leia(nome)', cor: '#e2e8f0' },
            { linha: '  Escreva("Olá, " + nome + "!")', cor: '#4ade80' },
            { linha: 'Fim', cor: '#a78bfa' },
          ],
          saida: 'Qual é o seu nome?\n> Victor\nOlá, Victor!'
        }
      }
    ]
  },
  javascript: {
    titulo: 'JavaScript',
    cor: '#eab308',
    icone: '⚡',
    video: 'https://www.youtube.com/embed/rmNMBjse-m0',
    paginas: [
      {
        titulo: 'O que é JavaScript?',
        texto: 'JavaScript é a linguagem de programação mais usada no mundo. Ela roda diretamente no navegador e é responsável por tornar as páginas web interativas — botões, formulários, animações e muito mais. Também pode ser usada no servidor com Node.js.',
        topicos: null,
        exemplo: null
      },
      {
        titulo: 'O que você vai aprender',
        texto: 'Para começar com JavaScript, você precisa entender estes conceitos essenciais:',
        topicos: [
          { icone: '📦', titulo: 'Variáveis', desc: 'let, const e var para guardar dados' },
          { icone: '🔢', titulo: 'Tipos de dados', desc: 'String, Number, Boolean, Array e Object' },
          { icone: '🔀', titulo: 'Condicionais', desc: 'if, else e switch para tomar decisões' },
          { icone: '⚙️', titulo: 'Funções', desc: 'function para organizar e reutilizar código' },
        ],
        exemplo: null
      },
      {
        titulo: 'Exemplo: Código JavaScript',
        texto: 'Veja como funciona um código que calcula a idade de uma pessoa:',
        topicos: null,
        exemplo: {
          codigo: [
            { linha: 'let nome = "Victor"', cor: '#e2e8f0' },
            { linha: 'let anoNascimento = 2000', cor: '#e2e8f0' },
            { linha: 'let anoAtual = 2026', cor: '#e2e8f0' },
            { linha: '', cor: '#e2e8f0' },
            { linha: 'let idade = anoAtual - anoNascimento', cor: '#fcd34d' },
            { linha: '', cor: '#e2e8f0' },
            { linha: 'console.log(nome + " tem " + idade + " anos")', cor: '#4ade80' },
          ],
          saida: 'Victor tem 26 anos'
        }
      }
    ]
  }
}

export default function Introducao() {
  const navigate = useNavigate()
  const location = useLocation()
  const linguagem = location.state?.linguagem || 'algoritmos'
  const conteudo = conteudos[linguagem]
  const [modo, setModo] = useState(null) // null = escolha, 'video', 'texto'
  const [pagina, setPagina] = useState(0)

  const paginaAtual = conteudo.paginas[pagina]
  const ultima = pagina === conteudo.paginas.length - 1

  const irParaDesafios = () => {
  localStorage.setItem(`introducao_${linguagem}`, 'true')
  navigate('/desafios')
}

  const avancar = () => {
    if (ultima) irParaDesafios()
    else setPagina(p => p + 1)
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at 50% 0%, #2d0b6b 0%, #0a0520 60%)',
      color: 'white', fontFamily: 'sans-serif',
      display: 'flex', flexDirection: 'column'
    }}>

      {/* Grade */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', opacity: 0.07,
        backgroundImage: 'linear-gradient(rgba(139,92,246,1) 1px,transparent 1px),linear-gradient(90deg,rgba(139,92,246,1) 1px,transparent 1px)',
        backgroundSize: '40px 40px'
      }}/>

      {/* Topbar */}
      <div style={{
        position: 'fixed', top: 0, left: 136, right: 136, zIndex: 100,
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

        <div style={{
          background: 'rgba(139,92,246,0.15)',
          border: '1px solid rgba(139,92,246,0.3)',
          borderRadius: 20, padding: '4px 16px',
          fontSize: 13, color: '#c4b5fd'
        }}>
          Introdução de {conteudo.titulo}
        </div>

        <button onClick={() => irParaDesafios()} style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(239,68,68,0.1)',
          border: 'none', color: '#f87171',
          fontSize: 16, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>✕</button>
      </div>

      {/* Conteúdo principal */}
      <div style={{
        flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 40px'
      }}>

        {/* ===== TELA DE ESCOLHA ===== */}
        {!modo && (
          <div style={{
            background: 'rgba(230,220,255,0.94)',
            borderRadius: 20, padding: '40px 36px',
            maxWidth: 480, width: '100%',
            color: '#1e0a4e',
            boxShadow: '0 0 60px rgba(100,60,220,0.3)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>{conteudo.icone}</div>
            <h2 style={{ fontSize: 22, fontWeight: 700, color: '#2d1b69', marginBottom: 8 }}>
              Introdução: {conteudo.titulo}
            </h2>
            <p style={{ fontSize: 14, color: '#5b4a9e', marginBottom: 32, lineHeight: 1.7 }}>
              Como você prefere aprender o conteúdo antes de começar os desafios?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

              {/* Opção vídeo */}
              <button onClick={() => setModo('video')} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                background: 'rgba(239,68,68,0.1)',
                border: '2px solid rgba(239,68,68,0.3)',
                borderRadius: 14, padding: '16px 20px',
                cursor: 'pointer', transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#ef4444'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(239,68,68,0.3)'}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: 'rgba(239,68,68,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0
                }}>▶️</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#7f1d1d' }}>
                    Assistir vídeo
                  </div>
                  <div style={{ fontSize: 12, color: '#991b1b', marginTop: 2 }}>
                    Aprenda de forma visual no YouTube
                  </div>
                </div>
              </button>

              {/* Opção texto */}
              <button onClick={() => setModo('texto')} style={{
                display: 'flex', alignItems: 'center', gap: 16,
                background: `${conteudo.cor}18`,
                border: `2px solid ${conteudo.cor}44`,
                borderRadius: 14, padding: '16px 20px',
                cursor: 'pointer', transition: 'all 0.2s',
                textAlign: 'left'
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = conteudo.cor}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${conteudo.cor}44`}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: `${conteudo.cor}22`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0
                }}>📖</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#2d1b69' }}>
                    Ler conteúdo
                  </div>
                  <div style={{ fontSize: 12, color: '#5b4a9e', marginTop: 2 }}>
                    Explicação com exemplos de código
                  </div>
                </div>
              </button>

              {/* Pular */}
              <button onClick={() => irParaDesafios()} style={{
                background: 'none', border: 'none',
                color: '#7c6fa0', fontSize: 13,
                cursor: 'pointer', marginTop: 4,
                textDecoration: 'underline'
              }}>
                Pular introdução e ir direto aos desafios
              </button>
            </div>
          </div>
        )}

        {/* ===== MODO VÍDEO ===== */}
        {modo === 'video' && (
          <div style={{
            maxWidth: 680, width: '100%',
            display: 'flex', flexDirection: 'column', gap: 16
          }}>
            <div style={{
              background: 'rgba(10,5,32,0.9)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 0 40px rgba(100,60,220,0.3)'
            }}>
              <iframe
                width="100%"
                height="380"
                src={conteudo.video}
                title={`Introdução ${conteudo.titulo}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ display: 'block' }}
              />
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setModo(null)} style={{
                background: 'rgba(139,92,246,0.2)',
                border: '1px solid rgba(139,92,246,0.4)',
                borderRadius: 12, padding: '10px 20px',
                color: '#c4b5fd', fontSize: 13,
                cursor: 'pointer'
              }}>← Voltar</button>

              <button onClick={() => setModo('texto')} style={{
                background: 'rgba(139,92,246,0.15)',
                border: '1px solid rgba(139,92,246,0.3)',
                borderRadius: 12, padding: '10px 20px',
                color: '#c4b5fd', fontSize: 13,
                cursor: 'pointer', flex: 1
              }}>📖 Ver conteúdo também</button>

              <button onClick={() => irParaDesafios()} style={{
                background: `linear-gradient(135deg, ${conteudo.cor}, #a855f7)`,
                border: 'none', borderRadius: 12,
                padding: '10px 28px',
                color: conteudo.cor === '#eab308' ? '#000' : '#fff',
                fontSize: 14, fontWeight: 700,
                cursor: 'pointer', flex: 1
              }}>Começar desafios →</button>
            </div>
          </div>
        )}

        {/* ===== MODO TEXTO ===== */}
        {modo === 'texto' && (
          <div style={{
            background: 'rgba(230,220,255,0.94)',
            borderRadius: 20, padding: '36px 40px',
            maxWidth: 560, width: '100%',
            color: '#1e0a4e',
            boxShadow: '0 0 60px rgba(100,60,220,0.3)'
          }}>

            {/* Indicador de páginas */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 24 }}>
              {conteudo.paginas.map((_, i) => (
                <div key={i} style={{
                  width: i === pagina ? 24 : 8,
                  height: 8, borderRadius: 4,
                  background: i === pagina ? conteudo.cor : 'rgba(100,80,180,0.2)',
                  transition: 'all 0.3s', cursor: 'pointer'
                }} onClick={() => setPagina(i)}/>
              ))}
            </div>

            {/* Título */}
            <h2 style={{
              fontSize: 20, fontWeight: 700,
              color: '#2d1b69', marginBottom: 12, textAlign: 'center'
            }}>{paginaAtual.titulo}</h2>

            {/* Texto */}
            <p style={{
              fontSize: 14, lineHeight: 1.8,
              color: '#3b2a7e', textAlign: 'center', marginBottom: 20
            }}>{paginaAtual.texto}</p>

            {/* Tópicos */}
            {paginaAtual.topicos && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {paginaAtual.topicos.map((t, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    background: 'rgba(100,80,200,0.1)',
                    border: '1px solid rgba(100,80,200,0.2)',
                    borderRadius: 12, padding: '10px 14px'
                  }}>
                    <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icone}</span>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#2d1b69' }}>{t.titulo}</div>
                      <div style={{ fontSize: 12, color: '#5b4a9e', marginTop: 2 }}>{t.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Exemplo código */}
            {paginaAtual.exemplo && (
              <div style={{ marginBottom: 24 }}>
                <div style={{
                  background: '#0f0a2e', borderRadius: 12,
                  padding: '16px 20px', marginBottom: 10,
                  border: '1px solid rgba(139,92,246,0.3)'
                }}>
                  <div style={{ fontSize: 11, color: '#6b5fa5', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Código
                  </div>
                  {paginaAtual.exemplo.codigo.map((l, i) => (
                    <div key={i} style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8, color: l.cor }}>
                      {l.linha || '\u00a0'}
                    </div>
                  ))}
                </div>

                <div style={{
                  background: '#0a1a0f', borderRadius: 12,
                  padding: '12px 20px',
                  border: '1px solid rgba(34,197,94,0.3)'
                }}>
                  <div style={{ fontSize: 11, color: '#4ade80', marginBottom: 8, letterSpacing: 1, textTransform: 'uppercase' }}>
                    Saída
                  </div>
                  {paginaAtual.exemplo.saida.split('\n').map((linha, i) => (
                    <div key={i} style={{ fontFamily: 'monospace', fontSize: 13, lineHeight: 1.8, color: '#86efac' }}>
                      {linha}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Botões */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => pagina === 0 ? setModo(null) : setPagina(p => p - 1)} style={{
                background: 'rgba(100,80,200,0.15)',
                border: '1px solid rgba(100,80,200,0.3)',
                borderRadius: 30, padding: '10px 24px',
                color: '#4c1d95', fontSize: 14,
                fontWeight: 700, cursor: 'pointer'
              }}>← Voltar</button>

              <button onClick={avancar} style={{
                flex: 1,
                background: `linear-gradient(135deg, ${conteudo.cor}, #a855f7)`,
                border: 'none', borderRadius: 30,
                padding: '12px 24px',
                color: conteudo.cor === '#eab308' ? '#000' : '#fff',
                fontSize: 14, fontWeight: 700,
                cursor: 'pointer',
                boxShadow: `0 4px 20px ${conteudo.cor}55`
              }}>
                {ultima ? 'Começar desafios →' : 'Próximo →'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}