# Builds the app icon and in-app logo from 'inspo/Asian Food.jpeg' (green bowl on white). Launch screen colour: res/values/splash.xml.
# Run from app/: python3 scripts/make_icons.py   (needs Pillow)
from PIL import Image, ImageDraw

SRC = '../inspo/Asian Food.jpeg'
CROP = (250, 158, 486, 394)  # square around the bowl, chopsticks and steam (art bbox 296,182-440,370)
PAPER = (255, 255, 255)      # the logo's white background
RES = 'android/app/src/main/res'
DENSITY = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}

art = Image.open(SRC).convert('RGB').crop(CROP)


def on_paper(size, art_frac, mask=None):
    """Art centred on a white square; mask 'round' or 'rounded' cuts the legacy icon shapes."""
    canvas = Image.new('RGBA', (size, size), PAPER + (255,))
    a = int(size * art_frac)
    canvas.paste(art.resize((a, a), Image.LANCZOS), ((size - a) // 2, (size - a) // 2))
    if mask:
        m = Image.new('L', (size, size), 0)
        d = ImageDraw.Draw(m)
        if mask == 'round': d.ellipse((0, 0, size - 1, size - 1), fill=255)
        else: d.rounded_rectangle((0, 0, size - 1, size - 1), radius=size // 6, fill=255)
        canvas.putalpha(m)
    return canvas


for name, k in DENSITY.items():
    # Adaptive icon: 108dp layer, launcher masks to the inner ~72dp, so the art stays within ~64%.
    on_paper(int(108 * k), 0.64).save(f'{RES}/mipmap-{name}/ic_launcher_foreground.png')
    on_paper(int(48 * k), 0.92, 'rounded').save(f'{RES}/mipmap-{name}/ic_launcher.png')
    on_paper(int(48 * k), 0.86, 'round').save(f'{RES}/mipmap-{name}/ic_launcher_round.png')

on_paper(512, 0.7).convert('RGB').save('public/logo.jpg', quality=85, optimize=True)  # in-app logo; margin so round frames don't clip it
on_paper(64, 0.9, 'round').save('public/favicon.png')
print('icons + logo done')
