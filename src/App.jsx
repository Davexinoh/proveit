import { useState } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { injected, walletConnect } from 'wagmi/connectors'
import { CONTRACT_ADDRESS } from './contractABI.js'
import HomePage        from './pages/HomePage.jsx'
import TiersPage       from './pages/TiersPage.jsx'
import SimulatorPage   from './pages/SimulatorPage.jsx'
import VisualizerPage  from './pages/VisualizerPage.jsx'
import RegistryPage    from './pages/RegistryPage.jsx'
import Chatbot         from './components/Chatbot.jsx'

const SHORT = a => a.slice(0,6) + '…' + a.slice(-4)

const NAV_ITEMS = [
  { label:'Home',           icon:'🏠', path:'/'           },
  { label:'Tiers',          icon:'◈',  path:'/tiers'      },
  { label:'Run Proof',      icon:'⇡',  path:'/prove'      },
  { label:'Live Registry',  icon:'📊', path:'/registry'   },
  { label:'FHE Visualizer', icon:'⬡',  path:'/visualizer' },
]

export default function App() {
  const { address, isConnected } = useAccount()
  const { connect }    = useConnect()
  const { disconnect } = useDisconnect()
  const [menuOpen, setMenuOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  function handleConnect() {
    const hasInjected = typeof window !== 'undefined' && !!window.ethereum
    if (hasInjected) connect({ connector: injected() })
    else connect({ connector: walletConnect({ projectId: 'b4f8bdb6a2a5c8e1d3f7a9c2b5e8f1a4' }) })
  }

  function goTo(path) {
    setMenuOpen(false)
    navigate(path)
  }

  return (
    <>
      <nav className="nav">
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          <button className={`hamburger${menuOpen?' open':''}`} onClick={()=>setMenuOpen(o=>!o)}>
            <span/><span/><span/>
          </button>
          <div className="nav-logo" onClick={()=>goTo('/')} style={{cursor:'pointer'}}>
            <div className="logo-icon">PI</div>
            ProveIt
          </div>
        </div>
        <div className="nav-right">
          <span className="nav-pill">SEPOLIA</span>
          <button
            className={`btn-wallet${isConnected?' connected':''}`}
            onClick={()=>isConnected?disconnect():handleConnect()}
          >
            {isConnected ? SHORT(address) : 'Connect wallet'}
          </button>
        </div>
      </nav>

      <div className={`sidebar-overlay${menuOpen?' open':''}`} onClick={()=>setMenuOpen(false)}/>

      <div className={`sidebar${menuOpen?' open':''}`}>
        <div className="sidebar-logo">
          <div className="logo-icon">PI</div>
          ProveIt
        </div>
        <div className="sidebar-section">
          <div className="sidebar-section-label">Navigation</div>
          {NAV_ITEMS.map(item => (
            <button
              key={item.path}
              className={`sidebar-item${location.pathname===item.path?' active':''}`}
              onClick={()=>goTo(item.path)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div className="sidebar-section" style={{marginTop:8}}>
          <div className="sidebar-section-label">Other</div>
          <a
            href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
            target="_blank" rel="noreferrer"
            className="sidebar-item"
            style={{textDecoration:'none'}}
            onClick={()=>setMenuOpen(false)}
          >
            <span className="icon">🔍</span>
            Etherscan
          </a>
        </div>
        <div className="sidebar-footer">
          Contract: {SHORT(CONTRACT_ADDRESS)}
        </div>
      </div>

      <Routes>
        <Route path="/"           element={<HomePage      />} />
        <Route path="/tiers"      element={<TiersPage     />} />
        <Route path="/prove"      element={<SimulatorPage />} />
        <Route path="/registry"   element={<RegistryPage  />} />
        <Route path="/visualizer" element={<VisualizerPage/>} />
      </Routes>

      <Chatbot open={chatOpen} onToggle={()=>setChatOpen(o=>!o)}/>
    </>
  )
}
