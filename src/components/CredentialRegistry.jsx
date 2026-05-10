import { useEffect, useState } from 'react'
import { usePublicClient } from 'wagmi'
import { CONTRACT_ADDRESS, ABI } from '../contractABI.js'

const TIER_CONFIG = {
  1: { label:'BRONZE', color:'#C87B3A', bar:'linear-gradient(90deg,#C87B3A,#E09A5A)' },
  2: { label:'SILVER', color:'#B0B8C8', bar:'linear-gradient(90deg,#9AA8BC,#C8D0DC)' },
  3: { label:'GOLD',   color:'#D4A017', bar:'linear-gradient(90deg,#D4A017,#F5CC4A)' },
}

export default function CredentialRegistry() {
  const publicClient = usePublicClient()
  const [counts,    setCounts]    = useState({ 1:0, 2:0, 3:0 })
  const [total,     setTotal]     = useState(0)
  const [loading,   setLoading]   = useState(true)
  const [lastBlock, setLastBlock] = useState(null)
  const [live,      setLive]      = useState(false)

  async function fetchEvents() {
    try {
      const logs = await publicClient.getLogs({
        address: CONTRACT_ADDRESS,
        event: {
          type:'event', name:'CredentialMinted',
          inputs:[
            { name:'user',    type:'address', indexed:true  },
            { name:'tokenId', type:'uint256', indexed:false },
            { name:'tier',    type:'uint8',   indexed:false },
          ]
        },
        fromBlock: 0n, toBlock:'latest',
      })
      const tally = { 1:0, 2:0, 3:0 }
      logs.forEach(log => {
        const t = Number(log.args.tier)
        if (tally[t] !== undefined) tally[t]++
      })
      setCounts(tally)
      setTotal(logs.length)
      setLoading(false)
      setLive(true)
      const block = await publicClient.getBlockNumber()
      setLastBlock(block.toString())
    } catch(e) { setLoading(false) }
  }

  useEffect(() => {
    fetchEvents()
    const iv = setInterval(fetchEvents, 15000)
    return () => clearInterval(iv)
  }, [])

  const max = Math.max(...Object.values(counts), 1)

  return (
    <div>
      <div className="registry-total fade-in">
        <div>
          <div style={{fontSize:12,color:'var(--muted)',marginBottom:6}}>Total credentials minted</div>
          <div style={{fontSize:40,fontWeight:800,color:'var(--gold)',lineHeight:1}}>
            {loading ? '—' : total}
          </div>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{display:'flex',alignItems:'center',gap:6,justifyContent:'flex-end',fontSize:11,fontWeight:600,color:live?'var(--success)':'var(--muted2)',marginBottom:4}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:live?'var(--success)':'var(--muted2)',display:'inline-block'}}/>
            LIVE
          </div>
          <div style={{fontSize:11,color:'var(--muted2)'}}>
            {lastBlock ? `Block #${Number(lastBlock).toLocaleString()}` : '—'}
          </div>
        </div>
      </div>

      {[3,2,1].map(tier => {
        const cfg   = TIER_CONFIG[tier]
        const count = counts[tier]
        const pct   = (count / max) * 100
        return (
          <div key={tier} className="card fade-in-2" style={{marginBottom:8}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10}}>
              <div style={{display:'flex',alignItems:'center',gap:8,fontWeight:700,fontSize:14,color:cfg.color}}>
                <span style={{width:7,height:7,borderRadius:'50%',background:cfg.color,display:'inline-block'}}/>
                {cfg.label}
              </div>
              <div style={{fontWeight:800,fontSize:20,color:cfg.color}}>
                {loading ? '—' : count}
                <span style={{fontSize:12,opacity:0.6,fontWeight:400,marginLeft:4}}>wallets</span>
              </div>
            </div>
            <div className="registry-bar-track">
              <div className="registry-bar-fill" style={{width:loading?'0%':`${pct}%`,background:cfg.bar}}/>
            </div>
            <div style={{display:'flex',justifyContent:'space-between',fontSize:11,color:'var(--muted2)'}}>
              <span>Threshold: {tier===3?'$100k+':tier===2?'$60k+':'$30k+'}</span>
              <span>{loading?'…':`${Math.round(total>0?(count/total)*100:0)}% of total`}</span>
            </div>
          </div>
        )
      })}

      <div className="card fade-in-3" style={{marginTop:4}}>
        <div style={{fontSize:12,color:'var(--muted)',lineHeight:1.7}}>
          <span style={{color:'var(--gold)',fontWeight:600}}>Privacy guarantee — </span>
          These counts are derived from onchain events. No individual wallet addresses or income figures are stored or displayed.
        </div>
      </div>
    </div>
  )
}
