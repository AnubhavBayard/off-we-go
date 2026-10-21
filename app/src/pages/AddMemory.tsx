import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { dishById, dishes, dishesForRestaurant, distanceKm, restaurantById, restaurants } from '../data'
import { addMemory, currentPosition } from '../memories'

export default function AddMemory() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>()
  const [pos, setPos] = useState<{ lat: number; lng: number } | null>(null)
  const [restaurantId, setRestaurantId] = useState(params.get('r') ?? '')
  const [dishId, setDishId] = useState(params.get('dish') ?? '')
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

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
      await addMemory(file, {
        lat: at?.lat ?? null,
        lng: at?.lng ?? null,
        fallbackCity: restaurant?.city ?? null,
        restaurantId: restaurant?.id ?? null,
        dishId: dishById.has(dishId) ? dishId : null,
        note: note.trim(),
      })
      navigate('/memories')
    } catch (e) {
      alert(`Could not save memory: ${e}`)
      setSaving(false)
    }
  }

  const pick = (e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] ?? null)

  return (
    <div className="page">
      <h1>Add a memory</h1>
      {preview ? <img src={preview} className="preview" alt="Selected photo" /> : <div className="preview empty">No photo yet</div>}
      <div className="row">
        <label className="btn">Take photo<input type="file" accept="image/*" capture="environment" hidden onChange={pick} /></label>
        <label className="btn">Choose from gallery<input type="file" accept="image/*" hidden onChange={pick} /></label>
      </div>

      <label className="field">
        Where?
        <select value={restaurantId} onChange={(e) => setRestaurantId(e.target.value)}>
          <option value="">Somewhere else (use my location)</option>
          {nearby.map((r) => (
            <option key={r.id} value={r.id}>{r.name}, {r.city}</option>
          ))}
        </select>
      </label>
      {!restaurant && !pos && <p className="muted small">Location unavailable. The memory will be saved without a place.</p>}

      <label className="field">
        What did you eat? (optional)
        <select value={dishId} onChange={(e) => setDishId(e.target.value)}>
          <option value="">—</option>
          {dishOptions.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </label>

      <label className="field">
        Note (optional)
        <textarea rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Who you were with, how it tasted…" />
      </label>

      <button className="btn primary" disabled={!file || saving} onClick={save}>{saving ? 'Saving…' : 'Save memory'}</button>
    </div>
  )
}
