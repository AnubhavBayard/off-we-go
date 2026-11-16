// Small UI pieces shared by the dish list and dish page.
import { useEffect, useState, type AnimationEvent, type ReactNode, type SyntheticEvent } from 'react'
import {
  Candy, Check, Citrus, Coffee, CookingPot, Cookie, CupSoda, Drumstick, Fish, IceCreamCone, Landmark, Popcorn, Sandwich, Search, Shrimp, Soup, Wheat, X,
  type LucideIcon,
} from 'lucide-react'
import { imageFor, type Category, type Dish } from './data'

export const CATEGORY_ICON: Record<Category, LucideIcon> = {
  sweet: Candy,
  street_food: Sandwich,
  meal: CookingPot,
  pitha: Cookie,
  temple_food: Landmark,
  snack: Popcorn,
  drink: CupSoda,
}

// Offline or removed from Wikimedia: drop the image instead of showing a broken icon.
export const hideBroken = (e: SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none' }

// Dish photo, or the category icon on a tinted tile when there is none (or it fails to load).
// small: 330px Wikimedia thumbnail (a standard size) for list thumbs instead of 960px; less to download and decode while scrolling.
export function DishPhoto({ dish, className, alt = '', small }: { dish: Dish; className: string; alt?: string; small?: boolean }) {
  const img = imageFor(dish.id)
  const Icon = CATEGORY_ICON[dish.category]
  const src = img && (small ? img.src.replace('/960px-', '/330px-') : img.src)
  return (
    <div className={`photo ${className}`}>
      <Icon className="photo-icon" aria-hidden />
      {src && <img src={src} alt={alt} loading="lazy" decoding="async" onError={hideBroken} />}
    </div>
  )
}

// Home avatar: food icons that take turns, each sliding up and spinning in while the last one leaves.
// Tapping it flips the circle 360° in 3D and lands on the next food.
const FOODS = [Soup, Coffee, Drumstick, IceCreamCone, Wheat, Fish, Candy, CookingPot, Shrimp, Citrus, Popcorn, Cookie]

export function FoodTicker() {
  const [n, setN] = useState(0) // swaps so far; keeps counting so the wrap-around animates like any other swap
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setN((k) => k + 1), 2200)
    return () => clearInterval(t)
  }, [])
  const [spins, setSpins] = useState(0)
  const In = FOODS[n % FOODS.length]
  const Out = FOODS[(n - 1) % FOODS.length]
  return (
    <button
      type="button"
      className="avatar food-ticker"
      aria-label="Spin for another food"
      // Two identical keyframes alternate so every tap restarts the spin, even mid-spin.
      style={spins ? { animationName: spins % 2 ? 'spin3d-a' : 'spin3d-b' } : undefined}
      onClick={() => { setSpins((s) => s + 1); setN((k) => k + 1) }}
    >
      {n > 0 && <Out key={`out-${n}`} className="food-out" size={22} />}
      <In key={`in-${n}`} className="food-in" size={22} />
    </button>
  )
}

export type PickerOption = { value: string; label: string; icon: ReactNode; meta?: ReactNode }

// Sheets slide out before unmounting: close() plays the out animation, the overlay's animationend calls onClose.
// Reduced motion has no animation (no animationend), so it closes at once.
export function useSheetClose(onClose: () => void) {
  const [closing, setClosing] = useState(false)
  const close = () => matchMedia('(prefers-reduced-motion: reduce)').matches ? onClose() : setClosing(true)
  const overlayProps = {
    className: closing ? 'overlay closing' : 'overlay',
    onClick: close,
    onAnimationEnd: (e: AnimationEvent<HTMLDivElement>) => { if (closing && e.target === e.currentTarget) onClose() },
  }
  return { close, overlayProps }
}

// Bottom sheet list behind the pill pickers (country/region on Home, place/dish on Add).
export function PickerSheet({ title, options, value, searchable, onPick, onClose }: {
  title: string; options: PickerOption[]; value: string; searchable?: boolean; onPick: (v: string) => void; onClose: () => void
}) {
  const [q, setQ] = useState('')
  const shown = options.filter((o) => o.label.toLowerCase().includes(q.trim().toLowerCase()))
  const { close, overlayProps } = useSheetClose(onClose)
  return (
    <div {...overlayProps}>
      <div className="sheet picker-sheet" role="dialog" aria-label={title} onClick={(e) => e.stopPropagation()}>
        <div className="sheet-grip" />
        <div className="picker-head">
          <h2>{title}</h2>
          <button type="button" className="icon-btn" aria-label="Close" onClick={close}><X size={20} /></button>
        </div>
        {searchable && (
          <label className="input-icon">
            <Search size={18} aria-hidden />
            <input className="search" placeholder="Search" value={q} onChange={(e) => setQ(e.target.value)} />
          </label>
        )}
        <ul className="picker-list">
          {shown.map((o) => (
            <li key={o.value}>
              <button type="button" className={o.value === value ? 'on' : ''} onClick={() => { onPick(o.value); close() }}>
                <span className="picker-icon">{o.icon}</span>
                <span className="picker-label">{o.label}</span>
                <span className="muted small picker-meta">{o.meta}</span>
                {o.value === value && <Check size={18} />}
              </button>
            </li>
          ))}
          {shown.length === 0 && <li className="muted">Nothing matches.</li>}
        </ul>
      </div>
    </div>
  )
}
