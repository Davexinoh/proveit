import { useEffect, useState } from 'react'

const HEX = '0123456789abcdef'
const rand = () => Array.from({ length: 8 }, () => HEX[Math.floor(Math.random() * 16)]).join('')

const OPERATIONS = [
  'fheAdd(enc_a, enc_b)',
  'fheLt(enc_income, threshold)',
  'fheEq(enc_tier, target)',
  'fheDecrypt(result)',
  'euint32.verify(proof)',
  'ebool.resolve(gate)',
  'fheMul(enc_x, enc_y)',
  'fheSub(enc_val, base)',
]

export default function Visualizer({ proving, qualified }) {
  const [nodes, setNodes] = useState([])
  const [ops, setOps] = useState([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (proving) {
      setActive(true)
      const nodeInterval = setInterval(() => {
        setNodes(prev => {
          const next = [...prev, rand()]
          return next.length > 12 ? next.slice(-12) : next
        })
      }, 180)

      const opInterval = setInterval(() => {
        setOps(prev => {
          const next = [...prev, OPERATIONS[Math.floor(Math.random() * OPERATIONS.length)]]
          return next.length > 6 ? next.slice(-6) : next
        })
      }, 400)

      return () => {
        clearInterval(nodeInterval)
        clearInterval(opInterval)
      }
    } else {
      if (qualified !== null) {
        setTimeout(() => setActive(false), 1200)
      }
    }
  }, [proving, qualified])

  return (
    <section style={{
      padding: '48px 20px',
      borderBottom: '1px solid #2A2A2A',
    }}>

      {/* HEADER */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontSize: 10,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--yellow)',
          fontFamily: 'DM Mono, monospace',
          marginBottom: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--yellow)', display: 'block' }} />
          FHE Operation Visualizer
        </div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(22px, 6vw, 32px)',
          letterSpacing: '-0.8px',
          color: 'var(--white)',
          lineHeight: 1.1,
        }}>
          Encrypted compute.<br />Live onchain.
        </h2>
      </div>

      {/* MAIN PANEL */}
      <div style={{
        background: '#0A0A0A',
        border: `1px solid ${active ? 'var(--yellow)' : '#2A2A2A'}`,
        padding: '20px',
        transition: 'border-color 0.4s ease',
        marginBottom: 12,
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* STATUS BAR */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingBottom: 12,
          borderBottom: '1px solid #1A1A1A',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 10,
            fontFamily: 'DM Mono, monospace',
            color: '#555',
            letterSpacing: '1px',
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: active ? 'var(--yellow)' : '#333',
              display: 'block',
              transition: 'background 0.3s',
              animation: active ? 'pulse 0.8s infinite' : 'none',
            }} />
            {active ? 'COMPUTING' : 'IDLE'}
          </div>
          <div style={{
            fontSize: 10,
            fontFamily: 'DM Mono, monospace',
            color: '#333',
            letterSpacing: '1px',
          }}>FHEVM / SEPOLIA</div>
        </div>

        {/* HEX STREAM */}
        <div style={{
          marginBottom: 16,
          minHeight: 60,
        }}>
          <div style={{
            fontSize: 9,
            color: '#333',
            letterSpacing: '1px',
            fontFamily: 'DM Mono, monospace',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}>Encrypted Payload Stream</div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 6,
          }}>
            {nodes.length === 0 ? (
              <span style={{ fontSize: 11, color: '#2A2A2A', fontFamily: 'DM Mono, monospace' }}>
                — awaiting proof submission —
              </span>
            ) : nodes.map((n, i) => (
              <span key={i} style={{
                fontSize: 10,
                fontFamily: 'DM Mono, monospace',
                color: i === nodes.length - 1 ? 'var(--yellow)' : '#2A2A2A',
                transition: 'color 0.3s ease',
                letterSpacing: '0.5px',
              }}>0x{n}</span>
            ))}
          </div>
        </div>

        {/* OPS LOG */}
        <div>
          <div style={{
            fontSize: 9,
            color: '#333',
            letterSpacing: '1px',
            fontFamily: 'DM Mono, monospace',
            marginBottom: 8,
            textTransform: 'uppercase',
          }}>Operation Log</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            minHeight: 80,
          }}>
            {ops.length === 0 ? (
              <span style={{ fontSize: 11, color: '#2A2A2A', fontFamily: 'DM Mono, monospace' }}>
                — no operations —
              </span>
            ) : ops.map((op, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                opacity: i === ops.length - 1 ? 1 : 0.35,
                transition: 'opacity 0.3s',
              }}>
                <span style={{
                  fontSize: 10,
                  color: i === ops.length - 1 ? 'var(--yellow)' : '#444',
                  fontFamily: 'DM Mono, monospace',
                }}>›</span>
                <span style={{
                  fontSize: 11,
                  color: i === ops.length - 1 ? 'var(--white)' : '#444',
                  fontFamily: 'DM Mono, monospace',
                }}>{op}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RESULT OVERLAY */}
        {!active && qualified === true && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,10,0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{
              fontSize: 32,
              color: '#39FF14',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
            }}>✓</div>
            <div style={{
              fontSize: 12,
              color: '#39FF14',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '2px',
            }}>PROOF ACCEPTED</div>
            <div style={{
              fontSize: 10,
              color: '#555',
              fontFamily: 'DM Mono, monospace',
            }}>Credential minted onchain</div>
          </div>
        )}

        {!active && qualified === false && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(10,10,10,0.92)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            animation: 'fadeIn 0.5s ease',
          }}>
            <div style={{
              fontSize: 32,
              color: '#FF3B3B',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
            }}>✗</div>
            <div style={{
              fontSize: 12,
              color: '#FF3B3B',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '2px',
            }}>PROOF REJECTED</div>
            <div style={{
              fontSize: 10,
              color: '#555',
              fontFamily: 'DM Mono, monospace',
            }}>Threshold not met</div>
          </div>
        )}
      </div>

      {/* LEGEND */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 8,
      }}>
        {[
          { label: 'Encryption', value: 'TFHE-rs' },
          { label: 'Proof type', value: 'euint32' },
          { label: 'Gas model', value: 'Sepolia' },
          { label: 'Visibility', value: 'Zero' },
        ].map(item => (
          <div key={item.label} style={{
            background: '#111',
            border: '1px solid #1A1A1A',
            padding: '10px 14px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontSize: 10,
              color: '#555',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '0.5px',
            }}>{item.label}</span>
            <span style={{
              fontSize: 11,
              color: 'var(--yellow)',
              fontFamily: 'DM Mono, monospace',
            }}>{item.value}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </section>
  )
}