import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { CONTRACT_ADDRESS } from '../contractABI.js'

const SHORT = (a) => a.slice(0,6) + '…' + a.slice(-4)

export default function Nav() {
  const { address, isConnected } = useAccount()
  const { connect }    = useConnect()
  const { disconnect } = useDisconnect()

  return (
    <nav className="nav">
      <div className="nav-logo">
        <div className="logo-mark">PI</div>
        ProveIt
      </div>

      <div className="nav-right">
        <span className="pill">SEPOLIA</span>
        <span style={{fontSize:9,color:'rgba(238,242,255,0.25)',fontFamily:'var(--font-m)'}}>
          {SHORT(CONTRACT_ADDRESS)}
        </span>
        <button
          className={`btn-connect${isConnected ? ' connected' : ''}`}
          onClick={() => isConnected ? disconnect() : connect({ connector: injected() })}
        >
          {isConnected ? SHORT(address) : 'CONNECT'}
        </button>
      </div>
    </nav>
  )
}