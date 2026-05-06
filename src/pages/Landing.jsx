import Hero from '../components/Hero'
import HowItWorks from '../components/HowItWorks'

export default function Landing() {
  return (
    <div className="page-wrap">
      <div className="container">
        <Hero />
        <HowItWorks />
      </div>
    </div>
  )
}
