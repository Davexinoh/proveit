import Visualizer from '../components/Visualizer'
import { useNavigate } from 'react-router-dom'

export default function VisualizerPage({ proving, qualified }) {
  const navigate = useNavigate()

  return (
    <main style={{ padding: '40px 20px' }}>

      {/* HEADER */}
      <div style={{ marginBottom: 8 }}>
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
          FHE Visualizer
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
          Encrypted compute.<br />
          <span style={{ color: 'var(--yellow)' }}>Live onchain.</span>
        </h1>
        <p style={{
          fontSize: 12,
          color: '#666',
          fontFamily: 'DM Mono, monospace',
          lineHeight: 1.7,
        }}>
          Watch the FHE operations execute in real time.
          Every computation stays encrypted end to end.
          The contract never sees your income value.
        </p>
      </div>

      <Visualizer proving={proving} qualified={qualified} />

      {/* BACK CTA */}
      <button
        onClick={() => navigate('/simulator')}
        style={{
          width: '100%',
          background: 'transparent',
          color: '#555',
          border: '1px solid #2A2A2A',
          padding: '14px',
          fontFamily: 'Syne, sans-serif',
          fontWeight: 700,
          fontSize: 13,
          letterSpacing: '1px',
          cursor: 'pointer',
          marginTop: 16,
          transition: 'all 0.2s',
        }}
        onMouseOver={e => {
          e.currentTarget.style.borderColor = 'var(--yellow)'
          e.currentTarget.style.color = 'var(--yellow)'
        }}
        onMouseOut={e => {
          e.currentTarget.style.borderColor = '#2A2A2A'
          e.currentTarget.style.color = '#555'
        }}
      >
        ← BACK TO SIMULATOR
      </button>
    </main>
  )
}
