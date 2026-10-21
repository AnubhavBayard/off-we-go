// Curated dish + restaurant data, bundled with the app so it works offline.
// dishes.json is one list; restaurants are one file per city (restaurants_<city>.json).

export type Category = 'sweet' | 'street_food' | 'meal' | 'pitha' | 'temple_food' | 'snack' | 'drink'
export type Region = 'bhubaneswar' | 'puri' | 'cuttack' | 'konark' | 'odisha'

export type Dish = {
  id: string
  name: string
  local_name: string | null
  pronunciation: string | null
  category: Category
  regions: Region[]
  description: string
  how_to_eat: string | null
  how_to_order: string | null
  typical_price_inr: string | null
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

export type DishLink = { dish_id: string; restaurant_id: string; note: string | null; source_urls: string[] }

type CityFile = { restaurants: Restaurant[]; links: DishLink[] }

const dishFiles = import.meta.glob<Dish[]>('./data/dishes.json', { eager: true, import: 'default' })
const cityFiles = import.meta.glob<CityFile>('./data/restaurants_*.json', { eager: true, import: 'default' })

export const dishes: Dish[] = Object.values(dishFiles).flat()
export const restaurants: Restaurant[] = Object.values(cityFiles).flatMap((f) => f.restaurants)
const links: DishLink[] = Object.values(cityFiles).flatMap((f) => f.links)

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

export const REGION_LABEL: Record<Region, string> = {
  bhubaneswar: 'Bhubaneswar',
  puri: 'Puri',
  cuttack: 'Cuttack',
  konark: 'Konark',
  odisha: 'All Odisha',
}

// Distance in km between two lat/lng points (haversine).
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number) {
  const rad = Math.PI / 180
  const dLat = (bLat - aLat) * rad
  const dLng = (bLng - aLng) * rad
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(aLat * rad) * Math.cos(bLat * rad) * Math.sin(dLng / 2) ** 2
  return 12742 * Math.asin(Math.sqrt(h))
}
