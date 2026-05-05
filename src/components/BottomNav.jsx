import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  {
    path: '/',
    label: 'Home',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path
          d="M3 12L12 3L21 12V21H15V15H9V21H3V12Z"
          stroke={active ? '#F5FF40' : '#555'}
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
    ),
  },
  {
    path: '/tiers',
    label: 'Tiers',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="15" width="18" height="4" rx="0"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5" />
        <rect x="3" y="9" width="18" height="4" rx="0"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5" />
        <rect x="3" y="3" width="18" height="4" rx="0"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    path: '/simulator',
    label: 'Prove',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5" />
        <path d="M12 7V12L15 15"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5"
          strokeLinecap="round" />
      </svg>
    ),
  },
  {
    path: '/visualizer',
    label: 'FHE',
    icon: (active) => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="3" width="20" height="14" rx="0"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5" />
        <path d="M8 21H16M12 17V21"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5"
          strokeLinecap="round" />
        <path d="M6 10L9 7L12 10L15 7L18 10"
          stroke={active ? '#F5FF40' : '#555'} strokeWidth="1.5"
          strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: 'rgba(10,10,10,0.97)',
      backdropFilter: 'blur(16px)',
      borderTop: '1px solid #2A2A2A',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      height: '64px',
    }}>
      {TABS.map((tab) => {
        const active = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '4px',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
          >
            {active && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: '20%',
                right: '20%',
                height: '2px',
                background: 'var(--yellow)',
              }} />
            )}
            {tab.icon(active)}
            <span style={{
              fontSize: 9,
              fontFamily: 'DM Mono, monospace',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: active ? 'var(--yellow)' : '#555',
              transition: 'color 0.2s',
            }}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
