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
            if p.get("pageimage"): title_file[host, p["title"]] = (host, p["pageimage"])
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


out = {}
for d in dishes:
    f = title_file.get(resolve((host_of(d["wikipedia_url"]), title_of(d["wikipedia_url"]))))
    if f and f in info: out[d["id"]] = info[f]

json.dump(out, open("src/data/dish_images.json", "w"), ensure_ascii=False, indent=1)
print(f"{len(out)} of {len(dishes)} dishes with a Wikipedia article got a photo")
