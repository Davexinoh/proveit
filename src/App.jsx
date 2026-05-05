import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Tiers from './components/Tiers'
import Simulator from './components/Simulator'
import Visualizer from './components/Visualizer'
import Footer from './components/Footer'

export default function App() {
  const [qualified, setQualified] = useState(null)
  const [activeTier, setActiveTier] = useState(null)
  const [proving, setProving] = useState(false)

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <Nav />
      <Hero />
      <Tiers activeTier={activeTier} />
      <Simulator
        setQualified={setQualified}
        setActiveTier={setActiveTier}
        proving={proving}
        setProving={setProving}
        qualified={qualified}
      />
      <Visualizer proving={proving} qualified={qualified} />
      <Footer />
    </div>
  )
}