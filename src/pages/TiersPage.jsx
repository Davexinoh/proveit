import Tiers from '../components/Tiers'

export default function TiersPage() {
  return (
    <div className="page-wrap">
      <div className="container">
        <div className="section-header fade-in" style={{paddingTop:8}}>
          <div className="section-eyebrow">Access Tiers</div>
          <div className="section-title">Yield pools</div>
          <div className="section-sub">Three tiers, each gated by a confidential income proof. APY rates shown are illustrative for this demonstration.</div>
        </div>
        <Tiers />
      </div>
    </div>
  )
}
