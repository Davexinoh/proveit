import CredentialRegistry from '../components/CredentialRegistry.jsx'

export default function RegistryPage() {
  return (
    <div className="page">
      <div className="fade-in">
        <div style={{fontSize:11,fontWeight:600,color:'var(--gold)',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:10}}>Onchain Registry</div>
        <h1 className="page-title">Live credentials</h1>
        <p className="page-sub">Aggregate proof — collective truth from individual privacy.</p>
      </div>
      <CredentialRegistry />
    </div>
  )
}
