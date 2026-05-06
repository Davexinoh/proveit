const TIERS = [
  { tier:'gold',   label:'GOLD',   apy:'14.5%', threshold:'$100k+ / yr', pool:'Institutional', color:'var(--gold)',   shadow:'rgba(255,209,102,0.3)', bg:'rgba(255,209,102,0.06)' },
  { tier:'silver', label:'SILVER', apy:'8.7%',  threshold:'$60k+ / yr',  pool:'Advanced',      color:'var(--silver)', shadow:'rgba(184,192,204,0.3)', bg:'rgba(184,192,204,0.06)' },
  { tier:'bronze', label:'BRONZE', apy:'4.2%',  threshold:'$30k+ / yr',  pool:'Standard',      color:'var(--bronze)', shadow:'rgba(199,123,58,0.3)',  bg:'rgba(199,123,58,0.06)'  },
]

export default function Tiers() {
  return (
    <div style={{display:'flex',flexDirection:'column',gap:12}}>
      {TIERS.map((t,i) => (
        <div key={t.tier}
          className={`fade-in${i > 0 ? '-'+(i+1) : ''}`}
          style={{
            padding:'24px 20px',borderRadius:'var(--radius)',
            border:`1px solid ${t.shadow}`,background:t.bg,
            backdropFilter:'blur(20px)',position:'relative',overflow:'hidden',
            transition:'all 0.25s'
          }}
        >
          <div style={{position:'absolute',top:0,left:0,right:0,height:2,background:`linear-gradient(90deg, transparent, ${t.color}, transparent)`}}/>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:16}}>
            <div style={{display:'flex',alignItems:'center',gap:8,fontFamily:'var(--font-display)',fontWeight:700,fontSize:16,color:t.color}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:t.color,boxShadow:`0 0 8px ${t.color}`,display:'inline-block'}}/>
              {t.label}
            </div>
            <div style={{fontFamily:'var(--font-display)',fontSize:28,fontWeight:800,color:t.color}}>
              {t.apy} <span style={{fontSize:14,opacity:0.6}}>APY</span>
            </div>
          </div>
          <div style={{height:1,background:'rgba(255,255,255,0.09)',margin:'14px 0'}}/>
          {[['Income threshold', t.threshold],['Pool access', t.pool],['Credential validity','90 days'],['Credential type','Soulbound NFT']].map(([k,v]) => (
            <div key={k} style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
              <span style={{fontSize:11,color:'var(--muted)'}}>{k}</span>
              <span style={{fontSize:12,fontWeight:500,color:k==='Income threshold'?t.color:'var(--white)'}}>{v}</span>
            </div>
          ))}
          <div style={{fontSize:10,color:'rgba(242,244,248,0.25)',marginTop:12,fontStyle:'italic'}}>
            Income is never revealed. Only your eligibility boolean is stored onchain.
          </div>
        </div>
      ))}

      <div className="glass-card fade-in-3" style={{padding:'16px 18px',marginTop:4}}>
        <div style={{fontSize:10,color:'var(--muted)',lineHeight:1.7}}>
          <span style={{color:'var(--cyan)'}}>⬡ Privacy guarantee — </span>
          The FHE comparison executes entirely within the encrypted domain. Even validator nodes process ciphertexts only. Your income figure does not appear anywhere in the transaction data, logs, or state.
        </div>
      </div>
    </div>
  )
}
