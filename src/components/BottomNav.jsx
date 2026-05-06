import { useLocation, useNavigate } from 'react-router-dom'

const TABS = [
  { label: 'HOME',  icon: '⌂', path: '/'           },
  { label: 'TIERS', icon: '◈', path: '/tiers'      },
  { label: 'PROVE', icon: '⇡', path: '/simulator'  },
  { label: 'FHE',   icon: '⬡', path: '/visualizer' },
]

export default function BottomNav() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{
      position:'fixed',bottom:0,left:0,right:0,zIndex:100,height:64,
      background:'rgba(8,8,16,0.88)',backdropFilter:'blur(24px)',
      borderTop:'1px solid rgba(255,255,255,0.09)',display:'flex',alignItems:'stretch'
    }}>
      {TABS.map(tab => {
        const active = location.pathname === tab.path
        return (
          <button key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              flex:1,display:'flex',flexDirection:'column',alignItems:'center',
              justifyContent:'center',gap:4,cursor:'pointer',border:'none',
              background:'none',fontFamily:'var(--font-mono)',fontSize:9,
              letterSpacing:'0.08em',textTransform:'uppercase',
              color: active ? 'var(--cyan)' : 'rgba(242,244,248,0.25)',
              transition:'color 0.2s'
            }}
          >
            <span style={{fontSize:18,lineHeight:1}}>{tab.icon}</span>
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
