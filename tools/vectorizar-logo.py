#!/usr/bin/env python3
"""
Vectoriza identidad-visual/marca/logo_APBT.png por capas de color usando potrace
y evalúa el resultado contra el original (error medio por píxel).

Método:
  1. Clasifica a resolución nativa cada píxel al color de marca más cercano.
  2. Descarta el "lienzo" (blanco conectado al borde).
  3. Apertura morfológica por capa para borrar halos de anti-aliasing.
  4. Amplía cada máscara (LANCZOS + umbral) y traza con potrace.
  5. Apila rellenos y, arriba, la tinta del contorno.
  6. potrace entrega las Y con el origen abajo -> el grupo SVG las voltea.

Mejores parámetros medidos (error medio / píxeles malos):
    escala=8  interp=lanczos  opttol=1.0  turdsize=16  -> 6.9/255 · 4.4 %

Uso:
    python3 tools/vectorizar-logo.py [--escala 8] [--interp lanczos] [--opttol 1.0]
        [--turdsize 16] [--out docs/diseno/assets/logo-traza.svg]

La API `generar()` la usa tools/generar-assets-logo.py para producir las variantes.
"""
from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
SRC = RAIZ / "identidad-visual/marca/logo_APBT.png"

UMBRAL_TINTA = 110   # luminancia máx. para considerar un píxel "tinta"
NEAR_WHITE = 235     # mínimo de canal para considerar "casi blanco"

COLORES = {
    "blanco":   "#FFFFFF",
    "gris":     "#EDEDED",
    "cian":     "#DEFAFA",
    "celeste":  "#8FCCF0",
    "agua":     "#A1D9D4",
    "azul":     "#6E99E0",
    "amarillo": "#FFE600",
    "naranja":  "#FF9900",
    "tinta":    "#000000",
}
ORDEN = ["blanco", "gris", "cian", "celeste", "agua", "azul", "amarillo", "naranja", "tinta"]
RELLENO = [c for c in ORDEN if c != "tinta"]


def hallar_potrace() -> str | None:
    local = RAIZ / "tools/.local/bin/potrace"
    return str(local) if local.exists() else shutil.which("potrace")


def rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


PAL_RGB = {k: rgb(v) for k, v in COLORES.items()}
COLOR_RELLENO = {k: PAL_RGB[k] for k in RELLENO}


def clasificar(px: tuple[int, int, int]) -> str:
    r, g, b = px
    if max(r, g, b) < UMBRAL_TINTA:
        return "tinta"
    if min(r, g, b) >= NEAR_WHITE:
        return "canvas"
    mejor, mejor_d = "gris", 1 << 30
    for nombre, (cr, cg, cb) in COLOR_RELLENO.items():
        d = (r - cr) ** 2 + (g - cg) ** 2 + (b - cb) ** 2
        if d < mejor_d:
            mejor, mejor_d = nombre, d
    return mejor


def detectar_lienzo(clase: list[list[str]], w: int, h: int) -> list[list[bool]]:
    lienzo = [[False] * w for _ in range(h)]
    cola: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if clase[y][x] == "canvas":
                lienzo[y][x] = True
                cola.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if clase[y][x] == "canvas" and not lienzo[y][x]:
                lienzo[y][x] = True
                cola.append((x, y))
    while cola:
        x, y = cola.popleft()
        for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nx, ny = x + dx, y + dy
            if 0 <= nx < w and 0 <= ny < h and not lienzo[ny][nx] and clase[ny][nx] == "canvas":
                lienzo[ny][nx] = True
                cola.append((nx, ny))
    return lienzo


def potrace_svg(potrace: str, pgm: Path, turdsize: int, opttol: float) -> str:
    svg = pgm.with_suffix(".out.svg")
    subprocess.run([potrace, "--svg", "--turdsize", str(turdsize), "--alphamax", "1.0",
                    "--opttolerance", str(opttol), "--unit", "1", "-o", str(svg), str(pgm)], check=True)
    return " ".join(re.findall(r'<path[^>]*\bd="([^"]+)"', svg.read_text()))


