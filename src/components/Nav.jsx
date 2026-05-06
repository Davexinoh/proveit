import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'

const CONTRACT = '0x4f3a9b2c8d1e5f7a0b3c6d9e2f5a8b1c4d7e0f3'
const SHORT    = (a) => a.slice(0,6) + '…' + a.slice(-4)

export default function Nav() {
  const { address, isConnected } = useAccount()
  const { connect }    = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <nav style={{
      position:'fixed',top:0,left:0,right:0,zIndex:100,height:64,
      background:'rgba(8,8,16,0.80)',backdropFilter:'blur(20px) saturate(1.4)',
      borderBottom:'1px solid rgba(255,255,255,0.09)',
      display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 20px'
    }}>
      <div style={{display:'flex',alignItems:'center',gap:10,fontFamily:'var(--font-display)',fontWeight:800,fontSize:17,letterSpacing:'-0.3px'}}>
        <div style={{
          width:34,height:34,background:'rgba(0,212,255,0.15)',border:'1px solid rgba(0,212,255,0.3)',
          borderRadius:8,display:'flex',alignItems:'center',justifyContent:'center',
          fontSize:13,fontWeight:700,color:'var(--cyan)',fontFamily:'var(--font-display)'
        }}>PI</div>
        ProveIt
      </div>

      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{
          fontSize:10,fontWeight:500,padding:'3px 8px',borderRadius:20,
          border:'1px solid rgba(255,255,255,0.09)',background:'rgba(255,255,255,0.04)',
          color:'rgba(242,244,248,0.45)',fontFamily:'var(--font-mono)',letterSpacing:'0.05em'
        }}>SEPOLIA</span>

        <span style={{fontSize:9,color:'rgba(242,244,248,0.25)',fontFamily:'var(--font-mono)'}}>
          {SHORT(CONTRACT)}
        </span>

        <button
          onClick={() => isConnected ? disconnect() : connect({ connector: injected() })}
          style={{
            fontSize:11,fontWeight:600,padding:'7px 14px',borderRadius:8,cursor:'pointer',
            fontFamily:'var(--font-mono)',letterSpacing:'0.05em',transition:'all 0.2s',
            border: isConnected ? '1px solid rgba(0,255,163,0.35)' : '1px solid rgba(0,212,255,0.4)',
            background: isConnected ? 'rgba(0,255,163,0.12)' : 'rgba(0,212,255,0.15)',
            color: isConnected ? 'var(--success)' : 'var(--cyan)',
          }}
        >
          {isConnected ? SHORT(address) : 'CONNECT'}
        </button>
      </div>
    </nav>
  )
}
