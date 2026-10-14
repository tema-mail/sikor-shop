"""Товары SIKOR из раздела «Товары» VK (снято 14.10.2026) → src/data/products.json + webp в public/img/p.
Разделы проставлены вручную по названию: в VK у товаров нет машинно читаемых подборок."""
import json, re, pathlib
from PIL import Image
ROOT = pathlib.Path(__file__).resolve().parent.parent
raw = json.loads((ROOT / 'data-src/vk-selected.json').read_text())
CATS = {
  'outer': [8, 12, 13, 15, 16, 31, 32, 86, 108, 138, 174, 175],
  'knit': [6, 7, 21, 28, 34, 36, 37, 95, 105, 106, 128, 130, 139, 141],
  'pants': [10, 11, 17],
  'shirts': [9, 19, 46, 50, 90, 99],
  'shoes': [0, 1, 3, 4, 83],
}
cat_of = {i: c for c, ids in CATS.items() for i in ids}
out = []
for k, v in raw.items():
    if k == 'cover': continue
    i = int(k)
    src = ROOT / f'data-src/photos/{i:03d}-0.jpg'
    im = Image.open(src).convert('RGB')
    # единая пропорция 3:4 – часть фото 1080×1920, режем по центру с небольшим смещением вверх
    w, h = im.size; th = round(w * 4 / 3)
    if h > th:
        top = round((h - th) * 0.35); im = im.crop((0, top, w, top + th))
    for W in (600, 1200):
        dst = ROOT / f'public/img/p/{v["id"]}-{W}.webp'
        if not dst.exists(): im.resize((W, round(W * 4 / 3)), Image.LANCZOS).save(dst, 'WEBP', quality=80)
    d = re.split(r'(?<=[.!])\s', v.get('descr', '').replace('\n', ' ').strip())[0]
    out.append({'n': i, 'id': v['id'], 'title': v['title'], 'price': int(v['price']), 'old': int(v['old']) if v.get('old') else None,
                'cat': cat_of[i], 'descr': d[:140]})
out.sort(key=lambda x: x['n'])
(ROOT / 'src/data/products.json').write_text(json.dumps(out, ensure_ascii=False, indent=1))
im = Image.open(ROOT / 'data-src/cover.jpg').convert('RGB')
for W in (960, 1920): im.resize((W, round(W * 768 / 1920)), Image.LANCZOS).save(ROOT / f'public/img/cover-{W}.webp', 'WEBP', quality=82)
print(len(out), {c: sum(1 for x in out if x['cat'] == c) for c in CATS})
