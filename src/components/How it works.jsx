const STEPS = [
  { n:'01', title:'Encrypt', body:'Your income value is encrypted client-side using TFHE before leaving the browser. The plaintext never touches the network.' },
  { n:'02', title:'Submit & Compare', body:'The encrypted ciphertext is submitted onchain. FHEVM executes a homomorphic comparison — arithmetic on ciphertexts, no decryption required.' },
  { n:'03', title:'Boolean Result', body:'The contract emits an encrypted boolean: qualified or not. No salary figure is ever revealed — not to the node, not to the protocol, not to anyone.' },
  { n:'04', title:'Mint Credential', body:'Qualified wallets receive a soulbound credential valid for 90 days, granting access to the corresponding yield tier.' },
]

export default function HowItWorks() {
  return (
    <div style={{marginTop:48}}>
      <div className="section-header fade-in">
        <div className="section-eyebrow">Protocol</div>
        <div className="section-title">How it works</div>
      </div>
      <div className="fade-in-2" style={{display:'flex',flexDirection:'column',gap:10}}>
        {STEPS.map(s => (
          <div key={s.n} className="glass-card" style={{padding:'16px 18px',display:'flex',gap:14,alignItems:'flex-start'}}>
            <div style={{fontSize:11,color:'var(--cyan)',fontWeight:700,fontFamily:'var(--font-mono)',paddingTop:2,flexShrink:0}}>{s.n}</div>
            <div>
              <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:14,marginBottom:4}}>{s.title}</div>
              <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.6}}>{s.body}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
