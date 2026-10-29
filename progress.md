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
- Decision: no Play Store release for now. Testing via direct APK install.

## 2026-10-21 (later): data fixing
- Created `data-fixes/places_to_check.csv` (82 places: 45 no location, 25 approximate, 12 exact to confirm; each with Google Maps search link) and `data-fixes/dishes_without_places.csv` (9 dishes). User fills in coords/status; Claude imports into `app/src/data/restaurants_*.json` (set `location_exact`, `verified`, remove closed).

## 2026-10-21: WRAP-UP (session end)
**Working now**
- Android app "Off We Go" (Capacitor + React + Vite) installed on user's Realme phone: dish guide (48 Odia dishes), restaurant map (82 places, 37 pinned), photo memories, World Memory Map, Supabase cloud backup via email login link.
- Code on GitHub (private): https://github.com/AnubhavBayard/off-we-go
- Supabase project ref `smbywxloqusoasormzgg` (Mumbai). Schema in `app/supabase/setup.sql`.

**Open items**
1. User filling `data-fixes/places_to_check.csv` + `data-fixes/dishes_without_places.csv`. On "import fixes": apply coords/status to `app/src/data/restaurants_*.json`, set `verified`/`location_exact`, drop closed, rebuild APK.
2. User to revoke Supabase personal access token `claude-setup` (no longer needed).
3. Later: app icon + final name, offline map packs (PMTiles), timeline view, privacy policy/terms before sharing widely, custom SMTP (Resend) if login emails hit 2/hour limit.
- No Play Store for now; share APK directly.

**Rebuild + install**
`cd app && nvm use 22 && npm run build && npx cap sync android && cd android && ANDROID_HOME=~/Android/Sdk ./gradlew assembleDebug && ~/Android/Sdk/platform-tools/adb install -r app/build/outputs/apk/debug/app-debug.apk`

## 2026-10-29: data fixing
- Geocoded all 82 places via OpenStreetMap Nominatim (bounded to Odisha). Only 9 hits, 2 wrong. Wrote 7 good matches into `data-fixes/places_to_check.csv` `new_coords` with note "OSM match (confirm)".
- OSM coverage too thin for the rest: remaining places need manual Google Maps lookup by user.
- Next: user fills rest of CSVs, then "import fixes".

