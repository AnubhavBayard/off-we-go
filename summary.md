# Product Summary: Local Cuisine Discovery & Food Memories App

## Executive Summary
This application helps tourists discover the signature cuisine of the area they are visiting, points them to the restaurants that serve those dishes best, and lets them capture photos of the places they eat. Over time the app becomes a personal travel-food journal: a place users return to, long after the trip, to relive the memories they created in each city.

The core product has two halves:
1. **Discover:** what to eat here, and where to eat it.
2. **Remember:** a personal, map-based photo journal of every place visited.

Social features (traveler meetups and local "Culinary Ambassador" guide meetups) are secondary add-ons layered on top of the core.

## Target Audience
*   Food-focused tourists who want authentic local dishes over mainstream tourist traps, both international visitors and domestic travelers exploring other regions of their own country.
*   Travelers who like documenting and revisiting their trips.
*   Solo travelers, backpackers, and digital nomads exploring new cities.

## Core Product
### 1. Dish Discovery ("What to Eat Here")
A curated guide to the signature dishes of each city or region.
*   **Dish Profiles:** What the dish is, how to eat it, how to order it (local name and pronunciation), typical price, and dietary flags (vegetarian / non-vegetarian / egg, Jain, vegan, halal, spice level, common allergens).
*   **Dish-Level Rankings:** Restaurants are ranked per dish, not overall, so users find the best place for a specific dish rather than just a popular restaurant.
*   **Locals' Picks vs. Tourists' Picks:** Ratings are shown separately to help users avoid tourist traps.

### 2. Gastronomy Map ("Where to Eat It")
An interactive map showing the restaurants that serve each dish.
*   **Near Me, Open Now:** Filter by distance, opening hours, price, and dietary needs.
*   **Offline City Packs:** Downloadable city data so the map works without roaming data or a local SIM.
*   **Recommendations:** Launch with filter- and curation-based suggestions. Personalized recommendations (e.g. collaborative filtering on ratings) are added once enough rating data exists.

### 3. Food Memories ("Flavor Passport")
A personal photo journal tied to places.
*   **Photo Check-ins:** Users add photos of the dishes, restaurants, and places they visit. The app suggests the restaurant from the device location at upload time; the user confirms it.
*   **Stamps:** Each check-in adds a "stamp" to the user's Flavor Passport, building a collection per city and country.
*   **World Memory Map:** A world map that highlights every country the user has visited. Tapping a country zooms in and breaks it down into the cities visited there; tapping a city shows the restaurants and places checked into, with their photos. Shows simple totals (countries, cities, dishes tried).
*   **Timeline:** Users can also revisit past trips chronologically, by trip or by date.
*   **"On This Day" Resurfacing:** The app occasionally resurfaces past trip memories to bring users back between trips.
*   **Private by Default:** Memories are private unless the user chooses to share them. Location metadata is stripped from any publicly shared photo.
*   **Ownership:** Users can export or download all their photos and data at any time.
*   **Feeds Discovery:** Check-ins with dish ratings feed back into the dish-level rankings.

## Add-On Features (Secondary, Post-Launch)
### 1. Traveler Radar (Social Matchmaking)
A real-time networking feature to cure traveler loneliness and facilitate shared dining.
*   **"Looking to Share a Meal" Status:** Users can toggle this on to signal availability to nearby travelers.
*   **Group Suggestions:** Suggests group dinners among travelers with overlapping tastes and locations.

### 2. Local "Culinary Ambassadors" Directory
A directory that lets travelers discover verified local guides and arrange to meet them for food-centric city tours. The app only connects the two sides; no money is handled in-app. Any arrangement between traveler and guide happens directly between them, and guides are responsible for holding any locally required guide licenses.
*   **Niche Experiences:** Guides offer hyper-specific itineraries (e.g., "Midnight Street Food Crawl" or "Historical Coffee Tours").
*   **Guide Matching:** Matches tourists with guides based on stated price, dietary preferences, and current location.
*   **Flexible Meetups:** Supports scheduled meetup requests, with "On-Demand" requests added once guide supply allows.
*   **The "Meetup Handshake":** Time-limited live-location sharing starting 30 minutes before the meetup (auto-off afterwards) and in-app chat with real-time language translation.

## Trust, Safety, & Privacy
### Core Product
*   **Content Moderation:** Report and remove inappropriate photos or reviews.
*   **Data Protection:** Compliance with India's Digital Personal Data Protection (DPDP) Act at launch, then GDPR (EU) and other local laws as the app expands: privacy policy, consent for location access, data retention rules, and account/data deletion.
*   **Fake Review Protection:** Dish ratings are weighted toward verified check-ins.

