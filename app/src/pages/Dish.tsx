import { useEffect, useLayoutEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Award, ChevronLeft, Flame, Leaf, MapPin, Navigation, Sprout } from 'lucide-react'
import { CATEGORY_LABEL, dishById, imageFor, priceLabel, restaurantsForDish, type Dish } from '../data'
import { CATEGORY_ICON, DishPhoto } from '../ui'

const SPICE = ['Not spicy', 'Mild', 'Medium', 'Hot']

function TitleText({ dish: d, className, 'aria-hidden': hidden }: { dish: Dish; className: string; 'aria-hidden'?: boolean }) {
  return (
    <div className={className} aria-hidden={hidden}>
      <span><MapPin size={14} /> {d.state}, {d.country}</span>
      <h1>{d.name}</h1>
      {d.local_name && <span className="local-name">{d.local_name}</span>}
    </div>
  )
}
const DIET = { veg: 'Vegetarian', egg: 'Contains egg', nonveg: 'Non-veg' }

export default function DishPage() {
  const { id = '' } = useParams()
  const d = dishById.get(id)
  useEffect(() => { window.scrollTo(0, 0) }, [id]) // braces: scrollTo returns a Promise in new Chrome, which React would call as cleanup. Open at the photo, not where the list was scrolled
  // The sheet's background starts below the title (so the title sits on the photo) and slides up on scroll;
  // it needs the title's height for that.
  const titleRef = useRef<HTMLDivElement>(null)
  useLayoutEffect(() => {
    const t = titleRef.current
    t?.parentElement?.style.setProperty('--title-h', `${t.offsetHeight}px`)
  }, [id])
  if (!d) return <div className="page"><p>Dish not found. <Link to="/">Back</Link></p></div>
  const places = restaurantsForDish(d.id)
  const img = imageFor(d.id)
  const CategoryIcon = CATEGORY_ICON[d.category]

  return (
    <div className="detail">
      <div className="detail-top">
        <div className="detail-media">
          <DishPhoto dish={d} className="detail-photo" alt={d.name} />
          {/* Pre-blurred dark copy; only its opacity animates on scroll (animating blur itself is laggy). */}
          {img && <img className="detail-dim" src={img.src} alt="" aria-hidden />}
        </div>
        <Link to="/" className="icon-btn on-photo" aria-label="Back to dishes"><ChevronLeft size={22} /></Link>
      </div>

      <div className="detail-sheet">
        {/* Two copies cross-fade on scroll: white over the photo, dark once the sheet has slid up behind it. */}
        <div className="detail-title" ref={titleRef}>
          <TitleText dish={d} className="title-dark" />
          <TitleText dish={d} className="title-light" aria-hidden />
        </div>
        {img && (
          <p className="credit">
            Photo: {img.credit}, {img.license}, <a href={img.page} target="_blank" rel="noreferrer">Wikimedia Commons</a>
          </p>
        )}
        {d.pronunciation && <p className="muted">Say it: “{d.pronunciation}”</p>}

        <div className="facts">
          <div><span className={`diet ${d.diet}`} /><small>{DIET[d.diet]}</small></div>
          <div><CategoryIcon size={20} /><small>{CATEGORY_LABEL[d.category]}</small></div>
          <div><Flame size={20} /><small>{SPICE[d.spice] ?? ''}</small></div>
          {d.gi_tag && <div><Award size={20} /><small>GI tag</small></div>}
          {d.jain && <div><Sprout size={20} /><small>Jain-friendly</small></div>}
          {d.vegan && <div><Leaf size={20} /><small>Vegan</small></div>}
        </div>

        <h2>Description</h2>
        <p>{d.description}</p>
        {d.how_to_eat && <><h3>How to eat it</h3><p>{d.how_to_eat}</p></>}
        {d.how_to_order && <><h3>How to order</h3><p>{d.how_to_order}</p></>}
        {d.allergens.length > 0 && <p className="muted">Contains: {d.allergens.join(', ')}</p>}

        {places.length > 0 && <h2>Our picks</h2>}
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
          {[d.wikipedia_url, ...d.source_urls]
            .filter((u): u is string => !!u)
            .filter((u, i, a) => a.findIndex((v) => new URL(v).hostname === new URL(u).hostname) === i) // one link per site
            .map((u) => <a key={u} href={u} target="_blank" rel="noreferrer">{new URL(u).hostname} </a>)}
        </p>
      </div>

      <div className="cta-bar">
        <div>
          <small className="muted">Typical price</small>
          <b>{priceLabel(d) ?? 'Varies'}</b>
        </div>
        <a className="btn primary" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${d.name} near me`)}`} target="_blank" rel="noreferrer">
          <Navigation size={18} /> Find near me
        </a>
      </div>
    </div>
  )
}
