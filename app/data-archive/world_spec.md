# World dish dataset spec (Off We Go app)

The app helps travellers find the dishes each place is known for. Write ONE JSON file per country:
`/home/beast/Projects/Off We Gooooooo/app/src/data/dishes_world_<slug>.json` (slug = lowercase, underscores: `united_states`, `south_korea`).
File = JSON array of dish objects, 2-space indent, UTF-8 (real script characters, not \u escapes).

Reference (already done, do not edit): `/home/beast/Projects/Off We Gooooooo/app/src/data/dishes_west_bengal.json`. Read 2-3 entries to match tone and detail.

## Regions
- Split the country into its well-known FOOD regions: use official first-level regions when there are few (e.g. Spain's autonomous communities can be grouped), otherwise group into 4-8 regions travellers recognise (USA: "New England", "The South", "Louisiana", "Texas", "California", "New York"...). Tiny countries (Singapore) may use 1-3 regions or just the country name.
- Each region: its 5-8 BEST, signature dishes (mix: main dishes, street food, sweet, drink). Quality over count. Total per country roughly 25-50.
- A dish known nationwide (e.g. sushi) goes in the region most associated with it, or the capital's region.

## Fields (all required; null where unknown)
- id: `<slug>-<kebab-dish>` e.g. `france-bouillabaisse`. Unique.
- name: common English/romanized name.
- local_name: name in the local script/language ONLY if seen in a source (e.g. 寿司, Paella valenciana); else null.
- pronunciation: simple syllables like "boo-ya-BAYSS", or null. Only if you are confident.
- category: one of exactly: sweet, street_food, meal, snack, drink. (Do not use pitha or temple_food.)
- country: English name, exactly one of: France, Spain, United States, Italy, Turkey, Mexico, United Kingdom, Germany, Greece, Thailand, Japan, China, United Arab Emirates, Malaysia, Vietnam, Indonesia, Portugal, Netherlands, South Korea, Singapore, Austria, Canada, Croatia, Morocco, Poland, Hungary, Czechia, Egypt, Australia, Brazil, Peru, Argentina, Philippines, Sri Lanka, Nepal, Ireland. (Add new countries here and to COUNTRY_CODE in src/data.ts.)
- state: the region name (see Regions), e.g. "Provence", "Andalusia", "The South".
- regions: [] (or city names where best known, e.g. ["Marseille"]).
- description: 2-3 factual sentences: what it is, main ingredients, why it matters. No fluff.
- how_to_eat: 1 sentence or null.
- how_to_order: 1 sentence (what to ask for, where it is sold) or null.
- typical_price: string like "8-12" in local currency ONLY if a source gives it; else null.
- currency: ISO 4217 code of the country (EUR, USD, GBP, TRY, MXN, THB, JPY, CNY, AED, MYR, VND, IDR, KRW, SGD, CAD, MAD, PLN, HUF, CZK, EGP, AUD, BRL, PEN, ARS, PHP, LKR, NPR).
- diet: "veg" | "nonveg" | "egg". Fish/seafood = nonveg. If commonly made with meat or fish stock/sauce (fish sauce, dashi, lard, gelatin), it is nonveg.
- jain: always false (Jain filter is India-only).
- vegan: true only if no dairy/egg/honey/meat/fish (including fish sauce).
- spice: 0-3.
- allergens: from [dairy, gluten, nuts, peanuts, sesame, shellfish, fish, egg, soy, mustard].
- gi_tag: true ONLY if the dish (not just an ingredient) has a protected origin status confirmed by a source: EU PDO/PGI/TSG, UK PDO/PGI/TSG, UNESCO is NOT a GI, Japan/Korea/China GI, Mexico's denominación de origen, Thailand GI.
- wikipedia_url: dish article if it exists, else null.
- source_urls: 1-5 URLs you actually used.

## Rules
- Use WebSearch/WebFetch: Wikipedia ("Cuisine of <country>", regional cuisine pages), national tourism boards, reputable food/travel sites. Facts from sources only; do not invent.
- Never put the user's email or any personal info in HTTP headers, User-Agent or URLs. If you script requests, use User-Agent "OffWeGoDishResearch/1.0".
- Keep your scripts in your own new scratchpad subfolder: /tmp/claude-1000/-home-beast-Projects-Off-We-Gooooooo/d4c3e708-3864-407e-bcf5-a9cbdf1766bf/scratchpad/world_<your countries>/ (other agents work in parallel; never touch shared files).
- Validate: `python3 /home/beast/Projects/Off We Gooooooo/app/scripts/check_dishes.py` must print OK for your file (run from the app/ folder: `cd "/home/beast/Projects/Off We Gooooooo/app" && python3 scripts/check_dishes.py`). Other agents' files may still be in progress; only fix your own.
- Do not edit any other file. No restaurants.
- Final reply: per country, file path, regions with dish counts, GI-tagged dishes, anything uncertain. Short.
