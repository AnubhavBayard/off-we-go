# Builds the app icon and in-app logo from inspo/logo.jpeg. (Launch screen is plain cream: res/values/splash.xml.)
# Run from app/: python3 scripts/make_icons.py   (needs Pillow)
from PIL import Image, ImageDraw

SRC = '../inspo/logo.jpeg'
CROP = (147, 140, 577, 570)  # square around the bowl + sun
CREAM = (247, 239, 226)      # the logo's paper colour, #F7EFE2
RES = 'android/app/src/main/res'
DENSITY = {'mdpi': 1, 'hdpi': 1.5, 'xhdpi': 2, 'xxhdpi': 3, 'xxxhdpi': 4}

art = Image.open(SRC).convert('RGB').crop(CROP)


def on_cream(size, art_frac, mask=None):
    """Art centred on a cream square; mask 'round' or 'rounded' cuts the legacy icon shapes."""
    canvas = Image.new('RGBA', (size, size), CREAM + (255,))
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
    on_cream(int(108 * k), 0.64).save(f'{RES}/mipmap-{name}/ic_launcher_foreground.png')
    on_cream(int(48 * k), 0.92, 'rounded').save(f'{RES}/mipmap-{name}/ic_launcher.png')
    on_cream(int(48 * k), 0.86, 'round').save(f'{RES}/mipmap-{name}/ic_launcher_round.png')

art.resize((512, 512), Image.LANCZOS).save('public/logo.jpg', quality=85, optimize=True)  # in-app logo
on_cream(64, 0.9, 'round').save('public/favicon.png')
print('icons + logo done')
