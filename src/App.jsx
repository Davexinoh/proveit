import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import BottomNav from './components/BottomNav'
import Landing from './pages/Landing'
import TiersPage from './pages/TiersPage'
import SimulatorPage from './pages/SimulatorPage'
import VisualizerPage from './pages/VisualizerPage'

export default function App() {
  return (
    <>
      <div className="bg-orbs">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
      </div>
      <div className="noise" />
      <Nav />
      <Routes>
        <Route path="/"           element={<Landing />} />
        <Route path="/tiers"      element={<TiersPage />} />
        <Route path="/simulator"  element={<SimulatorPage />} />
        <Route path="/visualizer" element={<VisualizerPage />} />
      </Routes>
      <BottomNav />
    </>
  )
}
