import Visualizer from '../components/Visualizer.jsx'

export default function VisualizerPage() {
  return (
    <div className="page">
      <div className="fade-in">
        <div style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>FHE Engine</div>
        <h1 className="page-title">Live visualizer</h1>
        <p className="page-sub">Real-time TFHE ciphertexts flowing through the homomorphic comparison pipeline.</p>
      </div>
      <Visualizer />
    </div>
  )
}
