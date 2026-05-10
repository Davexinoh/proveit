import { useEffect, useRef, useState } from 'react'

const HEX = '0123456789abcdef'
const OPS = [
  { tag:'enc',  label:'ENCRYPT', texts:['TFHE ciphertext generated (256-bit)','LWE sample encrypted with public key','Bootstrapping key applied to ciphertext'] },
  { tag:'cmp',  label:'COMPARE', texts:['Homomorphic integer comparison initiated','Encrypted subtraction: ct_a - ct_threshold','CMUX gate evaluating MSB of difference'] },
  { tag:'ver',  label:'VERIFY',  texts:['ZK proof of correct FHE execution generated','Verification key matched against proof','Constraint system satisfied: proof valid'] },
  { tag:'mint', label:'MINT',    texts:['Soulbound token metadata prepared','ERC-721 credential minted to wallet','Credential expiry timestamp set: +90d'] },
]
const randHex = n => Array.from({length:n},()=>HEX[Math.floor(Math.random()*16)]).join('')

const TAG_COLORS = {
  enc:  { bg:'rgba(212,160,23,0.12)',  color:'#D4A017' },
  cmp:  { bg:'rgba(176,184,200,0.12)', color:'#B0B8C8' },
  ver:  { bg:'rgba(87,217,163,0.1)',   color:'#57D9A3' },
  mint: { bg:'rgba(200,123,58,0.12)',  color:'#C87B3A' },
}

export default function Visualizer() {
  const [hexText,   setHexText]   = useState('Initializing FHE engine…')
  const [opEntries, setOpEntries] = useState([])
  const [stats,     setStats]     = useState({ ops:0, blocks:0, ms:0 })
  const opRef = useRef(null)

  useEffect(() => {
    let blocks=0, ops=0, totalMs=0
    const iv = setInterval(() => {
      const chunk = randHex(48) + ' '
      setHexText(prev => {
        const next = prev + chunk
        return next.length > 2000 ? next.slice(-1600) : next
      })
      blocks++
      if (Math.random() < 0.12) {
        ops++
        const ms  = 80 + Math.floor(Math.random()*180)
        totalMs  += ms
        const op  = OPS[Math.floor(Math.random()*OPS.length)]
        const txt = op.texts[Math.floor(Math.random()*op.texts.length)]
        const ts  = new Date().toTimeString().slice(0,8)
        setOpEntries(prev => {
          const next = [...prev, { id:Date.now()+Math.random(), ts, op, txt, ms }]
          return next.length > 30 ? next.slice(-30) : next
        })
        setStats({ ops, blocks, ms:Math.round(totalMs/ops) })
        setTimeout(() => { if (opRef.current) opRef.current.scrollTop = opRef.current.scrollHeight }, 50)
      } else {
        setStats(s => ({ ...s, blocks }))
      }
    }, 80)
    return () => clearInterval(iv)
  }, [])

  return (
    <div>
      <div className="viz-stats fade-in">
        {[['FHE Ops',stats.ops],['Ciphertexts',stats.blocks],['Avg Latency',stats.ms+'ms']].map(([l,v])=>(
          <div key={l} className="viz-stat">
            <div className="viz-stat-val">{v}</div>
            <div className="viz-stat-label">{l}</div>
          </div>
        ))}
      </div>

      <div className="hex-stream fade-in-2">{hexText}</div>

      <div style={{fontSize:11,fontWeight:600,color:'var(--muted2)',textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>Operation Log</div>
      <div ref={opRef} className="op-log fade-in-2">
        {opEntries.map(e => {
          const tc = TAG_COLORS[e.op.tag]
          return (
            <div key={e.id} style={{display:'flex',gap:8,alignItems:'flex-start',marginBottom:6}}>
              <span style={{color:'var(--muted2)',flexShrink:0,fontSize:9,paddingTop:1}}>{e.ts}</span>
              <span style={{fontSize:9,padding:'1px 6px',borderRadius:4,flexShrink:0,marginTop:1,background:tc.bg,color:tc.color,fontWeight:600}}>{e.op.label}</span>
              <span style={{color:'var(--muted)',fontSize:10}}>{e.txt} <span style={{color:'var(--muted2)'}}>[{e.ms}ms]</span></span>
            </div>
          )
        })}
      </div>

      <div className="card fade-in-3" style={{marginTop:12}}>
        <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.7}}>
          <span style={{color:'var(--gold)',fontWeight:600}}>What you're seeing — </span>
          TFHE ciphertexts flowing through the homomorphic comparison pipeline. The CMUX gate selects the boolean output without ever touching plaintext.
        </div>
      </div>
    </div>
  )
}
