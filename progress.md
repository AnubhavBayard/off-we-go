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
- Home list remembers state picker, category, veg/Jain, search and scroll position when coming back from a dish or another tab (module-level `saved` in Discover.tsx, session only; fresh launch starts clean). Returning to a scrolled list renders all cards at once so the position can be restored. Tested app back + system back in headless Chrome: restored, no errors. Committed + pushed; installed on phone after reconnect (USB debugging had to be re-enabled).
- "Clear filters" pill (black, X icon) right of the "Results" heading; shown only while search/category/veg/Jain is active; clears those, keeps the picked state. Tested (Kerala + Veg: Results 5 -> All dishes 10, Kerala kept). Installed; not committed.
- Background blur reduced ~30%: wallpaper-blur.jpg regenerated at 540x900 (was 384x640), same Gaussian 14 (23 KB). Installed; not committed.

## 2026-10-29: scope decision — worldwide
- User: app is for tourists/travellers everywhere, not only India.
- Already global: memories + World Memory Map, "Find near me" (Google Maps search), photo credits.
- India-specific today: dish data (36 states only), "All of India" picker, headline "...in India", intro tagline "Eat your way across India", ₹ prices, Jain filter, state-only model.
- Proposed: add `country` to dishes, picker Country -> Region, default to the user's current country via GPS, local currency, Jain filter only where relevant, research per country with the existing agent pipeline (spec now forbids personal info in requests). Waiting on user: which countries first.
- User picked: top 20 tourist countries first (France, Spain, USA, Italy, Turkey, Mexico, UK, Germany, Greece, Thailand, Japan, China, UAE, Malaysia, Vietnam, Indonesia, Portugal, Netherlands, South Korea, Singapore).
- Code done: dish fields `country`, `typical_price` + `currency` (was typical_price_inr; India data migrated). Home: Country picker -> Region picker, headline "best bites in {region/country/the world}", defaults to the user's current country once per session if location already allowed (no prompt), Jain chip India-only, prices with local currency symbol (`priceLabel`). Intro tagline "Eat your way around the world"; welcome shows dish + country count. Validator checks country/currency.
- In progress: 10 research agents writing `app/src/data/dishes_world_<country>.json` (spec: 4-8 food regions per country, 5-8 best dishes each, local currency, GI = protected-origin status of the dish, no personal info in requests).
- After: validate, fetch photos (scripts/fetch_dish_images.py covers all files), rebuild, install, commit.
- Done: 20 countries researched -> `app/src/data/dishes_world_<country>.json`. 1,098 dishes / 21 countries total (India 329; Italy 50 ... UAE 13), all pass validator. 885 have Wikipedia photos. Bundle 398 kB gzip.
- Cleanup: set nonveg (lard/meat common): Reganmian, Biangbiang, Erkuai (China), Chwee Kueh (Singapore). Category chips now only show categories present in the chosen place.
- Tested headless: All countries -> Japan (49, 8 regions, Jain hidden) -> Kansai (8). No errors. Installed on phone.
- DATA QUALITY: parallel agents got rate-limited by Wikipedia; US/Mexico, France/Spain, China/Singapore, Malaysia/Indonesia agents wrote parts of descriptions/diet/allergens from own knowledge (links verified). Needs a slow sequential verification pass before launch (one agent at a time, check each dish vs its Wikipedia article). Other review items: UAE only 13 dishes; thin regions (Johor, Maluku & Papua, Alentejo, Algarve); some unverified local-script names (Malaysian Chinese names, some Japanese/Korean); cautious nonveg calls (stamppot, Yorkshire pudding, lard pastries in Italy).
- Committed + pushed.

## 2026-10-29: WRAP-UP (session end)
**Working now**
- Android app "Off We Go" (Capacitor + React + Vite), installed on user's Realme RMX3360: worldwide dish guide, 1,098 dishes in 21 countries (India 329 across 36 states + top 20 tourist countries by region), 885 with Wikipedia photos + credits. Country -> region pickers, auto-pick current country, local currency, filters remembered, Clear filters, dish page with scroll effects + "Find near me" (Google Maps), photo memories + World Memory Map, Supabase backup.
- Look: inspo-based light UI, blurred wallpaper bg, logo app icon, HTML launch intro, first-launch welcome, food-icon ticker (tap = 3D spin), view-transition tabs.
- Code: https://github.com/AnubhavBayard/off-we-go (main).

**Next session, in order**
1. Data verification pass for the 20 new countries: ONE agent at a time (parallel runs got Wikipedia 429s), check each dish's description/diet/allergens/GI vs its Wikipedia article; fix mismatches. Priority: USA, Mexico, France, Spain, China, Singapore, Malaysia, Indonesia.
2. Review list: UAE only 13 dishes; thin regions (Johor, Maluku & Papua, Alentejo, Algarve); unverified local-script names; India pronunciations are agent guesses; odd photos (Tirupati Laddu = postage stamp, Gongura = raw leaves).
3. More countries (user wants whole world): same spec `world_spec.md` (saved at app/data-archive/world_spec.md), batches of a few countries, sequential.
4. Before public release: replace third-party wallpaper (wallpaperswide watermark) and logo (downloaded image); privacy policy; restaurant coordinates CSV (`data-fixes/`) still waiting on user.
5. Revoke Supabase personal access token `claude-setup` if not done.

**Tools/scripts**: `app/scripts/check_dishes.py` (validate), `fetch_dish_images.py` (photos), `make_icons.py` (icons). Research spec saved at `app/data-archive/world_spec.md`.

**Rebuild + install**
`cd app && nvm use 22 && npm run build && npx cap sync android && cd android && ANDROID_HOME=~/Android/Sdk ./gradlew assembleDebug && ~/Android/Sdk/platform-tools/adb install -r app/build/outputs/apk/debug/app-debug.apk`