## 2026-10-29: scaling to all of India
- Decision: no per-city restaurant curation. Dish page gets "Find <dish> near me" button (Google Maps search); curated places shown below as "Our picks".
- Dishes now one file per state: `dishes.json` renamed `dishes_odisha.json`, new `state` field. Discover has state dropdown; region chips come from the chosen state's dishes.
- Validator: `app/scripts/check_dishes.py`.
- In progress: 10 research agents writing `dishes_<state>.json` for the other 27 states + 8 UTs (spec: ids `<state>-<dish>`, same schema, sourced facts only).
- Done: all 36 states/UTs have `app/src/data/dishes_<state>.json`. 1,001 dishes total; validator passes. ~1 MB JSON bundled (JS bundle 313 kB gzip).
- Cleanup: Ladakh momos/thukpa set nonveg (consistent with other states; often contain meat). Dropped Gamthi Chicken (DNHDD, no description).
- Tested in headless Chrome: state dropdown, Discover list, dish page with "Find near me" button. Debug APK rebuilt; not installed (phone not connected).
- Privacy incident: at least 6 research agents sent user's email in User-Agent header to Wikipedia API. Not in any saved file. Removed from scratchpad scripts; spec now forbids personal info in requests.
- Data to review before launch: guessed pronunciations (agents' syllable guesses, not sourced); Kerala Parotta + Kozhikode Halwa marked egg; Assam's 6 Bodo GI tags (2024) from news/exam sites, not Wikipedia list; thin single-source entries (Jharkhand, Arunachal, Lakshadweep, Andaman, Puducherry Creole, DNHDD, Chandigarh = Punjabi staples); Feni and NE rice beers are alcoholic.
- Next: install APK on phone (`adb install -r`), commit. Odisha dish ids have no state prefix (others do); fine, ids still unique.

## 2026-10-29: UI restyle from `inspo/`
- Inspo (5 travel-app shots): pale sage bg, lime accent, deep forest-green dark surfaces, big bold headlines with a lime-highlighted word, 22-28px rounded cards, pill chips, floating pill tab bar with lime active tab.
- Rewrote `app/src/index.css` with that palette (light + dark), same class names. Added `.hl` headline highlight (Discover, Memories, Add, Account), `.hero` dark card on dish page, round back buttons, stats as dark card with lime numbers, map pins/world map recolored. Nav label "+ Memory" renamed "Add".
- Checked light + dark in headless Chrome (Discover, Dish, Memories, Add). World map renders blank in headless (WebGL); country file loads fine; check on phone.
- Debug APK rebuilt; not installed (phone not connected).
- Possible next: dish photos (inspo is image-heavy; e.g. Wikipedia thumbnails, needs attribution), icons in tab bar, custom font.

## 2026-10-29: dish photos from Wikipedia
- `app/scripts/fetch_dish_images.py`: batched Wikipedia API (pageimages + imageinfo, ~20 requests, generic User-Agent) -> `app/src/data/dish_images.json` {dish_id: src, page, credit, license}. Images load from Wikimedia at runtime (not bundled; offline = hidden, no broken icon).
- 432 of 1,001 dishes have a photo (only dishes with a Wikipedia article; cuisine pages skipped). All free licences (mostly CC BY-SA).
- UI: photo on Discover cards (photo dishes sorted first), big photo on dish page with credit line "Photo: author, licence, Wikimedia Commons" (required by CC BY/BY-SA).
- Known: some lead images show the ingredient, not the dish (e.g. Gongura Pachadi shows gongura leaves). 569 dishes without photos.
- Debug APK rebuilt; not installed (phone not connected).
- Installed on phone (Realme, adb). Verified on device: new UI (dark mode), Wikipedia photos load on Discover cards, floating nav.

## 2026-10-29: welcome screen
- First-launch screen modelled on `inspo/Screenshot from 2026-10-29 10-26-36.png` (left phone): full-bleed photo, frosted blurred panel on left with lime mark, "Off We / Go" title, tagline, dish count, black "Let's eat" pill.
- `app/src/pages/Welcome.tsx`; shown until tapped once (localStorage `welcomed`). Photo bundled at `app/public/welcome.jpg` (Wazwan, 1280px, 310 KB, CC BY-SA 4.0, credit on screen) so it works offline.
- Installed + verified on phone.

## 2026-10-29: UI v2 from `inspo/Screenshot from 2026-10-29 10-26-48.png`
- Light theme only (like inspo): grey-white bg, black ink, lime accent; dark mode dropped. Font Plus Jakarta Sans (bundled via @fontsource-variable, offline). Icons: lucide-react.
- Home: misty-hills background, avatar + "Hello, foodie" + account button, headline with lime highlight, search + state pickers with icons, category pills with icons (active = black), "Must try" carousel of big photo cards (GI-tagged first, badge on photo), "All dishes" list as photo-thumb row cards; category icon when no photo.
- Dish page: full-bleed photo with round back button and title over it, rounded sheet overlapping, fact chips (diet/category/spice/GI/Jain/vegan), bottom bar with price + lime "Find near me". Nav hidden there. Opens scrolled to top.
- Nav: floating white pill of icons; active tab = lime pill with label.
- Shared UI bits in `app/src/ui.tsx` (category icons, photo with fallback).
- Verified on phone (home, list) and headless Chrome via DevTools script (dish pages). Installed.
- Skipped: heart/favourites on cards (no favourites feature yet).
- Welcome screen now shows on every fresh launch (was first-launch only; user expected it as landing page). Removed localStorage flag.
- Reverted: welcome screen first launch only again (user decision). localStorage flag `welcomed`. To see it again: clear app data.

## 2026-10-29: Add page restyle from `inspo/Screenshot from 2026-10-29 10-27-14.png`
- Header (lime avatar + "New memory"), big headline "Tell me about your food moment", subtitle; sections with icon labels: Photo (empty dashed card + Take photo / Gallery pills), Where (pill select), What did you eat (pill select), Who were you with (Solo/Partner/Family/Friends option pills, 2x2, selected = black), Note; big lime "Save memory" button.
- "Who were you with" has no DB field: saved as prefix of note ("With family · ..."). Add a real column if filtering by it is ever needed.
- Built + installed on phone; checked in headless Chrome.
- Dish page: photo fades out + drifts slower (parallax) as you scroll; title and its dark gradient fade first. Pure CSS scroll-driven animations (`animation-timeline: scroll()`), skipped on old WebViews. Installed.
- Dish page scroll v2: photo blurs + darkens (not fades to white). Name block now lives at top of sheet; scroll animation starts it lifted over the photo in white, then glides it down into the sheet turning dark (15-45vh of scroll). Its measured height (--title-h) closes the gap while lifted. Installed.
- Fixed: back from dish page showed blank screen. Cause: `useEffect(() => window.scrollTo(0,0))` returned scrollTo's Promise (new Chrome returns one); React called it as cleanup on unmount -> crash. Wrapped in braces. Test script for this flow: scratchpad backtest.mjs (CDP). Installed.

## 2026-10-29: curated to 5-10 best dishes per state, no cities
- User decision: app shows only 5-10 best dishes per state, state level only (no cities).
- Hand-picked per state (mix of signature meal, street food, sweet, drink; ranking hint = GI tag > Wikipedia article > photo > research order). 329 dishes total, 206 with photos. Picks list: `app/data-archive/picks.py`.
- Full research (1,001 dishes) moved to `app/data-archive/dishes_<state>.json` (not bundled). Restore = copy back.
- Removed city filter chips, city names on cards and dish page (state only), REGION_LABEL/regionLabel. `regions` field kept in data, unused.
- Bundle 337 -> 243 kB gzip. Odisha restaurant links to dropped Odisha dishes are ignored (map popups list only kept dishes). Memories pointing at dropped dishes just show no dish name.
- Installed on phone.
- Background: app-wide fixed backdrop (body::before/::after) with lime top-left, misty blue right, saffron bottom glows + faint dot texture fading down. Body made transparent so the layers show. Home hills kept. Installed.
- Nav: removed blue tap box (-webkit-tap-highlight-color transparent; focus ring only for keyboard via :focus-visible). Tab switches use View Transitions API (document.startViewTransition + flushSync): page fades/rises in, lime active pill morphs to the new tab, nav bar stays still; instant fallback; respects reduced motion. Tested 4 tabs headless, no errors. Installed.
- Background v2: user's `inspo/wallpaper.jpg` (alpine valley) as app-wide fixed backdrop. Pre-blurred offline (PIL, 384x640, Gaussian 14) -> `app/public/wallpaper-blur.jpg` (11 KB), under a light veil (50-72% white) for readability. Removed earlier glows, dot texture, home hills. Darkened --muted (#4b525c) for contrast on the wallpaper. Installed.
- Licence: wallpaper carries a wallpaperswide.com watermark (third-party photo). Fine for testing; replace with an owned/licensed photo before public release.

## 2026-10-29: logo + animated entry
- Logo from `inspo/logo.jpeg` (noodle bowl, red sun). `app/scripts/make_icons.py` builds: Android launcher icons (adaptive foreground on cream #F7EFE2 + legacy square/round, all densities), pre-Android-12 splash.png (cream + logo), `public/logo.jpg` (512px, in-app), `public/favicon.png`. Android 12+ splash background set cream (`windowSplashScreenBackground`). Old favicon.svg deleted.
- Logo now in home header avatar and welcome screen mark.
- `app/src/pages/Intro.tsx`: launch animation every app start (~2.3s, tap to skip, skipped with reduced motion): cream bg matching native splash, logo pops in over red ripple, "Off We Go" letters rise staggered, tagline "Eat your way across India", then zoom-fade into app. Order: Intro -> Welcome (first launch only) -> app.
- Verified headless (frames at 0.35/1/1.6/3s, no errors) and on phone. Installed.
- Licence: logo looks like a downloaded third-party image (Pinterest-size 736px). Replace with owned/licensed logo before public release.

## 2026-10-29: launch + animation performance fixes
- Static logo before intro: Android 12+ system splash showed the icon until WebView painted. Now plain cream (windowSplashScreenAnimatedIcon = transparent `drawable/splash_blank.xml`, bg `@color/splash_cream` in `values/splash.xml`); old splash.png files deleted.
- Intro moved from React into static HTML in `index.html` (styles in index.css), so it starts on WebView's first paint, not after the ~950 KB bundle. main.tsx removes it on end/tap; CSS ends it with visibility:hidden so it can't block taps; hidden with reduced motion. App renders underneath. `pages/Intro.tsx` deleted.
- Measured on phone (rapid screencaps): ~1.5-2 s plain cream (WebView cold start, unavoidable in Capacitor) -> intro ~2.5 s -> fades into already-rendered home ~4.8 s.
- Dish page scroll effects rebuilt GPU-only (transform/opacity): parallax wrapper; pre-blurred dark photo copy fades in (no animated filter); sheet background pseudo-element slides up behind the title (no margin animation); white/dark title copies cross-fade (no colour/text-shadow animation). Sheet holds the bottom padding.
- Tab transitions: React Router renders async, so old page was animating and new one popped in. View transition now waits for the route commit (layout effect resolves a promise; 600 ms safety). Home renders first 20 cards, rest after 450 ms; off-screen cards use content-visibility. Tab-switch prep time at 4x CPU throttle: ~150 ms -> 25-50 ms.
- Sources line shows one link per site. Installed; back-button test still passes.
- Dish page fixes: (1) name touched the sheet edge: offsets now account for sheet padding (28px); sheet bg starts 18px below the name and still overlaps the photo for the round corners; content after the name gets 36px. (2) gap at the bottom showing wallpaper: `main` reserved 100px for the nav even on dish pages; `main:has(.detail)` drops it. (3) short dishes couldn't scroll far enough for the sheet to finish rising: sheet min-height = 100vh + title + 74px, and scroll ranges now in px (all done by 300px; scroll room is >= photo height 340px). Installed.
- Home avatar: logo replaced by `FoodTicker` (ui.tsx): lime circle cycling 12 food icons (curry, chai, drumstick, kulfi, wheat, fish, sweets, pot, prawn, citrus, popcorn, cookie) every 2.2 s; new icon springs up/spins in, old one exits up. Transform/opacity only; static with reduced motion. Logo still on welcome screen, intro and app icon. Installed.
- Food circle is now a button: tap = 3D flip (perspective rotateY 360deg with lift, 0.8 s, springy) and jump to next food. Two identical keyframes (spin3d-a/b) alternate so repeat taps restart it. Gotcha: lightningcss minifier turns a name-less `animation` shorthand into `animation:none` (drops duration) -> use longhands. Off with reduced motion. Installed.
- 2026-10-29: committed and pushed all work above to GitHub (main).
- Home list remembers state picker, category, veg/Jain, search and scroll position when coming back from a dish or another tab (module-level `saved` in Discover.tsx, session only; fresh launch starts clean). Returning to a scrolled list renders all cards at once so the position can be restored. Tested app back + system back in headless Chrome: restored, no errors. APK built, NOT installed (phone disconnected). Committed + pushed.
