import Simulator from '../components/Simulator'
import { useNavigate } from 'react-router-dom'

export default function SimulatorPage({
  setQualified,
  setActiveTier,
  proving,
  setProving,
  qualified,
}) {
  const navigate = useNavigate()

  return (
    <main style={{ padding: '40px 20px' }}>

      {/* HEADER */}
      <div style={{ marginBottom: 28 }}>
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
          Proof Simulator
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
          Test the proof.<br />
          <span style={{ color: 'var(--yellow)' }}>No real data needed.</span>
        </h1>
        <p style={{
          fontSize: 12,
          color: '#666',
          fontFamily: 'DM Mono, monospace',
          lineHeight: 1.7,
        }}>
          Enter any income value. Watch the FHE
          proof run step by step. See which tier
          you unlock. Nothing leaves your browser unencrypted.
        </p>
      </div>

      <Simulator
        setQualified={setQualified}
        setActiveTier={setActiveTier}
        proving={proving}
        setProving={setProving}
        qualified={qualified}
      />

      {qualified && (
        <button
          onClick={() => navigate('/visualizer')}
          style={{
            width: '100%',
            background: 'transparent',
            color: 'var(--yellow)',
            border: '1px solid var(--yellow)',
            padding: '14px',
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '1px',
            cursor: 'pointer',
            marginTop: 12,
            transition: 'all 0.2s',
          }}
          onMouseOver={e => {
            e.currentTarget.style.background = 'var(--yellow)'
            e.currentTarget.style.color = '#0A0A0A'
          }}
          onMouseOut={e => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = 'var(--yellow)'
          }}
        >
          VIEW FHE VISUALIZER ➢
        </button>
      )}
    </main>
  )
}
