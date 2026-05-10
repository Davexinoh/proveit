import { useAccount, useConnect } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import Simulator from '../components/Simulator.jsx'

export default function SimulatorPage() {
  const { isConnected } = useAccount()
  const { connect }     = useConnect()

  function handleConnect() {
    const hasInjected = typeof window !== 'undefined' && !!window.ethereum
    if (hasInjected) connect({ connector: injected() })
    else connect({ connector: walletConnect({ projectId:'b4f8bdb6a2a5c8e1d3f7a9c2b5e8f1a4' }) })
  }

  return (
    <div className="page">
      <div className="fade-in">
        <div style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>Proof Simulator</div>
        <h1 className="page-title">Run a proof</h1>
        <p className="page-sub">Your income is encrypted before submission. No salary data is ever disclosed.</p>
      </div>
      {!isConnected ? (
        <div className="wallet-gate fade-in-2">
          <div className="gate-icon">🔐</div>
          <div className="gate-title">Wallet Required</div>
          <div className="gate-sub">Connect your wallet to run a confidential income proof and mint your soulbound credential.</div>
          <button className="btn btn-gold" onClick={handleConnect}>Connect wallet →</button>
        </div>
      ) : (
        <Simulator />
      )}
    </div>
  )
}
