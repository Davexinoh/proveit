import { useState } from 'react'

const TIERS = [
  { id: 'bronze', min: 30000, max: 59999, label: 'Bronze Access', apy: '4.2%' },
  { id: 'silver', min: 60000, max: 99999, label: 'Silver Access', apy: '8.7%' },
  { id: 'gold', min: 100000, max: Infinity, label: 'Gold Access', apy: '14.5%' },
]

const STEPS = [
  'Encrypting income value with FHEVM...',
  'Submitting encrypted proof onchain...',
  'Running FHE threshold comparison...',
  'Verifying homomorphic result...',
  'Minting soulbound credential...',
]

export default function Simulator({
  setQualified,
  setActiveTier,
  proving,
  setProving,
  qualified,
}) {
  const [income, setIncome] = useState('')
  const [step, setStep] = useState(-1)
  const [result, setResult] = useState(null)

  const runProof = () => {
    const val = parseInt(income.replace(/,/g, ''))
    if (!val || val < 1000) return

    setProving(true)
    setResult(null)
    setQualified(null)
    setActiveTier(null)
    setStep(0)

    let current = 0
    const interval = setInterval(() => {
      current += 1
      if (current < STEPS.length) {
        setStep(current)
      } else {
        clearInterval(interval)
        const tier = TIERS.find(t => val >= t.min && val <= t.max) || null
        setResult(tier)
        setQualified(!!tier)
        setActiveTier(tier?.id || null)
        setProving(false)
        setStep(-1)
      }
    }, 900)
  }

  const formatIncome = (val) => {
    const raw = val.replace(/[^0-9]/g, '')
    if (!raw) return ''
    return parseInt(raw).toLocaleString()
  }

  return (
    <section id="simulator" style={{
      padding: '48px 20px',
      borderBottom: '1px solid #2A2A2A',
    }}>

      {/* HEADER */}
      <div style={{ marginBottom: 28 }}>
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
          Proof Simulator
        </div>
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(22px, 6vw, 32px)',
          letterSpacing: '-0.8px',
          color: 'var(--white)',
          lineHeight: 1.1,
        }}>
          Test the proof.<br />No real data needed.
        </h2>
        <p style={{
          fontSize: 12,
          color: '#666',
          marginTop: 10,
          fontFamily: 'DM Mono, monospace',
          lineHeight: 1.7,
        }}>
          Enter any income value. Watch the FHE proof run.
          See which tier you unlock. Nothing leaves your browser unencrypted.
        </p>
      </div>

      {/* INPUT */}
      <div style={{
        background: '#111',
        border: '1px solid #2A2A2A',
        padding: '20px',
        marginBottom: 16,
      }}>
        <div style={{
          fontSize: 10,
          color: '#555',
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          fontFamily: 'DM Mono, monospace',
          marginBottom: 10,
        }}>Annual Income (USD)</div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          border: '1px solid #2A2A2A',
          background: '#0A0A0A',
          overflow: 'hidden',
        }}>
          <span style={{
            padding: '12px 14px',
            fontSize: 16,
            color: 'var(--yellow)',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            borderRight: '1px solid #2A2A2A',
          }}>$</span>
          <input
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={income}
            onChange={e => setIncome(formatIncome(e.target.value))}
            disabled={proving}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--white)',
              fontSize: 18,
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              padding: '12px 14px',
              letterSpacing: '-0.5px',
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          gap: 8,
          marginTop: 12,
          flexWrap: 'wrap',
        }}>
          {['30,000', '60,000', '100,000'].map(val => (
            <button
              key={val}
              onClick={() => setIncome(val)}
              disabled={proving}
              style={{
                background: 'transparent',
                border: '1px solid #2A2A2A',
                color: '#666',
                padding: '4px 10px',
                fontSize: 11,
                fontFamily: 'DM Mono, monospace',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.borderColor = 'var(--yellow)'
                e.currentTarget.style.color = 'var(--yellow)'
              }}
              onMouseOut={e => {
                e.currentTarget.style.borderColor = '#2A2A2A'
                e.currentTarget.style.color = '#666'
              }}
            >${val}</button>
          ))}
        </div>
      </div>

      {/* PROOF STEPS */}
      {proving && (
        <div style={{
          background: '#111',
          border: '1px solid #2A2A2A',
          padding: '20px',
          marginBottom: 16,
        }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 0',
              borderBottom: i < STEPS.length - 1 ? '1px solid #1A1A1A' : 'none',
            }}>
              <div style={{
                width: 18,
                height: 18,
                border: `1px solid ${i < step ? 'var(--success, #39FF14)' : i === step ? 'var(--yellow)' : '#333'}`,
                background: i < step ? 'var(--success, #39FF14)' : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transition: 'all 0.3s ease',
              }}>
                {i < step && (
                  <span style={{ fontSize: 9, color: '#0A0A0A', fontWeight: 700 }}>✓</span>
                )}
                {i === step && (
                  <span style={{
                    width: 6,
                    height: 6,
                    background: 'var(--yellow)',
                    display: 'block',
                    animation: 'pulse 0.8s infinite',
                  }} />
                )}
              </div>
              <span style={{
                fontSize: 11,
                fontFamily: 'DM Mono, monospace',
                color: i < step ? '#39FF14' : i === step ? 'var(--yellow)' : '#444',
                transition: 'color 0.3s ease',
              }}>{s}</span>
            </div>
          ))}
        </div>
      )}

      {/* RESULT */}
      {!proving && result !== undefined && result !== null && qualified && (
        <div style={{
          background: 'rgba(57,255,20,0.04)',
          border: '1px solid #39FF14',
          padding: '20px',
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 10,
            color: '#39FF14',
            letterSpacing: '2px',
            fontFamily: 'DM Mono, monospace',
            marginBottom: 8,
          }}>✓ PROOF VERIFIED</div>
          <div style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 20,
            color: 'var(--white)',
            marginBottom: 4,
          }}>{result.label} Unlocked</div>
          <div style={{
            fontSize: 12,
            color: '#666',
            fontFamily: 'DM Mono, monospace',
          }}>
            APY rate: <span style={{ color: 'var(--yellow)' }}>{result.apy}</span> · Credential minted · Expires in 90 days
          </div>
        </div>
      )}

      {!proving && qualified === false && (
        <div style={{
          background: 'rgba(255,59,59,0.04)',
          border: '1px solid var(--error, #FF3B3B)',
          padding: '20px',
          marginBottom: 16,
        }}>
          <div style={{
            fontSize: 10,
            color: '#FF3B3B',
            letterSpacing: '2px',
            fontFamily: 'DM Mono, monospace',
            marginBottom: 8,
          }}>✗ BELOW MINIMUM THRESHOLD</div>
          <div style={{
            fontSize: 12,
            color: '#666',
            fontFamily: 'DM Mono, monospace',
          }}>Minimum income required: $30,000/year</div>
        </div>
      )}

      {/* RUN BUTTON */}
      <button
        onClick={runProof}
        disabled={proving || !income}
        style={{
          width: '100%',
          background: proving || !income ? '#1A1A1A' : 'var(--yellow)',
          color: proving || !income ? '#444' : '#0A0A0A',
          border: 'none',
          padding: '16px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '1px',
          cursor: proving || !income ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        {proving ? 'RUNNING PROOF...' : 'RUN ENCRYPTED PROOF ➢'}
      </button>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </section>
  )
}