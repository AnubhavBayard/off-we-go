import { useEffect, useLayoutEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Globe, Leaf, MapPin, Search, Sprout, UserRound, X } from 'lucide-react'
import { CATEGORY_LABEL, COUNTRIES, COUNTRY_CODE, dishes, imageFor, priceLabel, regionsOf, type Category } from '../data'
import { positionIfAllowed, reverseGeocode } from '../memories'
import { CATEGORY_ICON, DishPhoto, FoodTicker } from '../ui'

// Filters and scroll position outlive the page (open a dish, come back) for the rest of the app session.
const saved = { q: '', category: null as Category | null, country: '', state: '', vegOnly: false, jainOnly: false, scrollY: 0, located: false }

export default function Discover() {
  const [q, setQ] = useState(saved.q)
  const [category, setCategory] = useState(saved.category)
  const [country, setCountry] = useState(saved.country)
  const [state, setState] = useState(saved.state)
  const [vegOnly, setVegOnly] = useState(saved.vegOnly)
  const [jainOnly, setJainOnly] = useState(saved.jainOnly)
  useEffect(() => { Object.assign(saved, { q, category, country, state, vegOnly, jainOnly }) }, [q, category, country, state, vegOnly, jainOnly])

  // Once per session: start in the country the traveller is in, if we cover it and location is already allowed.
  useEffect(() => {
    if (saved.located) return
    saved.located = true
    void positionIfAllowed().then(async (pos) => {
      const code = pos && (await reverseGeocode(pos.lat, pos.lng))?.countryCode
      const here = COUNTRIES.find((c) => COUNTRY_CODE[c] === code)
      if (here && !saved.country) { setCountry(here); setState(''); if (here !== 'India') setJainOnly(false) }
    })
  }, [])

  // First frame renders a screenful of cards; the rest follow once the tab transition is over, so it stays smooth.
  // Coming back to a scrolled list renders everything at once so the old position exists to scroll back to.
  const [limit, setLimit] = useState(saved.scrollY ? Infinity : 20)
  useEffect(() => { const t = setTimeout(() => setLimit(Infinity), 450); return () => clearTimeout(t) }, [])
  useLayoutEffect(() => { window.scrollTo(0, saved.scrollY) }, []) // braces: scrollTo returns a Promise React would call as cleanup
  useEffect(() => {
    const remember = () => { saved.scrollY = window.scrollY }
    addEventListener('scroll', remember, { passive: true })
    return () => removeEventListener('scroll', remember)
  }, [])

  const query = q.trim().toLowerCase()
  const inState = dishes.filter((d) => (!country || d.country === country) && (!state || d.state === state))
  const list = inState.filter(
    (d) =>
      (!query || d.name.toLowerCase().includes(query) || d.local_name?.includes(q.trim())) &&
      (!category || d.category === category) &&
      (!vegOnly || d.diet === 'veg') &&
      (!jainOnly || d.jain),
  ).sort((a, b) => Number(!imageFor(a.id)) - Number(!imageFor(b.id))) // photos first
  const categories = [...new Set(inState.map((d) => d.category))] // only what this place has (no Temple food in Japan)
  // Carousel: GI-tagged dishes with a photo first, then any with a photo. Hidden while filtering.
  const filtering = query || category || vegOnly || jainOnly
  const featured = filtering ? [] : list.filter((d) => imageFor(d.id)).sort((a, b) => Number(b.gi_tag) - Number(a.gi_tag)).slice(0, 10)

  return (
    <div className="page">
      <div className="top-bar">
        <FoodTicker />
        <div className="greeting">
          <b>Hello, foodie</b>
          <span>Where are you eating today?</span>
        </div>
        <Link to="/account" className="icon-btn" aria-label="Account"><UserRound size={20} /></Link>
      </div>

      <h1>Find the <span className="hl">best</span> bites in {state || country || 'the world'}</h1>

      <label className="input-icon">
        <Search size={18} aria-hidden />
        <input className="search" placeholder="Search dishes" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      <div className="pickers">
        <label className="input-icon">
          <Globe size={18} aria-hidden />
          <select value={country} onChange={(e) => { setCountry(e.target.value); setState(''); if (e.target.value && e.target.value !== 'India') setJainOnly(false) }} aria-label="Country">
            <option value="">All countries</option>
            {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        {country && (
          <label className="input-icon">
            <MapPin size={18} aria-hidden />
            <select value={state} onChange={(e) => setState(e.target.value)} aria-label="Region">
              <option value="">All of {country}</option>
              {regionsOf(country).map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </label>
        )}
      </div>

      <div className="chips">
        {categories.map((c) => {
          const Icon = CATEGORY_ICON[c]
          return (
            <button key={c} className={category === c ? 'on' : ''} onClick={() => setCategory(category === c ? null : c)}>
              <Icon size={16} /> {CATEGORY_LABEL[c]}
            </button>
          )
        })}
        <button className={vegOnly ? 'on' : ''} onClick={() => setVegOnly(!vegOnly)}><Leaf size={16} /> Veg only</button>
        {(!country || country === 'India') && (
          <button className={jainOnly ? 'on' : ''} onClick={() => setJainOnly(!jainOnly)}><Sprout size={16} /> Jain</button>
        )}
      </div>

      {featured.length > 0 && (
        <>
          <h2>Must try</h2>
          <div className="carousel">
            {featured.map((d) => (
              <Link key={d.id} to={`/dish/${d.id}`} className="feature">
                <DishPhoto dish={d} className="feature-photo" />
                <span className="badge">
                  {d.gi_tag ? <><Award size={14} /> GI tag</> : <><span className={`diet ${d.diet}`} /> {CATEGORY_LABEL[d.category]}</>}
                </span>
                <div className="feature-info">
                  <div>
                    <b>{d.name}</b>
                    <span className="muted small"><MapPin size={12} /> {country ? d.state : `${d.state}, ${d.country}`}</span>
                  </div>
                  {priceLabel(d) && <b className="price">{priceLabel(d)}</b>}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <div className="list-head">
        <h2>{filtering ? 'Results' : 'All dishes'} <span className="muted count">{list.length}</span></h2>
        {filtering && (
          // Keeps the picked state: that's the place being browsed, not a filter.
          <button className="clear-btn" onClick={() => { setQ(''); setCategory(null); setVegOnly(false); setJainOnly(false) }}>
            <X size={14} /> Clear filters
          </button>
        )}
      </div>
      {dishes.length === 0 && <p className="muted">No dish data yet.</p>}
      <ul className="cards">
        {list.slice(0, limit).map((d) => (
          <li key={d.id}>
            <Link to={`/dish/${d.id}`} className="card row-card">
              <DishPhoto dish={d} className="thumb-photo" />
              <div className="row-card-body">
                <div className="card-title">
                  <span className={`diet ${d.diet}`} aria-label={d.diet} />
                  {d.name}
                </div>
                <span className="muted small"><MapPin size={12} /> {country ? d.state : `${d.state}, ${d.country}`}</span>
                <div className="tags">
                  <span>{CATEGORY_LABEL[d.category]}</span>
                  {d.gi_tag && <span>GI tag</span>}
                  {priceLabel(d) && <span>{priceLabel(d)}</span>}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {dishes.length > 0 && list.length === 0 && <p className="muted">No dishes match these filters.</p>}
    </div>
  )
}
