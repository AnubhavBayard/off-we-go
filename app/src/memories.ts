import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Geolocation } from '@capacitor/geolocation'
import { Preferences } from '@capacitor/preferences'
import { useEffect, useState } from 'react'

// ponytail: memories live on-device only (Preferences + Filesystem). Uninstall = data gone.
// Move to Supabase (auth + storage + row-level security) once accounts exist.

export type Memory = {
  id: string
  createdAt: string
  photoPath: string
  lat: number | null
  lng: number | null
  countryCode: string | null // ISO 3166-1 alpha-2, upper case
  countryName: string | null
  city: string | null
  restaurantId: string | null
  dishId: string | null
  note: string
}

const KEY = 'memories'
const listeners = new Set<() => void>()

export async function loadMemories(): Promise<Memory[]> {
  const { value } = await Preferences.get({ key: KEY })
  return value ? JSON.parse(value) : []
}

async function saveMemories(list: Memory[]) {
  await Preferences.set({ key: KEY, value: JSON.stringify(list) })
  listeners.forEach((l) => l())
}

export function useMemories() {
  const [list, setList] = useState<Memory[] | null>(null)
  useEffect(() => {
    const refresh = () => void loadMemories().then(setList)
    refresh()
    listeners.add(refresh)
    return () => void listeners.delete(refresh)
  }, [])
  return list
}

// Downscale to max 1600px JPEG so photos don't eat the phone's storage.
async function toJpegBase64(file: File): Promise<string> {
  const img = await createImageBitmap(file)
  const scale = Math.min(1, 1600 / Math.max(img.width, img.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.width * scale)
  canvas.height = Math.round(img.height * scale)
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL('image/jpeg', 0.8).split(',')[1]
}

export async function currentPosition(): Promise<{ lat: number; lng: number } | null> {
  try {
    const p = await Geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000 })
    return { lat: p.coords.latitude, lng: p.coords.longitude }
  } catch {
    return null
  }
}

// ponytail: OpenStreetMap Nominatim, fine for one lookup per check-in (policy: max 1 req/s).
// Switch to a paid geocoder if traffic grows.
async function reverseGeocode(lat: number, lng: number) {
  try {
    const r = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&zoom=10&accept-language=en&lat=${lat}&lon=${lng}`,
    )
    if (!r.ok) return null
    const a = (await r.json()).address ?? {}
    return {
      countryCode: a.country_code ? String(a.country_code).toUpperCase() : null,
      countryName: a.country ?? null,
      city: a.city ?? a.town ?? a.village ?? a.state_district ?? a.county ?? null,
    }
  } catch {
    return null
  }
}

export async function addMemory(
  file: File,
  fields: Pick<Memory, 'restaurantId' | 'dishId' | 'note'> & { lat: number | null; lng: number | null; fallbackCity: string | null },
) {
  const id = crypto.randomUUID()
  const photoPath = `memories/${id}.jpg`
  await Filesystem.writeFile({ path: photoPath, data: await toJpegBase64(file), directory: Directory.Data, recursive: true })

  const place = fields.lat != null && fields.lng != null ? await reverseGeocode(fields.lat, fields.lng) : null
  const memory: Memory = {
    id,
    createdAt: new Date().toISOString(),
    photoPath,
    lat: fields.lat,
    lng: fields.lng,
    // Curated restaurants are all in India, so they make a safe offline fallback.
    countryCode: place?.countryCode ?? (fields.fallbackCity ? 'IN' : null),
    countryName: place?.countryName ?? (fields.fallbackCity ? 'India' : null),
    city: place?.city ?? fields.fallbackCity,
    restaurantId: fields.restaurantId,
    dishId: fields.dishId,
    note: fields.note,
  }
  await saveMemories([memory, ...(await loadMemories())])
  return memory
}

export async function deleteMemory(id: string) {
  const list = await loadMemories()
  const m = list.find((x) => x.id === id)
  if (m) await Filesystem.deleteFile({ path: m.photoPath, directory: Directory.Data }).catch(() => {})
  await saveMemories(list.filter((x) => x.id !== id))
}

// Retry place lookup for memories saved while offline.
export async function resolvePendingPlaces() {
  const list = await loadMemories()
  let changed = false
  for (const m of list) {
    if (m.countryCode || m.lat == null || m.lng == null) continue
    const place = await reverseGeocode(m.lat, m.lng)
    if (!place) continue
    Object.assign(m, place)
    changed = true
  }
  if (changed) await saveMemories(list)
}

const urlCache = new Map<string, string>()

export async function photoUrl(path: string): Promise<string> {
  if (urlCache.has(path)) return urlCache.get(path)!
  let url: string
  if (Capacitor.isNativePlatform()) {
    const { uri } = await Filesystem.getUri({ path, directory: Directory.Data })
    url = Capacitor.convertFileSrc(uri)
  } else {
    const { data } = await Filesystem.readFile({ path, directory: Directory.Data })
    url = typeof data === 'string' ? `data:image/jpeg;base64,${data}` : URL.createObjectURL(data)
  }
  urlCache.set(path, url)
  return url
}

export function usePhotoUrl(path: string) {
  const [url, setUrl] = useState<string>()
  // A missing photo file just shows an empty tile.
  useEffect(() => void photoUrl(path).then(setUrl, () => setUrl(undefined)), [path])
  return url
}
