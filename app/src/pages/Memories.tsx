import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, CloudCheck, CloudOff } from 'lucide-react'
import Map, { Layer, Marker, Source, type MapLayerMouseEvent, type MapRef } from 'react-map-gl/maplibre'
import type { FeatureCollection, Geometry } from 'geojson'
import { dishById, restaurantById } from '../data'
import { useSession } from '../cloud'
import { deleteMemory, resolvePendingPlaces, useMemories, usePhotoUrl, type Memory } from '../memories'
import { useSheetClose } from '../ui'

type Countries = FeatureCollection<Geometry, { iso: string; name: string }>

// Plain world outline, no street tiles: works offline and loads instantly.
const WORLD_STYLE = { version: 8 as const, sources: {}, layers: [{ id: 'bg', type: 'background' as const, paint: { 'background-color': '#e3eaf2' } }] }

function bbox(geometry: Geometry): [number, number, number, number] {
  const b: [number, number, number, number] = [180, 90, -180, -90]
  const walk = (c: unknown): void => {
    if (typeof (c as number[])[0] === 'number') {
      const [x, y] = c as number[]
      b[0] = Math.min(b[0], x)
      b[1] = Math.min(b[1], y)
      b[2] = Math.max(b[2], x)
      b[3] = Math.max(b[3], y)
    } else {
      (c as unknown[]).forEach(walk)
    }
  }
  if ('coordinates' in geometry) walk(geometry.coordinates)
  return b
}

function Thumb({ m, onClick }: { m: Memory; onClick: () => void }) {
  const url = usePhotoUrl(m.photoPath)
  return <button className="thumb" onClick={onClick} style={{ backgroundImage: url && `url(${url})` }} aria-label="Open memory" />
}

function MemoryView({ m, onClose }: { m: Memory; onClose: () => void }) {
  const url = usePhotoUrl(m.photoPath)
  const dish = m.dishId ? dishById.get(m.dishId) : undefined
  const place = m.restaurantId ? restaurantById.get(m.restaurantId) : undefined
  const { close, overlayProps } = useSheetClose(onClose)
  return (
    <div {...overlayProps}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        {url && <img src={url} alt="" />}
        <p><strong>{dish?.name ?? 'Memory'}</strong>{place && ` at ${place.name}`}</p>
        <p className="muted">{[m.city, m.countryName].filter(Boolean).join(', ')} · {new Date(m.createdAt).toLocaleDateString()}</p>
        {m.note && <p>{m.note}</p>}
        <div className="row">
          {dish && <Link to={`/dish/${dish.id}`}>About this dish</Link>}
          <button className="btn" onClick={close}>Close</button>
          <button className="btn danger" onClick={() => confirm('Delete this memory? This cannot be undone.') && deleteMemory(m.id).then(close)}>Delete</button>
        </div>
      </div>
    </div>
  )
}

