import { useState, useEffect } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

export default function Nav() {
  const { address, isConnected } = useAccount()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const short = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 20px',
      background: scrolled ? 'rgba(10,10,10,0.95)' : 'var(--black)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border, #2A2A2A)',
      transition: 'background 0.3s ease',
    }}>

      {/* LOGO */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{
          width: 32,
          height: 32,
          background: 'var(--yellow)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}>
          <span style={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 800,
            fontSize: 11,
            color: '#0A0A0A',
            letterSpacing: '-0.5px',
          }}>PI</span>
        </div>
        <span style={{
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: 16,
          color: 'var(--white)',
          letterSpacing: '-0.3px',
        }}>ProveIt</span>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{
          fontSize: 10,
          color: 'var(--yellow)',
          border: '1px solid var(--yellow)',
          padding: '2px 8px',
          letterSpacing: '1px',
          opacity: 0.8,
          fontFamily: 'DM Mono, monospace',
        }}>SEPOLIA</span>

        <button
          onClick={() => isConnected ? disconnect() : connect({ connector: injected() })}
          style={{
            background: isConnected ? 'transparent' : 'var(--yellow)',
            color: isConnected ? 'var(--yellow)' : '#0A0A0A',
            border: '1px solid var(--yellow)',
            padding: '6px 14px',
            fontSize: 11,
            fontFamily: 'DM Mono, monospace',
            fontWeight: 500,
            letterSpacing: '0.5px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          {isConnected ? short : 'CONNECT'}
        </button>
      </div>
    </nav>
  )
}