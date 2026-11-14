# Looks up the lead photo of each dish's Wikipedia article, with author + licence for the credit line.
# Writes src/data/dish_images.json: {dish_id: {src, page, credit, license}}. Images stay on Wikimedia.
# Run: python3 scripts/fetch_dish_images.py
import glob, html, json, re, time, urllib.parse, urllib.request

UA = "OffWeGoDishResearch/1.0"  # no personal info in requests


def get(params, host="en.wikipedia.org"):
    url = f"https://{host}/w/api.php?" + urllib.parse.urlencode({**params, "format": "json", "formatversion": 2})
    for attempt in range(5):
        try:
            with urllib.request.urlopen(urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.code != 429: raise
            time.sleep(5 * (attempt + 1))
    raise RuntimeError("rate limited")


def strip_html(s):
    return re.sub(r"\s+", " ", html.unescape(re.sub(r"<[^>]+>", "", s or ""))).strip()


def host_of(url):
    return urllib.parse.urlparse(url).netloc  # en/fr/es/id.wikipedia.org


def title_of(url):
    return urllib.parse.unquote(url.split("/wiki/")[-1]).replace("_", " ")


def chunks(xs, n=50):
    return [xs[i:i + n] for i in range(0, len(xs), n)]


dishes = [d for f in sorted(glob.glob("src/data/dishes_*.json")) for d in json.load(open(f))]
dishes = [d for d in dishes if d["wikipedia_url"] and "cuisine" not in d["wikipedia_url"].lower()]
keys = sorted({(host_of(d["wikipedia_url"]), title_of(d["wikipedia_url"])) for d in dishes})

# 1. article title -> lead image file name (free-licence images only, the API default)
title_file, alias = {}, {}
for host in sorted({h for h, _ in keys}):
    for batch in chunks([t for h, t in keys if h == host]):
        res = get({"action": "query", "titles": "|".join(batch), "prop": "pageimages", "piprop": "name", "redirects": 1}, host)
        q = res["query"]
        for m in q.get("normalized", []) + q.get("redirects", []):
            alias[host, m["from"]] = (host, m["to"])
        for p in q["pages"]:
            # .svg lead images are flags/icons, never dish photos
            if p.get("pageimage") and not p["pageimage"].lower().endswith(".svg"): title_file[host, p["title"]] = (host, p["pageimage"])
        time.sleep(1)

# 2. file -> 640px thumbnail, author, licence
files = sorted(set(title_file.values()))
info = {}
for host, batch in [(h, b) for h in sorted({h for h, _ in files}) for b in chunks([f for fh, f in files if fh == h])]:
    res = get({"action": "query", "titles": "|".join("File:" + f for f in batch), "prop": "imageinfo",
               "iiprop": "url|extmetadata", "iiurlwidth": 640}, host)
    q = res["query"]
    back = {m["to"]: m["from"] for m in q.get("normalized", [])}
    for p in q["pages"]:
        ii = (p.get("imageinfo") or [None])[0]
        if not ii: continue
        meta = ii.get("extmetadata", {})
        info[host, back.get(p["title"], p["title"]).removeprefix("File:")] = {
            "src": (ii.get("thumburl") or ii["url"]).split("?")[0],
            "page": ii["descriptionurl"],
            "credit": strip_html(meta.get("Artist", {}).get("value")) or "Unknown author",
            "license": strip_html(meta.get("LicenseShortName", {}).get("value")) or "see file page",
        }
    time.sleep(1)


def resolve(t):
    for _ in range(3): t = alias.get(t, t)
    return t


# Lead image shows the wrong thing (logo, tree, live animal, another dish or country's version): no photo.
NO_PHOTO = {
    "australia-vegemite-toast", "australia-bunya-nut", "australia-fruchocs", "australia-moreton-bay-bug",
    "australia-king-george-whiting", "australia-western-rock-lobster", "australia-marron", "australia-dhufish",
    "australia-tasmanian-abalone", "australia-tasmanian-atlantic-salmon",
    "argentina-provoleta", "argentina-tamal", "brazil-abara", "brazil-tutu-de-feijao", "brazil-feijoada",
    "ireland-full-irish-breakfast", "ireland-sneem-black-pudding", "ireland-seafood-chowder", "ireland-wexford-rissole", "ireland-galway-oysters",
    "belgium-de-koninck", "belgium-maitrank", "belgium-hasseltse-speculaas", "lebanon-kaak-knafeh",
    "lebanon-maqroota", "lebanon-shish-barak", "lebanon-kafta-bithine", "lebanon-kibbeh-lakteen",
    "lebanon-kibbet-samak", "lebanon-frakeh", "lebanon-mloukhiye-bzeit", "lebanon-kishk",
    "sweden-swedish-meatballs", "sweden-swedish-punsch", "sweden-bruna-bonor", "switzerland-birchermuesli",
    "switzerland-basler-mehlsuppe", "switzerland-polenta", "switzerland-risotto-ticinese",
    "colombia-hormigas-culonas", "colombia-oblea", "colombia-mazamorra", "colombia-natilla",
    "colombia-bunuelos", "colombia-arroz-con-coco", "colombia-sancocho-de-gallina", "colombia-empanadas",
    "colombia-lulada", "colombia-lechona", "colombia-tamal-tolimense", "colombia-tamal-de-pipian",
    "colombia-chicha", "denmark-limfjord-oysters", "denmark-aalborg-akvavit", "denmark-boghvedegrod",
    "norway-kjottkaker", "norway-linie-aquavit", "norway-pinnekjott", "norway-tjukkmjolk",
    "chile-empanada-de-pino", "chile-cazuela", "chile-pajarete", "chile-kuchen", "israel-tahini-halva",
    "israel-schnitzel-in-pita", "jordan-knafeh-nabulsieh", "jordan-knafeh-ramlawiyyeh", "new_zealand-kaikoura-crayfish", "new_zealand-bluff-oysters",
    "finland-pea-soup", "finland-sara", "georgia-matsoni", "romania-gomboti",
    "cambodia-samlor-prahal", "cambodia-sra-peang", "cuba-moros-y-cristianos", "iran-doogh",
    "iran-masghati", "south_africa-waterblommetjiebredie", "south_africa-pinotage", "south_africa-morogo",
    "ethiopia-tej", "ethiopia-tella", "ethiopia-kocho", "jamaica-jerk-pork", "tunisia-chakchouka",
    "ecuador-chontacuro", "ecuador-guagua-de-pan", "ecuador-guayusa", "ecuador-locro-de-papa", "kenya-biryani",
    "kenya-pilau", "kenya-matoke", "kenya-uji", "kenya-mursik", "pakistan-balochi-dampukht",
    "pakistan-gurgur-cha", "pakistan-hunza-harisa", "pakistan-karachi-nihari", "pakistan-lahori-karahi", "pakistan-peshawari-dumba-karahi",
    "pakistan-peshawari-qehwa", "uzbekistan-andijan-devzira-oshi", "uzbekistan-khorezm-plov", "uzbekistan-samarkand-plov", "uzbekistan-manti",
    "uzbekistan-qatlama", "uzbekistan-sumalak",
    # batch 12
    "nigeria-zobo", "nigeria-tuwo-miyan-kuka", "ghana-kelewele", "ghana-jollof-rice", "ghana-fante-kenkey", "ghana-akple-fetri-detsi", "uruguay-medio-y-medio", "uruguay-tannat", "uruguay-grappamiel", "slovenia-ricet", "slovenia-trojanski-krofi", "slovenia-cvicek", "slovenia-izolski-brodet", "slovenia-fritaja",
}
out = {}
for d in dishes:
    if d["id"] in NO_PHOTO: continue
    f = title_file.get(resolve((host_of(d["wikipedia_url"]), title_of(d["wikipedia_url"]))))
    # only Wikimedia Commons files: local wiki uploads can be non-free and lack licence data
    if f and f in info and info[f]["page"].startswith("https://commons.wikimedia.org/"): out[d["id"]] = info[f]

json.dump(out, open("src/data/dish_images.json", "w"), ensure_ascii=False, indent=1)
print(f"{len(out)} of {len(dishes)} dishes with a Wikipedia article got a photo")
