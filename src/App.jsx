import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import Nav from './components/Nav'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import TiersPage from './pages/TiersPage'
import SimulatorPage from './pages/SimulatorPage'
import VisualizerPage from './pages/VisualizerPage'

export default function App() {
  const [qualified, setQualified] = useState(null)
  const [activeTier, setActiveTier] = useState(null)
  const [proving, setProving] = useState(false)

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '72px' }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/tiers" element={<TiersPage activeTier={activeTier} />} />
        <Route
          path="/simulator"
          element={
            <SimulatorPage
              setQualified={setQualified}
              setActiveTier={setActiveTier}
              proving={proving}
              setProving={setProving}
              qualified={qualified}
            />
          }
        />
        <Route
          path="/visualizer"
          element={
            <VisualizerPage proving={proving} qualified={qualified} />
          }
        />
      </Routes>
      <BottomNav />
    </div>
  )
}
