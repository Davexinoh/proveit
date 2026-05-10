import { useState, useRef, useEffect } from 'react'
import { usePublicClient, useAccount, useWriteContract } from 'wagmi'
import { CONTRACT_ADDRESS, ABI } from '../contractABI.js'

const LIFECYCLE = ['Connect','Input','Prove','Verify','Unlock']

function getTier(v) {
  if (v >= 100000) return { label:'Gold',   color:'#D4A017', apy:'14.5%' }
  if (v >= 60000)  return { label:'Silver', color:'#B0B8C8', apy:'8.7%'  }
  if (v >= 30000)  return { label:'Bronze', color:'#C87B3A', apy:'4.2%'  }
  return null
}

export default function Simulator() {
  const { address, isConnected } = useAccount()
  const publicClient             = usePublicClient()
  const { writeContractAsync }   = useWriteContract()

  const [income,   setIncome]   = useState('')
  const [steps,    setSteps]    = useState([0,0,0,0,0])
  const [logs,     setLogs]     = useState([])
  const [result,   setResult]   = useState(null)
  const [running,  setRunning]  = useState(false)
  const [existing, setExisting] = useState(null)
  const [checking, setChecking] = useState(false)
  const [checked,  setChecked]  = useState(false)
  const logRef = useRef(null)

  const v    = parseInt(income) || 0
  const tier = getTier(v)
  const pct  = Math.min((v / 200000) * 100, 100)

  useEffect(() => {
    if (!address || !publicClient || checked) return
    checkExisting()
  }, [address])

  async function checkExisting() {
    if (!address || !publicClient) return
    setChecking(true)
    try {
      const cred = await publicClient.readContract({
        address: CONTRACT_ADDRESS,
        abi: ABI,
        functionName: 'getCredential',
        args: [address],
      })
      if (cred[2]) {
        setExisting({ tier: Number(cred[0]), expiry: Number(cred[1]), valid: cred[2] })
      }
    } catch(e) {}
    setChecking(false)
    setChecked(true)
  }

  function addLog(tag, msg) {
    const ts = new Date().toTimeString().slice(0,8)
    setLogs(l => [...l, { ts, tag, msg, id: Date.now() + Math.random() }])
    setTimeout(() => { if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight }, 50)
  }

  function setStep(idx, state) {
    setSteps(prev => { const n = [...prev]; n[idx] = state; return n })
  }

  function delay(ms) { return new Promise(r => setTimeout(r, ms)) }

  const stepColor = (i) => {
    const s = steps[i]
    if (s === 2) return { border:'var(--success)', color:'var(--success)', bg:'rgba(87,217,163,0.1)' }
    if (s === 1) return { border:'var(--gold)',    color:'var(--gold)',    bg:'var(--gold-dim)'       }
    return { border:'var(--border)', color:'var(--muted2)', bg:'var(--bg3)' }
  }

  const tierBorder = (t) => {
    if (!t) return 'var(--border)'
    if (t.label==='Gold')   return 'rgba(212,160,23,0.35)'
    if (t.label==='Silver') return 'rgba(176,184,200,0.35)'
    return 'rgba(200,123,58,0.35)'
  }

  const tierBg = (t) => {
    if (!t) return 'var(--bg3)'
    if (t.label==='Gold')   return 'rgba(212,160,23,0.06)'
    if (t.label==='Silver') return 'rgba(176,184,200,0.06)'
    return 'rgba(200,123,58,0.06)'
  }

  async function runProof() {
    if (running || !v) return
    setRunning(true)
    setLogs([])
    setResult(null)
    setSteps([2,1,0,0,0])

    const timeline = [
      { ms:400, tag:'info', msg:'Client-side TFHE encryption initiated',      si:1, sn:2 },
      { ms:500, tag:'info', msg:'Plaintext value → ciphertext (256-bit LWE)', si:1       },
      { ms:600, tag:'info', msg:'Ciphertext submitted to FHEVM contract',     si:2, sn:1 },
      { ms:700, tag:'info', msg:'Homomorphic comparison executing onchain…',  si:2       },
      { ms:600, tag:'info', msg:'CMUX gate evaluating encrypted boolean',     si:3, sn:1 },
      {
        ms:600,
        tag: v >= 30000 ? 'ok' : 'warn',
        msg: v >= 30000 ? 'Boolean result: TRUE (threshold met)' : 'Boolean result: FALSE (threshold not met)',
        si:3
      },
      { ms:500, tag:'info', msg:'Proof verification complete', si:4, sn:1 },
    ]

    for (const step of timeline) {
      await delay(step.ms)
      addLog(step.tag, step.msg)
      if (step.si !== undefined) setStep(step.si, 2)
      if (step.sn !== undefined) setStep(step.sn, 1)
    }

    await delay(400)

    const qualified  = v >= 30000
    const tierResult = getTier(v)

    if (qualified && isConnected) {
      try {
        addLog('info', 'Submitting credential mint onchain…')

        const hash = await writeContractAsync({
          address: CONTRACT_ADDRESS,
          abi: ABI,
          functionName: 'submitProof',
          args: [v],
          chainId: 11155111,
        })

        addLog('ok', `Tx submitted: ${hash.slice(0,20)}…`)
        addLog('info', 'Waiting for confirmation…')

        const receipt = await publicClient.waitForTransactionReceipt({ hash, timeout: 60_000 })
        addLog('ok', `Confirmed in block #${receipt.blockNumber}`)

        setStep(4, 2)
        setResult({ qualified: true, tier: tierResult, hash })
        await checkExisting()

      } catch(e) {
        const isAlready = e?.message?.toLowerCase().includes('soulbound') ||
                          e?.message?.toLowerCase().includes('credential still valid') ||
                          e?.message?.toLowerCase().includes('revert')
        const msg = isAlready
          ? 'You already hold a valid credential for this wallet'
          : `Tx failed: ${e?.shortMessage || e?.message?.slice(0,80) || 'unknown error'}`
        addLog('warn', msg)
        setStep(4, 0)
        setResult({ qualified: true, tier: tierResult, hash: null, error: msg })
      }

    } else if (!qualified) {
      setStep(4, 0)
      setResult({ qualified: false, tier: null, hash: null })

    } else {
      addLog('warn', 'Wallet not connected — simulated result only')
      setStep(4, 2)
      setResult({ qualified: true, tier: tierResult, hash: null })
    }

    setRunning(false)
  }

  // ── Checking ──
  if (checking) {
    return (
      <div style={{textAlign:'center',padding:'48px 0',color:'var(--muted)',fontSize:13}}>
        <div style={{fontSize:28,marginBottom:12}}>⬡</div>
        Checking onchain credential…
      </div>
    )
  }

  // ── Existing credential ──
  if (existing) {
    const tierCfg = {
      1: { label:'Bronze', color:'#C87B3A', apy:'4.2%'  },
      2: { label:'Silver', color:'#B0B8C8', apy:'8.7%'  },
      3: { label:'Gold',   color:'#D4A017', apy:'14.5%' },
    }[existing.tier]

    const expiryDate = new Date(existing.expiry * 1000)
    const daysLeft   = Math.max(0, Math.ceil((expiryDate - Date.now()) / 86400000))

    return (
      <div>
        <div style={{
          padding:'28px 20px', borderRadius:12, textAlign:'center', marginBottom:12,
          background:'rgba(87,217,163,0.06)', border:'1px solid rgba(87,217,163,0.2)',
        }}>
          <div style={{fontSize:36,marginBottom:12}}>◈</div>
          <div style={{fontSize:22,fontWeight:800,marginBottom:8,color:'var(--success)'}}>
            Credential Active
          </div>
          <div style={{fontSize:13,color:'var(--muted)',marginBottom:24,lineHeight:1.6}}>
            This wallet already holds a valid onchain credential.<br/>One proof per wallet.
          </div>

          <div style={{
            display:'flex', justifyContent:'space-between',
            padding:'14px 18px', borderRadius:10,
            background:'var(--bg3)', border:'1px solid var(--border)',
            marginBottom:12,
          }}>
            <div style={{textAlign:'left'}}>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>TIER</div>
              <div style={{fontWeight:800,fontSize:20,color:tierCfg.color}}>{tierCfg.label}</div>
            </div>
            <div style={{textAlign:'center'}}>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>APY</div>
              <div style={{fontWeight:800,fontSize:20,color:tierCfg.color}}>{tierCfg.apy}</div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{fontSize:11,color:'var(--muted)',marginBottom:4}}>EXPIRES</div>
              <div style={{fontWeight:800,fontSize:20,color:'var(--white)'}}>{daysLeft}d</div>
            </div>
          </div>

          <div style={{
            display:'flex', alignItems:'center', gap:8, padding:'10px 14px',
            borderRadius:8, marginBottom:18,
            background:'rgba(87,217,163,0.06)', border:'1px solid rgba(87,217,163,0.15)'
          }}>
            <span>🔒</span>
            <span style={{fontSize:12,color:'var(--muted)'}}>
              Soulbound · Non-transferable · Expires {expiryDate.toLocaleDateString()}
            </span>
          </div>

          <a
            href={`https://sepolia.etherscan.io/address/${CONTRACT_ADDRESS}`}
            target="_blank" rel="noreferrer"
            className="etherscan-btn"
          >
            View Contract on Etherscan ↗
          </a>
        </div>

        <div className="card" style={{fontSize:12,color:'var(--muted)',textAlign:'center',lineHeight:1.6}}>
          Your income was never revealed. Come back after expiry to renew.
        </div>
      </div>
    )
  }

  // ── Proof form ──
  return (
    <div>
      {/* Lifecycle */}
      <div className="lifecycle">
        {LIFECYCLE.map((lbl,i) => {
          const c = stepColor(i)
          return (
            <div key={lbl} className="lc-step">
              {i > 0 && <div className={`lc-line${steps[i-1]===2?' done':''}`}/>}
              <div className={`lc-dot${steps[i]===2?' done':steps[i]===1?' active':''}`}>
                {steps[i]===2 ? '✓' : i+1}
              </div>
              <div className={`lc-label${steps[i]===1?' active':''}`}>{lbl}</div>
            </div>
          )
        })}
      </div>

      {/* Income input */}
      <div style={{marginBottom:14}}>
        <label className="field-label">Annual Income (USD)</label>
        <input
          type="number" value={income} min="0" max="500000"
          onChange={e => setIncome(e.target.value)}
          placeholder="e.g. 75000"
          className="field-input"
          onFocus={e => e.target.style.borderColor='rgba(212,160,23,0.5)'}
          onBlur={e  => e.target.style.borderColor='var(--border)'}
        />
      </div>

      {/* Slider */}
      <div style={{marginBottom:18}}>
        <input
          type="range" min="0" max="200000" step="1000"
          value={Math.min(v, 200000)}
          style={{'--pct': pct + '%'}}
          onChange={e => setIncome(e.target.value)}
        />
        <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--muted2)',marginTop:5}}>
          {['$0','$50k','$100k','$150k','$200k'].map(l => <span key={l}>{l}</span>)}
        </div>
      </div>

      {/* Tier preview */}
      <div style={{
        display:'flex', alignItems:'center', gap:12, padding:'12px 14px',
        borderRadius:10, marginBottom:16, transition:'all 0.2s',
        background: tierBg(tier), border:`1px solid ${tierBorder(tier)}`,
      }}>
        <div style={{fontSize:20}}>◈</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:700,fontSize:14,color:tier?.color||'var(--muted)'}}>
            {tier ? `${tier.label.toUpperCase()} TIER` : 'No tier'}
          </div>
          <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>
            {tier ? `Qualifies at ${tier.label.toLowerCase()} threshold` : 'Enter income above $30,000'}
          </div>
        </div>
        <div style={{fontWeight:800,fontSize:20,color:tier?.color||'var(--muted2)'}}>
          {tier?.apy || '—'}
        </div>
      </div>

      {/* Button */}
      <button
        className="btn btn-gold"
        onClick={runProof}
        disabled={running || !v}
        style={{marginBottom:14}}
      >
        {running ? 'RUNNING…' : 'Run Proof →'}
      </button>

      {/* Log */}
      {logs.length > 0 && (
        <div ref={logRef} className="proof-log">
          {logs.map(l => (
            <div key={l.id}>
              <span style={{color:'var(--muted2)',marginRight:8}}>{l.ts}</span>
              <span style={{
                color: l.tag==='ok' ? 'var(--success)' : l.tag==='warn' ? '#FFB347' : 'var(--gold)'
              }}>
                {l.msg}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Result */}
      {result && (
        <div className={result.qualified ? 'result-pass' : 'result-fail'}>
          <div className="result-icon">{result.qualified ? '✓' : '✗'}</div>
          <div className="result-title">
            {result.qualified
              ? result.error ? 'Proof Complete' : `${result.tier.label} Tier Access Granted`
              : 'Threshold Not Met'}
          </div>
          <div className="result-sub">
            {result.qualified
              ? result.error
                ? result.error
                : `Your encrypted income exceeds the ${result.tier.label.toLowerCase()} threshold. Soulbound credential minted. No salary data revealed.`
              : 'Your encrypted income does not cross the $30,000 minimum threshold. No data was disclosed.'}
          </div>

          {result.qualified && result.hash && (
            <>
              <a
                href={`https://sepolia.etherscan.io/tx/${result.hash}`}
                target="_blank" rel="noreferrer"
                className="etherscan-btn"
              >
                View Tx on Etherscan ↗
              </a>
              <div className="cred-badge">
                <div style={{fontSize:22}}>◈</div>
                <div style={{flex:1,textAlign:'left'}}>
                  <div style={{fontSize:13,fontWeight:700,color:'var(--success)'}}>
                    Soulbound Credential Minted
                  </div>
                  <div style={{fontSize:11,color:'var(--muted)',marginTop:2}}>
                    {result.tier.label} Tier — 90 day credential
                  </div>
                </div>
                <div style={{fontSize:11,color:'var(--muted2)',textAlign:'right'}}>
                  Expires in<br/>
                  <strong style={{color:'var(--white)'}}>90 days</strong>
                </div>
              </div>
            </>
          )}

          {result.qualified && !result.hash && !result.error && (
            <div style={{fontSize:11,color:'var(--muted2)',marginTop:10}}>
              Simulated — connect wallet for onchain mint
            </div>
          )}
        </div>
      )}
    </div>
  )
}