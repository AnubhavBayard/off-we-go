import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Camera, Check, ChevronDown, Heart, ImagePlus, LocateFixed, MapPin, NotebookPen, User, Users, UsersRound, UtensilsCrossed } from 'lucide-react'
import { dishById, dishes, dishesForRestaurant, distanceKm, restaurantById, restaurants } from '../data'
import { addMemory, currentPosition } from '../memories'
import { CATEGORY_ICON, FoodTicker, PickerSheet } from '../ui'

// Memories have no "company" field; the choice is saved at the start of the note ("With family · ...").
const COMPANY = [
  { label: 'Solo', Icon: User },
  { label: 'Partner', Icon: Heart },
  { label: 'Family', Icon: UsersRound },
  { label: 'Friends', Icon: Users },
]

export default function AddMemory() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>()
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null)
  const [restaurantId, setRestaurantId] = useState(params.get('r') ?? '')
  const [dishId, setDishId] = useState(params.get('dish') ?? '')
  const [company, setCompany] = useState<string | null>(null)
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)
  const [picking, setPicking] = useState<'place' | 'dish' | null>(null)

  useEffect(() => void currentPosition().then(setPos), [])
  useEffect(() => {
    if (!file) return
    const url = URL.createObjectURL(file)
    setPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [file])

  // Nearest curated restaurants first when we know where the user is.
  const nearby = [...restaurants].sort((a, b) =>
    pos && a.lat != null && b.lat != null
      ? distanceKm(pos.lat, pos.lng, a.lat, a.lng!) - distanceKm(pos.lat, pos.lng, b.lat, b.lng!)
      : a.name.localeCompare(b.name),
  )
  const restaurant = restaurantById.get(restaurantId)
  const dishOptions = restaurant && dishesForRestaurant(restaurant.id).length ? dishesForRestaurant(restaurant.id) : dishes

  async function save() {
    if (!file) return
    setSaving(true)
    try {
      // A memory at a known restaurant is pinned to the restaurant, not wherever the phone was.
      const at = restaurant?.lat != null ? { lat: restaurant.lat, lng: restaurant.lng! } : pos
      const withWho = company && (company === 'Solo' ? 'Solo' : `With ${company.toLowerCase()}`)
      await addMemory(file, {
        lat: at?.lat ?? null,
        lng: at?.lng ?? null,
        fallbackCity: restaurant?.city ?? null,
        restaurantId: restaurant?.id ?? null,
        dishId: dishById.has(dishId) ? dishId : null,
        note: [withWho, note.trim()].filter(Boolean).join(' · '),
      })
      navigate('/memories')
    } catch (e) {
      alert(`Could not save memory: ${e}`)
      setSaving(false)
    }
  }

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null)

  return (
    <div className="page form-page">
      <div className="top-bar">
        <FoodTicker />
        <div className="greeting">
          <b>New memory</b>
          <span>Saved on your phone first</span>
        </div>
      </div>

      <h1>Tell me about your <span className="hl">food moment</span></h1>
      <p className="muted lead">Snap the dish, tag the place, and it lands on your memory map.</p>

      <section className="form-section">
        <h3><Camera size={16} /> Photo</h3>
        {preview
          ? <img src={preview} className="preview" alt="Selected photo" />
          : <div className="preview empty"><ImagePlus size={36} /><span>No photo yet</span></div>}
        <div className="pill-row">
          <label className="btn"><Camera size={16} /> Take photo<input type="file" accept="image/*" capture="environment" hidden onChange={pick} /></label>
          <label className="btn"><ImagePlus size={16} /> Gallery<input type="file" accept="image/*" hidden onChange={pick} /></label>
        </div>
      </section>

      <section className="form-section">
        <h3><MapPin size={16} /> Where</h3>
        <button type="button" className="picker wide" onClick={() => setPicking('place')}>
          <span className="picker-icon">{restaurant ? <MapPin size={18} /> : <LocateFixed size={18} />}</span>
          <span className="picker-text"><small>Place</small>{restaurant ? `${restaurant.name}, ${restaurant.city}` : 'Somewhere else (use my location)'}</span>
          <ChevronDown size={18} aria-hidden />
        </button>
        {!restaurant && !pos && <p className="muted small">Location unavailable. The memory will be saved without a place.</p>}
      </section>

      <section className="form-section">
        <h3><UtensilsCrossed size={16} /> What did you eat <span className="muted">(optional)</span></h3>
        <button type="button" className="picker wide" onClick={() => setPicking('dish')}>
          <span className="picker-icon"><UtensilsCrossed size={18} /></span>
          <span className="picker-text"><small>Dish</small>{dishById.get(dishId)?.name ?? 'Pick a dish'}</span>
          <ChevronDown size={18} aria-hidden />
        </button>
      </section>

      <section className="form-section">
        <h3><Users size={16} /> Who were you with <span className="muted">(optional)</span></h3>
        <div className="pill-row options">
          {COMPANY.map(({ label, Icon }) => (
            <button key={label} className={`btn option ${company === label ? 'on' : ''}`} aria-pressed={company === label}
              onClick={() => setCompany(company === label ? null : label)}>
              <Icon size={16} /> {label}
            </button>
          ))}
        </div>
      </section>

      <section className="form-section">
        <h3><NotebookPen size={16} /> Note <span className="muted">(optional)</span></h3>
        <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="How it tasted, what made it special…" />
      </section>

      {picking === 'place' && (
        <PickerSheet
          title="Where did you eat?" searchable value={restaurantId} onClose={() => setPicking(null)}
          options={[
            { value: '', label: 'Somewhere else (use my location)', icon: <LocateFixed size={20} /> },
            ...nearby.map((r) => ({ value: r.id, label: r.name, icon: <MapPin size={20} />, meta: r.city })),
          ]}
          onPick={setRestaurantId}
        />
      )}
      {picking === 'dish' && (
        <PickerSheet
          title="What did you eat?" searchable value={dishId} onClose={() => setPicking(null)}
          options={[
            { value: '', label: 'No dish', icon: <UtensilsCrossed size={20} /> },
            ...dishOptions.map((d) => {
              const Icon = CATEGORY_ICON[d.category]
              return { value: d.id, label: d.name, icon: <Icon size={20} />, meta: d.country === 'India' ? d.state : d.country }
            }),
          ]}
          onPick={setDishId}
        />
      )}

      <button className="btn primary big" disabled={!file || saving} onClick={save}>
        <Check size={20} /> {saving ? 'Saving…' : 'Save memory'}
      </button>
    </div>
  )
}
