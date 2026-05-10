const TIERS = [
  { label:'GOLD',   apy:'14.5%', threshold:'$100k+/yr', pool:'Institutional', color:'#D4A017', bar:'linear-gradient(90deg,#D4A017,#F5CC4A)' },
  { label:'SILVER', apy:'8.7%',  threshold:'$60k+/yr',  pool:'Advanced',      color:'#B0B8C8', bar:'linear-gradient(90deg,#9AA8BC,#C8D0DC)' },
  { label:'BRONZE', apy:'4.2%',  threshold:'$30k+/yr',  pool:'Standard',      color:'#C87B3A', bar:'linear-gradient(90deg,#C87B3A,#E09A5A)' },
]

export default function TiersPage() {
  return (
    <div className="page">
      <div className="fade-in">
        <div style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>Access Tiers</div>
        <h1 className="page-title">Yield pools</h1>
        <p className="page-sub">Three tiers gated by confidential income proofs. APY rates are illustrative for this demonstration.</p>
      </div>
      {TIERS.map((t,i)=>(
        <div key={t.label} className="tier-card fade-in" style={{animationDelay:`${i*0.08}s`}}>
          <div className="top-bar" style={{background:t.bar}}/>
          <div className="tier-header">
            <div className="tier-name" style={{color:t.color}}>
              <span className="tier-dot" style={{background:t.color,boxShadow:`0 0 6px ${t.color}`}}/>
              {t.label}
            </div>
            <div className="tier-apy" style={{color:t.color}}>
              {t.apy} <span style={{fontSize:14,opacity:0.6,fontWeight:400}}>APY</span>
            </div>
          </div>
          <div className="tier-divider"/>
          {[['Income threshold',t.threshold,t.color],['Pool access',t.pool,null],['Credential','90-day soulbound NFT',null]].map(([k,v,c])=>(
            <div key={k} className="tier-row">
              <span className="tier-key">{k}</span>
              <span style={{fontSize:13,fontWeight:600,color:c||'var(--white)'}}>{v}</span>
            </div>
          ))}
          <div className="tier-note">Income is never revealed. Only your eligibility boolean is stored onchain.</div>
        </div>
      ))}
      <div className="card fade-in-3" style={{marginTop:8}}>
        <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.7}}>
          <span style={{color:'var(--gold)',fontWeight:600}}>Privacy guarantee — </span>
          The FHE comparison executes entirely within the encrypted domain. Your income figure never appears in transaction data, logs, or state.
        </div>
      </div>
    </div>
  )
}