### Social Add-Ons (Required Before They Launch)
*   **Verification:** Government ID verification for guides; phone verification plus profile checks for travelers.
*   **Meetup Safety:** Public venues only, block and report on every profile and chat, "share my meetup" with a trusted contact, SOS button, optional same-gender matching, and an incident response process.
*   **Double-Blind Reviews:** Post-meetup reviews (traveler rates guide, guide rates traveler, traveler rates traveler) are revealed only after both sides submit, to prevent retaliation.
*   **Age Limit:** 18+ only.

## Technical Stack & Architecture
*   **Mobile:** Capacitor wrapping a web app (React + Vite + TypeScript, plain SPA, no Next.js; optionally Ionic React UI components) for simultaneous iOS and Android launch. The same codebase can also ship as a web app.
*   **Key Frontend Libraries:** `react-map-gl` (MapLibre), `supabase-js` + TanStack Query (data/caching), TanStack Virtual (photo feeds).
*   **Native Features (Capacitor plugins):** Camera (photo check-ins), Geolocation, Push Notifications ("On This Day"), Filesystem (offline city packs), SQLite via `@capacitor-community/sqlite` (offline data).
*   **Backend:** Supabase: PostgreSQL with PostGIS ("near me", map queries, grouping memories by country/city), Auth (incl. phone login), Storage (photos + thumbnails), and row-level security to keep memories private by default. No custom API server needed for the MVP.
*   **Maps:** MapLibre GL JS with downloadable PMTiles city packs for offline use; Natural Earth country boundaries for the World Memory Map. Mapbox GL JS is the hosted alternative.
*   **Check-in Geocoding:** Country and city are resolved once at check-in time and stored with the memory, so the World Memory Map groups by stored fields.
*   **Restaurant Data:** Curated dish lists in our own database; restaurant details from Foursquare Places or Google Places (cost and data-storage terms to be checked), or OpenStreetMap.
*   **Monitoring:** Sentry (crashes), PostHog (analytics).
*   **Later:** A Python FastAPI service for personalized recommendations once rating data exists; Supabase Realtime for social add-on live location and chat; DeepL or Google for chat translation; Cloudflare R2 as photo CDN if storage costs grow.

## Data & Content Strategy
*   **Dish Lists:** Hand-curated per city at launch (target: 30-50 signature dishes per city), with input from local food writers and guides.
*   **Dish-to-Restaurant Mapping:** Curated at launch (3-5 restaurants per dish), then grown through user check-ins.
*   **Freshness:** Regular review of closures and menu changes; users can flag outdated listings.

## Business Model (To Be Decided)
No money is handled between travelers and guides. Candidate revenue streams:
*   Premium tier (e.g. offline city packs, unlimited memory storage, printed "Flavor Passport" photo books).
*   Affiliate commissions on restaurant reservations.
*   Partnerships with tourism boards.
*   Featured restaurant placement (must be clearly labeled to protect ranking trust).

## Competitors
TasteAtlas (closest: regional dishes and where to eat them), Google Maps, TripAdvisor, Yelp, Michelin Guide, Eater, Polarsteps (travel journaling), and for social add-ons: EatWith, Withlocals, Airbnb Experiences, Couchsurfing Hangouts.

Differentiation: dish-level rankings, a dish explainer for tourists, and a personal food-memory journal that keeps users coming back after the trip.

## Go-To-Market Strategy
Launch in India, starting hyper-locally in Bhubaneswar, Odisha (the founder's home city) and the surrounding Golden Triangle tourist circuit (Bhubaneswar, Puri, Konark, plus Cuttack for its street food) with hand-curated dish and restaurant data. Odia cuisine is under-covered by existing apps, which gives the dish guide a clear edge. Rath Yatra in Puri (June/July) is a natural launch moment given the tourist influx. The app will then expand city by city across India before going international. Validate the core loop (discover a dish, eat it, save the memory) before adding social features. Guide supply for the add-on directory will be hand-picked and manually vetted.

## Scaling Content Beyond the Launch City
Hand-curating every city does not scale, so curation shifts from the core team to the community over time:
*   **Phase 1 (Odisha):** Core team hand-curates dishes and restaurants. Sets the quality bar and the data template.
*   **Phase 2 (Top Indian tourist cities):** Paid or volunteer local curators (food bloggers, home cooks, guides from the Culinary Ambassadors directory) curate their own city using the same template; the core team reviews.
*   **Phase 3 (International):** Dish lists drafted from open data (Wikipedia/Wikidata regional cuisine lists, OpenStreetMap restaurants) and AI-assisted research, then verified by local curators. User check-ins and dish ratings keep rankings growing and fresh.
*   **Memories work everywhere from day 1:** Photo check-ins and the World Memory Map need no curated data, so the app is useful in any country even before its dish guide exists there.

## Success Metrics
*   Dishes discovered and restaurants visited per trip.
*   Photo check-ins per active user per trip.
*   Return rate after the trip (users reopening the app to revisit memories).
*   Return rate on the user's next trip to a new city.