def generar(potrace: str, escala: int = 8, interp: str = "lanczos", opttol: float = 1.0,
            turdsize: int = 16, tmp_dir: Path | None = None):
    """Devuelve (w, h, paths, fg_mask, bbox).

    paths: dict nombre -> cadena de "d" (en espacio x ESCALA, con Y invertida).
    fg_mask: Image "1" a resolución nativa con la silueta (todo lo que no es lienzo).
    bbox: (x0, y0, x1, y1) de la silueta a resolución nativa.
    """
    tmp_dir = tmp_dir or RAIZ / "docs/diseno/assets"
    base = Image.open(SRC).convert("RGB")
    w0, h0 = base.size
    px = base.load()
    clase = [[clasificar(px[x, y]) for x in range(w0)] for y in range(h0)]
    lienzo = detectar_lienzo(clase, w0, h0)

    fg = Image.new("1", (w0, h0), 0)
    fgp = fg.load()
    for y in range(h0):
        fila = clase[y]
        for x in range(w0):
            c = fila[x]
            if c != "canvas" or not lienzo[y][x]:
                if c != "canvas":
                    fgp[x, y] = 1

    res = Image.NEAREST if interp == "nearest" else Image.LANCZOS
    paths: dict[str, str] = {}
    for nombre in ORDEN:
        mask = Image.new("1", (w0, h0), 0)
        mp = mask.load()
        hay = False
        for y in range(h0):
            fila = clase[y]
            for x in range(w0):
                c = fila[x]
                if c == "tinta":
                    ok = nombre == "tinta"
                elif c == "canvas":
                    ok = nombre == "blanco" and not lienzo[y][x]
                else:
                    ok = c == nombre
                if ok:
                    mp[x, y] = 1
                    hay = True
        if not hay:
            continue
        nivel = mask.convert("L")
        if nombre != "tinta":
            nivel = nivel.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.MaxFilter(3))
            if nivel.getbbox() is None:
                continue
        if escala > 1:
            nivel = nivel.resize((w0 * escala, h0 * escala), res)
            if res is Image.LANCZOS:
                nivel = nivel.point(lambda v: 255 if v >= 128 else 0)
        pgm = tmp_dir / f"_capa-{nombre}.pgm"
        ImageOps.invert(nivel).save(pgm)
        d = potrace_svg(potrace, pgm, turdsize, opttol)
        pgm.unlink(missing_ok=True)
        pgm.with_suffix(".out.svg").unlink(missing_ok=True)
        if d:
            paths[nombre] = d
    return w0, h0, paths, fg, fg.getbbox()


def svg_color(w: int, h: int, paths: dict[str, str], escala: int, viewbox=None, pad: float = 0.0) -> str:
    vb = viewbox or (0, 0, w, h)
    capas = []
    for nombre in ORDEN:
        d = paths.get(nombre)
        if not d:
            continue
        color = COLORES[nombre]
        if nombre == "tinta":
            capas.append(f'  <path fill="{color}" d="{d}"/>')
        else:
            capas.append(f'  <path fill="{color}" stroke="{color}" stroke-width="0.4" '
                         f'stroke-linejoin="round" d="{d}"/>')
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]} {vb[1]} {vb[2]} {vb[3]}" '
        f'width="{vb[2]}" height="{vb[3]}" role="img" aria-label="Antena Parabólica Bajo Tigui">\n'
        f'  <g transform="matrix({1 / escala} 0 0 {-1 / escala} 0 {h})">\n'
        + "\n".join(capas) + "\n  </g>\n</svg>\n"
    )


def metricas(svg_original: Path, svg_traza: Path) -> str:
    base = Image.open(svg_original).convert("RGB")
    w, h = base.size
    tmp = svg_traza.with_name("_metric.png")
    subprocess.run(["convert", "-background", "white", str(svg_traza), "-alpha", "remove",
                    "-alpha", "off", "-resize", f"{w}x{h}!", str(tmp)], check=False)
    t = Image.open(tmp).convert("RGB")
    tmp.unlink(missing_ok=True)
    pb, pt = base.load(), t.load()
    suma = malos = 0
    for y in range(h):
        for x in range(w):
            rb, gb, bb = pb[x, y]
            rt, gt, bt = pt[x, y]
            d = (abs(rb - rt) + abs(gb - gt) + abs(bb - bt)) / 3
            suma += d
            malos += d > 48
    n = w * h
    return f"error medio={suma / n:5.2f}/255 · píxeles malos={100 * malos / n:5.2f}%"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--escala", type=int, default=8)
    ap.add_argument("--interp", choices=["nearest", "lanczos"], default="lanczos")
    ap.add_argument("--opttol", type=float, default=1.0)
    ap.add_argument("--turdsize", type=int, default=16)
    ap.add_argument("--out", default="docs/diseno/assets/logo-traza.svg")
    args = ap.parse_args()

    potrace = hallar_potrace()
    if not potrace:
        print("ERROR: no encuentro potrace (tools/.local/bin o PATH).", file=sys.stderr)
        return 1
    salida = RAIZ / args.out
    salida.parent.mkdir(parents=True, exist_ok=True)
    w, h, paths, fg, bbox = generar(potrace, args.escala, args.interp, args.opttol, args.turdsize,
                                    tmp_dir=salida.parent)
    salida.write_text(svg_color(w, h, paths, args.escala))
    print(f"{salida.name}: {len(paths)} capas · {salida.stat().st_size / 1024:.1f} KB · "
          f"escala={args.escala} interp={args.interp} opttol={args.opttol} turdsize={args.turdsize}")
    print("   ", metricas(SRC, salida))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
