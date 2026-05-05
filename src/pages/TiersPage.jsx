import { useNavigate } from 'react-router-dom'

const TIERS = [
  {
    id: 'bronze',
    label: 'TIER 01',
    name: 'Bronze Access',
    threshold: '$30,000+',
    apy: '4.2%',
    perks: ['Basic liquidity pool', 'Monthly credential refresh', 'Standard yield rate'],
  },
  {
    id: 'silver',
    label: 'TIER 02',
    name: 'Silver Access',
    threshold: '$60,000+',
    apy: '8.7%',
    perks: ['Priority liquidity pool', 'Quarterly credential lock', 'Boosted yield rate'],
    featured: true,
  },
  {
    id: 'gold',
    label: 'TIER 03',
    name: 'Gold Access',
    threshold: '$100,000+',
    apy: '14.5%',
    perks: ['Institutional pool access', 'Annual credential lock', 'Max yield rate'],
  },
]

export default function TiersPage({ activeTier }) {
  const navigate = useNavigate()

  return (
    <main style={{ padding: '40px 20px' }}>

      {/* HEADER */}
      <div style={{ marginBottom: 32 }}>
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
          Access Tiers
        </div>
        <h1 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(28px, 8vw, 42px)',
          letterSpacing: '-1px',
          color: 'var(--white)',
          lineHeight: 1.05,
          marginBottom: 12,
        }}>
          Your income.<br />
          <span style={{ color: 'var(--yellow)' }}>Encrypted.</span><br />
          Your tier. Unlocked.
        </h1>
        <p style={{
          fontSize: 12,
          color: '#666',
          fontFamily: 'DM Mono, monospace',
          lineHeight: 1.7,
        }}>
          Three tiers. All gated by FHE proof.
          Nobody knows which tier you qualify for — not even the contract.
        </p>
      </div>

      {/* TIER CARDS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
        {TIERS.map((tier) => {
          const isActive = activeTier === tier.id
          const isFeatured = tier.featured

          return (
            <div key={tier.id} style={{
              background: isActive ? 'rgba(245,255,64,0.04)' : '#111',
              border: isActive
                ? '1px solid var(--yellow)'
                : isFeatured
                ? '1px solid #3A3A00'
                : '1px solid #2A2A2A',
              padding: '22px 20px',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}>

              {isFeatured && (
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: 14,
                  fontSize: 9,
                  letterSpacing: '1.5px',
                  background: 'var(--yellow)',
                  color: '#0A0A0A',
                  padding: '2px 8px',
                  fontFamily: 'DM Mono, monospace',
                  fontWeight: 500,
                }}>POPULAR</div>
              )}

              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: 14,
                  right: isFeatured ? 82 : 14,
                  fontSize: 9,
                  letterSpacing: '1.5px',
                  background: '#39FF14',
                  color: '#0A0A0A',
                  padding: '2px 8px',
                  fontFamily: 'DM Mono, monospace',
                  fontWeight: 500,
                }}>UNLOCKED</div>
              )}

              <div style={{
                fontSize: 10,
                color: '#444',
                letterSpacing: '2px',
                fontFamily: 'DM Mono, monospace',
                marginBottom: 8,
              }}>{tier.label}</div>

              <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                marginBottom: 16,
                flexWrap: 'wrap',
                gap: 8,
              }}>
                <div>
                  <div style={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: 20,
                    color: isActive ? 'var(--yellow)' : 'var(--white)',
                    letterSpacing: '-0.3px',
                  }}>{tier.name}</div>
                  <div style={{
                    fontSize: 11,
                    color: '#555',
                    fontFamily: 'DM Mono, monospace',
                    marginTop: 3,
                  }}>Threshold: {tier.threshold}</div>
                </div>
                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 32,
                  color: 'var(--yellow)',
                  letterSpacing: '-1px',
                  lineHeight: 1,
                }}>{tier.apy}<span style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: '#444',
                }}> APY</span></div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {tier.perks.map((perk) => (
                  <div key={perk} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12,
                    color: '#777',
                    fontFamily: 'DM Mono, monospace',
                  }}>
                    <span style={{ color: 'var(--yellow)', fontSize: 10 }}>✦</span>
                    {perk}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      {/* CTA */}
      <button
        onClick={() => navigate('/simulator')}
        style={{
          width: '100%',
          background: 'var(--yellow)',
          color: '#0A0A0A',
          border: 'none',
          padding: '16px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: 14,
          letterSpacing: '1px',
          cursor: 'pointer',
        }}
      >
        RUN YOUR PROOF ➢
      </button>
    </main>
  )
}
