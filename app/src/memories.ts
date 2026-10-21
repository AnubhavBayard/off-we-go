import { Capacitor } from '@capacitor/core'
import { Directory, Filesystem } from '@capacitor/filesystem'
import { Geolocation } from '@capacitor/geolocation'
import { Preferences } from '@capacitor/preferences'
import { useEffect, useState } from 'react'
import { supabase } from './cloud'

// Memories are saved on-device first (Preferences + Filesystem) so the app works offline,
// then copied to Supabase when the user is signed in (see syncMemories).

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
  synced?: boolean // true once row + photo are in Supabase
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
  void syncMemories()
  return memory
}

export async function deleteMemory(id: string) {
  const list = await loadMemories()
  const m = list.find((x) => x.id === id)
  if (m) await Filesystem.deleteFile({ path: m.photoPath, directory: Directory.Data }).catch(() => {})
  // ponytail: if this fails (offline) the cloud copy stays and comes back on next pull. Add a delete queue if users notice.
  const uid = (await supabase.auth.getSession()).data.session?.user.id
  if (uid && m?.synced) {
    await supabase.from('memories').delete().eq('id', id)
    await supabase.storage.from('photos').remove([`${uid}/${id}.jpg`])
  }
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
    m.synced = false
    changed = true
  }
  if (changed) await saveMemories(list)
}

type Row = {
  id: string
  created_at: string
  photo_path: string
  lat: number | null
  lng: number | null
  country_code: string | null
  country_name: string | null
  city: string | null
  restaurant_id: string | null
  dish_id: string | null
  note: string
}

let syncing: Promise<string | null> | null = null

// Push unsynced local memories up, pull memories saved on other devices down.
// Returns an error message, or null on success / not signed in.
export function syncMemories(): Promise<string | null> {
  syncing ??= doSync().finally(() => (syncing = null))
  return syncing
}

async function doSync(): Promise<string | null> {
  const uid = (await supabase.auth.getSession()).data.session?.user.id
  if (!uid) return null
  try {
    const list = await loadMemories()
    const pushed = new Set<string>()
    const pulled: Memory[] = []
    for (const m of list.filter((x) => !x.synced)) {
      const remotePath = `${uid}/${m.id}.jpg`
      const { data } = await Filesystem.readFile({ path: m.photoPath, directory: Directory.Data })
      const blob = typeof data === 'string' ? await (await fetch(`data:image/jpeg;base64,${data}`)).blob() : data
      const up = await supabase.storage.from('photos').upload(remotePath, blob, { contentType: 'image/jpeg', upsert: true })
      if (up.error) throw up.error
      const row: Row = {
        id: m.id, created_at: m.createdAt, photo_path: remotePath, lat: m.lat, lng: m.lng,
        country_code: m.countryCode, country_name: m.countryName, city: m.city,
        restaurant_id: m.restaurantId, dish_id: m.dishId, note: m.note,
      }
      const ins = await supabase.from('memories').upsert(row)
      if (ins.error) throw ins.error
      pushed.add(m.id)
    }

    const { data: rows, error } = await supabase.from('memories').select('*').returns<Row[]>()
    if (error) throw error
    const local = new Set(list.map((m) => m.id))
    for (const r of rows.filter((x) => !local.has(x.id))) {
      const dl = await supabase.storage.from('photos').download(r.photo_path)
      if (dl.error) continue
      const photoPath = `memories/${r.id}.jpg`
      const base64 = await blobToBase64(dl.data)
      await Filesystem.writeFile({ path: photoPath, data: base64, directory: Directory.Data, recursive: true })
      pulled.push({
        id: r.id, createdAt: r.created_at, photoPath, lat: r.lat, lng: r.lng,
        countryCode: r.country_code, countryName: r.country_name, city: r.city,
        restaurantId: r.restaurant_id, dishId: r.dish_id, note: r.note, synced: true,
      })
    }
    // Re-read: the user may have added or deleted memories while we were uploading.
    const current = await loadMemories()
    for (const m of current) if (pushed.has(m.id)) m.synced = true
    const have = new Set(current.map((m) => m.id))
    const merged = [...current, ...pulled.filter((m) => !have.has(m.id))]
    merged.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    if (pushed.size || pulled.length) await saveMemories(merged)
    return null
  } catch (e) {
    return e instanceof Error ? e.message : String(e)
  }
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result).split(',')[1])
    r.onerror = () => reject(r.error)
    r.readAsDataURL(blob)
  })
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
