import Simulator from '../components/Simulator'

export default function SimulatorPage() {
  return (
    <div className="page-wrap">
      <div className="container">
        <div className="section-header fade-in" style={{paddingTop:8}}>
          <div className="section-eyebrow">Simulator</div>
          <div className="section-title">Run a proof</div>
          <div className="section-sub">Enter an income to simulate the FHE verification flow. No real data is submitted — this demo illustrates the full proof lifecycle.</div>
        </div>
        <Simulator />
      </div>
    </div>
  )
}
