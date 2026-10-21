# Progress

## 2026-10-21
- Reviewed `summary.md` (culinary travel + social matchmaking app concept). No code yet.
- Next: decide MVP scope, pick stack (Flutter vs React Native, FastAPI vs Django).
- Blockers: none.

## 2026-10-21 (later)
- Decision: no in-app payments. Guides and travelers only connected; any money settled off-app.
- Updated `summary.md`: removed Stripe Connect, renamed "Premium Marketplace" to "Culinary Ambassadors Directory", "booking" to "meetup requests".
- Open: monetization model now undefined.

## 2026-10-21 (later)
- Decision: core product = local dish discovery + restaurants serving them. Diary, Traveler Radar, guide directory = secondary add-ons.
- Updated `summary.md` title, executive summary, section structure to reflect this.
- Next: define dish/restaurant data source and ranking method; differentiate vs TasteAtlas/Google Maps.

## 2026-10-21 (later)
- Decision: food memories (user photos of places/restaurants visited, revisitable later) is part of the core, alongside dish discovery.
- Rewrote `summary.md`: core = Discover (dish profiles, dish-level rankings, map, offline packs) + Remember (photo check-ins, stamps, memory map/timeline, private by default, export). Social features moved to post-launch add-ons. Added privacy/moderation, photo storage, data/content strategy, business model options, competitors (TasteAtlas, Polarsteps), success metrics. Fixed target audience.
- Next: pick stack (Flutter vs RN, FastAPI vs Django), pick launch city, define data schema, draft MVP spec.
- Open: business model.

## 2026-10-21 (later)
- Added World Memory Map to `summary.md` core (Food Memories): world view highlights visited countries; tap country to see cities visited; tap city to see places + photos; totals for countries/cities/dishes. Timeline kept as separate view.

## 2026-10-21 (later)
- Decision: Capacitor (not Expo/React Native/Flutter) for mobile. Backend Supabase. Maps MapLibre GL JS + PMTiles for offline.
- Rewrote Technical Stack section in `summary.md` accordingly (Capacitor plugins, Supabase, MapLibre, check-in geocoding, restaurant data source, monitoring, later items).
- Open: launch city, business model.

## 2026-10-21 (later)
- Decision: React confirmed for web layer (Vite SPA, no Next.js). Added key libraries to `summary.md` tech stack.
- Next: launch city, data schema, MVP spec.

## 2026-10-21 (later)
- Decision: launch in India (founder based there). Specific launch city TBD.
- Updated `summary.md`: GTM now India-first, city-by-city; data protection leads with India DPDP Act; dietary flags add veg/non-veg/egg, Jain, vegan; target audience includes domestic travelers.
- Next: pick launch city.

## 2026-10-21 (later)
- Decision: launch city = Bhubaneswar, Odisha, covering Golden Triangle circuit (Bhubaneswar, Puri, Konark) + Cuttack.
- Updated `summary.md` GTM section. Possible launch moment: Rath Yatra (June/July).
- Next: curate Odia dish list (30-50), map restaurants per dish; then data schema + MVP spec.

## 2026-10-21 (later)
- Added "Scaling Content Beyond the Launch City" section to `summary.md`: Phase 1 team curation (Odisha), Phase 2 local curators in top Indian cities, Phase 3 open data + AI drafts + local verification internationally. Memories feature global from day 1.

## 2026-10-21 (later): app build started
- User asked to skip field research: data gathered from Wikipedia + web via AI research agents, app built now.
- Scaffolded `app/`: Vite + React 19 + TypeScript, Capacitor 8 (Android platform added, `com.offwego.app`, name "Off We Go"), MapLibre via react-map-gl, react-router (HashRouter).
- Needs Node 22 for Capacitor CLI (`app/.nvmrc`; `nvm use 22`). `.npmrc` sets legacy-peer-deps (npm 10.8 peer bug).
- Screens: Discover (dish list + region/category/veg/Jain filters), Dish detail (info + restaurants), Map (restaurant pins, near me; OpenFreeMap tiles), Add Memory (photo via file input/camera, restaurant + dish, note), Memories (World Memory Map: visited countries highlighted, tap country for city pins, tap city for photos; stats; delete).
- Data: bundled JSON in `app/src/data/` (`dishes.json`, `restaurants_<city>.json`) so guide works offline. World map uses Natural Earth India-POV boundaries (`public/countries.geojson`), no tiles.
- Memories stored on-device only (Preferences + Filesystem). No Supabase yet (needs account).
- In progress: dish dataset research agent; restaurant research per city next.

## 2026-10-21 (later): dish dataset done
- Wrote `app/src/data/dishes.json`: 48 Odia dishes (sweets, temple food, pithas, street food, meals, drinks), sourced from Wikipedia + Outlook Traveller, Inditales, Holidify, OdishaBytes, odishalifestyle, goya.in.
- GI tags confirmed only for Odisha Rasagola (2019) and Kendrapara Rasabali (2023). Prices mostly null (sources rarely give them); Odia script null where not seen in a source.
- Next: restaurant research per city.

## 2026-10-21 (later): app tested in headless Chrome
- Fix: MapLibre 6 incompatible with react-map-gl 8 (maps blank, no tiles requested). Pinned `maplibre-gl@5.24.0`.
- Verified via screenshots/CDP: dish list + detail render with Odia script; street map renders Odisha (OpenFreeMap); world map highlights visited countries, tap country zooms + shows city dots + city chips; add-memory saves photo (Filesystem) and shows thumbnail.
- World map city labels overlapped for nearby cities: switched to dot pins + tappable city chips.
- Missing photo files no longer throw (empty tile).
- Restaurant research agents (Bhubaneswar, Puri/Konark/Chilika, Cuttack/Salepur) running; writing `app/src/data/restaurants_*.json`.

