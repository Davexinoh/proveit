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

export default function Tiers({ activeTier }) {
  return (
    <section style={{
      padding: '48px 20px',
      borderBottom: '1px solid #2A2A2A',
    }}>

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
        <h2 style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 800,
          fontSize: 'clamp(24px, 7vw, 36px)',
          letterSpacing: '-0.8px',
          color: 'var(--white)',
          lineHeight: 1.1,
        }}>
          Your income. Encrypted.<br />Your tier. Unlocked.
        </h2>
      </div>

      {/* TIER CARDS */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}>
        {TIERS.map((tier) => {
          const isActive = activeTier === tier.id
          const isFeatured = tier.featured

          return (
            <div key={tier.id} style={{
              background: isActive ? 'rgba(245,255,64,0.05)' : '#111',
              border: isActive
                ? '1px solid var(--yellow)'
                : isFeatured
                ? '1px solid #3A3A00'
                : '1px solid #2A2A2A',
              padding: '20px',
              position: 'relative',
              transition: 'all 0.3s ease',
            }}>

              {isFeatured && (
                <div style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
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
                  top: 12,
                  right: isFeatured ? 80 : 12,
                  fontSize: 9,
                  letterSpacing: '1.5px',
                  background: 'var(--success, #39FF14)',
                  color: '#0A0A0A',
                  padding: '2px 8px',
                  fontFamily: 'DM Mono, monospace',
                  fontWeight: 500,
                }}>UNLOCKED</div>
              )}

              <div style={{
                fontSize: 10,
                color: '#555',
                letterSpacing: '2px',
                fontFamily: 'DM Mono, monospace',
                marginBottom: 6,
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
                    fontSize: 18,
                    color: isActive ? 'var(--yellow)' : 'var(--white)',
                    letterSpacing: '-0.3px',
                  }}>{tier.name}</div>
                  <div style={{
                    fontSize: 12,
                    color: '#666',
                    fontFamily: 'DM Mono, monospace',
                    marginTop: 2,
                  }}>Income threshold: {tier.threshold}</div>
                </div>

                <div style={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 800,
                  fontSize: 28,
                  color: 'var(--yellow)',
                  letterSpacing: '-1px',
                  lineHeight: 1,
                }}>{tier.apy}<span style={{ fontSize: 13, fontWeight: 400, color: '#555' }}> APY</span></div>
              </div>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}>
                {tier.perks.map((perk) => (
                  <div key={perk} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontSize: 12,
                    color: '#888',
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
    </section>
  )
}