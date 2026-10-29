import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Award, Leaf, MapPin, Search, Sprout, UserRound } from 'lucide-react'
import { CATEGORY_LABEL, STATES, dishes, imageFor, type Category } from '../data'
import { CATEGORY_ICON, DishPhoto, FoodTicker } from '../ui'

export default function Discover() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [state, setState] = useState('')
  const [vegOnly, setVegOnly] = useState(false)
  const [jainOnly, setJainOnly] = useState(false)
  // First frame renders a screenful of cards; the rest follow once the tab transition is over, so it stays smooth.
  const [limit, setLimit] = useState(20)
  useEffect(() => { const t = setTimeout(() => setLimit(Infinity), 450); return () => clearTimeout(t) }, [])

  const query = q.trim().toLowerCase()
  const inState = dishes.filter((d) => !state || d.state === state)
  const list = inState.filter(
    (d) =>
      (!query || d.name.toLowerCase().includes(query) || d.local_name?.includes(q.trim())) &&
      (!category || d.category === category) &&
      (!vegOnly || d.diet === 'veg') &&
      (!jainOnly || d.jain),
  ).sort((a, b) => Number(!imageFor(a.id)) - Number(!imageFor(b.id))) // photos first
  const categories = [...new Set(dishes.map((d) => d.category))]
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

      <h1>Find the <span className="hl">best</span> bites in {state || 'India'}</h1>

      <label className="input-icon">
        <Search size={18} aria-hidden />
        <input className="search" placeholder="Search dishes" value={q} onChange={(e) => setQ(e.target.value)} />
      </label>
      <label className="input-icon">
        <MapPin size={18} aria-hidden />
        <select value={state} onChange={(e) => setState(e.target.value)} aria-label="State">
          <option value="">All of India</option>
          {STATES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>

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
        <button className={jainOnly ? 'on' : ''} onClick={() => setJainOnly(!jainOnly)}><Sprout size={16} /> Jain</button>
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
                    <span className="muted small"><MapPin size={12} /> {d.state}</span>
                  </div>
                  {d.typical_price_inr && <b className="price">₹{d.typical_price_inr}</b>}
                </div>
              </Link>
            ))}
          </div>
        </>
      )}

      <h2>{filtering ? 'Results' : 'All dishes'} <span className="muted count">{list.length}</span></h2>
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
                <span className="muted small"><MapPin size={12} /> {d.state}</span>
                <div className="tags">
                  <span>{CATEGORY_LABEL[d.category]}</span>
                  {d.gi_tag && <span>GI tag</span>}
                  {d.typical_price_inr && <span>₹{d.typical_price_inr}</span>}
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
