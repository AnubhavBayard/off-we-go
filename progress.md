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
- Built + installed on phone. Committed (not pushed).
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
- BATCH 1 DONE: 25 countries, 1,268 dishes. Built, but NOT installed: phone not connected (adb: no devices). APK ready at app/android/app/build/outputs/apk/debug/app-debug.apk. Committed (not pushed).
- Next batch candidates: Poland, Hungary, Czechia, Egypt, Australia, Brazil, Peru, Argentina, Philippines, Sri Lanka, Nepal... same method (one research agent at a time, every fact sourced, spot-check, register country in world_spec.md + COUNTRY_CODE).
- 2026-10-31: added root README.md (project description, features, tech, layout, build, data workflow). Removed Vite template app/README.md. Committed (not pushed).
