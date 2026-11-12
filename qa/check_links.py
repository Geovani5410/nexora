"""Revisa que todos los enlaces, imágenes y anclas internas del sitio existan.
Uso: python3 qa/check_links.py   (desde la carpeta del sitio; no necesita instalar nada)"""
import os, sys, glob
from html.parser import HTMLParser
from urllib.parse import urlparse, unquote
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
class P(HTMLParser):
    def __init__(s): super().__init__(); s.ids=set(); s.refs=[]; s.imgs_sin_alt=[]
    def handle_starttag(s, tag, a):
        a = dict(a)
        if 'id' in a: s.ids.add(a['id'])
        for k in ('href', 'src'):
            if k in a: s.refs.append((tag, a[k]))
        if tag == 'img' and 'alt' not in a: s.imgs_sin_alt.append(a.get('src'))
pages = {}
for f in sorted(glob.glob(ROOT + '/*.html')):
    p = P(); p.feed(open(f, encoding='utf-8').read()); pages[os.path.basename(f)] = p
errores = 0
for name, p in pages.items():
    for tag, ref in p.refs:
        u = urlparse(ref)
        if u.scheme in ('http', 'https', 'mailto', 'tel'): continue
        target = unquote(u.path) or name
        if not os.path.exists(os.path.join(ROOT, target)):
            print(f'[ERROR] {name}: no existe {ref}'); errores += 1; continue
        if u.fragment and target.endswith('.html') and u.fragment not in pages[target].ids:
            print(f'[ERROR] {name}: el ancla #{u.fragment} no existe en {target}'); errores += 1
    for src in p.imgs_sin_alt: print(f'[ERROR] {name}: imagen sin texto alternativo {src}'); errores += 1
print(f'{len(pages)} páginas revisadas. Errores: {errores}')
sys.exit(1 if errores else 0)
