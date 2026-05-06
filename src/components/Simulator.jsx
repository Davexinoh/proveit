import { useState, useRef } from 'react'

const LIFECYCLE = ['Connect','Input','Prove','Verify','Unlock']

function getTier(v) {
  if (v >= 100000) return { label:'Gold',   color:'var(--gold)',   apy:'14.5%', cls:'gold-active' }
  if (v >= 60000)  return { label:'Silver', color:'var(--silver)', apy:'8.7%',  cls:'silver-active' }
  if (v >= 30000)  return { label:'Bronze', color:'var(--bronze)', apy:'4.2%',  cls:'bronze-active' }
  return null
}

export default function Simulator() {
  const [income,  setIncome]  = useState('')
  const [steps,   setSteps]   = useState([]) // 0=idle 1=active 2=done per step
  const [logs,    setLogs]    = useState([])
  const [result,  setResult]  = useState(null)
  const [running, setRunning] = useState(false)
  const logRef = useRef(null)

  const v    = parseInt(income) || 0
  const tier = getTier(v)
  const pct  = Math.min((v / 200000) * 100, 100)

  function addLog(tag, msg) {
    const ts = new Date().toTimeString().slice(0,8)
    setLogs(l => [...l, { ts, tag, msg, id: Date.now() + Math.random() }])
    setTimeout(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight }, 50)
  }

  function setStep(idx, state) {
    setSteps(prev => {
      const next = [...prev]
      next[idx] = state
      return next
    })
  }

  async function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

  async function runProof() {
    if (running) return
    setRunning(true)
    setLogs([])
    setResult(null)
    setSteps([2,1,0,0,0])

    const timeline = [
      { ms:400,  tag:'info', msg:'Client-side TFHE encryption initiated', si:1, sn:2 },
      { ms:500,  tag:'info', msg:`Plaintext value → ciphertext (256-bit LWE sample)`, si:1 },
      { ms:600,  tag:'info', msg:'Ciphertext submitted to FHEVM contract', si:2, sn:1 },
      { ms:700,  tag:'info', msg:'Homomorphic comparison executing onchain…', si:2 },
      { ms:600,  tag:'info', msg:'CMUX gate evaluating encrypted boolean', si:3, sn:1 },
      { ms:600,  tag: v >= 30000 ? 'ok':'warn', msg: v >= 30000 ? 'Boolean result: TRUE (threshold met)' : 'Boolean result: FALSE (threshold not met)', si:3 },
      { ms:500,  tag:'info', msg:'Proof verification complete', si:4, sn:1 },
    ]

    for (const step of timeline) {
      await delay(step.ms)
      addLog(step.tag, step.msg)
      if (step.si !== undefined) setStep(step.si, 2)
      if (step.sn !== undefined) setStep(step.sn, 1)
    }

    await delay(400)
    setStep(4, 2)
    setResult({ qualified: v >= 30000, tier: getTier(v) })
    setRunning(false)
  }

  const stepColor = (i) => {
    const s = steps[i]
    if (s === 2) return { border:'var(--success)', color:'var(--success)', bg:'rgba(0,255,163,0.12)' }
    if (s === 1) return { border:'var(--cyan)',    color:'var(--cyan)',    bg:'rgba(0,212,255,0.12)' }
    return { border:'rgba(255,255,255,0.09)', color:'rgba(242,244,248,0.25)', bg:'rgba(255,255,255,0.04)' }
  }

  return (
    <div>
      {/* Lifecycle */}
      <div className="fade-in-2" style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:24,gap:4}}>
        {LIFECYCLE.map((lbl, i) => {
          const c = stepColor(i)
          return (
            <div key={lbl} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,flex:1}}>
              {i > 0 && <div style={{height:1,background: steps[i-1]===2?'rgba(0,255,163,0.4)':'rgba(255,255,255,0.09)',width:'100%',marginBottom:-22,zIndex:0}}/>}
              <div style={{
                width:28,height:28,borderRadius:'50%',border:`1.5px solid ${c.border}`,
                background:c.bg,display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:10,color:c.color,position:'relative',zIndex:1,transition:'all 0.4s'
              }}>
                {steps[i]===2?'✓':i+1}
              </div>
              <div style={{fontSize:8,letterSpacing:'0.06em',textTransform:'uppercase',color:steps[i]===1?'var(--cyan)':'rgba(242,244,248,0.25)',textAlign:'center'}}>{lbl}</div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <div className="fade-in-2" style={{marginBottom:16}}>
        <label style={{fontSize:10,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--muted)',marginBottom:8,display:'block'}}>Annual Income (USD)</label>
        <input
          type="number" value={income} min="0" max="500000"
          onChange={e => setIncome(e.target.value)}
          placeholder="e.g. 75000"
          style={{
            width:'100%',padding:'14px 16px',borderRadius:10,
            background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.09)',
            color:'var(--white)',fontFamily:'var(--font-mono)',fontSize:18,fontWeight:500,
            outline:'none',transition:'border-color 0.2s'
          }}
          onFocus={e => e.target.style.borderColor='rgba(0,212,255,0.5)'}
          onBlur={e  => e.target.style.borderColor='rgba(255,255,255,0.09)'}
        />
      </div>

      {/* Slider */}
      <div className="fade-in-2" style={{marginBottom:20}}>
        <input type="range" min="0" max="200000" step="1000"
          value={Math.min(v,200000)}
          style={{'--pct': pct+'%'}}
          onChange={e => setIncome(e.target.value)}
        />
        <div style={{display:'flex',justifyContent:'space-between',fontSize:10,color:'rgba(242,244,248,0.25)',marginTop:6}}>
          {['$0','$50k','$100k','$150k','$200k'].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>

      {/* Tier preview */}
      <div className="fade-in-2" style={{
        display:'flex',alignItems:'center',gap:10,padding:'14px 16px',
        borderRadius:10,marginBottom:20,transition:'all 0.3s',
        background: tier ? `${tier.color.replace('var(--gold)','rgba(255,209,102').replace('var(--silver)','rgba(184,192,204').replace('var(--bronze)','rgba(199,123,58')}0.06)` : 'rgba(255,255,255,0.04)',
        border:`1px solid ${tier ? tier.color.replace('var(--gold)','rgba(255,209,102,0.3)').replace('var(--silver)','rgba(184,192,204,0.3)').replace('var(--bronze)','rgba(199,123,58,0.3)') : 'rgba(255,255,255,0.09)'}`
      }}>
        <div style={{fontSize:22}}>{tier ? '◈' : '—'}</div>
        <div style={{flex:1}}>
          <div style={{fontFamily:'var(--font-display)',fontWeight:700,fontSize:14,color:tier?.color||'var(--muted)'}}>
            {tier ? `${tier.label.toUpperCase()} TIER` : 'No tier'}
          </div>
          <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>
            {tier ? `Qualifies at ${tier.label.toLowerCase()} threshold` : 'Enter income above $30,000'}
          </div>
        </div>
        <div style={{fontFamily:'var(--font-display)',fontWeight:800,fontSize:20,color:tier?.color||'rgba(242,244,248,0.25)'}}>
          {tier?.apy || '—'}
        </div>
      </div>

      <button className="btn-primary fade-in-3" onClick={runProof} disabled={running} style={{marginBottom:16}}>
        {running ? 'RUNNING…' : 'RUN PROOF ›'}
      </button>

      {/* Log */}
      {logs.length > 0 && (
        <div ref={logRef} style={{
          padding:'14px 16px',borderRadius:10,marginBottom:16,
          background:'rgba(0,0,0,0.35)',border:'1px solid rgba(255,255,255,0.09)',
          fontSize:11,color:'var(--muted)',minHeight:90,lineHeight:1.8,
          fontFamily:'var(--font-mono)',maxHeight:160,overflowY:'auto'
        }}>
          {logs.map(l => (
            <div key={l.id} style={{animation:'fadeUp 0.3s ease'}}>
              <span style={{color:'rgba(242,244,248,0.25)',marginRight:8}}>{l.ts}</span>
              <span style={{color: l.tag==='ok'?'var(--success)': l.tag==='warn'?'var(--gold)':'var(--cyan)'}}>{l.msg}</span>
            </div>
          ))}
        </div>
      )}

      {/* Result */}
      {result && (
        <div style={{
          padding:20,borderRadius:'var(--radius)',textAlign:'center',
          animation:'fadeUp 0.4s ease',
          background: result.qualified ? 'rgba(0,255,163,0.07)' : 'rgba(255,77,109,0.07)',
          border:`1px solid ${result.qualified ? 'rgba(0,255,163,0.25)' : 'rgba(255,77,109,0.25)'}`
        }}>
          <div style={{fontSize:32,marginBottom:10}}>{result.qualified ? '✓' : '✗'}</div>
          <div style={{fontFamily:'var(--font-display)',fontSize:20,fontWeight:800,marginBottom:6}}>
            {result.qualified ? `${result.tier.label} Tier Access Granted` : 'Threshold Not Met'}
          </div>
          <div style={{fontSize:11,color:'var(--muted)',lineHeight:1.6}}>
            {result.qualified
              ? `Your encrypted income exceeds the ${result.tier.label.toLowerCase()} threshold. A soulbound credential has been minted. No salary data was revealed.`
              : 'Your encrypted income does not cross the minimum $30,000 threshold. No data was disclosed.'}
          </div>
          {result.qualified && (
            <>
              <a href="https://sepolia.etherscan.io/tx/0x4f3a9b2c8d1e5f7a0b3c6d9e2f5a8b1c4d7e0f3"
                target="_blank" rel="noreferrer"
                style={{display:'inline-block',marginTop:12,fontSize:10,color:'var(--cyan)',
                  border:'1px solid rgba(0,212,255,0.3)',padding:'5px 12px',borderRadius:6,textDecoration:'none'}}>
                View on Etherscan ↗
              </a>
              <div style={{display:'flex',alignItems:'center',gap:12,padding:'14px 16px',
                borderRadius:10,background:'rgba(0,255,163,0.06)',border:'1px solid rgba(0,255,163,0.2)',marginTop:12}}>
                <div style={{fontSize:22}}>◈</div>
                <div style={{flex:1,textAlign:'left'}}>
                  <div style={{fontSize:12,fontWeight:600,color:'var(--success)'}}>Soulbound Credential Minted</div>
                  <div style={{fontSize:10,color:'var(--muted)',marginTop:2}}>{result.tier.label} Tier — 90 day credential</div>
                </div>
                <div style={{fontSize:9,color:'rgba(242,244,248,0.25)',textAlign:'right'}}>Expires in<br/><strong style={{color:'var(--white)'}}>90 days</strong></div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
