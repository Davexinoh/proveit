import { useNavigate } from 'react-router-dom'

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main>
      <section style={{
        padding: '56px 20px 48px',
        borderBottom: '1px solid #2A2A2A',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 136px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}>

        {/* BG GRID */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(245,255,64,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,255,64,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          pointerEvents: 'none',
        }} />

        {/* GLOW */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '320px',
          height: '320px',
          background: 'radial-gradient(circle, rgba(245,255,64,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* TAG */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 10,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: 'var(--yellow)',
          marginBottom: 20,
          fontFamily: 'DM Mono, monospace',
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--yellow)', display: 'block' }} />
          Powered by FHEVM
        </div>

        {/* HEADING */}
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontSize: 'clamp(36px, 11vw, 60px)',
          fontWeight: 800,
          lineHeight: 1.0,
          letterSpacing: '-2px',
          color: 'var(--white)',
          marginBottom: 20,
        }}>
          Prove you<br />qualify.<br />
          <span style={{ color: 'var(--yellow)' }}>Reveal<br />nothing.</span>
        </h1>

        {/* SUBTEXT */}
        <p style={{
          fontSize: 13,
          color: '#888',
          lineHeight: 1.7,
          maxWidth: 360,
          marginBottom: 36,
          fontFamily: 'DM Mono, monospace',
        }}>
          Income threshold verified onchain via FHE.
          Your encrypted value is compared against
          a threshold — the result is a boolean.
          No salary value is ever decrypted or stored.
        </p>

        {/* STATS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
          marginBottom: 36,
        }}>
          {[
            { label: 'Encryption', value: 'FHE' },
            { label: 'Network', value: 'Sepolia' },
            { label: 'Disclosure', value: 'Zero' },
          ].map((s) => (
            <div key={s.label} style={{
              background: '#111',
              border: '1px solid #2A2A2A',
              padding: '14px 10px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--yellow)',
                letterSpacing: '-0.5px',
              }}>{s.value}</div>
              <div style={{
                fontSize: 9,
                color: '#555',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginTop: 4,
                fontFamily: 'DM Mono, monospace',
              }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAS */}
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate('/simulator')}
            style={{
              background: 'var(--yellow)',
              color: '#0A0A0A',
              border: 'none',
              padding: '14px 24px',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
            onMouseOut={e => e.currentTarget.style.opacity = '1'}
          >
            RUN PROOF ➢
          </button>
          <button
            onClick={() => navigate('/tiers')}
            style={{
              background: 'transparent',
              color: 'var(--yellow)',
              border: '1px solid var(--yellow)',
              padding: '14px 24px',
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.5px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              opacity: 0.7,
            }}
            onMouseOver={e => e.currentTarget.style.opacity = '1'}
            onMouseOut={e => e.currentTarget.style.opacity = '0.7'}
          >
            VIEW TIERS
          </button>
        </div>

        {/* BUILT WITH */}
        <div style={{
          marginTop: 48,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}>
          <span style={{
            fontSize: 9,
            color: '#333',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
          }}>Built with</span>
          <span style={{
            fontSize: 9,
            color: 'var(--yellow)',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '1px',
            border: '1px solid #3A3A00',
            padding: '3px 8px',
          }}>ZAMA FHEVM</span>
          <span style={{
            fontSize: 9,
            color: '#333',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '1px',
            border: '1px solid #2A2A2A',
            padding: '3px 8px',
          }}>SEPOLIA</span>
        </div>
      </section>
    </main>
  )
}
