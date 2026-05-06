import Visualizer from '../components/Visualizer'

export default function VisualizerPage() {
  return (
    <div className="page-wrap">
      <div className="container">
        <div className="section-header fade-in" style={{paddingTop:8}}>
          <div className="section-eyebrow">FHE Engine</div>
          <div className="section-title">Live visualizer</div>
          <div className="section-sub">Real-time view of FHE operations as they execute. Each hex block represents a ciphertext chunk being processed homomorphically.</div>
        </div>
        <Visualizer />
      </div>
    </div>
  )
}
