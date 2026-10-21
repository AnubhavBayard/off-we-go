import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, NavLink, Route, Routes } from 'react-router-dom'
import 'maplibre-gl/dist/maplibre-gl.css'
import './index.css'
import Discover from './pages/Discover'
import DishPage from './pages/Dish'
import MapPage from './pages/MapPage'
import Memories from './pages/Memories'
import AddMemory from './pages/AddMemory'

function App() {
  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/dish/:id" element={<DishPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/add" element={<AddMemory />} />
        </Routes>
      </main>
      <nav className="tabs">
        <NavLink to="/" end>Eat</NavLink>
        <NavLink to="/map">Map</NavLink>
        <NavLink to="/add">+ Memory</NavLink>
        <NavLink to="/memories">Memories</NavLink>
      </nav>
    </HashRouter>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
