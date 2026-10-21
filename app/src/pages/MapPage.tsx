import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Map, { Marker, Popup, type MapRef } from 'react-map-gl/maplibre'
import { dishesForRestaurant, distanceKm, restaurantById, restaurants } from '../data'
import { currentPosition } from '../memories'

// ponytail: online OpenFreeMap tiles (free, no key). Offline PMTiles city packs come later.
export const STREET_STYLE = 'https://tiles.openfreemap.org/styles/liberty'
const ODISHA = { latitude: 20.05, longitude: 85.85, zoom: 8.5 }

export default function MapPage() {
  const [params] = useSearchParams()
  const focus = restaurantById.get(params.get('r') ?? '')
  const [selected, setSelected] = useState(focus ?? null)
  const [me, setMe] = useState<{ lat: number; lng: number } | null>(null)
  const [map, setMap] = useState<MapRef | null>(null)
  const pinned = restaurants.filter((r) => r.lat != null && r.lng != null)

  async function nearMe() {
    const pos = await currentPosition()
    if (!pos) return alert('Could not get your location.')
    setMe(pos)
    map?.flyTo({ center: [pos.lng, pos.lat], zoom: 14 })
  }

  return (
    <div className="map-page">
      <Map
        ref={setMap}
        initialViewState={focus ? { latitude: focus.lat!, longitude: focus.lng!, zoom: 15 } : ODISHA}
        mapStyle={STREET_STYLE}
        style={{ position: 'absolute', inset: 0 }}
        attributionControl={{ compact: true }}
      >
        {pinned.map((r) => (
          <Marker key={r.id} latitude={r.lat!} longitude={r.lng!} anchor="bottom" onClick={(e) => { e.originalEvent.stopPropagation(); setSelected(r) }}>
            <div className={r.location_exact ? 'pin' : 'pin approx'} />
          </Marker>
        ))}
        {me && (
          <Marker latitude={me.lat} longitude={me.lng}>
            <div className="me-dot" />
          </Marker>
        )}
        {selected && selected.lat != null && (
          <Popup latitude={selected.lat} longitude={selected.lng!} anchor="top" onClose={() => setSelected(null)} closeOnClick={false}>
            <strong>{selected.name}</strong>
            <div className="muted">{[selected.area, selected.city].filter(Boolean).join(', ')}</div>
            {!selected.location_exact && <div className="muted small">Approximate location (area, not exact shop)</div>}
            {me && <div className="muted">{distanceKm(me.lat, me.lng, selected.lat, selected.lng!).toFixed(1)} km away</div>}
            <div>
              {dishesForRestaurant(selected.id).map((d) => (
                <Link key={d.id} to={`/dish/${d.id}`} className="popup-dish">{d.name}</Link>
              ))}
            </div>
            {selected.google_maps_url && <a href={selected.google_maps_url} target="_blank" rel="noreferrer">Directions</a>}
          </Popup>
        )}
      </Map>
      <button className="fab" onClick={nearMe}>Near me</button>
      {pinned.length === 0 && <div className="map-note">No restaurant locations yet.</div>}
    </div>
  )
}
