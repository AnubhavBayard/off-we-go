import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORY_LABEL, REGION_LABEL, dishes, type Category, type Region } from '../data'

export default function Discover() {
  const [q, setQ] = useState('')
  const [category, setCategory] = useState<Category | null>(null)
  const [region, setRegion] = useState<Region | null>(null)
  const [vegOnly, setVegOnly] = useState(false)
  const [jainOnly, setJainOnly] = useState(false)

  const query = q.trim().toLowerCase()
  const list = dishes.filter(
    (d) =>
      (!query || d.name.toLowerCase().includes(query) || d.local_name?.includes(q.trim())) &&
      (!category || d.category === category) &&
      (!region || d.regions.includes(region)) &&
      (!vegOnly || d.diet === 'veg') &&
      (!jainOnly || d.jain),
  )
  const categories = [...new Set(dishes.map((d) => d.category))]

  return (
    <div className="page">
      <h1>What to eat in Odisha</h1>
      <input className="search" placeholder="Search dishes" value={q} onChange={(e) => setQ(e.target.value)} />

      <div className="chips">
        {(Object.keys(REGION_LABEL) as Region[]).map((r) => (
          <button key={r} className={region === r ? 'on' : ''} onClick={() => setRegion(region === r ? null : r)}>
            {REGION_LABEL[r]}
          </button>
        ))}
      </div>
      <div className="chips">
        {categories.map((c) => (
          <button key={c} className={category === c ? 'on' : ''} onClick={() => setCategory(category === c ? null : c)}>
            {CATEGORY_LABEL[c]}
          </button>
        ))}
        <button className={vegOnly ? 'on' : ''} onClick={() => setVegOnly(!vegOnly)}>Veg only</button>
        <button className={jainOnly ? 'on' : ''} onClick={() => setJainOnly(!jainOnly)}>Jain</button>
      </div>

      {dishes.length === 0 && <p className="muted">No dish data yet.</p>}
      <ul className="cards">
        {list.map((d) => (
          <li key={d.id}>
            <Link to={`/dish/${d.id}`} className="card">
              <div className="card-title">
                <span className={`diet ${d.diet}`} aria-label={d.diet} />
                {d.name}
                {d.local_name && <span className="local">{d.local_name}</span>}
              </div>
              <p className="muted clamp">{d.description}</p>
              <div className="tags">
                <span>{CATEGORY_LABEL[d.category]}</span>
                {d.gi_tag && <span>GI tag</span>}
                {d.typical_price_inr && <span>₹{d.typical_price_inr}</span>}
              </div>
            </Link>
          </li>
        ))}
      </ul>
      {dishes.length > 0 && list.length === 0 && <p className="muted">No dishes match these filters.</p>}
    </div>
  )
}
