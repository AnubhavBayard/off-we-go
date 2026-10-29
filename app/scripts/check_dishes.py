# Validates app/src/data/dishes_*.json. Run: python3 scripts/check_dishes.py
import glob, json, sys

CATS = {"sweet", "street_food", "meal", "pitha", "temple_food", "snack", "drink"}
ALLERGENS = {"dairy", "gluten", "nuts", "peanuts", "sesame", "shellfish", "fish", "egg", "soy", "mustard"}
KEYS = {"id", "name", "local_name", "pronunciation", "category", "state", "regions", "description", "how_to_eat",
        "how_to_order", "typical_price_inr", "diet", "jain", "vegan", "spice", "allergens", "gi_tag",
        "wikipedia_url", "source_urls"}

def check(dishes, fname):
    errs = []
    for d in dishes:
        tag = f"{fname}:{d.get('id')}"
        if set(d) != KEYS: errs.append(f"{tag} keys off: missing {KEYS - set(d)}, extra {set(d) - KEYS}"); continue
        if d["category"] not in CATS: errs.append(f"{tag} bad category {d['category']}")
        if d["diet"] not in ("veg", "nonveg", "egg"): errs.append(f"{tag} bad diet {d['diet']}")
        if d["spice"] not in (0, 1, 2, 3): errs.append(f"{tag} bad spice {d['spice']}")
        if not set(d["allergens"]) <= ALLERGENS: errs.append(f"{tag} bad allergens {d['allergens']}")
        if d["diet"] != "veg" and (d["jain"] or d["vegan"]): errs.append(f"{tag} non-veg marked jain/vegan")
        if d["vegan"] and "dairy" in d["allergens"]: errs.append(f"{tag} vegan with dairy")
        if not d["source_urls"]: errs.append(f"{tag} no sources")
        if not isinstance(d["regions"], list) or not d["state"]: errs.append(f"{tag} bad state/regions")
    return errs

if __name__ == "__main__":
    errs, ids, total = [], {}, 0
    for f in sorted(glob.glob("src/data/dishes_*.json")):
        dishes = json.load(open(f)); total += len(dishes)
        errs += check(dishes, f)
        for d in dishes:
            if d.get("id") in ids: errs.append(f"duplicate id {d['id']} in {f} and {ids[d['id']]}")
            ids[d.get("id")] = f
        print(f"{f}: {len(dishes)}")
    print(f"total {total}")
    assert check([{"id": "x"}], "t"), "self-check: missing keys must fail"
    print("\n".join(errs) or "OK"); sys.exit(1 if errs else 0)
