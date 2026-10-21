import { Link, useParams } from 'react-router-dom'
import { CATEGORY_LABEL, REGION_LABEL, dishById, restaurantsForDish } from '../data'

const SPICE = ['Not spicy', 'Mild', 'Medium', 'Hot']

export default function DishPage() {
  const { id = '' } = useParams()
  const d = dishById.get(id)
  if (!d) return <div className="page"><p>Dish not found. <Link to="/">Back</Link></p></div>
  const places = restaurantsForDish(d.id)

  return (
    <div className="page">
      <Link to="/" className="back">← Dishes</Link>
      <h1>{d.name}</h1>
      {d.local_name && <p className="local big">{d.local_name}</p>}
      {d.pronunciation && <p className="muted">Say it: “{d.pronunciation}”</p>}

      <div className="tags">
        <span className={`diet ${d.diet}`} /> <span>{d.diet === 'veg' ? 'Vegetarian' : d.diet === 'egg' ? 'Contains egg' : 'Non-veg'}</span>
        <span>{CATEGORY_LABEL[d.category]}</span>
        <span>{SPICE[d.spice] ?? ''}</span>
        {d.jain && <span>Jain-friendly</span>}
        {d.vegan && <span>Vegan</span>}
        {d.gi_tag && <span>GI tag</span>}
        {d.typical_price_inr && <span>₹{d.typical_price_inr}</span>}
      </div>

      <p>{d.description}</p>
      {d.how_to_eat && <><h3>How to eat it</h3><p>{d.how_to_eat}</p></>}
      {d.how_to_order && <><h3>How to order</h3><p>{d.how_to_order}</p></>}
      {d.allergens.length > 0 && <p className="muted">Contains: {d.allergens.join(', ')}</p>}
      <p className="muted">Best known in: {d.regions.map((r) => REGION_LABEL[r]).join(', ')}</p>

      <h2>Where to eat it</h2>
      {places.length === 0 && <p className="muted">No restaurants listed yet.</p>}
      <ul className="cards">
        {places.map(({ restaurant: r, note }) => (
          <li key={r.id} className="card">
            <div className="card-title">{r.name}</div>
            <p className="muted">{[r.area, r.city].filter(Boolean).join(', ')}</p>
            {note && <p>{note}</p>}
            <div className="row">
              {r.lat != null && <Link to={`/map?r=${r.id}`}>Show on map</Link>}
              {r.google_maps_url && <a href={r.google_maps_url} target="_blank" rel="noreferrer">Directions</a>}
              <Link to={`/add?dish=${d.id}&r=${r.id}`}>I ate here</Link>
            </div>
            {!r.verified && <p className="muted small">Details from web sources, not yet verified in person.</p>}
          </li>
        ))}
      </ul>

      <p className="muted small">
        Sources:{' '}
        {[d.wikipedia_url, ...d.source_urls].filter((u, i, a) => u && a.indexOf(u) === i).map((u) => (
          <a key={u} href={u!} target="_blank" rel="noreferrer">{new URL(u!).hostname} </a>
        ))}
      </p>
    </div>
  )
}