## 2026-10-21 (later): PAUSED by user
- Stopped all 3 restaurant research agents before they wrote output. No `restaurants_*.json` files exist yet.
- Stopped local preview server.
- State: app builds and runs; 48 dishes loaded; restaurant data missing (dish pages show "No restaurants listed yet", map has no pins).
- Resume steps:
  1. Re-run restaurant research per area (Bhubaneswar+Pahala, Puri/Konark/Chilika, Cuttack/Salepur) into `app/src/data/restaurants_<city>.json` (format in `app/src/data.ts`).
  2. Test restaurant pins, "Show on map", "I ate here".
  3. `nvm use 22 && npm run build && npx cap sync android`, then build/run on an Android device.
  4. Later: Supabase account for cloud backup of memories; offline PMTiles city packs.
- 2026-10-21: Resumed. Restaurant research agents restarted from where they stopped.
- Android debug APK builds: `app/android/app/build/outputs/apk/debug/app-debug.apk` (gradle auto-installed SDK platform 36; `android/local.properties` points to ~/Android/Sdk).

## 2026-10-21 (later): restaurant data loaded
- Research agents finished: `restaurants_bhubaneswar.json` (36 places, 85 links), `restaurants_puri.json` (19 places, 40 links; Puri/Konark/Chilika), `restaurants_cuttack.json` (27 places, 45 links; Cuttack/Salepur). All `verified: false`.
- Only 37 of 82 places have coordinates; 12 exact. Added `location_exact` field; approximate pins shown muted with "Approximate location" in popup. Removed coordinate remarks from link notes.
- Tested in headless Chrome: dish pages list restaurants, map pins + focused popup, "I ate here" prefill, memory saved at restaurant resolves to Puri, India.
- Fixed "Near me" button overlapping map credits.
- Rebuilt Android debug APK with data.
- Data to verify in person before launch: Raghu Dahibara (Cuttack; founder died 2026, status unknown), single-source places (Swiggy/abhibus/Incredible India lists), generic stall groups (Bada Danda, Puri beach, Satapada), Michael's Kitchen (two addresses), Nana Hotel mutton link (jhola not kasa).
- Dishes with no places in any city (9): bela-pana, chhena-jalebi, chhena-murki, dahi-machha, enduri-pitha, kora-khai, mudhi-mansa, ou-khatta, thunka-puri.
- Next: install APK on phone, test camera + GPS; add missing coordinates (manual Google Maps lookup); Supabase backup.

## 2026-10-21 (later): running on real phone
- USB debugging enabled on user's Realme RMX3360 (Android). Debug APK installed via adb and launched.
- Verified on device: dish list (Odia script renders), map tab with restaurant pins (exact + approximate). Logcat warnings are harmless OpenFreeMap style filter notices.
- Not yet tested on device: camera capture, GPS "Near me", saving memories (need user to tap through permission prompts).
- User tested on device: camera + location permissions granted; memory saved with GPS, reverse-geocoded to Sundargarh, India. Core loop works on real phone.

## 2026-10-21 (later): version control
- `git init` (branch main), initial commit, pushed to private GitHub repo https://github.com/AnubhavBayard/off-we-go (node_modules, dist, android build output, local.properties ignored).
- Next: Supabase cloud backup for memories (needs user's Supabase project URL + anon key).

## 2026-10-21 (later): Supabase backup
- Supabase project "Off we goooo" (ref smbywxloqusoasormzgg). Publishable key in `app/src/cloud.ts` (safe to ship; RLS protects data).
- Ran `app/supabase/setup.sql` via Management API: `memories` table with RLS (own rows only), private `photos` bucket (5 MB, JPEG) with per-user folder policy. Verified: 2 policies, RLS on, bucket private.
- App: email OTP sign-in (`/account` page), local-first memories with `synced` flag; `syncMemories()` uploads unsynced photos+rows and pulls memories from other devices; runs on app start, after each new memory, after sign-in. Delete removes cloud copy when signed in.
- Blocker: custom email templates blocked on free tier with default email provider. Default email may only contain a magic link (no code). Default OTP length is 8. Built-in email limit: 2 emails/hour.
- Fix if needed: set up custom SMTP (e.g. Resend free tier), then template with `{{ .Token }}`.
- Personal access token used for setup: user must revoke after setup.
- Default Supabase email only has a magic link (template edit needs paid plan or custom SMTP). Switched login to link-based: PKCE flow, `emailRedirectTo: com.offwego.app://login`, Android intent filter for that scheme, `@capacitor/app` `appUrlOpen` -> `exchangeCodeForSession`. Added scheme to Supabase `uri_allow_list` via Management API.
- Verified on phone: `com.offwego.app://login?...` opens the app and reaches the handler. Real email-link sign-in still to be tested by user (link must be opened on same phone).
- User signed in via email link on phone. Verified on device: existing Sundargarh memory now `synced: true` (photo uploaded to `photos` bucket + row upserted; only possible when authenticated under RLS). Cloud backup works end to end.
- Setup access token no longer needed: user to revoke it at supabase.com/dashboard/account/tokens.
