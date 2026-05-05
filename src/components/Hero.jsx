export default function Hero() {
  return (
    <section style={{
      padding: '56px 20px 48px',
      borderBottom: '1px solid #2A2A2A',
      position: 'relative',
      overflow: 'hidden',
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
        top: '-60px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(245,255,64,0.06) 0%, transparent 70%)',
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
        fontSize: 'clamp(34px, 10vw, 56px)',
        fontWeight: 800,
        lineHeight: 1.05,
        letterSpacing: '-1.5px',
        color: 'var(--white)',
        marginBottom: 20,
      }}>
        Prove you qualify.<br />
        <span style={{ color: 'var(--yellow)' }}>Reveal nothing.</span>
      </h1>

      {/* SUBTEXT */}
      <p style={{
        fontSize: 14,
        color: '#888',
        lineHeight: 1.7,
        maxWidth: 480,
        marginBottom: 32,
        fontFamily: 'DM Mono, monospace',
      }}>
        ProveIt runs your income proof fully encrypted onchain.
        No salary disclosed. No employer revealed. No wallet
        linked to your identity. Just access.
      </p>

      {/* STATS ROW */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 12,
        marginBottom: 32,
      }}>
        {[
          { label: 'Encryption', value: 'FHE' },
          { label: 'Network', value: 'Sepolia' },
          { label: 'Disclosure', value: 'Zero' },
        ].map((s) => (
          <div key={s.label} style={{
            background: '#111',
            border: '1px solid #2A2A2A',
            padding: '14px 12px',
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
              fontSize: 10,
              color: '#555',
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              marginTop: 4,
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a href="#simulator" style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--yellow)',
        color: '#0A0A0A',
        padding: '12px 24px',
        fontFamily: 'Syne, sans-serif',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.5px',
        textDecoration: 'none',
        cursor: 'pointer',
        transition: 'opacity 0.2s ease',
      }}
        onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
        onMouseOut={e => e.currentTarget.style.opacity = '1'}
      >
        RUN PROOF ➢
      </a>
    </section>
  )
}