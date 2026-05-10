import { useNavigate } from 'react-router-dom'
import { useAccount } from 'wagmi'

const STEPS = [
  { n:'01', title:'Encrypt', body:'Your income is encrypted client-side using TFHE before it ever leaves your browser.' },
  { n:'02', title:'Submit & Compare', body:'The ciphertext goes onchain. FHEVM runs a homomorphic comparison — math on encrypted data, zero decryption.' },
  { n:'03', title:'Boolean Result', body:'The contract emits a boolean: qualified or not. Your salary is never revealed to anyone.' },
  { n:'04', title:'Mint Credential', body:'Qualified wallets receive a soulbound ERC-721 credential valid for 90 days.' },
]

const EXPLORER_ROWS = [
  { addr:'0x1a2b…9f0e', role:'Engineer', sal:'$5,000/mo' },
  { addr:'0x3c4d…7a8b', role:'Designer', sal:'$4,500/mo' },
  { addr:'0x5e6f…3c2d', role:'CTO',      sal:'$8,200/mo' },
  { addr:'0x7a8b…1c0d', role:'VP Eng',   sal:'$6,100/mo' },
]

export default function HomePage() {
  const navigate = useNavigate()
  const { isConnected } = useAccount()

  return (
    <div className="page">
      <div className="fade-in" style={{paddingTop:16,paddingBottom:32,borderBottom:'1px solid var(--border)'}}>
        <div style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:16}}>
          Powered by FHEVM · Sepolia
        </div>
        <h1 style={{fontSize:'clamp(32px,8vw,52px)',fontWeight:800,lineHeight:1.08,letterSpacing:'-1.5px',marginBottom:16}}>
          Your income is<br/>none of their<br/>
          <span style={{color:'var(--gold)'}}>business.</span>
        </h1>
        <p style={{fontSize:14,color:'var(--muted)',lineHeight:1.7,marginBottom:28,maxWidth:400}}>
          DeFi protocols need proof you qualify. ProveIt gives them the boolean — nothing else. Your salary stays private. Forever.
        </p>
        <div style={{display:'flex',gap:10}}>
          <button className="btn btn-gold" style={{flex:1}} onClick={()=>navigate('/prove')}>Run Proof →</button>
          <button className="btn btn-ghost" style={{flex:1}} onClick={()=>navigate('/tiers')}>View Tiers</button>
        </div>
      </div>

      <div className="fade-in-2" style={{paddingTop:32,paddingBottom:32,borderBottom:'1px solid var(--border)'}}>
        <div style={{fontSize:11,fontWeight:600,color:'#FF5C5C',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>The Problem</div>
        <h2 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px',marginBottom:8,lineHeight:1.2}}>
          Your CTO earns <span style={{color:'#FF5C5C'}}>$8,200/mo.</span><br/>Your intern knows.
        </h2>
        <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.65,marginBottom:20}}>
          On a public blockchain, every salary and payment is visible to anyone with a block explorer.
        </p>
        <div style={{background:'rgba(255,92,92,0.05)',border:'1px solid rgba(255,92,92,0.15)',borderRadius:'var(--radius)',padding:14,marginBottom:8}}>
          <div style={{fontSize:10,fontWeight:700,color:'rgba(255,92,92,0.7)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:12,display:'flex',alignItems:'center',gap:6}}>
            <span>👁</span> PUBLIC BLOCKCHAIN EXPLORER
          </div>
          {EXPLORER_ROWS.map((r,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:i<EXPLORER_ROWS.length-1?'1px solid rgba(255,255,255,0.05)':'none',fontSize:12}}>
              <span style={{color:'var(--muted2)',fontFamily:'monospace'}}>{r.addr}</span>
              <span style={{color:'var(--muted)'}}>{r.role}</span>
              <span style={{color:'#FF5C5C',fontWeight:600}}>{r.sal}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="fade-in-3" style={{paddingTop:32,paddingBottom:32,borderBottom:'1px solid var(--border)'}}>
        <div style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:14}}>The Solution</div>
        <h2 style={{fontSize:24,fontWeight:800,letterSpacing:'-0.5px',marginBottom:8}}>
          Watch it <span style={{color:'var(--gold)'}}>disappear.</span>
        </h2>
        <p style={{fontSize:13,color:'var(--muted)',lineHeight:1.65,marginBottom:20}}>
          ProveIt encrypts your income before it leaves your browser. The result is a boolean. That's all anyone sees.
        </p>
        <div style={{background:'rgba(212,160,23,0.05)',border:'1px solid rgba(212,160,23,0.15)',borderRadius:'var(--radius)',padding:14,marginBottom:4,position:'relative',overflow:'hidden'}}>
          {['Employee','Salary','Department','YTD Total'].map((k,i)=>(
            <div key={i} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'9px 0',borderBottom:i<3?'1px solid rgba(255,255,255,0.05)':'none',opacity:0.3}}>
              <span style={{fontSize:12,color:'var(--muted)'}}>{k}</span>
              <div style={{width:70,height:9,borderRadius:2,background:'rgba(212,160,23,0.3)'}}/>
            </div>
          ))}
          <div style={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%) rotate(-10deg)',border:'2px solid var(--gold)',color:'var(--gold)',fontWeight:800,fontSize:16,letterSpacing:'0.15em',padding:'6px 18px',opacity:0.7,whiteSpace:'nowrap'}}>
            ENCRYPTED
          </div>
          <div style={{textAlign:'right',marginTop:12,fontSize:10,color:'var(--muted2)'}}>
            Block #18,294,021 · <span style={{color:'var(--gold)'}}>Zama fhEVM</span>
          </div>
        </div>
        <p style={{fontSize:11,color:'var(--muted2)',textAlign:'center',marginBottom:24}}>Not even validators can see your salary.</p>
        {STEPS.map(s=>(
          <div key={s.n} className="card" style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:8}}>
            <div style={{fontSize:11,color:'var(--gold)',fontWeight:700,flexShrink:0,paddingTop:1}}>{s.n}</div>
            <div>
              <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{s.title}</div>
              <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.6}}>{s.body}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{paddingTop:28,textAlign:'center'}}>
        <div style={{fontSize:12,color:'var(--muted2)',marginBottom:8,fontFamily:'monospace'}}>Contract deployed on Sepolia testnet</div>
        <button className="btn btn-gold" onClick={()=>navigate('/prove')}>
          {isConnected ? 'Run Proof →' : 'Connect & Run Proof →'}
        </button>
      </div>
    </div>
  )
}