## 2026-10-30: data verification pass (sequential, one agent at a time)
- USA: verification agent running (checks each dish vs Wikipedia: description, diet, vegan, allergens, GI, links). Next in queue: Mexico, France, Spain, China, Singapore, Malaysia, Indonesia.
- USA done: 49 checked, 20 fixed (mostly unsourced description details; Cincinnati chili "cocoa" myth removed, chile con queso no tomatoes, chili "state dish" claim removed, hot chicken egg allergen removed). All gi_tag false. Fish taco San Diego region dropped (unsourced). Flags: sourdough filed as snack (weak pick), cheesecake links generic article. Validator OK. Not committed.
- Mexico: verification agent running.
- Mexico done: 45 checked, 38 fixed (unsourced superlatives/ingredients, many unsourced city regions dropped, garnachas link was a disambiguation page, mole negro +peanuts, marquesita -nuts, chapulines +shellfish cross-reactivity). GI confirmed: tequila 1974, mezcal 1994, bacanora 2000. Weak picks: vuelve a la vida (Venezuelan origin), garnachas (Guatemalan), caesar salad. Validator OK. Not committed.
- France: verification agent running.
- France done: 42 checked, 29 fixed (calisson/gougère/kougelhopf veg -> egg, oeufs en meurette + galette complète -> nonveg, bretzel not vegan (butter), praline tart -egg, fondue cheeses, socca link was football article -> Farinata, praline link was disambiguation -> fr Tarte aux pralines). Croissant diet -> egg (matches its egg allergen). Removed socca photo (showed a football match). Weak region fits: tarte tatin (Centre-Val de Loire, filed Brittany & Normandy), moules marinières, boeuf bourguignon; raclette/fondue Swiss origin. Foie gras gi_tag left false (only SW foie gras has PGI). Validator OK. Not committed.
- TODO after all verification: re-run scripts/fetch_dish_images.py for changed links (socca, garnachas, zacahuil, praline tart = fr link, script is en-only), then rebuild + install + commit.
- Spain: verification agent running.
- Spain done: 42 checked, 26 fixed (huevos rotos -> nonveg (ham/chorizo), cachopo link was a Portuguese parish -> es Cachopo, unsourced details removed, local names corrected for calçots/pil-pil/cider, regions to sourced towns). GI true now: Calçot de Valls PGI, Lechazo de Castilla y León IGP (product-level GIs; revert if GI must be the prepared dish). Jamón ibérico stays false (only named DOPs). Removed wrong photos: rabo de toro (raw oxtail), Asturian cider (US hard cider). Validator OK. Not committed.
- Photo refetch TODO now also: cachopo, rabo de toro, Asturian cider; several dishes link to es/fr Wikipedia, fetch_dish_images.py is en-only (needs language from URL).
- China: verification agent running.
- China done: 47 checked, 21 fixed. Diet: egg tart -> nonveg (lard pastry); Changsha stinky tofu, hot dry noodles, erkuai -> veg (sourced ingredients meatless; vegan false). Many allergens added (soy/gluten from soy sauce, sesame, peanuts in Wuhan sesame sauce; crossing-bridge noodles egg/fish/soy). Lanzhou beef noodles GI true (2010). Polo -> Pilaf article, samsa -> Samsa (food) (new links, need photos). Maotai GI left false (unsourced). Validator OK. Not committed.
- Singapore: verification agent running.
- Singapore done: 31 checked, 16 fixed (carrot cake egg -> nonveg (fish sauce/shrimp), allergens added: gluten from dark soy, shrimp paste -> shellfish, peanuts mee rebus, dairy fish soup bee hoon, candlenuts -> nuts on sambal stingray; local names added/corrected: 炒福建面, 薄饼, 肉脞面, 鱼片米粉). No link changes. Caveats: 2 source_urls (Michelin chwee kueh, greedygirlgourmet mee siam) added from search results, not fetched; kueh lapis entry = steamed vegan kue lapis but Singapore source means baked egg cake; Singapore sling vegan unconfirmed (Bénédictine honey?). Validator OK. Not committed.
- Malaysia: verification agent running.
- Malaysia done: 42 checked, 32 fixed (many unsourced descriptions rewritten; ngiu chap Hainanese not Hakka; laksam no shrimp paste -> shellfish removed; devil's curry + nuts, umai + peanuts, nasi dagang + egg; ~12 unsourced city regions dropped). Bad links: laksam (Bangladesh city) -> null, akok (Gabon town) -> Akok (food), umai (Dayak concept) -> null; their photos removed. Johor only 3 dishes (candidates: asam pedas, mee bandung, Muar satay, Kluang toasted buns). All GI false. Validator OK. Not committed.
- Indonesia: verification agent running (last of priority 8).
- Indonesia done: 46 checked, 32 fixed. Bad links: ketoprak (theatre genre) -> Ketoprak (dish), lawar (town in India) -> Lawar (food), lumpia semarang -> own article. Seblak egg -> nonveg (+shellfish); candlenut -> nuts on gudeg/rawon/ayam betutu/plecing; many descriptions rewritten. Maluku & Papua only 3 dishes (sourced fill candidates: sago pancake, ulat sagu, sayur ganemo, deer dendeng, wild boar). All GI false. Validator OK.
- fetch_dish_images.py now uses each link's wiki language (en/fr/es/id) instead of en only. Re-ran: 891 of 907 linked dishes have photos; 12 new correct photos (socca, praline tart, cachopo, rabo de toro, Asturian cider, garnachas, akok, ketoprak, lawar, lumpia semarang, polo, samsa); no existing photo changed.
- Installed on phone 2026-10-31 after reconnect. Pushed.
- Open user decisions: drop/swap USA sourdough (cioppino?); Mexico weak picks (vuelve a la vida, garnachas, caesar salad); GI for product-level PGIs (calçots, lechazo); fill Johor (3 dishes) and Maluku & Papua (3); Singapore kueh lapis entry vs baked kind, Singapore sling vegan?
- Next: verify remaining 12 countries (Italy, Turkey, UK, Germany, Greece, Thailand, Japan, Vietnam, Portugal, Netherlands, South Korea, UAE) the same way, one at a time.
- Pushed 01eef8f to GitHub. Started remaining 12 countries: Italy verification agent running.
- Italy done: 50 checked, 45 fixed (mostly unsourced description details). Seadas veg -> nonveg (lard). Mirto GI true -> false (no EU GI) and not vegan (honey). Arancini/cannoli -egg allergen; cantucci +dairy; ricciarelli +gluten; orecchiette +dairy. Lard nonveg calls confirmed (sfogliatella, pizza fritta, gnocco fritto, pasticciotto, piadina, supplì). Links added: focaccia barese, porceddu (it wiki). GI true: pizza napoletana TSG, amatriciana TSG, piadina romagnola, cantuccini, panforte, ricciarelli, culurgionis. Validator OK.
- Shared verification brief for remaining countries: scratchpad verify_brief.md. Turkey: agent running.
- Turkey done: 42 checked, 30 fixed (unsourced claims, local names to sourced forms, şalgam +gluten (bulgur), hamsi tava +gluten, hamsili pilav +nuts, menengiç +dairy). 7 new links (tr wiki: Urfa kebap, testi kebabı, hamsi tava, hamsili pilav, Van otlu peyniri, murtuğa; en: Alinazik). GI true now 14: EU (mesir macunu, Antakya künefe, Antep baklava, menengiç, Kayseri pastırma) + Turkish Patent Office (boyoz, Adana kebap, tantuni, katmer, ali nazik, testi kebabı, Laz böreği, cağ kebabı, otlu peynir). Thin: Aegean 5, Eastern Anatolia 4. Validator OK.
- UK: agent running.
- UK done: 43 checked, 33 fixed (unsourced claims; balti -dairy; local names: Welsh rarebit "Caws pobi" removed (different dish), picau ar y maen, Selsig Morgannwg; regions to sourced places). Yorkshire pudding stays nonveg (source: dripping/lard/rendered fat). GI true 9 (gov.uk register): Cornish pasty, Melton Mowbray pork pie, Cumberland sausage, Arbroath smokie, Stornoway black pudding, Welsh laverbread PDO, Scotch whisky, Irish whiskey. Melton link set to Pork_pie (agent used #anchor; photo script can't take anchors). Thin: Northern Ireland (candidate: dulse). Validator OK.
- Germany: agent running.
- Germany done: 41 checked, 21 fixed. Berliner egg -> nonveg (lard-fried); Leipziger Allerlei veg -> nonveg (crayfish, veal stock; +shellfish/dairy/egg/gluten); Königsberger Klopse +fish (anchovy); obatzda/grünkohl +gluten; green sauce +mustard. Thüringer Klöße link added (de wiki). GI true 12 (Breze, Obatzda, Nürnberger Rostbratwurst + Lebkuchen, Maultaschen, Spätzle, Lübecker Marzipan, Kölsch, Printen, Grüne Soße, Thüringer Rostbratwurst, Dresdner Stollen). Weak fits: Saumagen under Rhineland & Westphalia, Königsberger Klopse in Berlin. Validator OK.
- Greece: agent running.
- Greece done: 38 checked, 35 fixed. "Ioannina baklava" unsourced -> generic Baklava (id kept); kalitsounia veg -> egg; staka +gluten; sykomaida +nuts; loukoumades -sesame; many unsourced Greek local names -> null. Links: staka (disambiguation) -> el wiki, kumquat liqueur (fruit article) -> null + photo removed; sofrito/sykomaida/melekouni -> el wiki. GI true: tsipouro, Santorini fava, melekouni, ouzo, tsikoudia. Weak: kumquat liqueur, koulouri = simit. Thin: Peloponnese, Thessaly/Epirus. Validator OK.
- Thailand: agent running.
- Thailand done: 25 checked, 23 fixed (unsourced claims; Lao origins noted for som tam/larb/sai ua/nam phrik num; allergens added: gluten from soy sauce, shellfish from shrimp paste, kaeng hang le full list). Links added: kaeng hang le, khua kling (en), kaeng khanun, khao yam (th wiki). Thai local names all match sources. No GIs. Weak: sticky rice (staple), kaeng lueang -> Kaeng som article. Validator OK.
- Japan: agent running.
- Japan done: 49 checked, 23 fixed (unsourced superlatives; sake Fushimi error fixed; tempura "missionaries"; allergens: gluten from soy/ponzu on several, hōtō +fish (niboshi), reimen +soy). Local names corrected: イカそうめん, 鰹のタタキ. 11 links: kitsune udon general Udon -> ja dedicated; 10 new (mostly ja wiki). GI true: sake (日本酒 GI), awamori (Ryukyu GI 1995). Regions balanced. Validator OK.
- Vietnam: agent running.
- Vietnam done: 23 checked, 18 fixed (unsourced superlatives; mì Quảng turmeric in broth not noodles; hủ tiếu Teochew origin; bún riêu +soy/egg; cao lầu & hủ tiếu +gluten; bánh pía lard confirmed). No link changes, no GIs, local names all match. Thin overall (23 dishes); candidate: bánh khọt. Validator OK.
- Portugal: agent running.
- Portugal done: 39 checked, 30 fixed (unsourced superlatives; bolo de mel molasses not cane honey; pastel de Tentúgal +dairy). 6 new links (pt wiki). GI true: port, Madeira, ovos moles, Tentúgal, pão-de-ló de Ovar, Serra da Estrela, São Jorge, vinho verde (DOC; kept true, it is also an EU wine PDO). Pão-de-ló de Ovar maybe North not Central. Alentejo 4, Algarve 4 (candidates: sopa de cação, gaspacho alentejano; doce fino, xerém). Validator OK.
- Netherlands: agent running.
- Netherlands done: 26 checked, 17 fixed (unsourced claims; poffertjes wheat+buckwheat; Brabant roll "minced meat" not pork). Stamppot stays nonveg (sources: spekjes in mash, served with rookworst). 3 new links (nl wiki: Groninger koek, eierbal, Brabants worstenbroodje). GI true: jenever, Hollandse nieuwe (TSG), Limburgse vlaai (PGI 2024). Thinnest: Brabant & Limburg 5. Validator OK.
- South Korea: agent running.
- South Korea done: 36 checked, 23 fixed. Chodang sundubu veg -> nonveg (anchovy/meat broth), local name -> null; gejang origin claim was wrong; Andong jjimdak spice 2; gluten added where soy sauce/gochujang; hotteok +dairy/nuts; kongnamul gukbap fish -> shellfish (salted shrimp). 5 links (ko wiki): chodang sundubu, ojingeo sundae (were generic), kongnamul gukbap, Andong mackerel, jeonbok juk (new). No GIs. Gangwon candidates: mulhoe, jang-kalguksu. Validator OK.
- UAE: agent running (last).
- UAE done: 13 checked, 7 fixed (unsourced superlatives on machboos/luqaimat/shawarma/karak; Dubai chocolate Fix 2021/2022; jasheed = shark; Arabic names added for luqaimat, gahwa, karak). No GIs. Regions: Abu Dhabi 9, Dubai 3, Northern Emirates 1. Sourced add candidates: khabeesa, bethitha, khanfaroosh, khameer, khubz mohalla, margoog, qurs mafrook, Khalas dates (+ weaker: maqluba, mandi).
- ALL 20 COUNTRIES VERIFIED. Photos refetched: 925 of 944 linked dishes (+37 new photos for newly linked dishes). Script now skips .svg lead images (Queijada de Sintra was getting the Portuguese flag). Built + installed on phone. Committed.
- Open user decisions: USA sourdough; Mexico weak picks; product-level GIs (calçots, lechazo); thin regions to fill (Johor, Maluku & Papua, UAE Dubai/Northern, Alentejo, Algarve, Greek Peloponnese/Thessaly/Epirus, NI, Brabant & Limburg, Gangwon); Singapore kueh lapis + sling vegan.

## 2026-10-30: thin regions + swaps
- Pushed ea0b46c. User OK'd defaults: USA sourdough -> cioppino; Mexico swap vuelve a la vida + garnachas (keep caesar salad, Tijuana); keep calçots/lechazo GI; keep steamed kueh lapis; Singapore sling vegan -> false (done).
- Add brief: scratchpad add_brief.md. Order: USA, Mexico, UAE, Malaysia, Indonesia, Portugal, Greece, UK, Netherlands, South Korea, Turkey, Vietnam. One agent at a time.
- USA: agent running.
- USA: cioppino already in file (my miss); sourdough simply dropped (California 6 -> 5). Brief now tells agents to check for duplicates.
- Mexico: vuelve a la vida -> picadas (veg; "sometimes lard" noted in description), garnachas -> torito (cane spirit + milk + peanut). Both es wiki. Option later: Café de Veracruz (DO 2000).
- UAE fill: agent running.
- UAE: +6 (Dubai: khameer, khanfaroosh; Northern Emirates: khabeesa, bethitha, khubz mohalla, qurs mafrook). Regions now 9/5/5. Region placement is ours (sources name no emirate). Margoog skipped (Saudi/Najd). Validator OK.
- Malaysia Johor: agent running.
- Malaysia: Johor +2 (asam pedas, mee bandung Muar) -> 5. Muar satay/Kluang buns skipped (no article). Validator OK.
- Indonesia Maluku & Papua: agent running.
- Indonesia: Maluku & Papua +3 (kohu-kohu (+shellfish, shrimp paste), ikan asar, sate ulat sagu) -> 6. Validator OK.
- Portugal Alentejo/Algarve: agent running.
- Portugal: Alentejo +2 (sopa de cação, Queijo Serpa PDO), Algarve +2 (xerém, doce fino) -> 6 each. Validator OK.
- Recount: regions with <5 dishes now only China (Hunan & Hubei 4, Yunnan & Guizhou 4), Malaysia Sabah 4, Turkey Eastern Anatolia 4, USA Hawaii 4. Greece/UK/NL/Korea/Vietnam regions all >=5, so skipped. Queue: Turkey (running), Hawaii, Sabah, China.
- Turkey: Eastern Anatolia +2 (Van keledoşu GI, Erzurum kadayıf dolması GI 2012) -> 6. Validator OK.
- USA Hawaii: agent running.
- USA: Hawaii +2 (kalua pig, haupia (vegan)) -> 6. Validator OK.
- Malaysia Sabah: agent running.
- Malaysia: Sabah +2 (pinaasakan sada, sinalau bakas) -> 6. Validator OK.
- China Hunan & Hubei + Yunnan & Guizhou: agent running (last fill).
- China: Hunan & Hubei +2 (doupi, Dong'an chicken), Yunnan & Guizhou +2 (qiguoji, rubing) -> 6 each. Validator OK.
- Fill pass done: no region anywhere has fewer than 5 dishes. Total 1,122 dishes. Photos refetched: 941 of 963 linked dishes (+18 new). Built + installed on phone. Committed (not pushed).
- Still open: product-level GIs (calçots, lechazo) kept true; kueh lapis kept steamed; optional Café de Veracruz (DO). Next big items: more countries (world_spec.md), release prep (wallpaper, logo, privacy policy, restaurant CSV, revoke Supabase token).

## 2026-10-30: WRAP-UP (session end)
**Done this session**
- All 20 world countries verified dish-by-dish against Wikipedia (one agent at a time, no rate-limit loss): descriptions de-superlatived and sourced, diet/vegan/allergens corrected, GI tags confirmed or cleared, wrong links fixed (towns, theatre genre, football article, disambiguation pages), unsourced local names/cities removed.
- Thin regions filled: every region now has >= 5 dishes. Weak picks swapped (sourdough dropped; vuelve a la vida -> picadas, garnachas -> torito).
- fetch_dish_images.py: follows each link's wiki language; skips .svg lead images. 941 of 963 linked dishes have photos.
- Totals: 1,122 dishes, 21 countries. Installed on phone. Commits 01eef8f, ea0b46c (pushed), 2434466 + this wrap-up (NOT pushed yet).

**Next session, in order**
1. `git push` (last commits local only).
2. More countries (user wants whole world): spec `app/data-archive/world_spec.md`; research a few countries per batch, sequentially, then run the same verification pass (brief template was in scratchpad; recreate from this log: check each dish vs its Wikipedia article, fix diet/allergens/GI/links, validator OK).
3. Optional data items: Café de Veracruz (DO 2000) for Mexico; calçots/lechazo GI = product-level (kept true); India pronunciations are agent guesses; Tirupati Laddu/Gongura odd photos.
4. Before public release: replace wallpaper (wallpaperswide watermark) and logo (downloaded image); privacy policy; restaurant coordinates CSV (`data-fixes/`) waiting on user; revoke Supabase token `claude-setup`.

**Rebuild + install**
`cd app && nvm use 22 && npm run build && npx cap sync android && cd android && ANDROID_HOME=~/Android/Sdk ./gradlew assembleDebug && ~/Android/Sdk/platform-tools/adb install -r app/build/outputs/apk/debug/app-debug.apk`

## 2026-10-30: more countries, batch 1
- Pushed 838d190.
- Batch 1 (my pick, next big tourist countries): Austria, Canada, Croatia, Morocco. Added to world_spec.md country/currency list (CAD, MAD) and COUNTRY_CODE in src/data.ts.
- Method change: research agents must source every fact (no memory fill), so no separate verification pass needed; I spot-check each.
- Austria: research agent running.
- Austria done: 42 dishes, 7 regions (5-7 each), all from fetched en/de wiki. GI true 6: Kürbiskernöl PGI, Wachauer Marille PDO, Tiroler Speck PGI, Gailtaler Speck, Vorarlberger Bergkäse PDO, Schilcher (national wine-law protection). Spot-check diet/allergens/links OK. Validator OK.
- Canada: research agent running.
- Canada done: 40 dishes, 6 regions (Québec 8, Ontario 5, Atlantic 8, Prairies 7, BC 6, North & Indigenous 6). GI true: Québec ice cider (IGP 2014), Canadian whisky (GI agreements), icewine (VQA appellation; judgement call). Some links to species/plant articles (spot prawn, soapberry). Spot-check OK. Validator OK.
- Croatia: research agent running.
- Croatia done: 32 dishes, 5 regions (Dalmatia 8, Istria & Kvarner 7, Zagreb & North 7, Lika & Karlovac 5, Slavonia & Baranja 5). GI true 16 (hr wiki list of EU-protected names + per-article confirmation): 3 pršuts, Paški sir, soparnik, Ston oysters, Lika lamb/potato/škripavac, Ogulin sauerkraut, kvargl, štrukli, meso 'z tiblice, kulen etc. Fritule + Rapska torta set to egg (sources silent; cautious, same "extra allergen is safer" rule as before). Validator OK.
- Morocco: research agent running (last of batch 1).
- Morocco done: 32 dishes, 5 regions (Marrakesh 6, Fes & Meknes 7, Casablanca & Rabat 8, Tangier & North 6, Souss/Atlas/Sahara 5). GI true: Majhoul dates of Tafilalet IGP, Chefchaouen goat cheese IGP. Safety allergens added without source (smen dairy, egg in jowhara/harira, snails as shellfish). Bocadillo link removed (pointed to Spanish article, photo was a Madrid chorizo sandwich). Validator OK.
- Photo script now only uses Wikimedia Commons files (2 hr-wiki local uploads had no licence data). 1,058 of 1,096 linked dishes have photos (+117 new).
- BATCH 1 DONE: 25 countries, 1,268 dishes. Installed on phone 2026-10-31 (after reconnect). Pushed.
- Next batch candidates: Poland, Hungary, Czechia, Egypt, Australia, Brazil, Peru, Argentina, Philippines, Sri Lanka, Nepal... same method (one research agent at a time, every fact sourced, spot-check, register country in world_spec.md + COUNTRY_CODE).
- 2026-10-31: added root README.md (project description, features, tech, layout, build, data workflow). Removed Vite template app/README.md. Committed (not pushed).

## 2026-10-31: batch 2 + picker restyle
- Batch 2: Poland, Hungary, Czechia, Egypt (registered in world_spec.md + COUNTRY_CODE; PLN, HUF, CZK, EGP). Poland research agent running.
- User: country/region pickers look like system default; restyle to match app.
- Poland done: 37 dishes, 6 regions (5-7). GI true 9 (obwarzanek, oscypek, bryndza, kiełbasa lisiecka, kabanosy TSG, rogal świętomarciński, andruty kaliskie, kołocz, krupnioki). Wuzetka + Grodziskie nonveg (gelatin, isinglass). Validator OK.
- Hungary: research agent running.
- Pickers restyled (Discover.tsx + index.css): native <select>s replaced by two pill buttons side by side (lime circle with flag emoji / pin, small uppercase label, value, chevron). Tap opens a bottom sheet (grip, title, close, search for countries; rows with flag/pin, name, dish count; current pick lime-soft with check). Slide-up/fade animation, off with reduced motion. Flags from ISO code in COUNTRY_CODE. Tested headless (Chrome CDP script scratchpad picker.mjs): country sheet, pick Japan, region sheet, pick Hokkaido; no errors. Installed on phone (photos not refetched yet for Poland).
- Hungary done: 27 dishes, 4 regions (Budapest 8, Great Plain 7, Balaton & Transdanubia 6, Northern Hungary & Tokaj 6; I shortened two long region names for the picker). GI true: Szegedi téliszalámi PDO, Gyulai + Csabai kolbász PGI, Kecskeméti + Szatmári pálinka PDO, Tokaji aszú PDO. Lángos nonveg (lard-fried classic). Validator OK.
- Czechia: research agent running.
- Look change (user): blurred wallpaper replaced by solid light lime background (--bg #e9f5c8); public/wallpaper-blur.jpg deleted (also clears the wallpaper licence item). Selected states now deep green (--deep #1e5631) instead of black: category/veg chips, Add-memory option pills, picker sheet selected icon, selected map city pin. "Clear filters" stays black (action, not a selection). Tested headless; installed on phone.
- Background lightened (user): --bg #e9f5c8 -> #f6fbe8. Installed.
- Czechia done: 30 dishes, 4 regions (Prague 8, Bohemia 8, South Bohemia 6, Moravia 8). GI true 10-11 (Prague ham TSG, Karlovarské oplatky, Pardubický perník, Hořické trubičky, Lomnické suchary, Třeboňský kapr, Budvar, Olomoucké tvarůžky, Valašský frgál, Štramberské uši). Trdelník GI false (Slovak PGI; description notes it's a recent Prague tourist item). Links checked, no towns. Validator OK.
- Egypt: research agent running (last of batch 2).
- UI (user): background lighter again (#fafdf1). Add-memory header now uses the same FoodTicker as home (cycling icons, tap = 3D spin); old plain avatar had no background so the icon was invisible. Memories: stats box deep green; backup line replaced by a pill card (lime cloud-off icon "Not backed up yet / Sign in to keep your photos safe", or deep-green cloud-check "Backed up / email") linking to Account. Tested headless (hash routes); installed.
- Android back button (user): main.tsx BackButton listens to @capacitor/app backButton. On Map/Add/Memories tab -> replace to Home tab; on Home -> exitApp; dish/account pages -> normal history back. Not testable headless; installed for on-phone check. Open bottom sheets are not closed by back yet (back acts on the page under them).
- Shadows (user): stronger shared --shadow (two-layer) now on inputs/search/selects/textarea, chips and buttons, stats box, photo box, plus existing cards/pills. Chip row got bottom padding so shadows aren't clipped. Tested headless; installed.
- Egypt done: 25 dishes, 4 regions (Cairo 8, Alexandria & the Coast 6, Nile Delta 5, Upper Egypt 6; Sinai dropped, no sourced dishes). No GIs. Validator OK.
- BATCH 2 DONE: 29 countries, 1,387 dishes. Photos refetched: +101 (Poland, Hungary, Czechia, Egypt). Kalisz andruts link set to null (its article's lead image is a photo of Kalisz town).
- Launch intro (user): logo is orange, app is green, so the intro now changes theme: starts cream/orange (matches native splash), red ripple, name rises; at 1.25 s a bright lime wave grows out of the logo, the pale app background follows at 1.6 s, logo gains a lime ring, tagline turns deep green; zoom-out moved 1.9 s -> 2.5 s. Fixed my earlier duplicate @keyframes fade-in (picker overlay renamed overlay-in) that had changed the intro tagline animation. Frames checked headless.
- Installed on phone 2026-10-31 after reconnect. Pushed.
- New logo (user): `inspo/Asian Food.jpeg` (green bowl, chopsticks, dumplings on white) replaces the orange noodle-bowl logo. make_icons.py now crops it (250,158,486,394) on white: launcher icons (adaptive bg #FFFFFF), public/logo.jpg (art at 70% so round frames don't clip), favicon. Native splash + theme-color now #FAFDF1 (app bg; color renamed splash_bg). Intro no longer needs the orange->green wave: pale lime bg throughout, lime ripple, lime ring on logo, deep green tagline; zoom-out back to 1.9 s. Frames checked headless; installed.
- Licence: new logo also looks like a downloaded image (736px, Pinterest-size). Still replace with an owned/licensed logo before public release.

## 2026-10-31: WRAP-UP (session end)
**Working now**
- 1,387 dishes in 29 countries (India 329 + 28 world countries), every region >= 5 dishes; 1,158 photos (Wikimedia Commons only). All world data either verified against fetched sources or researched source-only.
- UI: solid very light lime background (#fafdf1), deep green (#1e5631) for selected states, shadows on all boxes; country/region pickers are pill buttons opening bottom sheets (flags, counts, search); food ticker on Home and Add; backup card + deep green stats on Memories; Android back = other tab -> Home, Home -> exit.
- Logo: green bowl (`inspo/Asian Food.jpeg`) for icon/splash/intro; intro all green.
- README on GitHub describes the project. Everything pushed; latest build installed on phone.

**Next session, in order**
1. More countries: next candidates Australia, Brazil, Peru, Argentina, Philippines, Sri Lanka, Nepal, Ireland, Switzerland... Method: register in world_spec.md + COUNTRY_CODE (src/data.ts), one research agent at a time, every fact sourced, spot-check diet/allergens/links, validate, fetch photos, check new photos for wrong subjects (towns, species, flags).
2. Optional polish: Android back should close open bottom sheets first.
3. Before public release: owned/licensed logo (current one looks downloaded); privacy policy; restaurant coordinates CSV (`data-fixes/`) waiting on user; revoke Supabase token `claude-setup`.

**Rebuild + install**
`cd app && nvm use 22 && npm run build && npx cap sync android && cd android && ANDROID_HOME=~/Android/Sdk ./gradlew assembleDebug && ~/Android/Sdk/platform-tools/adb install -r app/build/outputs/apk/debug/app-debug.apk`
Headless UI check scripts (this session's scratchpad, recreate if gone): CDP via google-chrome --remote-debugging-port, pick the tab with type 'page', app uses HashRouter (#/memories).
- Add page pickers (user, after wrap-up): "Where" and "What did you eat" native selects replaced by the same pill buttons + bottom sheets as Home. PickerSheet moved from Discover.tsx to ui.tsx (shared; option `meta` shows count, city or country). Place sheet: "Somewhere else (use my location)" + nearby restaurants with city; dish sheet: "No dish" + all dishes with category icon and country/state, searchable. Tested headless (search "sushi" -> Edomae Sushi); installed on phone; pushed.

## 2026-11-10: batch 3
- Batch 3: Australia, Brazil, Peru, Argentina (registered in world_spec.md + COUNTRY_CODE; AUD, BRL, PEN, ARS). Spec scratchpad path updated to this session. Same method: one research agent at a time, every fact sourced, spot-check, validate.
- Australia: research agent running.
- Tab bar bug (user): tapping Map while Home was still flinging only stopped the scroll; needed a second tap. Android WebView drops the click for a tap that stops a fling. Tabs (main.tsx) now navigate on pointerdown; click kept for keyboard, deduped by a target-route ref. Built OK; installed on phone 2026-11-10 (build from before Australia data).
- Australia done: 44 dishes, 7 regions (NSW 6, Victoria 6, Queensland 6, South Australia 7, Western Australia 6, Tasmania 6, Nationwide & bush food 7). No GIs. Spot-check diet/allergens OK. Species links for seafood/nuts (rock lobster, marron, dhufish, abalone, bunya); photos will show the animal/plant. Scallop pie price nulled (was one café's price). Mango pancake allergens guessed (egg, dairy, gluten). Flat white/pavlova origins noted as disputed with NZ. Validator OK.
- Brazil: research agent running.
- Brazil done: 45 dishes, 7 regions (Bahia 6, Minas Gerais 7, São Paulo 6, Rio 6, Amazon/Pará 5, Northeast 7, South 8). GI true 5 (INPI sheets): Canastra cheese, Serro cheese, Cajuína (Piauí IP), Pelotas sweets, Paraty cachaça (DO 2024). No prices in sources. Broad links: doce de leite -> Dulce de leche, Paraty cachaça -> Cachaça, chimarrão -> Mate. Spot-check diet/allergens OK. Validator OK.
- Peru: research agent running.
- Peru done: 42 dishes, 6 regions (Lima 8, North Coast 8, Arequipa & South 7, Cusco & Andes 8, Amazon 6, Ica & South Coast 5). GI true: pisco only (DO 1991; registry page not fetched, en wiki + RPP). Sources mostly en/es Wikipedia (peru.travel 404). No prices/pronunciations. Safe-side allergens (picarones gluten, chapo dairy, tejas nuts). Spot-check OK. Validator OK.
- 2026-11-10 phone cleanup (user): read-only scan via adb. 17 GB free of 106. Found 154 duplicate groups (0.31 GB extra), 72 .trashed files (0.54 GB), 7 old WhatsApp msgstore backups (1.3 GB), 4.4 GB of 15 Aug 2025 videos in WhatsApp Documents. User picked option 1: deleted 296 files (157 duplicate copies keeping the copy outside WhatsApp/Sent, 132 .trashed files, 7 old WhatsApp backups; kept msgstore.db.crypt14). Free space 18.0 -> 20.2 GB. 15 Aug videos kept.
- Argentina: research agent running (last of batch 3).
- Phone PDFs (user): WhatsApp Documents had 571 PDFs. User: keep certificates + resumes, delete the rest. Checked names, text and (for scans) page-1 thumbnails. Kept 26 (resumes, board/migration/resident/CBSE certificates, bonafide, mark sheet, learner's licence, Aadhaar). Deleted 545, freed ~0.7 GB (20.1 -> 20.8 GB free). Local pulled copies removed from scratchpad.
- Argentina done: 43 dishes, 6 regions (Buenos Aires 8, Pampas 8, Northwest 8, Cuyo 5, Northeast 7, Patagonia 7). GI true 5 (Chamber of Deputies GI list): Salame de Tandil, Salame de Colonia Caroya, Dulce de membrillo rubio de San Juan, Cordero patagónico, Chivito criollo del norte neuquino. Cuyo thin (chanfaina weakly sourced). Validator OK.
- BATCH 3 DONE: 33 countries. Photos refetched: 1,301 of 1,355 linked dishes.
- Photo check batch 3: 143 new photos. 15 wrong-subject lead images dropped via new NO_PHOTO set in fetch_dish_images.py (Vegemite logo, bunya tree, FruChocs mascot, live fish/crustaceans for whiting, rock lobster, marron, dhufish, abalone, salmon, Moreton Bay bug drawing; asado grill for provoleta; Oaxacan tamal; feijoada photo on abará/tutu; Portuguese feijoada). 1,286 dishes with photos.
- 1,561 dishes, 33 countries. Built + installed on phone 2026-11-10. Not committed yet.
- Next: commit + push batch 3 when user OKs; next batch candidates Philippines, Sri Lanka, Nepal, Ireland, Switzerland.
- Committed + pushed 5efc629 (batch 3, tab fix).

## 2026-11-10: batch 4
- Batch 4: Philippines, Sri Lanka, Nepal, Ireland (registered in world_spec.md + COUNTRY_CODE; PHP, LKR, NPR, EUR).
- Philippines: research agent running.
- User: when batch 4 is done (after photos + check): install on phone, then commit + push, then start batch 5 (Switzerland, Belgium, Lebanon, Sweden).
- Philippines done: 40 dishes, 6 regions (Manila & S. Tagalog 8, Central Luzon 6, Ilocos & N. Luzon 8, Bicol 5, Visayas 8, Mindanao 5). No GIs (IPOPHL GIs are mangoes, salt, piña cloth, t'nalak). Cebu lechon links to Pig roast (check photo). Safe-side allergens on sili ice cream, pancit Molo, buko pie, batchoy, sinigang, dinakdakan. Spot-check OK. Validator OK.
- Sri Lanka: research agent running.
- Sri Lanka done: 29 dishes, 4 regions (Colombo & Western 8, Kandy & Hill Country 7, Jaffna North & East 7, South Coast 7; East merged into North, too few sourced dishes). No GIs (Ceylon tea EU GI applied 2024, grant not confirmed). Kandy placement of island-wide sweets is agent's call. Faluda veg (jelly gelatin unknown). Some entries sourced from travel sites (Wikipedia rate-limited). Spot-check OK. Validator OK.
- Nepal: research agent running.
- Nepal done: 35 dishes, 5 regions (Kathmandu Valley 8, Himalaya & Mustang 8, Middle Hills 7, Terai 7, Eastern Nepal 5). No GIs. 7 dishes without wiki article (some single-source: NTB, Maithil cuisine). Thukpa veg (source: Nepalese version mostly veg). Spot-check OK. Validator OK.
- Ireland: research agent running (last of batch 4).
- Ireland done: 27 dishes, 4 regions (Dublin & East 8, Cork & Munster 8, Galway & West 6, Waterford & South-East 5). GI true 4: Waterford blaa PGI, Sneem black pudding PGI, Connemara Hill Lamb PGI, Irish poitín GI. Irish whiskey/champ/soda farl left in UK file. South-East thin. Validator OK.
- Photos batch 4: 104 new; 5 dropped via NO_PHOTO (Full English photo on Irish breakfast, Stornoway pudding on Sneem, US shrimp chowder, Indonesian risoles on Wexford rissole, empty oyster shells). 1,385 dishes with photos.
- BATCH 4 DONE: 37 countries, 1,692 dishes. Installed on phone 2026-11-10.
- Committed + pushed 4196874.

## 2026-11-10: batch 5
- Batch 5: Switzerland, Belgium, Lebanon, Sweden (registered; CHF, EUR, LBP, SEK). Same plan when done: photos + check, install, commit + push.
- Switzerland: research agent running.
- Switzerland done: 40 dishes, 6 regions (Zurich/Basel/NE 7, Bern & Central 5, Romandy 8, Valais 6, Ticino 8, Graubünden 6). GI true 9 (aop-igp.ch register): St. Galler Bratwurst, Zuger Kirschtorte, Saucisse aux choux vaudoise, Longeole, Tête de Moine, Walliser Roggenbrot, Viande séchée du Valais, Abricotine, Bündnerfleisch. Raclette/fondue not GI (only cheeses). Ticino thinner (4 dishes no wiki article). Validator OK.
- Belgium: research agent running.
- Belgium done: 37 dishes, 5 regions (Brussels 8, West & East Flanders 8, Antwerp/Limburg/Fl. Brabant 6, Liège & N. Wallonia 8, Ardennes & S. Wallonia 7). GI true 8: gueuze + kriek TSG, mattentaart, Liers vlaaike, Herve PDO, Ardennes ham, pâté gaumais, escavèche de Chimay. Fries nonveg (beef fat), cuberdon nonveg (gelatine). Beers link to brewery articles (check photos). Wikipedia only, no prices. Validator OK.
- Lebanon: research agent running.
- Lebanon done: 34 dishes, 5 regions (Beirut 8, Mount Lebanon 7, North 8, Bekaa 5, South 6). No GIs. No prices (LBP inflation). 8 dishes tied to towns only by one-line lists; 7 without wiki article. Skipped shawarma/kunafa/ful/shish taouk (other countries). Shared links (Kibbeh x3, Ka'ak x2) - check photos. Validator OK.
- Sweden: research agent running (last of batch 5).
- Sweden done: 35 dishes, 5 regions (Stockholm & Central 8, Skåne 6, West Coast 6, Småland/Öland/Gotland 8, Norrland & Lapland 7). GI true 9: Falukorv TSG, Upplandskubb, spettkaka, Svensk punsch (spirit GI), Grebbestad oysters, Kullings kalvdans, Gränna polkagris, Kalix löjrom, kaffeost. Hushållsost left out (TSG ended 2023). 3 pronunciations agent-derived from IPA (Jansson, surströmming, suovas). Validator OK.
- Photos batch 5: 140 new; 19 dropped via NO_PHOTO (adverts, plants, packaged muesli, other countries' versions: künefe, dushbara, Tabriz kofta, Egyptian molokheya, jameed, Dutch beans, generic kibbeh/ka'ak/speculaas/polenta/risotto, meatball soup). 1,491 dishes with photos.
- BATCH 5 DONE: 41 countries, 1,838 dishes. Installed on phone 2026-11-11.
- Committed + pushed batch 5. Next batch candidates: Denmark, Norway, Israel, Jordan, Iran, Taiwan, Cambodia, Colombia, Chile, Cuba, South Africa, Ethiopia, Tunisia, Georgia.

## 2026-11-11: batch 6
- Batch 6 (user: keep going): Denmark, Norway, Taiwan, Colombia (registered; DKK, NOK, TWD, COP). Plan when done: photos + check, install, commit + push.
- Denmark: research agent running.
- Denmark done: 28 dishes, 5 regions (Copenhagen 8, Zealand & Bornholm 5, Funen 5, Jutland 5, South Jutland 5). GI true 3 PGI cheeses: Esrom, Havarti, Danablu. Bornholm merged with Zealand (only 3 sourced dishes). Some da-wiki pages thin (bakskuld, solæg, surrib). Limfjord oysters link = species (drop photo). Validator OK.
- Norway: research agent running.
- Norway done: 35 dishes, 5 regions (Oslo & East 8, West 8, Trøndelag 6, North 7, South 6). GI true 12 (beskyttedebetegnelser.no): rakfisk (Valdres), kurv frå Valdres, fenalår, pinnekjøtt, gamalost frå Vik, Hardanger cider, sodd (Festsodd fra Trøndelag), skjenning, badsturøkt kjøtt, tørrfisk fra Lofoten. Tjukkmjølk GI set false by me (protection only covers organic Røros product). 12 dishes no wiki article. South thinnest. Validator OK.
- Taiwan: research agent running.
- Taiwan done: 40 dishes, 6 regions (Taipei 8, Northern Taiwan 8, Taichung & Central 6, Tainan 6, Kaohsiung & South 5, Yilan & East Coast 7). No GIs. Indigenous food thin (millet wine only; bamboo-tube rice etc. unsourced). Stinky tofu nonveg (brine with milk/meat/shrimp). Pronunciations agent-simplified from pinyin/POJ. Validator OK.
- Colombia: research agent running (last of batch 6). First run stopped by an interrupt before writing; restarted, reusing its fetched pages.
- Colombia done: 39 dishes, 5 regions (Bogotá & Andes 8, Antioquia & Coffee 7, Caribbean 8, Pacific & Valle 8, Southwest 8; Llanos dropped, ~3 dishes). GI true 3: bocadillo veleño, achiras del Huila, Café de Colombia (tinto). Viche GI set false by me (only one news article, not registry). Validator OK.
- Photos batch 6: 120 new; 20 dropped via NO_PHOTO (live ant, butterwort plant on tjukkmjølk, painting on aquavit, other countries' versions: Czech wafer, Spanish natillas/buñuelos/lechona/empanadillas, Mexican tamales, Paraguayan mazamorra, Indonesian rice, Chilean chicha, etc.). 1,583 dishes with photos.
- BATCH 6 DONE: 45 countries, 1,980 dishes. Installed on phone 2026-11-11.
- Committed + pushed a69c220.

## 2026-11-11: batch 7
- Batch 7: Israel, Jordan, Chile, New Zealand (registered; ILS, JOD, CLP, NZD). Same plan: research one at a time, photos + check, install, commit + push.
- Israel: research agent running.
- User stopped the session: Israel agent stopped before writing any file. Batch 7 countries stay registered in world_spec.md + COUNTRY_CODE (harmless: picker lists only countries that have dishes).

## 2026-11-11: WRAP-UP (session end)
**Done this session**
- Batches 3-6: 16 countries added (Australia, Brazil, Peru, Argentina, Philippines, Sri Lanka, Nepal, Ireland, Switzerland, Belgium, Lebanon, Sweden, Denmark, Norway, Taiwan, Colombia). Now 1,980 dishes in 45 countries, 1,583 with photos.
- fetch_dish_images.py: NO_PHOTO set (59 ids) for wrong-subject lead images (logos, live animals, plants, other countries' versions). Re-running the script keeps them out.
- Tab bar: navigates on pointerdown, so a tap during a Home scroll fling switches tab on the first tap.
- README counts updated. All installed on phone; all pushed.
- Phone cleanup for user (not app work): deleted 296 duplicate/trashed/old-backup files and 545 WhatsApp PDFs (kept certificates, resumes, IDs); ~2.8 GB freed. App lag traced to phone RAM pressure, not the app.

**Next session, in order**
1. Batch 7: Israel, Jordan, Chile, New Zealand (already registered). Then: Finland, Iceland, Romania, Georgia, Iran, Cambodia, Cuba, South Africa, Ethiopia, Tunisia... (list of ~66 candidates in this session's chat; same method).
2. Per batch: one research agent at a time (brief = world_spec.md + stricter rules: every fact sourced, no superlatives, dish-level wiki link, GI only with registry source, check other countries' files for duplicates), spot-check diet/allergens/GI, validate, fetch photos, review new photo filenames (view thumbnails when unclear), add bad ones to NO_PHOTO, build, install, commit + push.
3. Optional: Android back should close open bottom sheets first.
4. Before public release: owned/licensed logo; privacy policy; restaurant coordinates CSV (`data-fixes/`) waiting on user; revoke Supabase token `claude-setup`.

**Rebuild + install**
`cd app && nvm use 22 && npm run build && npx cap sync android && cd android && ANDROID_HOME=~/Android/Sdk ./gradlew assembleDebug && ~/Android/Sdk/platform-tools/adb install -r app/build/outputs/apk/debug/app-debug.apk`

## 2026-11-11: batch 7 (resumed, new session)
- User: start batch 7. Israel: research agent running.
- User: keep going through whole batch 7 (Israel, Jordan, Chile, NZ), then photos + check, install, commit + push.
- User: after batch 7, start batch 8. Batch 8 registered: Finland, Iceland, Romania, Georgia (EUR, ISK, RON, GEL) in world_spec.md + COUNTRY_CODE.
- User: after batch 8, start batch 9. Batch 9 registered: Iran, Cambodia, Cuba, South Africa (IRR, KHR, CUP, ZAR).
- Israel done: 31 dishes, 5 regions (Tel Aviv & Jaffa 5, Jerusalem 7, Haifa & Galilee 4, Nationwide street food 7, Nationwide home & holiday 8). No GIs, no prices. Negev dropped (no dish sources). Skipped dishes in Lebanon/Egypt files; shawarma/falafel/schnitzel only as Israeli versions. Thin: goose liver, sambusak, Druze pita, kubbeh soup. My safe-side fixes: sufganiyah egg+dairy, mofletta dairy. Validator OK.
- Jordan: research agent running.
- Jordan done: 24 dishes, 5 regions (Amman 8, Salt & Balqa 3, North 5, Karak & South 4, Wadi Rum/Aqaba & Bedouin 4). No GIs (Jordan GI projects are olive oil, Awassi sheep, Majhoul dates). No prices. Salt thin (khabeesa, rashoof single-source). Mujallala sources disagree (used tourism board version). Kept Aqaba sayadieh (source says distinct method/fish). Shared links checked: fattet hummus vs Lebanon fattet batenjen, qahwa sada vs UAE gahwa (different drinks, may share photo). Spot-check OK. Validator OK.
- Chile: research agent running.
- Chile done: 47 dishes, 8 regions (Central Valley 9, Santiago 8, North 6, Chiloé 6, Araucanía & Lakes 6, Valparaíso & Coast 5, Rapa Nui 4, Patagonia 3). GI true 7: INAPI DO chicha de Curacaví, prosciutto de Capitán Pastene, sidra de Punucapa; INAPI IG dulces de Curacaví, dulces de La Ligua, longaniza de Chillán; pisco (DO by law, Decreto 521). Pajarete not GI (INAPI certification mark only). Patagonia + Rapa Nui thin. Lard calls: humitas, sopaipillas, milcao, tortilla de rescoldo nonveg. My fix: pisco sour not vegan, egg allergen (egg white sometimes added). 7 es-wiki links. Validator OK.
- New Zealand: research agent running (last of batch 7).
- New Zealand done: 34 dishes, 6 regions (Auckland & Northland 4, Rotorua & BoP 8, Wellington & Lower NI 7, Canterbury 4, Otago & Southland 8, Marlborough & Nelson 3). GI true 3 (IPONZ wine GIs): Marlborough Sauvignon Blanc, Central Otago Pinot Noir, Waiheke Island wine. Flat white + pavlova as NZ entries, dispute with Australia noted. Species/plant links: Bluff oysters, crayfish, mussels, kūmara, kiwifruit, feijoa (check photos). Several placements loose (nationwide items in Wellington). My fix: lolly cake + chocolate fish nonveg (marshmallow gelatin). Validator OK.
- Batch 7 research done. Photos: running fetch_dish_images.py.
- Photos batch 7: 96 new; 10 dropped via NO_PHOTO (Spanish empanadillas, Ecuadorian cazuela, grape drawing on pajarete, German marble cake on kuchen, Samarkand halva, German schnitzel, Turkish künefe on both Jordan knafeh, live crayfish, oyster museum specimen). 1,669 dishes with photos. Next: build + install, commit + push.
- BATCH 7 DONE: 49 countries, 2,116 dishes, 1,669 with photos. Installed on phone 2026-11-11. README counts updated.
- Committed + pushed e5c5245.

## 2026-11-11: batch 8
- Batch 8: Finland, Iceland, Romania, Georgia. Same plan.
- Finland: research agent running.
- Finland done: 36 dishes, 7 regions (Helsinki & Uusimaa 8, Turku/SW & Åland 4, Tampere & Häme 5, Savo 5, Karelia 5, Ostrobothnia & Kainuu 4, Lapland 5). GI true 7 (Ruokavirasto list; eAmbrosia did not load): kalakukko TSG, sahti TSG, karjalanpiirakka TSG, Kainuun rönttönen PGI, Lapin Poron kuivaliha PDO, Lapin Poron kylmäsavuliha PDO, Savolainen mustikkakukko (2025, EC Finland page). Lörtsy not GI (applied 2024). 11 fi-wiki links. Overlap with Sweden as Finnish versions (leipäjuusto, poronkäristys, laskiaispulla, korvapuusti). My fix: salmiakki nonveg (gelatin in some brands). Validator OK.
- Iceland: research agent running.
- Iceland done: 26 dishes, 5 regions (Reykjavík & Capital 13, South 3, West & Westfjords 4, North 3, East 3). No GIs (Icelandic lamb PDO = meat, not dish). Prices: hot dog 880 ISK (one stand, 2026), Höfn langoustine mains 5,500-8,900. Puffin/whale left out. Thin: Akureyri burger, Mývatn trout, bulsur (single source). 16 null wiki links. Spot-check OK. Validator OK.
- Romania: research agent running.
- User: after batch 9, start batch 10. Batch 10 registered: Ethiopia, Tunisia, Jamaica, Bulgaria (ETB, TND, JMD, EUR — Bulgaria on euro since 1 Jan 2026).
- Romania done: 46 dishes, 7 regions (Bucharest 8, Wallachia 5, Transylvania 7, Moldavia 7, Maramureș & Crișana 6, Banat 6, Dobruja & Delta 7). GI true 17 (eAmbrosia API): PDO Telemea de Ibănești; PGI Magiun Topoloveni, Salam de Sibiu, Novac afumat, Cârnați de Pleșcoi, Scrumbie de Dunăre, Cașcaval de Săveni, Salată cu icre de știucă de Tulcea, Plăcintă dobrogeană, Pită de Pecica, Salinate de Turda, Batog de sturion, Babic de Buzău; spirits Pălincă, Țuică de Argeș, Horincă de Cămârzana; TSG Salată cu icre de crap (EC page only). Prices: plăcintă dobrogeană 15-20, batog 400/kg. Thin: Maramureș (one county PDF), Banat. Sarmale wiki null (redirects to Sarma). Spot-check OK. Validator OK.
- Georgia: research agent running (last of batch 8).
- Georgia done: 53 dishes, 8 regions (Tbilisi & Kartli 7, Kakheti 8, Imereti 8, Samegrelo 7, Adjara & Guria 7, Svaneti & Mountains 8, Racha-Lechkhumi 4, Samtskhe-Javakheti 4). GI true 17 (Sakpatenti register): AO Khvanchkara, Mukuzani, Tsinandali, Kindzmarauli, Tushetian guda, Borjomi; GI chacha, churchkhela, matsoni, tenili, sulguni, Imeretian cheese, dambalkhacho, ajika, tkemali, Svan salt, Rachuli lori. Khachapuri variants no own wiki article. Several dishes on one general source. Spot-check OK. Validator OK.
- Batch 8 research done. Photos: running fetch_dish_images.py.
- User: after batch 10, start batch 11. Batch 11 registered: Ecuador, Uzbekistan, Kenya, Pakistan (USD, UZS, KES, PKR).
- Photos batch 8: 96 new; 4 dropped via NO_PHOTO (German pea soup, empty wooden trough on särä, Armenian matsun, Serbian plum dumplings on gomboți). 1,761 dishes with photos. Building + installing.
- BATCH 8 DONE: 53 countries, 2,277 dishes, 1,761 with photos. Built OK; install FAILED: adb "no devices/emulators found" (phone not connected). Install later. README counts updated.
- Committed + pushed 76b9bf0.

## 2026-11-11: batch 9
- Batch 9: Iran, Cambodia, Cuba, South Africa. Same plan.
- Iran: research agent running.
- Iran done: 44 dishes, 8 regions (Tehran 9, Isfahan & Central 5, Shiraz & Fars 5, Tabriz & Azerbaijan 5, Caspian 6, Yazd & Kerman 6, Mashhad & Khorasan 4, Khuzestan & Gulf 4). No GIs (only ingredient GIs found: saffron, pistachio, raisins, dates). No prices. Thin: shishlik, rivas, nabat, boz ghormeh, sambuseh, shakar polo (one travel blog each). My safe-side fixes: shakar polo nonveg (served with qeimeh), pashmak gluten, tahdig + kateh dairy. Validator OK.
- Cambodia: research agent running.
- Cambodia done: 27 dishes, 5 regions (Phnom Penh 8, Battambang & NW 8, Siem Reap 4, Mekong & East 4, Kampot & Kep 3; coast dropped, no sources). No GIs (Kampot pepper, Kampong Speu palm sugar = ingredients). No prices. Skipped som tam/mango sticky rice/lok lak (other countries). Thin: Battambang (2 travel pages), Mekong, Kampot. My fix: tuk krolok egg + dairy (usually raw egg + condensed milk). Validator OK.
- Cuba: research agent running.
- Cuba done: 24 dishes, 4 regions (Havana & Western 10, Central 4, Eastern 4, Baracoa 6). No GIs ("Cuba" rum DO only in secondary sources; rum not a dish). No prices. Cuban sandwich/bread left out (Wikipedia places origin in Tampa/Key West). Thin: frangollo, calalú (baracoa.org), pru, caldosa (EcuRed). Spot-check OK. Validator OK.
- South Africa: research agent running (last of batch 9).
- South Africa done: 42 dishes, 7 regions (Cape Town & Cape Malay 8, Winelands 6, Durban & KZN 5, Joburg & Gauteng 7, Eastern Cape 4, Karoo & Interior 8, Limpopo & North 4). GI true 2: rooibos (EU PDO 2021, sanews.gov.za), Karoo lamb (SA GI 2023, westerncape.gov.za). Honeybush not tagged (no official page reached). Price: kota R15-120. Thin: denningvleis, magege, smiley, umphokoqo. My fixes: ids south-africa- -> south_africa- (slug convention); koesister, koeksister, malva pudding egg + dairy. Validator OK.
- Batch 9 research done. Photos: running fetch_dish_images.py.
- Photos batch 9: 78 new; 8 dropped via NO_PHOTO (num banh chok on samlor prahal, clay vessel, ropa vieja on moros, Russian tan on doogh, koloocheh on masghati, tinned plant on waterblommetjiebredie, grape plant on Pinotage, amaranth plant on morogo). 1,831 with photos.
- BATCH 9 DONE: 57 countries, 2,414 dishes, 1,831 with photos. Built OK; install pending (phone still not connected). README updated.
- Committed + pushed 75ecb02.

## 2026-11-11: batch 10
- Batch 10: Ethiopia, Tunisia, Jamaica, Bulgaria. Same plan.
- Ethiopia: research agent running.
- Ethiopia done: 34 dishes, 5 regions (Addis 8, Amhara & North 7, Tigray 4, Oromia/Harar & East 7, South 8). No GIs (Harar/Sidamo/Yirgacheffe = trademarks). No prices. Thin: Tigray (sources would not load), anebabero/borde/bulla/amulcho/gomen kitfo/kuti one-line Wikipedia mentions, hanid/wosla one blog. Doro wat/tibs/misir wat no own article. Spot-check OK. Validator OK.
- Tunisia: research agent running.
- Tunisia done: 41 dishes, 6 regions (Tunis & North 11, Cap Bon & Zaghouan 4, Sahel & Kairouan 5, Sfax 6, Djerba & South 9, Northwest 6). No GIs (Tunisian GIs are dates/figs/pomegranate). Price: legmi 2.5/litre (2019). My fix: nulled mkharek/zlabia prices (Ramadan market report, year unknown). Chakchouka/mloukhia written as Tunisian versions. Thin: several single-source (smasem, mjamaa, yehni, mraghed, Nabeul sugar dolls). French wiki links for 10. Validator OK.
- Jamaica: research agent running.
- Jamaica done: 28 dishes, 4 regions (Kingston & St Andrew 10, Portland & Blue Mountains 7, South Coast & Central 6, North Coast 5). GI true 1: Jamaica Rum (2016, WIPO doc + JIS). Jerk GI covers seasoning only (not tagged); Blue Mountain coffee = certification mark (not tagged). No prices. Bammy notes Scott's Cove stalls hit by Hurricane Melissa 2025. Canada file also has a Jamaican patty (Toronto). My fix: Irish moss nonveg + fish (isinglass in some recipes). Validator OK.
- Bulgaria: research agent running (last of batch 10).
- User: after batch 11, start batch 12. Batch 12 registered: Nigeria, Ghana, Uruguay, Slovenia (NGN, GHS, UYU, EUR).
- Bulgaria done: 37 dishes, 6 regions (Sofia & West 9, Plovdiv & Thrace 6, Rhodopes 5, Black Sea 5, Veliko Tarnovo & North 7, Pirin & SW 5). GI true 13 (eAmbrosia API): PDO kiselo mlyako, byalo salamureno sirene, Strandzhanski manov med, Melnik wine; PGI Gornooryahovski sudzhuk; TSG Lukanka Panagyurska, Kayserovan vrat Trakiya, Filet Elena, Sudzhuk Tarnovski, Lukanka Troyanska; spirits Burgaska muskatova rakiya, Troyanska slivova rakiya. No prices (no EUR source). Thin: katak, kostureta, chomlek (one source). bg-wiki links for 7. Spot-check OK. Validator OK.
- Batch 10 research done. Photos: running fetch_dish_images.py.
- Photos batch 10: 67 new; 5 dropped via NO_PHOTO (Lake Tana landscape on tej, raw grain on tella, unclear spread on kocho, jerk chicken photo on jerk pork, Israel shakshuka photo reused on Tunisian chakchouka). 1,893 with photos.
- BATCH 10 DONE: 61 countries, 2,554 dishes, 1,893 with photos. Built OK; install pending (phone not connected). README updated.
- Committed + pushed 50c23b9.

## 2026-11-11: batch 11
- Batch 11: Ecuador, Uzbekistan, Kenya, Pakistan. Same plan.
- Ecuador: research agent running.
- User: wrap up session. Ecuador agent stopped before writing any file. Batches 11 + 12 stay registered (harmless: picker lists only countries with dishes).

## 2026-11-11: WRAP-UP (session end)
**Done this session**
- Batches 7-10: 16 countries added (Israel, Jordan, Chile, New Zealand, Finland, Iceland, Romania, Georgia, Iran, Cambodia, Cuba, South Africa, Ethiopia, Tunisia, Jamaica, Bulgaria). Now 2,554 dishes in 61 countries, 1,893 with photos.
- NO_PHOTO grew by 27 ids (other countries' versions, plants, live animals, landscapes, reused photos).
- My safe-side diet fixes per country logged above (gelatin, lard, egg/dairy in pastries, undated prices nulled). South Africa ids normalised to south_africa-.
- All committed + pushed (last: 50c23b9 + this log).
- Phone NOT updated since batch 7: adb found no device for batches 8-10.

**Next session, in order**
1. Plug in phone (USB debugging) and install current build (command below). It carries batches 8-10.
2. Batch 11: Ecuador, Uzbekistan, Kenya, Pakistan (registered; USD, UZS, KES, PKR). Ecuador brief: SENADI DOs, avoid Peru/Colombia duplicates.
3. Batch 12: Nigeria, Ghana, Uruguay, Slovenia (registered; NGN, GHS, UYU, EUR).
4. Per batch: same method (one agent at a time, spot-check diet/allergens/GI, validate, fetch photos, view unclear thumbnails, NO_PHOTO bad ones, build, install, README counts, commit + push). Tell agents dish ids must start with `<slug>-` (underscore slug).
5. Still open: Android back closes bottom sheets first (optional); before public release: owned logo, privacy policy, restaurant coordinates CSV (waiting on user), revoke Supabase token `claude-setup`.

**Rebuild + install**
`cd app && nvm use 22 && npm run build && npx cap sync android && cd android && ANDROID_HOME=~/Android/Sdk ./gradlew assembleDebug && ~/Android/Sdk/platform-tools/adb install -r app/build/outputs/apk/debug/app-debug.apk`
- 2026-11-11 new session: phone connected, installed current build (batches 8-10). Starting batch 11 (Ecuador first).
- Ecuador: research agent running.
- Ecuador done: 48 dishes, 8 regions (Quito & N Sierra 10, Central Sierra 5, Cuenca & S Sierra 10, Guayaquil & Coast 8, Manabí 5, Esmeraldas 3, Amazon 4, Galápagos 3). GI true 1: miske (SENADI DO, Resolución 001-2022; CAN list of 7 Ecuador DOs, rest ingredients/crafts). Price: encebollado 3.5-3.7 (Sept 2025). Ceviche + seco de chivo written as Ecuadorian versions; cuy, pan de yuca, chicha de jora left out (Peru/Colombia). Thin: Galápagos (one blog), tapao, cocada, Loja (laylita.com). Egg/dairy in empanada de viento + guagua de pan from general knowledge. My fixes: tonga price nulled (undated), helado de paila egg (egg white common). Validator OK.
- Uzbekistan: research agent running.
- Uzbekistan done: 39 dishes, 7 regions (Tashkent 8, Fergana 7, Samarkand & Jizzakh 6, Bukhara 6, Khiva & Khorezm 5, Kashkadarya & Surkhandarya 4, Karakalpakstan 3). GI true 13 (State Register of GIs, Ministry of Justice, via dated ministry/IPA news; register itself not seen): to'y oshi, so'qoq somsa, Samarkand non, nohat shurak, Zomin qozon patir, sofi oshi, Gijduvan shashlik, tukhum barak, devzira oshi, baliq qarma, Chimbay zagara non, jughara gurtik, G'uzor tandir go'shti. Prices: Samarkand plov 30500, Khorezm plov 31900 (Stat Agency, Jan 2025). Lagman/manti/samsa/halva written as Uzbek versions. Thin: jizza, chupan kabob (one source), bakhsh. My fixes: devzira price nulled (all-plov regional average), Jarqo'rg'on tandir GI false (source names no body), Samarkand non dairy. Validator OK.
- Kenya: research agent running.
- Kenya done: 38 dishes, 5 regions (Nairobi 10, Swahili Coast incl. Lamu 12, Central Highlands 4, Western & Lake Victoria 7, Rift Valley 5). No GIs (no GI law yet; draft GI Bill 2026; KIPI marks only for coffee/tea/baskets). Prices: chapati 20-30, mandazi 20, mayai pasua 25 (2022), smocha 60-70 (2023). Chapati/pilau/biryani as Kenyan versions; samosa left out. Thin: Rift Valley 4 dishes on one Wikipedia page, aliya, osuga, smocha, dawa. magicalkenya.com 403. Safe-side: chapati nonveg (lard sometimes), mandazi egg+dairy (no source), matoke nonveg (beef). My fixes: nulled 2018 blog prices (viazi karai, mahamri, mbaazi, mishkaki) + agent's own pronunciations (sukuma wiki, nyama choma, kuku paka). Validator OK.
- Pakistan: research agent running (last of batch 11).
- User: wrap up session. Pakistan agent stopped before writing any file.

## 2026-11-11: WRAP-UP 2 (session end)
**Done this session**
- Installed batches 8-10 build on phone.
- Batch 11 research: Ecuador (48), Uzbekistan (39), Kenya (38) dishes files written + validated. Committed (data only, no photos yet).

**Next session, in order**
1. Pakistan research (last of batch 11; PKR). Avoid India/Afghanistan duplicates; dish ids `pakistan-`.
2. Batch 11 photos: fetch_dish_images.py, view unclear thumbnails, NO_PHOTO bad ones.
3. Build, install, README counts, commit + push.
4. Batch 12: Nigeria, Ghana, Uruguay, Slovenia (registered).
5. Still open: Android back closes sheets first (optional); owned logo, privacy policy, restaurant coordinates CSV (waiting on user), revoke Supabase token `claude-setup`.
- 2026-11-12 new session: Pakistan research agent started; session ended before it wrote a file.
- 2026-11-13: Pakistan research agent restarted.
- Pakistan done: 35 dishes, 5 regions (Lahore & Punjab 8, Karachi & Sindh 8, Peshawar & KP 5, Balochistan 6, Gilgit-Baltistan & Hunza 8). Islamabad and Azad Kashmir dropped (no distinct dishes / duplicates J&K). No GIs (registered food GIs are only basmati, Sindhri + Chaunsa mango, all ingredients; Multani sohan halwa only a candidate; IPO register site refused connections). No prices (no dated 2023+ source). Karachi nihari kept despite delhi-nihari (sourced post-1947 Karachi history). Thin: molida, chilpek (single source), tabaheg, landhi, Balochi dampukht, thadal, pallo machhi, Hunza harisa (blogs). Safe-side calls by agent: dairy in halwa puri, bun kebab, thadal; gluten in nihari; hoilo garma vegan false. Spot-check OK. Validator OK (2,714 total).
- BATCH 11 research done. Next: batch 11 photos, build, install, README counts, push.
- Batch 11 photos: +75 fetched (Ecuador, Uzbekistan, Kenya, Pakistan); 22 bad ones added to NO_PHOTO (other countries' versions: Argentine locro, Hyderabadi biryani, Afghan palo for pilau, Czech millet porridge, Lucknowi biryani, Tibetan butter tea, Armenian harisa, Indian nalli nihari, Kashmiri kahwah, Kayseri mantı, Turkish katmer, Iranian samanu; utensils/objects: karahi wok x2, mursik gourd; plants/animals: guayusa, palm weevil, raw matoke; reused: colada morada for guagua, one plov photo kept only for Tashkent to'y oshi). 1,946 dishes with photos.
- Built + installed on phone. README: 2,714 dishes, 65 countries.
- BATCH 11 DONE. Next: batch 12 (Nigeria, Ghana, Uruguay, Slovenia; registered).

## 2026-11-14: batch 12
- Batch 12: Nigeria, Ghana, Uruguay, Slovenia. Same plan.
- Nigeria: research agent running.
- User: run all of batch 12 without stopping (research, photos, build, install, README, commit + push).
- Nigeria done: 38 dishes, 4 regions (Lagos & Southwest 11, Southeast/Igbo 9, Niger Delta & South-South 8, North/Hausa 10). Middle Belt + Abuja dropped (no sources). No GIs. Prices (NGN): travelwithhello May 2026 (jollof, pounded yam+egusi, pepper soup, akara, puff-puff, suya, nkwobi/isi ewu), somethingcurated Oct 2024 Lagos (abula, ofada, ewa agoyin). Thin: chapman, ekpang nkukwo (2017/2019 listicles), afia efere, ofe Owerri, kilishi, kunu, ukodo; asun/isi ewu/bole from search summaries. Safe-side by agent: soups nonveg + shellfish (crayfish), puff-puff egg. My fix: dan wake egg + egg allergen (egg topping common). Validator OK.
- Ghana: research agent running.
- Ghana done: 25 dishes, 5 regions (Greater Accra 8, Ashanti 6, Volta 4, Northern 4, Central & Western coast 3; short regions kept, no sources). No GIs (kente = cloth; akpeteshie registration unclear). Prices: Ga kenkey 4-5 (Kenkey Index Nov 2023), jollof 80-120 (Newscenta Jul 2025, secondary). Left out Nigerian duplicates (sobolo, bofrot, koose, kyinkyinga, tubaani, palm wine). Thin: agbelikaklo (one 2019 source), abolo, fante fante, kpokpoi. Safe-side by agent: shito dishes fish + shellfish; soup/stew meals nonveg. Spot-check OK. Validator OK.
- Uruguay: research agent running.
- Uruguay done: 28 dishes, 4 regions (Montevideo 13, Colonia & Litoral 3, Punta del Este & Rocha 6, Interior & Gaucho Country 6). No GIs (55 GIs all wine appellations; grappamiel only a Mercosur prior-user exception). Prices: chivito 480-520, miniaturas 950 (montevideo.com.uy Jan 2026). Asado, torta frita, ñoquis as Uruguayan versions; no Argentina duplicates. Thin: several es/en Wikipedia-only, guruguay-only (buñuelos de algas, croquetas de sirí, milanesa de pescado). Safe-side by agent: torta frita nonveg (beef/mutton fat), ñoquis nonveg (tuco). My fix: asado price nulled (blog dated only by exchange rate). Validator OK.
- Slovenia: research agent running (last of batch 12).
- Slovenia done: 36 dishes, 6 regions (Ljubljana & Central 6, Gorenjska 6, Littoral & Karst 6, Soča Valley & Idrija 5, Styria & Prekmurje 8, Lower Carniola & Bela krajina 5). Koroška dropped. GI true 19: PGI Kranjska klobasa, Kraški pršut, Prleška tünka, Zgornjesavinjski želodec; PDO Mohant, Tolminc, Bovški sir; wine PDO Teran, Cviček, Metliška črnina; spirits Brinjevec, Dolenjski sadjevec; TSG Idrijski žlikrofi, Prekmurska gibanica, Belokranjska pogača, Slovenska potica (TSGs via gov.si 2021 list; API filter skips TSGs). No prices. Thin: loški kruhek, tepkovec, sadjevec (slovenia.info only), bograč, frika, dödöli, Izola brodet, Pohorje omelette. Safe-side: lard/crackling dishes nonveg (gibanica lard per TSG spec), unsourced pastries egg. eAmbrosia API now: POST .../eambrosia-public-api/api/gi-applications/filter {"filters":[{"fieldName":"countryId","fieldValue":["si"]}]}. Spot-check OK. Validator OK.
- Batch 12 research done. Photos: running fetch_dish_images.py.
- User: pause. Photo fetch stopped before writing (script writes dish_images.json only at end, so nothing partial). Resume: rerun fetch_dish_images.py, then view thumbnails, NO_PHOTO, build, install, README, commit + push. Batch 12 data (4 files) not committed yet.
- User: resume batch 12. Rerunning fetch_dish_images.py.
- Photo fetch stopped by user before finishing; dish_images.json unchanged. Batch 12 photos still to do.
- Restarted photo fetch; committed batch 12 data first.
- Photos batch 12: +78 fetched; 14 dropped via NO_PHOTO (reused: Ghana jollof = Nigeria photo, Fante kenkey = Ga kenkey, Izola brodet = Croatia brudet, zobo = Egyptian karkadeh tea bag; wrong dish: tuwo with garden egg soup, kelewele = plantain vendors, akple = banku balls, medio y medio = torta frita, ričet = Kärntner Ritschert, Trojane krofi = Croatian Križevci doughnuts, fritaja = generic frittata; non-food: Tannat grape drawing, grappamiel brand label, Cviček location map). 2,010 dishes with photos.
- Building + installing.
- Built + installed on phone. README: 2,841 dishes, 69 countries.
- BATCH 12 DONE: 69 countries, 2,841 dishes, 2,010 with photos. No more batches registered. Next: pick batch 13 countries (register in spec + COUNTRY_CODE in src/data.ts + currency).

## 2026-11-14: batch 13
- User: start batch 13 (no countries named). Picked Laos, Tanzania (incl. Zanzibar), Serbia, Dominican Republic (LAK, TZS, RSD, DOP): big gaps on traveller routes, few duplicates with done countries. Registered in src/data.ts COUNTRY_CODE + world_spec.md.
- Laos: research agent running.
- Laos done: 22 dishes, 3 regions (Vientiane & Centre 9, Luang Prabang & North 6, Savannakhet & Southern 7). Xieng Khouang + Vang Vieng dropped (no sources). GI true 2 (WIPO): Bolaven coffee, Paksong tea; ping kai Xeno = ODOP trademark only. Laap/tam mak hoong/khao soi written with sourced Lao differences from Thai versions. Pronunciation all null (tonal IPA only). Thin: khanom kok, Paksong tea, ping pa, sin dat, mok pa, khao jee pâté. Safe-side by agent: padaek/fish sauce dishes nonveg + fish; kaipen nonveg (served with jeow bong). My fix: Beerlao price nulled (page dated only by title). Validator OK.
- Tanzania: research agent running.
- Tanzania done: 26 dishes, 4 regions (Dar es Salaam & Coast 8, Zanzibar & Pemba 7, Arusha & Kilimanjaro 7, Lake Victoria & NW 4). Southern Highlands dropped. No GIs. Price: Zanzibar pizza 3000-5000 (2026 guide). Kenya overlaps kept only as sourced Tanzanian versions (Bukoba matoke, Dar dagaa); mishkaki/pilau/biryani left out. Thin: kiburu, samaki na viazi vitamu (one source), machalari (sources disagree on beef; nonveg), mkate wa kumimina, Konyagi. My fix: senene + shellfish allergen (insect cross-reactivity, as Mexico chapulines). Validator OK.
- Serbia: research agent running.
- Serbia done: 31 dishes, 5 regions (Belgrade 8, Vojvodina 5, Šumadija & Central 5, Western 5, Southern & Eastern 8). No Kosovo region. GI true 13 (zis.gov.rs unreachable; secondary sources: en/sr Wikipedia GI lists, WIPO Geneva Act page Aug 2026, agronews.rs, euzatebe): Leskovačka pljeskavica (grill meat registered 2007; ćevapi untagged), Leskovački ajvar, Sremski kulen, Sremska kobasica (weakest, en wiki only), Bermet, Šumadijska šljivovica, Užička pršuta, Valjevski čvarci, Zlatarski sir, Sjenički sir, Pirotski kačkavalj (cow's-milk version), Pirotska peglana kobasica, Svrljiški belmuž. No prices. Left out perkelt, ćuretina s mlincima (neighbour duplicates). Thin: riblji paprikaš, rindflajš (one 2021 paper), Serbian salad, slatko, coffee, urnebes. Safe-side by agent: proja, podvarak, komplet lepinja nonveg (lard/drippings). Spot-check OK. Validator OK.
- Dominican Republic: research agent running (last of batch 13).
- Dominican Republic done: 28 dishes, 5 regions (Santo Domingo & South 11, Boca Chica & East 4, Cibao & North 6, Samaná 3, Southwest 4). GI true 1: Ron Dominicano (ONAPI DO, 25 Nov 2021, acento.com.do). Prices: yaniqueques 30-50, Boca Chica fried fish 400-950 (Diario Libre Apr 2023, El Día Jan 2024). Mofongo left out (Puerto Rican origin). Thin: lambí guisado, chambre, arepa dulce, pan de coco (dominicancooking.com), domplines, chenchén. Safe-side by agent: moro de guandules nonveg (bouillon), chicharrón nonveg. My fix: habichuelas con dulce + gluten (milk-cookie garnish). Validator OK.
- Batch 13 research done. Committed data; photos: running fetch_dish_images.py.
- Photos batch 13: +54 fetched; 18 dropped via NO_PHOTO (other countries: Korean chapssal on khao niao, Burmese paung din on khao lam, Northern Thai khao soi, Thai gai yang on ping kai, Turkish kaymak, Kayseri sarma, Croatian Križevci doughnuts on krofne, US johnnycake on yaniqueques; reused: Croatia kulen, slivovitz bottles, Egypt sugarcane juice, kibbeh on quipe, Argentine dulce de leche; plants/animals/illustrations: coffee harvest, Nile fish plate, live grasshopper, raw matooke, Nile perch). Lao photos shared with Thailand's larb/som tam/sai ua kept (they are Lao). 2,046 with photos.
- Building + installing.
- Built + installed on phone. README: 2,948 dishes, 73 countries.
- BATCH 13 DONE: 73 countries, 2,948 dishes, 2,046 with photos. No more batches registered.

## 2026-11-15: after batches
- User: skip revoking Supabase token `claude-setup` and the restaurant coordinates CSV (both dropped from open list).
- Remaining open: verification pass on batches 7-13 (~28 countries, only spot-checked), privacy policy, owned logo, Android back closes sheets first, photo coverage (2,046/2,948), thin regions, more countries.

## 2026-11-15: verification pass (batches 7-13)
- Correction: batches 1-6 (24 countries: Austria ... Colombia) were also never fully verified (method then: agents source every fact + my spot-check). Fully verified so far: India + original 20 world countries + UAE. Starting with batches 7-13 (28 countries) as agreed; 1-6 to ask about after.
- Brief: scratchpad verify_brief.md (check every dish vs fetched sources; fix diet/vegan/allergens/local names/prices/GI/links/regions; remove unsupportable dishes). Two agents at a time (separate files).
- Order: Israel, Jordan, Chile, New Zealand, Finland, Iceland, Romania, Georgia, Iran, Cambodia, Cuba, South Africa, Ethiopia, Tunisia, Jamaica, Bulgaria, Ecuador, Uzbekistan, Kenya, Pakistan, Nigeria, Ghana, Uruguay, Slovenia, Laos, Tanzania, Serbia, Dominican Republic.
- Israel + Jordan: verify agents running.
- Jordan verified: 24 checked, 12 fixed. Allergens: fattet hummus + galayet bandora +nuts (pine-nut garnish). Rewrites: unsourced claims (knafeh cooking method, fatteh Friday claim, qatayef semolina, mujallala lamb, sage tea details); rashoof moved Salt & Balqa -> North (no Salt source). Maqluba pronunciation nulled. No diet, link, GI, price changes; no removals. Open: mansaf-in-a-cup bread/gluten unknown. Validator OK.
- Chile: verify agent running.
- Israel verified: 31 checked, 11 fixed. Bourekas veg -> egg (+egg; egg wash). Allergens: labneh balls +sesame (za'atar), tahini halva +nuts, hamin +gluten. Druze pita: Daliyat al-Karmel + za'atar claim removed. Other unsourced details rewritten (goose liver, sambusak fried, jachnun, labneh). No link/GI/price changes, no removals. Open: sambusak kept veg (chickpea version; meat/cheese versions exist), orez shuit kept vegan (base dish). Validator OK.
- New Zealand: verify agent running.
- Chile verified: 47 checked, 21 fixed. Diet: chapalele veg -> nonveg (lard/chicharrones in curanto version), porotos granados veg -> nonveg (meat broth common). Allergens: curanto +fish, pan de pascua + tortilla de rescoldo +dairy, chupe de centolla +gluten, Rapa Nui ceviche +gluten (soy sauce). GI: pajarete false -> true (DO Atacama/Coquimbo); La Ligua/Curacaví sweets + Longaniza de Chillán reworded "Sello de Origen (INAPI)", stay true. 4 pronunciations + crudo alemán local name nulled. Unsourced claims removed. No links/prices/removals. Validator OK.
- Finland: verify agent running.
- Chile: my fix pisco sour diet veg -> egg (matches its egg allergen; egg white version common abroad).
- New Zealand verified: 34 checked, 16 fixed. Diet: pineapple lumps veg -> nonveg (gelatine, Open Food Facts; +dairy +soy), kānga pirau veg -> egg. Hāngī pie +dairy. Unsourced claims cut (pie awards, pavlova 1926 story, Zespri, colonial goose dates). Pronunciation kūmara/pāua nulled; mānuka honey local name nulled. Wine GIs confirmed on IPONZ (Waiheke, Central Otago, Marlborough). One redirect URL swapped. My fix: kiwi onion dip +gluten (onion soup mix usually wheat; safe side). Open: chocolate fish + lolly cake nonveg assumed (gelatine unconfirmed); species/plant links kept for kūmara, feijoa, crayfish, oysters, mussels. Validator OK.
- Iceland: verify agent running.
- Finland verified: 36 checked, 17 fixed. Laskiaispulla veg -> egg (+egg; safe side). Allergens: tippaleipä, vety, klimppisoppa +dairy; lörtsy +dairy +egg; salmiakki +gluten. Pronunciation sahti/sima/salmiakki nulled. Unsourced how_to_order claims cut; rieska Ylivieska dropped from regions. Wikivoyage Finland source removed everywhere (no food content); Lapland link updated. GI 6 confirmed (Ruokavirasto): TSG sahti, kalakukko, karjalanpiirakka; PGI rönttönen, mustikkakukko; PDO two reindeer products. Open: salmiakki nonveg (gelatin assumed), mustikkakukko crust dairy unknown, peremec dough unknown. Validator OK.
- Romania: verify agent running.
- Iceland verified: 26 checked, 10 fixed. Allergens: kjötsúpa +gluten (oats/barley), laufabrauð +dairy (usual recipe, unsourced). 4 links -> is wiki (kjötsúpa, kleina, pönnukaka, harðfiskur). Unsourced claims cut (kleinur history, hangikjöt "main", skyr toppings); regions Mývatn/Ísafjörður dropped; langoustine soup moved South -> Reykjavík, local name nulled. Prices kept: pylsa 880 (2026), Höfn langoustine (Aug 2026). No diet/GI changes. Open: skyr rennet, single-source Akureyri burger, bulsur, Mývatn trout. Validator OK.
- Georgia: verify agent running.
- User: pause, continue tomorrow. Romania + Georgia agents stopped before writing (files unchanged, still unverified). Committed the 6 verified files.

## Next session (verification pass)
1. Romania + Georgia, then Iran, Cambodia, Cuba, South Africa, Ethiopia, Tunisia, Jamaica, Bulgaria, Ecuador, Uzbekistan, Kenya, Pakistan, Nigeria, Ghana, Uruguay, Slovenia, Laos, Tanzania, Serbia, Dominican Republic (22 left). Brief: scratchpad verify_brief.md (scratchpad may be cleared; recreate: check every dish vs fetched sources; fix diet/vegan/allergens/local names/prices (dated 2023+)/GI/links/regions; remove unsupportable; edit only own file; final reply "N checked, M fixed" + grouped fixes). Two agents at a time.
2. Commit after each 4 countries; at the end rebuild + install + push.
3. Then ask user: same pass for batches 1-6 (24 countries)?

## 2026-11-15: verification pass resumed
- Brief recreated (scratchpad verify_brief.md). Romania + Georgia: verify agents running.
- Georgia verified: 50 checked, 11 fixed. Lobiani veg -> nonveg (Racha version local_name; lori ham). Ghomi +gluten (cornmeal + flour). GI 17 confirmed on Sakpatenti registry (AO: Khvanchkara, Mukuzani, Tsinandali, Kindzmarauli, Tushetian guda, Borjomi; GI: chacha, churchkhela, matsoni, tenili, sulguni, Imeretian cheese, dambalkhacho, ajika, tkemali, Svanuri marili, Rachuli lori). Links: Rachuli lori -> Rachuli_ham, Gurian khachapuri -> Guruli_gvezeli. Tsinandali regions -> Telavi, Kvareli. Unsourced claims rewritten (pkhali, kubdari, borano, shkmeruli). No prices, no removals. Open: tabaka/ojakhuri/chashushuli/tkemali/matsoni nationwide but under Tbilisi & Kartli (state required); lobio kept veg. Validator OK.
- Iran: verify agent running.
- Romania verified: 46 checked, 16 fixed. Diet: poale-n brâu + alivenci veg -> egg (+egg). Allergens: pârjoale +dairy, salată de vinete +mustard. GI 16 confirmed (eAmbrosia v1 API webgate.ec.europa.eu/eambrosia-api/api/v1/geographical-indications; old POST endpoint returns HTML); carp roe salad TSG via EC press page; brânză de burduf stays false (Ibănești only an application, Oct 2026). Links: sarmale -> Sarma_(food), mucenici wiki set, ro wiki sources added. Batog price "400 per kg" -> "400". Rewrites: tochitură, papanași, fasole cu cârnați, răchie, small cuts. No removals. Open: ciușpais veg (stock type unknown), răchie fruit conflict between sources, mititei/Pleșcoi mustard only as served. Validator OK.
- Cambodia: verify agent running.
- Cambodia verified: 27 checked, 11 fixed. Mee kola veg -> nonveg (dried shrimp, fish sauce, egg; Cambodian Embassy UK recipe; +soy +gluten +peanuts +egg +fish +shellfish). Chha kh'nhei +gluten (soy sauce). GI all false (Kampot pepper, Kampong Speu palm sugar are ingredients). Links: Kampot city page dropped from num banhchok Kampot, kralan -> Sticky_rice_in_bamboo, mee kola sources added. Unsourced claims cut (amok, machu kroeung, pepper crab, num pang, sach ko ang, kralan). No prices/regions/removals. My fix: fried spider +shellfish (arthropod cross-reactivity, as Tanzania senene). Open: tuk krolok egg/dairy safe-side, nom krok vegan (fish-sauce dip not in source), sang vak spelled "son vac" in source. Validator OK.
- Cuba: verify agent running.
- Iran verified: 44 checked, 11 fixed. GI false -> true: gaz (Gaz Isfahan, Lisbon AO 1113), Qom sohan (Lisbon AO 1135). Diet: tahdig veg -> nonveg (lamb fat greasing, safe side), shakar polo nonveg -> veg (meat is in side stew). Allergens: koloocheh +dairy, Isfahan beryan +dairy +nuts. Links: beryan Iranica (403) -> kentaltravel, tahdig wiki -> Scorched_rice. Rewrites: koobideh, tahdig, beryan, ash-e doogh, sambuseh. No prices/regions/removals. Open: Lighvan cheese GI pending (Mehr 2026), baghlava/pashmak butter unsourced. Validator OK.
- Committed Romania, Georgia, Cambodia, Iran. South Africa: verify agent running.
- Cuba verified: 24 checked, 12 fixed. Allergens: frita +egg +dairy (EcuRed recipes), chorote +gluten (wheat flour thickener), bacán +shellfish (crab stuffing). No diet/GI/price changes (AOs only tobacco/rum). Pru oriental regions -> Granma only. Rewrites: ropa vieja name origin, frita 1926, torticas de Morón (egg-yolk glaze, 1927), canchánchara, casabe, small fixes. EcuRed flaky (502 then loads). No removals. Open: torticas 1926 vs 1927, jícara gourd vs clay cup, casabe nationwide but under Camagüey. Validator OK.
- Ethiopia: verify agent running.
- South Africa verified: 42 checked, 12 fixed. Amasi veg -> nonveg (commercial amasi 0.5% gelatine, safe side). Allergens +dairy: hertzoggie, mosbolletjies, umngqusho. GI confirmed: rooibos (EU PDO 2021), Karoo lamb (SA GI 2023); pinotage false (grape). Links: pickled fish news24 (403) -> foodformzansi, bunny chow/Durban curry southafrica.net (403) -> vice. Kota price nulled (2018/undated). Rewrites: pickled fish (unsourced claims cut), Durban curry, smiley, chakalaka, boerewors, pinotage pronunciation. My fix: umphokoqo veg -> nonveg (amasi poured over, matches amasi). Open: honeybush maybe GI (EU-SADC EPA protocol, unconfirmed); morogo/dikgobe state placement unsourced. Validator OK.
- Tunisia: verify agent running.
- Ethiopia verified: 34 checked, 12 fixed. Allergens: dabo kolo +dairy (milk), tibs +dairy (niter kibbeh, safe side), borde +gluten. Unsourced claims cut: "teff/kocho gluten-free", tej "national drink", siwa taste; "Wikipedia says" phrasing removed; tihlo how_to_eat nulled (failed verification). GI all false (EIPA GI framework only 2026, no registrations). No diet/link/region/price changes, no removals. Open: borde vegan false (no ingredient detail), tihlo/himbasha/fetira butter unsourced. Validator OK.
- Jamaica: verify agent running.
- Jamaica verified: 28 checked, 12 fixed. Jerk pork + jerk chicken +soy (soy sauce in seasoning). Pronunciation nulled: ackee & saltfish, escovitch, bammy. GI: Jamaica Rum true confirmed (JIPO 2016); Jamaica Jerk GI covers seasonings only, so jerk dishes stay false; Blue Mountain coffee false (registrar 2023 slides list only Jerk + Rum). Rewrites: Boston Jerk Centre, rum committee, sorrel origins, curried shrimp, Little Ochie, Trelawny yam, steamed fish, hard dough bread. visitjamaica 403 to curl but loads. No prices/regions/removals. Open: Blue Mountain GI uncited on wiki, rice and peas kept vegan, fish tea butter optional. Validator OK.
- Bulgaria: verify agent running.
- Tunisia verified: 41 checked, 16 fixed. Diet: lablabi veg -> nonveg (egg + tuna topping; +egg +fish), ojja egg -> nonveg (merguez/meatballs common), thibarine vegan false (honey). Allergens: tea with pine nuts +peanuts, kaak warka +dairy, makroudh +nuts. GI all false (14 Tunisian GIs = wines, dates, figs, pomegranate, oils, mint, apples). Prices: legmi nulled (2019); mkharek 10 / Béja zlabia 12 TND per kg kept (Mar 2025). Mtabga regions -> Gafsa. Rewrites: brik filling, slata mechouia, date kaak, legmi; zammita local name nulled. My fix: ojja +shellfish (shrimp version, safe side). Open: chakchouka egg (Djerba version has dried meat/anchovies), malthouth/sugar dolls vegan false unsourced. Validator OK.
- Committed Cuba, South Africa, Ethiopia, Tunisia. Ecuador: verify agent running.
- Ecuador verified: 48 checked, 18 fixed. Helado de paila egg -> veg, vegan (fruit + sugar only). Allergens: fanesca +egg +gluten +peanuts; hornado + seco de chivo +gluten (beer); chugchucaras, mote pata, guatita, encocado, viche +dairy; tamal lojano +egg; shrimp ceviche +mustard. GI: miske true confirmed (SENADI 2022); other DOs match no dish. ecuador.travel dropped from tapao arrecho + chicha de yuca. Encebollado price 3.5-3.7 confirmed (2025); tonga stays null (date unclear). Rewrites: fanesca, seco de chivo, viche, tapao arrecho, cocada, chicha de yuca, canchalagua, lobster. No removals. Open: llapingacho/locro/empanada de viento kept veg (lard traditional but unsourced); pronunciations unsourced, kept. Validator OK.
- Uzbekistan: verify agent running.
- Bulgaria verified: 37 checked, 13 fixed. GI 12 confirmed on eAmbrosia (PDO kiselo mlyako, sirene, Strandzha honey, Melnik wine; PGI Gornooryahovski sudzhuk; spirits Burgas muscat + Troyan plum rakia; TSG lukanka Panagyurska, kayserovan vrat Trakiya, filet Elena, sudzhuk Tarnovski, lukanka Troyanska); banski starets, lyutenitsa, Smilyan beans stay false. 8 publications.europa.eu CELEX links (404) -> eur-lex. Patatnik veg -> egg (+egg +dairy). Sarmi +dairy (yogurt), tsatsa +gluten (flour, unsourced). Rewrites: lukanka 1958 standard, Panagyurishte eggs (butter, local lard), lyutenitsa walnuts, rakia claims cut. Pronunciation added: patatnik, klin (GuideBG). Open: Panagyurishte eggs kept egg (lard only local version), shopska salad region. Validator OK.
- Kenya: verify agent running.
- Usage limit hit: Uzbekistan + Kenya agents stopped before editing (files unchanged). Resumed both. Committed Jamaica, Ecuador, Bulgaria.
- Uzbekistan verified: 39 checked, 14 fixed. GI false -> true: Jarqo'rg'on tandir go'shti (zamin.uz Oct 2025), Kokand halva (MoJ Jul 2026, afisha.uz); other 13 GI confirmed via MoJ/IP Agency news (ima.uz unreachable). Sumalak vegan true (+nuts), qatlama +dairy. Lagman wiki (404) -> uz wiki Lagʻmon. Devzira plov price 31200 (Stats Agency Jan 2025). Rewrites: wedding plov peas, so'qoq somsa mador, lagman, Bukhara non, bakhsh how_to_order nulled, chupan kabob. No plov marked veg. My fix: Samarkand + Bukhara non veg -> egg (+egg; egg-yolk glaze, safe side as bourekas). Open: so'qoq somsa nonveg assumed; Kokand patir + Chust oshi are new GIs not in file. Validator OK.
- Pakistan: verify agent running.
- Kenya verified: 38 checked, 17 fixed. Prices nulled (pre-2023): chapati, mandazi, mayai pasua; smocha 60-70 kept (Aug 2023). Allergens: viazi karai +gluten, omena +peanuts. Malindi dropped from biryani + mbaazi wa nazi regions. Local names nulled: tilapia "ngege", psong'iot "kimnyet". Mandazi recipe source added (egg/dairy). Rewrites: pilau, biryani, kahawa chungu, viazi karai, kuku paka, osuga, ingokho, tilapia. GI all false (no GI law; draft bill 2026). No removals. Open: mukimo = irio disputed, mrenda vegan false unsourced, sukuma wiki/githeri veg (meat stock warning in how_to_order). Validator OK.
- Nigeria: verify agent running.
- Nigeria verified: 38 checked, 24 fixed. Okpa veg -> nonveg (crayfish). Allergens: +shellfish (crayfish) ofe nsala, ofe owerri, okpa, nkwobi, isi ewu, banga, owo; abula +fish +shellfish; ofe oha + miyan taushe +fish; dan wake +peanuts +gluten. GI all false (no GI law; draft bill Jan 2025). Asun guardian.ng (403) dropped. Regions cleared: asun, abacha, okpa, suya, tuwo miyan kuka, masa. Prices kept (2024-2026). Rewrites: asun, bole, ayamase (ofada sauce separate), pepper soup, edikang ikong, egusi, abacha, jollof, smaller fixes. My fix: pepper soup +shellfish (shrimp sometimes, safe side as ojja). Open: suya price 500-1000 vs "from 1500" (2024), kunu vegan (aya sometimes honey), akara kept vegan. Validator OK.
- Ghana: verify agent running.
- Pakistan verified: 35 checked, 13 fixed. Allergens: chapshuro + hoilo garma +nuts (walnut). Hunza harisa wiki (Arab harees) nulled. Regions cleared: Sindhi biryani Karachi, sajji Quetta, chapshuro Nagar, gurgur cha Skardu. Rewrites: chapshuro, Lahori karahi, doodh patti, chapli kebab (Namak Mandi cut), pallo machhi, rosh (Dawn 2022), kata-kat, siri paye, gurgur cha. No diet/GI/price changes, no removals. Open: IPO-Pakistan GI register unreachable (Multani halwa only candidate; recheck sohan halwa), thadal dairy safe-side. Validator OK.
- Committed Uzbekistan, Kenya, Nigeria, Pakistan. Uruguay: verify agent running.
- Ghana verified: 25 checked, 18 fixed. Hausa koko vegan false (+dairy +peanuts). Allergens: kelewele +peanuts, red red +egg, aprapransa +shellfish (crab); pito -gluten (millet/sorghum), fante fante -shellfish (unsourced). GI all false (only Kente cloth registered, Aug 2025). Kpokpoi wiki Kpekple (404) -> Kpekpele. Regions: fufu light soup Kumasi -> Accra, fante fante towns cleared, abolo/yakayake -> Ho, Keta. Prices kept: Ga kenkey 4-5, jollof 80-120; agbelikaklo null (2019). Rewrites: banku, kelewele, light soup, ampesi, Fante kenkey, fante fante, akple, abolo, yakayake, agbelikaklo, tuo zaafi, wagashi. No removals. Open: red red + wagashi state placement, groundnut/okra soup crab unsourced. Validator OK.
- Slovenia: verify agent running.
- Uruguay verified: 28 checked, 11 fixed. Pancho +egg +mustard (mayo, picantina, mustard). GI all false (grappamiel Mercosur exception only). Links: caruso elobservador (403, matambre) dropped; Tannat Carmelo link -> vinetur Colonia wine route. Rewrites: asado cuts/claims, medio y medio how_to_eat nulled, caruso "exclusively Uruguayan" cut, Tannat claims cut, grappamiel, queso Colonia, jesuitas/Massini how_to_order nulled. Prices confirmed: chivito 480-520, miniaturas 950 (Jan 2026). No diet/region/removal changes. Open: Patria Gaucha Tacuarembó unsourced, Lascano (Rocha) under Interior, queso Colonia rennet. Validator OK.
- Laos: verify agent running.
- Laos verified: 22 checked, 15 fixed. Kaipen nonveg -> veg, vegan (algae, sesame, garlic, tomato; -fish; the earlier nonveg came from the jeow bong it is served with). Allergens: khao piak sen +egg, or lam + sin dat +fish. Khao lam vegan false (egg custard versions). GI: Bolaven coffee + Paksong tea confirmed; ping kai Xeno false. Ping pa Rough Guides source dropped. Regions cleared: khao jee pâté, ping pa (nationwide). Beerlao price 15000-25000 large bottle (2026 guide). Rewrites: mok pa, khao lam, khanom kok, khao jee, khao niao, tam mak hoong, jeow bong, Beerlao, sin dat, ping pa. Pronunciations stay null. Open: mok pa shellfish safe-side, khanom kok vegan false, lao-lao vegan. Validator OK.
- Tanzania: verify agent running.
- Tanzania verified: 27 checked, 22 fixed. Allergens: wali na maharage +soy (soy or kidney beans), urojo +gluten, makande -soy; senene shellfish kept. Links: mbege atlasobscura (403) -> machameculturaltourism; matoke wiki source added, local name ebitooke. Regions: kisamvu -> Zanzibar & Pemba, konyagi Dar cleared. Only Zanzibar pizza price kept (3000-5000). GI all false. Many unsourced claims cut (chipsi mayai, dagaa, wali na maharage, kisamvu, vitumbua, mchemsho, konyagi, Zanzibar pizza, urojo, pweza, coffee, ndizi nyama, mtori, mbege, senene, matoke). No removals. Open: urojo seafood topping optional (no fish/shellfish added), vitumbua/kiburu vegan false safe-side, mkate wa kumimina egg from Kenyan recipe. Validator OK.
- Serbia: verify agent running.
- Slovenia verified: 36 checked, 11 fixed. GI 12 confirmed on eAmbrosia + 4 TSGs on gov.si PDF; tepkovec false. Brodet +shellfish (Izola recipe). Links dropped: Pohorska omleta visitmaribor (redirect), loški kruhek Slovenian cuisine wiki (no mention). Rewrites: krofi (Trojane road, 1961), Bled cream cake, mohant, tolminc, Kobarid štruklji, brodet, gibanica lard wording, Pohorje omelette, štruklji sauce. No diet/region/price changes, no removals. My fix: štruklji dishes +nuts (walnut filling common/sourced for Kobarid). Open: gibanica nonveg (lard optional permitted fat), loški kruhek egg unconfirmed, fritaja/brodet wiki generic. Validator OK.
- Committed Ghana, Uruguay, Laos, Slovenia. Dominican Republic: verify agent running.
- Dominican Republic verified: 28 checked, 14 fixed. Allergens: mangú tres golpes +gluten (floured cheese/salami), yaroa +mustard. GI: Ron Dominicano confirmed (ONAPI Nov 2021); nothing else applies. Links dropped: sancocho theculturetrip (no response), casabe elcaribe (403); pescado con coco Diario Libre added. Rewrites: Brugal 1888 founding, Villa Mella chicharrón, casabe (Santiago Rodríguez, UNESCO 2024), habichuelas con dulce ingredients, moro bouillon wording, small cuts. Prices confirmed: pescado frito 400-950, yaniqueques 30-50. My fixes: yaniqueques veg -> nonveg (El Día: fried "en aceite o manteca", safe side), locrio +fish +shellfish (sardine/shellfish versions common). Open: casabe lard in some communities (kept vegan), Presidente vegan false unsourced. Validator OK.
- Serbia verified: 31 checked, 23 fixed. GI 13 confirmed on zis.gov.rs register (xlsx 19-05-2026); Šumadijska šljivovica on Agriculture Ministry spirit register (biznis.rs 2021), kept true. Diet: gibanica egg -> nonveg (lard), proja nonveg -> veg/vegan/jain (plain cornmeal, salt, water; projara separate). Allergens: riblji paprikaš +gluten +egg, rindflajš +gluten +dairy, bermet +mustard, Leskovac pljeskavica +gluten, Niš burek +dairy. Links: sarma -> Stuffed_leaves, paprikaš Springer -> sr wiki, Užice pršuta -> Zlatiborska, Sjenica cheese pages. Pirot kačkavalj Stara Planina dropped. Many rewrites (ćevapi, sarma, paprikaš, rindflajš, bermet, pršuta, pljeskavica, kačkavalj cow's milk, peglana kobasica spice 2 -> 1, burek). Open: Leskovac GI covers grill meat not dish; proja now vegan (common versions with egg/dairy are projara). Validator OK.
- VERIFICATION PASS BATCHES 7-13 DONE (28 countries). Committed Tanzania, Dominican Republic, Serbia. Building + installing.
- Built OK. Install blocked: phone shows adb 'unauthorized' (needs USB debugging prompt accepted). Pushed commits.
- Installed on phone after USB debugging accepted. Next: ask user about same pass for batches 1-6 (24 countries).
- User: skip owned logo (dropped from open list).
- Open: privacy policy, Android back closes sheets first, verify batches 1-6 (24 countries), photo refresh for changed wiki links, photo coverage (2,046/2,948), thin regions, flagged diet calls (proja vegan, amasi nonveg, Panagyurishte eggs, Ecuador lard dishes), Uzbek GIs Kokand patir + Chust oshi, more countries.
- User: app laggy. Cause: Discover rendered every matching dish card (all 2,948 for "All countries") 450 ms after mount, so each tap/keystroke re-rendered thousands of cards. Fix: cards mount 40 at a time via IntersectionObserver sentinel (1500px ahead); count saved in `saved.limit` so back-navigation scroll restore still works. Built + installed. Also: main JS bundle 3.7 MB (all dish JSON bundled eagerly) adds startup parse time; left as is unless startup feels slow.

## Next session
- User to confirm lag fix feels smooth on phone. If startup slow: split dish JSON out of the 3.7 MB main bundle (lazy-load per country).
- Open: privacy policy, Android back closes sheets first, verify batches 1-6 (24 countries; same brief: check every dish vs fetched sources, fix diet/vegan/allergens/local names/prices 2023+/GI/links/regions, remove unsupportable, edit own file only, two agents at a time, commit every 4), photo refresh for changed wiki links, photo coverage (2,046/2,948), thin regions, flagged diet calls (proja vegan, amasi nonveg, Panagyurishte eggs, Ecuador lard dishes), Uzbek GIs Kokand patir + Chust oshi, more countries. Logo skipped by user.
- Build/install: `cd app && PATH=~/.nvm/versions/node/v22.23.3/bin:$PATH npm run build && npx cap sync android && cd android && ANDROID_HOME=~/Android/Sdk ./gradlew assembleDebug && ~/Android/Sdk/platform-tools/adb install -r app/build/outputs/apk/debug/app-debug.apk`

## 2026-11-16: verification pass batches 1-6
- User picked: verify batches 1-6 (24 countries). Order: Austria, Canada, Croatia, Morocco, Poland, Hungary, Czechia, Egypt, Australia, Brazil, Peru, Argentina, Philippines, Sri Lanka, Nepal, Ireland, Switzerland, Belgium, Lebanon, Sweden, Denmark, Norway, Taiwan, Colombia. Brief recreated (scratchpad verify_brief.md, same rules). Two agents at a time, commit every 4.
- Austria + Canada: verify agents running.
- Austria verified: 42 checked, 16 fixed. Marillenknödel veg -> egg (choux dough option; +egg). Allergens: Wiener Schnitzel +dairy (clarified butter), apple strudel +dairy, Kletzenbrot +dairy, Klachlsuppe +dairy, Reindling +nuts, Schlickkrapfen + Innviertler Speckknödel +egg. GI: Schilcher true -> false (wine-law term, not on eAmbrosia); 5 confirmed (Wachauer Marille, Kürbiskernöl, Tiroler Speck, Gailtaler Speck, Vorarlberger Bergkäse). Tiroler Speck: en Tyrolean_speck source dropped (South Tyrol hind leg). Mostviertel regions cleared (Lower Austria, wrong group). Rewrites: Gailtaler Speck PDO -> PGI, Tiroler Speck, Melange, Linzer, Saftgulasch, Marillenknödel, Mohnnudeln, Reindling. No prices/removals. My fix: Salzburger Nockerl +dairy (milk/butter in dish, safe side). Open: Funkaküachle fat unknown, Reindling/Kasnudeln egg unsourced, Riebel nonveg vs de wiki veg, mustard served with Käsekrainer/Brettljause not added. Validator OK.
- Croatia: verify agent running.
- Canada verified: 40 checked, 23 fixed. Diet veg -> egg: perogies, Nanaimo bar, blueberry grunt. Allergens: pâté chinois +dairy, ginger beef +gluten +egg +soy, Caesar +fish (Worcestershire), California roll +fish +sesame, Jamaican patty +egg, Jiggs dinner +mustard, rappie pie +shellfish, fricot +gluten, grunt +dairy +egg, bannock +dairy, pemmican +fish, muktuk +soy. GI: icewine true -> false (style, GIs are regions; CIPO register unreachable); Québec ice cider IGP (quebec.ca 2014) + Canadian whisky (ISED) kept true, sources added. Links all OK; recipe sources added. Rewrites: poutine, tourtière, smoked meat, icewine (>90% Ontario, 35 Brix), perogies, California roll, spot prawns, grunt, bannock how_to_order nulled. No regions/prices/removals. My fixes (safe side): California roll +gluten +egg (surimi), B.C. roll +soy (sweet sauce). Open: Ontario Icewine GI unconfirmed, butter tart/saskatoon pie lard unsourced. Validator OK.
- Morocco: verify agent running.
- Croatia verified: 32 checked, 12 fixed. Allergens: fritule +dairy, rapska torta +gluten +dairy, purica s mlincima +egg. GI 14 confirmed on eAmbrosia (eAmbrosia detail pages cited); purica (only Zagorski puran/mlinci registered) + graševina (grape) stay false. Links: Krk pršut hr wiki redirects to Istarski, wikipedia_url null + ministry spec PDF added; Pag cheese island page dropped; gemišt + Velebitsko hr wiki set. Rewrites: Krk pršut spec, rožata, kulen, fritule, rapska torta, gemišt, Velebitsko ("best beer" cut), soparnik. No diet/regions/prices/removals. Open: rožata crème caramel vs brûlée, unsourced pronunciations kept. Validator OK.
- Poland: verify agent running.
- Morocco verified: 32 checked, 4 fixed. Chebakia veg -> egg (+egg +nuts; fr wiki recipe). Medfouna +nuts (almonds). GI 2 confirmed via WIPO Lex arrêtés (Majhoul Tafilalet IGP 2010, Chefchaouen goat cheese IGP 2011; source added); amlou false (argan ingredient). Links/regions/text all OK. No prices (Mejhoul 100-200 MAD/kg undated)/removals. Open: jowhara egg safe-side, taktouka vegan (some versions egg), maakouda cheese/tuna versions not added. Validator OK.
- Committed Austria, Canada, Croatia, Morocco. Hungary: verify agent running.
- Hungary verified: 27 checked, 13 fixed. Halászlé +gluten (Baja noodles). GI false -> true: tepertős pogácsa (TSG, Reg. 2016/1415, EUR-Lex spec), Egri Bikavér, Badacsony, Villány (PDO wines); 6 others confirmed on eAmbrosia; Balatoni fogas false (Balatoni hal PGI = fish). Links: Badacsony + Villány wikipedia_url null (Hungarian_wine generic). Regions: Debreceni + tepertős pogácsa -> Great Plain. Rewrites: pálinkas ("one of eight" cut), Szeged salami (humidity, 2004), Csabai kolbász, pogácsa, paprikash. Lángos nonveg kept (lard). No prices/removals. Open: wine/Unicum vegan unknown, Hungarikum register JS-only, fröccs/Hortobágyi placement unsourced. Validator OK.
- Czechia: verify agent running.
- Poland verified: 37 checked, 9 fixed. Allergens +gluten: bigos (flour/roux/rye bread), krupnioki śląskie (groats; EU single document), rolada śląska (mustard now sourced). GI 9 confirmed on eAmbrosia (6 PGI, 2 PDO, kabanosy TSG); Toruń gingerbread false. Links: andruty kaliskie wikipedia_url -> Kalisz_andruts (I added it to NO_PHOTO, lead image is the town); EUR-Lex + slaskiesmaki sources added. Oscypek Zakopane cleared. Rewrites: kwaśnica, oscypek, krupnioki, rolada, Goldwasser (now made in Germany). No diet/prices/removals. Open: rennet cheeses (bundz calf rennet; oscypek, żętyca, bryndza likely) kept veg as elsewhere; Toruń gingerbread egg unsourced (kept safe side). Validator OK.
- Egypt: verify agent running.
- Egypt verified: 25 checked, 5 fixed. Allergens: Alexandrian koshary -gluten (no pasta/bread in source), freska +sesame +peanuts +nuts (NPR 2012, Egyptian Streets 2019). Fatta dairy kept (ghee, MEE recipe added). GI all false. Hawawshi price nulled (2017). Rewrites: ta'ameya how_to_eat, freska, Alexandrian koshary local name (ar wiki). Links OK. No diet/regions/removals. My fixes (safe side): molokhia +shellfish (Alexandria shrimp variant), sahlab +nuts (garnish). Validator OK.
- Australia: verify agent running.
- Czechia verified: 30 checked, 20 fixed. Diet veg -> egg (+egg, safe side, no dough source): trdelník, chodský koláč, valašský frgál, štramberské uši, hořické trubičky, lomnické suchary. Bramborák egg -> nonveg (goose/pork lard, cs wiki; +dairy). Kulajda +gluten. GI: Prague ham TSG (Reg. 2018/506) + 9 eAmbrosia confirmed; Moravian wine false -> true (Morava PDO). Links: bramborák -> cs Bramborák, burčák -> cs Burčák; EUR-Lex sources added. Bramborák Plzeň cut. Rewrites: Prague ham history (cs wiki), burčák 1-7% alcohol, slivovice, kulajda, Budvar GI name, Moravian wine, Pardubice gingerbread, tvarůžky, Pilsner, vepřo knedlo zelo. No prices/removals. Open: six egg changes unsourced (PGI specs would settle frgál/uši/trubičky/suchary), trubičky nuts?, Karlovarská hořká (Becherovka) spirit GI unchecked, Pilsner vs České pivo PGI. Validator OK.
- Committed Poland, Hungary, Czechia, Egypt.
- Australia + Brazil: verify agents running.
- Brazil verified: 45 checked, 9 fixed. Cajuína veg/vegan -> nonveg (gelatine clarification, pt wiki). GI 5 confirmed on INPI fichas (Canastra, Serro, Pelotas, Piauí cajuína, Paraty DO 2024). Mate_(drink) source added. Rewrites: caruru, Canastra curing (2 weeks INPI), Bauru 1930s, bolo de rolo state law, Paraty APACAP, pastel how_to_order. No allergens/links/regions/prices/removals. Open: coalho/Canastra/Serro rennet (kept veg), bolinho de bacalhau gluten+egg safe side. Validator OK.
- Peru: verify agent running.
- Australia verified: 44 checked, 16 fixed. Allergens: carpetbag steak +fish (Worcestershire), Tim Tam +soy (IGA label), dim sim +soy, sausage sizzle +mustard, rock lobster/marron/abalone +dairy (butter, safe side). GI all false. Links all OK; sources added (mango pancake SBS/RecipeTin, Tim Tam IGA). Rewrites: mango pancake (Marigold ~1991), scallop pie (curry sauce, Harbour Lights), kangaroo (legal SA 1980, NSW/Qld/Vic 1993), damper, smashed avo, meat pie, potato cake, Anzac biscuit. My fix: pavlova pronunciation pav-LOH-və (wiki). No diet/regions/prices/removals. Open: doughnut/kitchener bun/frog cake egg+dairy unsourced, FruChocs/frog cake gelatine unknown, bunya nut tagged nuts (conifer seed). Validator OK.
- Argentina: verify agent running.
- Peru verified: 42 checked, 8 fixed. Pisco GI true kept (Indecopi DO via Andina 2019 + RPP; Indecopi pages refused fetch). Sopa seca wikipedia_url -> es Sopa_seca_(Perú). Tacacho Iquitos cleared. Rewrites: anticuchos, rocoto relleno (popular in Arequipa), inchicapi (corn flour or peanuts), juane chicha, puca picante local name, pisco, sopa seca. No diet/allergens/prices/removals. Open: Wikipedia rate-limited (half pages via WebFetch summaries). Validator OK.
- Philippines: verify agent running.
- Argentina verified: 43 checked, 20 fixed. Diet veg -> nonveg: medialuna (de grasa = beef fat), humita (Salta grasa de pella, optional, safe side), chipa (lard), sopa paraguaya (pork fat; +egg). Veg -> egg: alfajor, chipa guasu, torta galesa. GI true -> false: cordero patagónico, chivito neuquino (GI = raw meat). Confirmed in Boletín Oficial: salame de Tandil, salame Colonia Caroya, membrillo rubio San Juan. Dead hcdn.gob.ar PDF replaced with Boletín Oficial pages. Rewrites: pizza origin, miga, matambre, fernet, alfajor, empanada salteña, locro pulsudo, torrontés 1,700 m, membrillo, mate cebador, chivito, torta galesa = Welsh fruitcake. No regions/prices/removals. Open: magyp GI register 403; meat-GI call (South Africa Karoo lamb kept true, inconsistent); torta galesa egg/dairy unsourced. Validator OK.
- Committed Brazil, Australia, Peru, Argentina. Sri Lanka: verify agent running.
