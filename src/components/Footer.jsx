export default function Footer() {
  return (
    <footer style={{
      padding: '40px 20px',
      borderTop: '1px solid #2A2A2A',
    }}>

      {/* TOP ROW */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        marginBottom: 32,
        flexWrap: 'wrap',
        gap: 24,
      }}>

        {/* BRAND */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            marginBottom: 12,
          }}>
            <div style={{
              width: 28,
              height: 28,
              background: 'var(--yellow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            }}>
              <span style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 10,
                color: '#0A0A0A',
              }}>PI</span>
            </div>
            <span style={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              color: 'var(--white)',
              letterSpacing: '-0.3px',
            }}>ProveIt</span>
          </div>
          <p style={{
            fontSize: 11,
            color: '#444',
            fontFamily: 'DM Mono, monospace',
            lineHeight: 1.7,
            maxWidth: 220,
          }}>
            Confidential access protocol.<br />
            Powered by Zama FHEVM.<br />
            Built for Zama Season 2.
          </p>
        </div>

        {/* LINKS */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 10,
        }}>
          <div style={{
            fontSize: 10,
            color: '#555',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            fontFamily: 'DM Mono, monospace',
            marginBottom: 4,
          }}>Resources</div>
          {[
            { label: 'Zama Docs', href: 'https://docs.zama.ai' },
            { label: 'FHEVM Github', href: 'https://github.com/zama-ai/fhevm' },
            { label: 'Sepolia Faucet', href: 'https://sepoliafaucet.com' },
          ].map(link => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: 12,
                color: '#555',
                fontFamily: 'DM Mono, monospace',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.color = 'var(--yellow)'}
              onMouseOut={e => e.currentTarget.style.color = '#555'}
            >
              ➢ {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* DIVIDER */}
      <div style={{ borderTop: '1px solid #1A1A1A', paddingTop: 20 }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}>
          <span style={{
            fontSize: 10,
            color: '#333',
            fontFamily: 'DM Mono, monospace',
            letterSpacing: '0.5px',
          }}>
            © 2026 ProveIt · Davexinoh Labs
          </span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}>
            <span style={{
              fontSize: 9,
              color: '#333',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '1px',
            }}>BUILT WITH</span>
            <span style={{
              fontSize: 9,
              color: 'var(--yellow)',
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '1px',
              border: '1px solid #3A3A00',
              padding: '2px 6px',
            }}>ZAMA FHEVM</span>
          </div>
        </div>
      </div>

    </footer>
  )
}