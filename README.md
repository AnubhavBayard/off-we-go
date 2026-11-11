# Off We Go

An Android app for travellers who want to eat their way around the world. Pick a country and a region and you see the handful of dishes that place is known for: what each one is, how to eat it, what to ask for, and where to find it near you. You can also save photo memories of the food you try.

## What's in it

- **2,277 dishes in 53 countries.** India (329 dishes across all 36 states and union territories), plus France, Spain, USA, Italy, Turkey, Mexico, UK, Germany, Greece, Thailand, Japan, China, UAE, Malaysia, Vietnam, Indonesia, Portugal, Netherlands, South Korea, Singapore, Austria, Canada, Croatia, Morocco, Poland, Hungary, Czechia, Egypt, Australia, Brazil, Peru, Argentina, Philippines, Sri Lanka, Nepal, Ireland, Switzerland, Belgium, Lebanon, Sweden, Denmark, Norway, Taiwan, Colombia, Israel, Jordan, Chile, New Zealand, Finland, Iceland, Romania and Georgia.
- **Curated, not exhaustive.** Each region gets 5 to 8 signature dishes: a main meal, street food, a sweet and a drink.
- **Every dish card has:** a short description, local name and pronunciation where known, how to eat it, how to order it, typical price in local currency, spice level, veg/egg/non-veg and vegan flags, allergens, and protected-origin status (EU PDO/PGI and national equivalents).
- **Sourced data.** Dish facts come from Wikipedia and official sources, and each dish lists its sources in the app. Photos come from Wikimedia Commons, with author and licence credited.
- **Filters:** country, then region; category; vegetarian; Jain (India only); search.
- **Find near me** opens a Google Maps search for the dish around you. The app defaults to the country you're in if location is allowed.
- **Food memories:** save a photo, place, dish and note for each meal. Your memories are shown on a world map and can be backed up to the cloud (email sign-in).

## Tech

- React + TypeScript + Vite, packaged as an Android app with Capacitor.
- MapLibre for maps, Supabase for the optional memory backup.
- Dish data is plain JSON in `app/src/data/` and is bundled into the app, so browsing works offline. Photos load from Wikimedia.

## Project layout

```
app/
  src/            React app (pages, data loading, styles)
  src/data/       dish JSON (dishes_<indian_state>.json, dishes_world_<country>.json) and dish_images.json
  scripts/        check_dishes.py (validate data), fetch_dish_images.py (photos + credits), make_icons.py
  data-archive/   world_spec.md (dataset spec), full India research not bundled
  android/        Capacitor Android project
data-fixes/       checklists for restaurant location fixes
progress.md       running development log
```

## Build and run

Needs Node 22 and the Android SDK.

```bash
cd app
npm install
npm run dev                      # browser preview
npm run build && npx cap sync android
cd android && ./gradlew assembleDebug
adb install -r app/build/outputs/apk/debug/app-debug.apk
```

## Working with the data

- Validate after any data change: `cd app && python3 scripts/check_dishes.py`
- Refresh photos after adding dishes or changing links: `python3 scripts/fetch_dish_images.py`
- Adding a country: follow `app/data-archive/world_spec.md`, and add the country to its country list and to `COUNTRY_CODE` in `app/src/data.ts`.

## Status

Personal project, in active development. The logo is a placeholder and needs to be replaced with an owned one before a public release.
