// Curated dish + restaurant data, bundled with the app so it works offline.
// Dishes: India one file per state (dishes_<state>.json), other countries one file each (dishes_world_<country>.json).
// Restaurants are one file per city (restaurants_<city>.json).

export type Category = 'sweet' | 'street_food' | 'meal' | 'pitha' | 'temple_food' | 'snack' | 'drink'

export type Dish = {
  id: string
  name: string
  local_name: string | null
  pronunciation: string | null
  category: Category
  country: string
  state: string // first-level region within the country: Indian state, French region, US state...
  regions: string[] // where in the state it is best known (not shown in the app; states only)
  description: string
  how_to_eat: string | null
  how_to_order: string | null
  typical_price: string | null // e.g. "20-40", in `currency`
  currency: string // ISO 4217, e.g. INR, EUR
  diet: 'veg' | 'nonveg' | 'egg'
  jain: boolean
  vegan: boolean
  spice: number
  allergens: string[]
  gi_tag: boolean
  wikipedia_url: string | null
  source_urls: string[]
}

export type Restaurant = {
  id: string
  name: string
  city: string
  area: string | null
  address: string | null
  lat: number | null
  lng: number | null
  location_exact: boolean // false = pin is the street/area, not the shop
  google_maps_url: string | null
  price_level: number | null
  source_urls: string[]
  verified: boolean
}

// Lead photo of the dish's Wikipedia article (scripts/fetch_dish_images.py). Loaded from Wikimedia, not bundled.
export type DishImage = { src: string; page: string; credit: string; license: string }
import dishImages from './data/dish_images.json'
export const imageFor = (dishId: string): DishImage | undefined => (dishImages as Record<string, DishImage>)[dishId]

export type DishLink = { dish_id: string; restaurant_id: string; note: string | null; source_urls: string[] }

type CityFile = { restaurants: Restaurant[]; links: DishLink[] }

const dishFiles = import.meta.glob<Dish[]>('./data/dishes_*.json', { eager: true, import: 'default' })
const cityFiles = import.meta.glob<CityFile>('./data/restaurants_*.json', { eager: true, import: 'default' })

export const dishes: Dish[] = Object.values(dishFiles).flat()
export const restaurants: Restaurant[] = Object.values(cityFiles).flatMap((f) => f.restaurants)
const links: DishLink[] = Object.values(cityFiles).flatMap((f) => f.links)

export const COUNTRIES = [...new Set(dishes.map((d) => d.country))].sort()
export const regionsOf = (country: string) => [...new Set(dishes.filter((d) => d.country === country).map((d) => d.state))].sort()

// ISO codes for matching the user's location (reverse geocoding gives a code; names vary, e.g. Türkiye/Turkey).
export const COUNTRY_CODE: Record<string, string> = {
  India: 'IN', France: 'FR', Spain: 'ES', 'United States': 'US', Italy: 'IT', Turkey: 'TR', Mexico: 'MX',
  'United Kingdom': 'GB', Germany: 'DE', Greece: 'GR', Thailand: 'TH', Japan: 'JP', China: 'CN',
  'United Arab Emirates': 'AE', Malaysia: 'MY', Vietnam: 'VN', Indonesia: 'ID', Portugal: 'PT',
  Netherlands: 'NL', 'South Korea': 'KR', Singapore: 'SG', Austria: 'AT', Canada: 'CA', Croatia: 'HR', Morocco: 'MA',
  Poland: 'PL', Hungary: 'HU', Czechia: 'CZ', Egypt: 'EG',
  Australia: 'AU', Brazil: 'BR', Peru: 'PE', Argentina: 'AR',
}

// "₹20-40", "€8-12", "THB 50-80"
export const priceLabel = (d: Dish) => {
  if (!d.typical_price) return null
  const symbol = new Intl.NumberFormat('en', { style: 'currency', currency: d.currency }).formatToParts(0).find((p) => p.type === 'currency')?.value ?? d.currency
  return `${symbol}${symbol.length > 1 ? ' ' : ''}${d.typical_price}`
}
export const dishById = new Map(dishes.map((d) => [d.id, d]))
export const restaurantById = new Map(restaurants.map((r) => [r.id, r]))

export const restaurantsForDish = (dishId: string) =>
  links
    .filter((l) => l.dish_id === dishId && restaurantById.has(l.restaurant_id))
    .map((l) => ({ restaurant: restaurantById.get(l.restaurant_id)!, note: l.note }))

export const dishesForRestaurant = (restaurantId: string) =>
  links.filter((l) => l.restaurant_id === restaurantId).flatMap((l) => dishById.get(l.dish_id) ?? [])

export const CATEGORY_LABEL: Record<Category, string> = {
  sweet: 'Sweets',
  street_food: 'Street food',
  meal: 'Meals',
  pitha: 'Pitha',
  temple_food: 'Temple food',
  snack: 'Snacks',
  drink: 'Drinks',
}

// Distance in km between two lat/lng points (haversine).
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const rad = Math.PI / 180
  const dLat = (bLat - aLat) * rad
  const dLng = (bLng - aLng) * rad
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLng / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(h))
}