export default function Memories() {
  const memories = useMemories()
  const session = useSession()
  const [countries, setCountries] = useState<Countries>()
  const [map, setMap] = useState<MapRef | null>(null)
  const [country, setCountry] = useState<string | null>(null)
  const [city, setCity] = useState<string | null>(null)
  const [open, setOpen] = useState<Memory | null>(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}countries.geojson`).then((r) => r.json()).then(setCountries)
    resolvePendingPlaces()
  }, [])

  const list = memories ?? []
  const visited = [...new Set(list.flatMap((m) => m.countryCode ?? []))]
  const cities = useMemo(() => {
    const byCity: Record<string, Memory[]> = {}
    for (const m of list) if (m.countryCode === country && m.city && m.lat != null) (byCity[m.city] ??= []).push(m)
    return Object.entries(byCity).map(([name, ms]) => ({
      name,
      ms,
      lat: ms.reduce((s, m) => s + m.lat!, 0) / ms.length,
      lng: ms.reduce((s, m) => s + m.lng!, 0) / ms.length,
    }))
  }, [list, country])

  function onMapClick(e: MapLayerMouseEvent) {
    const iso = e.features?.[0]?.properties?.iso as string | undefined
    if (!iso || !visited.includes(iso)) return
    const f = countries?.features.find((x) => x.properties.iso === iso)
    // ponytail: countries crossing the antimeridian (Russia, Fiji) zoom to the whole world. Fine until it bugs someone.
    if (f) map?.fitBounds(bbox(f.geometry), { padding: 30, duration: 800 })
    setCountry(iso)
    setCity(null)
  }

  function backToWorld() {
    setCountry(null)
    setCity(null)
    map?.flyTo({ center: [60, 20], zoom: -0.3 })
  }

  const shown = city ? cities.find((c) => c.name === city)?.ms ?? [] : country ? list.filter((m) => m.countryCode === country) : list
  const countryName = countries?.features.find((f) => f.properties.iso === country)?.properties.name

  return (
    <div className="page">
      <h1>My food <span className="hl">memories</span></h1>
      <Link to="/account" className={`backup-card${session ? ' ok' : ''}`}>
        <span className="backup-icon">{session ? <CloudCheck size={20} /> : <CloudOff size={20} />}</span>
        <span className="backup-text">
          <b>{session ? 'Backed up' : 'Not backed up yet'}</b>
          <span className="muted small">{session ? session.user.email : 'Sign in to keep your photos safe'}</span>
        </span>
        <ChevronRight size={20} aria-hidden />
      </Link>
      <div className="stats">
        <div><b>{visited.length}</b> countries</div>
        <div><b>{new Set(list.flatMap((m) => (m.city ? `${m.countryCode}|${m.city}` : []))).size}</b> cities</div>
        <div><b>{new Set(list.flatMap((m) => m.dishId ?? [])).size}</b> dishes</div>
      </div>

      <div className="world">
        <Map
          ref={setMap}
          initialViewState={{ longitude: 60, latitude: 20, zoom: -0.3 }}
          minZoom={-1}
          mapStyle={WORLD_STYLE}
          interactiveLayerIds={['country-fill']}
          onClick={onMapClick}
          renderWorldCopies={false}
          attributionControl={false}
          style={{ position: 'absolute', inset: 0 }}
        >
          {countries && (
            <Source id="countries" type="geojson" data={countries}>
              <Layer
                id="country-fill"
                type="fill"
                paint={{ 'fill-color': ['case', ['in', ['get', 'iso'], ['literal', visited]], '#d2f04f', '#ffffff'] }}
              />
              <Layer id="country-line" type="line" paint={{ 'line-color': '#c5ccd6', 'line-width': 0.5 }} />
            </Source>
          )}
          {cities.map((c) => (
            <Marker key={c.name} latitude={c.lat} longitude={c.lng} onClick={(e) => { e.originalEvent.stopPropagation(); setCity(c.name) }}>
              <div className={`city-pin ${city === c.name ? 'on' : ''}`} title={c.name} />
            </Marker>
          ))}
        </Map>
        {country && <button className="fab small" onClick={backToWorld}>← World</button>}
      </div>

      <h2>{city ? `${city}, ${countryName}` : country ? countryName : 'All memories'}</h2>
      {country && (
        <div className="chips">
          {cities.map((c) => (
            <button key={c.name} className={city === c.name ? 'on' : ''} onClick={() => setCity(city === c.name ? null : c.name)}>
              {c.name} · {c.ms.length}
            </button>
          ))}
        </div>
      )}
      {memories && list.length === 0 && (
        <p className="muted">No memories yet. <Link to="/add">Add your first food photo</Link> and the countries you visit light up here.</p>
      )}
      {!country && visited.length > 0 && <p className="muted small">Tap a highlighted country to see the cities you visited.</p>}
      <div className="grid">
        {shown.map((m) => <Thumb key={m.id} m={m} onClick={() => setOpen(m)} />)}
      </div>
      {open && <MemoryView m={open} onClose={() => setOpen(null)} />}
    </div>
  )
}
