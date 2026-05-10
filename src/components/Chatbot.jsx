import { useState, useRef, useEffect } from 'react'

const SUGGESTIONS = [
  { icon:'🔐', text:'What is ProveIt?' },
  { icon:'⬡',  text:'How does FHE keep my salary private?' },
  { icon:'◈',  text:'How do I get a soulbound credential?' },
]

const KB = [
  { keys:['what is proveit','proveit','prove it','what does it do'], reply:`ProveIt is a confidential income-gated DeFi access protocol. You prove your income crosses a threshold to access yield pools — without revealing your actual salary. The proof runs fully onchain using Fully Homomorphic Encryption via Zama's FHEVM.` },
  { keys:['fhe','homomorphic','encryption','private','salary','how does it work','keep','hide'], reply:`Your income is encrypted client-side using TFHE before it ever leaves your browser. The FHEVM contract runs a homomorphic comparison on the ciphertext — math on encrypted data. The result is an encrypted boolean: qualified or not. No salary figure is ever decrypted or stored anywhere.` },
  { keys:['credential','soulbound','nft','mint','token','get','earn'], reply:`Once your proof passes, a soulbound ERC-721 credential is minted to your wallet. It's non-transferable and valid for 90 days. It grants access to the corresponding yield tier — Bronze, Silver, or Gold — depending on your income threshold.` },
  { keys:['tier','bronze','silver','gold','apy','yield','pool','30k','60k','100k'], reply:`Three tiers: Bronze ($30k+, 4.2% APY), Silver ($60k+, 8.7% APY), Gold ($100k+, 14.5% APY). APY rates are illustrative for this demo. Each tier requires a separate income proof — the higher the threshold, the higher the yield.` },
  { keys:['contract','address','sepolia','deployed','onchain','blockchain'], reply:`ProveIt is deployed on Sepolia testnet at 0xb46ae02609c38ddc8d3135834b6789ec6c043898. You can verify it on Etherscan. The contract handles income threshold verification and soulbound credential minting.` },
  { keys:['zama','fhevm','tfhe','technology','stack','built on'], reply:`ProveIt is built on Zama's FHEVM — a Fully Homomorphic Encryption Virtual Machine that lets smart contracts operate on encrypted data. It uses the TFHE scheme for fast boolean operations onchain.` },
  { keys:['connect','wallet','metamask','how to','start','run','proof','simulate'], reply:`Tap "Connect wallet" in the top nav. Once connected, go to Run Proof, enter an income amount, and tap Run Proof. The simulator walks you through all 5 steps: Connect → Input → Prove → Verify → Unlock.` },
  { keys:['registry','leaderboard','how many','wallets','total','count'], reply:`The Live Registry shows real-time aggregate credential counts pulled from onchain events. It shows how many wallets hold Bronze, Silver, and Gold credentials — without revealing any individual wallet or income. Collective truth from individual privacy.` },
  { keys:['safe','trust','data','store','reveal','exposed','leak'], reply:`Nothing is stored or revealed. Your income is encrypted before it leaves your browser. The smart contract never decrypts it. Even validators only see ciphertext. The only onchain record is your credential tier — not your income.` },
]

function getReply(input) {
  const q = input.toLowerCase()
  for (const entry of KB) {
    if (entry.keys.some(k => q.includes(k))) return entry.reply
  }
  return `Good question. ProveIt uses Zama's FHEVM to verify income thresholds privately onchain. Connect your wallet and run a proof to see it in action — or ask me about tiers, credentials, or how FHE works.`
}

export default function Chatbot({ open, onToggle }) {
  const [messages, setMessages] = useState([
    { role:'bot', text:'Hey, how can I help? Ask me anything about ProveIt.' }
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [showSug, setShowSug] = useState(true)
  const msgRef = useRef(null)

  useEffect(() => {
    if (msgRef.current) msgRef.current.scrollTop = msgRef.current.scrollHeight
  }, [messages, loading])

  async function send(text) {
    const q = (text || input).trim()
    if (!q) return
    setInput('')
    setShowSug(false)
    setMessages(m => [...m, { role:'user', text:q }])
    setLoading(true)
    await new Promise(r => setTimeout(r, 600 + Math.random()*400))
    setLoading(false)
    setMessages(m => [...m, { role:'bot', text:getReply(q) }])
  }

  return (
    <>
      <div className={`chatbot-window${open?' open':''}`}>
        <div className="chat-header">
          <div className="chat-avatar">⬡</div>
          <div>
            <div className="chat-name">ProveIt AI</div>
            <div className="chat-status">Online</div>
          </div>
          <button className="chat-close" onClick={onToggle}>×</button>
        </div>

        <div className="chat-messages" ref={msgRef}>
          {messages.map((m,i) => (
            <div key={i} className={`chat-msg ${m.role}`}>
              <div className="chat-bubble">{m.text}</div>
            </div>
          ))}
          {loading && (
            <div className="chat-msg bot">
              <div className="chat-bubble">
                <div className="chat-typing"><span/><span/><span/></div>
              </div>
            </div>
          )}
        </div>

        {showSug && (
          <div className="chat-suggestions">
            {SUGGESTIONS.map((s,i) => (
              <button key={i} className="chat-suggestion" onClick={()=>send(s.text)}>
                <span>{s.icon}</span>{s.text}
              </button>
            ))}
          </div>
        )}

        <div className="chat-input-row">
          <input
            className="chat-input"
            placeholder="Ask about ProveIt…"
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>e.key==='Enter'&&send()}
          />
          <button className="chat-send" onClick={()=>send()}>›</button>
        </div>
        <div className="chat-powered">Powered by AI · May make mistakes</div>
      </div>

      <button className="chatbot-fab" onClick={onToggle}>
        {open ? '×' : '💬'}
      </button>
    </>
  )
}
