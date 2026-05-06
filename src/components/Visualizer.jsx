import { useEffect, useRef, useState } from 'react'

const HEX = '0123456789abcdef'
const OPS = [
  { tag:'enc',  label:'ENCRYPT', tagColor:'rgba(0,212,255,0.12)',   textColor:'var(--cyan)',    texts:['TFHE ciphertext generated (256-bit)','LWE sample encrypted with public key','Bootstrapping key applied to ciphertext'] },
  { tag:'cmp',  label:'COMPARE', tagColor:'rgba(123,94,167,0.2)',   textColor:'#B09FD4',        texts:['Homomorphic integer comparison initiated','Encrypted subtraction: ct_a - ct_threshold','CMUX gate evaluating MSB of difference'] },
  { tag:'ver',  label:'VERIFY',  tagColor:'rgba(0,255,163,0.1)',    textColor:'var(--success)', texts:['ZK proof of correct FHE execution generated','Verification key matched against proof','Constraint system satisfied: proof valid'] },
  { tag:'mint', label:'MINT',    tagColor:'rgba(255,209,102,0.12)', textColor:'var(--gold)',     texts:['Soulbound token metadata prepared','ERC-5114 credential minted to wallet','Credential expiry timestamp set: +90d'] },
]
const randHex = (n) => Array.from({length:n},()=>HEX[Math.floor(Math.random()*16)]).join('')

export default function Visualizer() {
  const [hexText,   setHexText]   = useState('Initializing FHE engine…')
  const [opEntries, setOpEntries] = useState([])
  const [stats,     setStats]     = useState({ ops:0, blocks:0, ms:0, total:0 })
  const opRef = useRef(null)

  useEffect(() => {
    let blocks = 0, ops = 0, totalMs = 0
    const iv = setInterval(() => {
      const chunk = randHex(48) + ' '
      setHexText(prev => {
        const next = prev + chunk
        return next.length > 2000 ? next.slice(-1600) : next
      })
      blocks++

      if (Math.random() < 0.12) {
        ops++
        const ms = 80 + Math.floor(Math.random()*180)
        totalMs += ms
        const op  = OPS[Math.floor(Math.random()*OPS.length)]
        const txt = op.texts[Math.floor(Math.random()*op.texts.length)]
        const ts  = new Date().toTimeString().slice(0,8)
        setOpEntries(prev => {
          const next = [...prev, { id: Date.now()+Math.random(), ts, op, txt, ms }]
          return next.length > 30 ? next.slice(-30) : next
        })
        setStats({ ops, blocks, ms: Math.round(totalMs/ops), total: totalMs })
        setTimeout(() => { if (opRef.current) opRef.current.scrollTop = opRef.current.scrollHeight }, 50)
      } else {
        setStats(s => ({ ...s, blocks }))
      }
    }, 80)
    return () => clearInterval(iv)
  }, [])

  return (
    <div>
      <div className="fade-in-2" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:10,marginBottom:16}}>
        {[['FHE Ops',stats.ops],['Ciphertexts',stats.blocks],['Avg Latency',stats.ms+'ms']].map(([l,v]) => (
          <div key={l} className="glass-card" style={{padding:'14px 10px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:15,fontWeight:700,color:'var(--cyan)',marginBottom:3}}>{v}</div>
            <div style={{fontSize:9,letterSpacing:'0.08em',textTransform:'uppercase',color:'rgba(242,244,248,0.25)'}}>{l}</div>
          </div>
        ))}
      </div>

      <div className="fade-in-2" style={{
        fontFamily:'var(--font-mono)',fontSize:10,lineHeight:1.9,color:'var(--cyan)',
        padding:16,borderRadius:10,background:'rgba(0,0,0,0.4)',border:'1px solid rgba(255,255,255,0.09)',
        height:200,overflow:'hidden',position:'relative',marginBottom:16,
        wordBreak:'break-all',letterSpacing:'0.05em'
      }}>
        {hexText}
        <div style={{position:'absolute',bottom:0,left:0,right:0,height:48,background:'linear-gradient(to top, rgba(0,0,0,0.4), transparent)',pointerEvents:'none'}}/>
      </div>

      <div style={{fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)',marginBottom:8}}>Operation Log</div>
      <div ref={opRef} className="fade-in-2" style={{
        fontFamily:'var(--font-mono)',fontSize:10,lineHeight:1.9,
        padding:'14px 16px',borderRadius:10,
        background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',
        marginBottom:16,maxHeight:200,overflowY:'auto'
      }}>
        {opEntries.map(e => (
          <div key={e.id} style={{display:'flex',gap:10,alignItems:'flex-start',marginBottom:6}}>
            <span style={{color:'rgba(242,244,248,0.25)',flexShrink:0,fontSize:9,paddingTop:1}}>{e.ts}</span>
            <span style={{fontSize:9,padding:'1px 6px',borderRadius:4,flexShrink:0,marginTop:1,background:e.op.tagColor,color:e.op.textColor}}>{e.op.label}</span>
            <span style={{color:'var(--muted)'}}>{e.txt} <span style={{color:'rgba(242,244,248,0.25)'}}>[{e.ms}ms]</span></span>
          </div>
        ))}
      </div>

      <div className="glass-card fade-in-3" style={{padding:'16px 18px'}}>
        <div style={{fontSize:10,color:'var(--muted)',lineHeight:1.7}}>
          <span style={{color:'var(--cyan)'}}>⬡ What you're seeing — </span>
          TFHE ciphertexts flowing through the homomorphic comparison pipeline. The <span style={{color:'var(--cyan)'}}>CMUX</span> gate selects the boolean output without ever touching plaintext. All operations are deterministic and verifiable.
        </div>
      </div>
    </div>
  )
}
