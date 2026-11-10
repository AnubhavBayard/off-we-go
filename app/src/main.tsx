import { StrictMode, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, NavLink, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Images, Map as MapIcon, Plus, UtensilsCrossed } from 'lucide-react'
import { App as NativeApp } from '@capacitor/app'
import '@fontsource-variable/plus-jakarta-sans'
import 'maplibre-gl/dist/maplibre-gl.css'
import './index.css'
import Discover from './pages/Discover'
import DishPage from './pages/Dish'
import MapPage from './pages/MapPage'
import Memories from './pages/Memories'
import AddMemory from './pages/AddMemory'
import Account from './pages/Account'
import Welcome from './pages/Welcome'
import { syncMemories } from './memories'
import { listenForLoginLinks } from './cloud'

const TABS = [
  { to: '/', label: 'Eat', Icon: UtensilsCrossed },
  { to: '/map', label: 'Map', Icon: MapIcon },
  { to: '/add', label: 'Add', Icon: Plus },
  { to: '/memories', label: 'Memories', Icon: Images },
]

// Floating icon bar; the active tab also shows its label. Hidden on dish pages, which have their own bottom bar.
// Tab switches run inside a View Transition (page fades/rises, active pill slides); instant where unsupported.
// React Router renders the new route asynchronously, so the transition waits for that commit (the layout
// effect below) before snapshotting the new page; otherwise the old page animates and the new one pops in.
function Tabs() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const committed = useRef<() => void>(undefined)
  const target = useRef(pathname) // last route we navigated to, so pointerdown + click don't navigate twice
  useLayoutEffect(() => { target.current = pathname; committed.current?.(); committed.current = undefined }, [pathname])
  if (pathname.startsWith('/dish/')) return null
  // Navigates on pointerdown: a tap while the page is still flinging only stops the fling and the
  // WebView never sends a click. Click stays for keyboard use.
  const go = (to: string) => {
    if (to === target.current) return
    target.current = to
    if (!document.startViewTransition) return navigate(to)
    document.startViewTransition(() => new Promise<void>((resolve) => {
      committed.current = resolve
      setTimeout(resolve, 600) // never hold the screen if the route somehow doesn't change
      navigate(to)
    }))
  }
  return (
    <nav className="tabs">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end={to === '/'} aria-label={label} onPointerDown={(e) => e.button === 0 && go(to)}
          onClick={(e) => { e.preventDefault(); go(to) }}>
          <Icon size={20} /><span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

// Android back button: any other tab goes to the home tab, home closes the app. Pages opened from
// a tab (dish, account) go back the usual way.
function BackButton() {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const path = useRef(pathname)
  path.current = pathname
  useEffect(() => {
    const handle = NativeApp.addListener('backButton', () => {
      if (path.current === '/') void NativeApp.exitApp()
      else if (TABS.some((t) => t.to === path.current)) navigate('/', { replace: true })
      else history.back()
    })
    return () => { void handle.then((h) => h.remove()) }
  }, [navigate])
  return null
}

// Landing screen only on the very first launch. localStorage can throw (private mode); then it shows again next launch.
const WELCOMED = 'welcomed'
const seenWelcome = () => { try { return localStorage.getItem(WELCOMED) === '1' } catch { return false } }

function App() {
  const [welcomed, setWelcomed] = useState(seenWelcome)
  if (!welcomed) {
    return <Welcome onStart={() => { try { localStorage.setItem(WELCOMED, '1') } catch { /* show again next time */ } setWelcomed(true) }} />
  }
  return (
    <HashRouter>
      <main>
        <Routes>
          <Route path="/" element={<Discover />} />
          <Route path="/dish/:id" element={<DishPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/memories" element={<Memories />} />
          <Route path="/add" element={<AddMemory />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </main>
      <Tabs />
      <BackButton />
    </HashRouter>
  )
}

// The launch intro is static HTML (index.html) so it animates before this bundle loads; the app renders
// underneath meanwhile. Remove it once it has played out (it also hides itself via CSS) or when tapped.
const intro = document.getElementById('intro')
if (intro) {
  const done = () => intro.remove()
  intro.addEventListener('click', done)
  intro.addEventListener('animationend', (e) => e.animationName === 'intro-out' && done())
  if (intro.getAnimations({ subtree: true }).every((a) => a.playState === 'finished')) done() // bundle was slower than the intro
}

// Upload anything saved offline last time.
void syncMemories()

listenForLoginLinks((error) => {
  if (error) return alert(`Sign-in failed: ${error}`)
  location.hash = '#/account'
  void syncMemories()
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
