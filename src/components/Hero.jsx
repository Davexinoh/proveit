import { useNavigate } from 'react-router-dom'

export default function Hero() {
  const navigate = useNavigate()
  return (
    <div style={{padding:'48px 0 40px'}}>
      <div className="fade-in" style={{display:'flex',alignItems:'center',gap:8,fontSize:10,letterSpacing:'0.15em',textTransform:'uppercase',color:'var(--cyan)',marginBottom:24}}>
        <span style={{width:28,height:1,background:'var(--cyan)',opacity:0.5,display:'inline-block'}}/>
        POWERED BY FHEVM
      </div>

      <h1 className="fade-in" style={{fontFamily:'var(--font-display)',fontSize:44,fontWeight:800,lineHeight:1.08,letterSpacing:'-1.5px',marginBottom:20}}>
        Prove you<br/>qualify.<br/><span style={{color:'var(--cyan)'}}>Reveal nothing.</span>
      </h1>

      <p className="fade-in-2" style={{fontSize:13,lineHeight:1.7,color:'var(--muted)',marginBottom:32}}>
        Income threshold verified entirely onchain via Fully Homomorphic Encryption. Your encrypted value is compared against a threshold — the contract returns a boolean. No salary value is ever decrypted or stored.
      </p>

      <div className="fade-in-2" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:32}}>
        {[['FHE','Encryption'],['Sepolia','Network'],['Zero','Disclosure']].map(([val,label]) => (
          <div key={label} className="glass-card" style={{padding:'16px 12px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:18,fontWeight:700,color:'var(--cyan)',marginBottom:4}}>{val}</div>
            <div style={{fontSize:9,letterSpacing:'0.1em',textTransform:'uppercase',color:'rgba(242,244,248,0.25)'}}>{label}</div>
          </div>
        ))}
      </div>

      <div className="fade-in-3" style={{display:'flex',gap:10}}>
        <button className="btn-primary" style={{flex:1}} onClick={() => navigate('/simulator')}>RUN PROOF ›</button>
        <button className="btn-secondary" onClick={() => navigate('/tiers')}>VIEW TIERS</button>
      </div>
    </div>
  )
}
