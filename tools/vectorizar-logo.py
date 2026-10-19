#!/usr/bin/env python3
"""
Vectoriza identidad-visual/marca/logo_APBT.png por capas de color usando potrace.

Estrategia (opción A acordada):
  1. Compone el PNG (que trae fondo blanco incrustado) sobre blanco y lo amplía x4
     con LANCZOS para suavizar bordes antes de trazar.
  2. Clasifica cada píxel al color de marca más cercano (paleta real del logo).
  3. Detecta el "lienzo" (blanco conectado al borde) y lo descarta.
  4. Traza cada capa de color con potrace y las apila (rellenos debajo, negro arriba).
  5. Escribe el SVG crudo y un PNG de verificación.

Uso:
    python3 tools/vectorizar-logo.py

Salidas:
    docs/diseno/assets/logo-traza.svg        (crudo, para revisión)
    docs/diseno/assets/_verificacion-traza.png
    docs/diseno/assets/_verificacion-original.png

Requiere: `potrace` en el PATH y Pillow. NO modifica los originales.
Después de revisar el trazo, la limpieza manual produce public/brand/logo-icono.svg.
"""
from __future__ import annotations

import re
import subprocess
import sys
from collections import deque
from pathlib import Path

from PIL import Image, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
SRC = RAIZ / "identidad-visual/marca/logo_APBT.png"
SALIDA = RAIZ / "docs/diseno/assets"

ESCALA = 4               # ampliación previa al trazado
UMBRAL_COLOR = 60        # distancia RGB máxima para asignar al color más cercano
TURDSIZE = 12            # descarta manchas menores (px, en espacio x4)
ORDEN_VERIFICACION = Path  # placeholder de tipo (no usado)

# Paleta de marca observada en el logo (misma que tokens.css)
PALETA = [
    ("canvas", "#FFFFFF"),   # fondo incrustado (se descarta)
    ("gris",   "#EDEDED"),
    ("cian",   "#DEFAFA"),
    ("celeste","#8FCCF0"),
    ("agua",   "#A1D9D4"),
    ("azul",   "#6E99E0"),
    ("amarillo","#FFE600"),
    ("naranja","#FF9900"),
    ("tinta",  "#000000"),
]

# Orden de apilado (de abajo hacia arriba). La tinta va al final: es el contorno.
ORDEN_CAPAS = ["gris", "cian", "celeste", "agua", "azul", "amarillo", "naranja", "tinta"]


def hex_rgb(h: str) -> tuple[int, int, int]:
    h = h.lstrip("#")
    return int(h[0:2], 16), int(h[2:4], 16), int(h[4:6], 16)


def asignar_clase(px: tuple[int, int, int]) -> str:
    mejor, mejor_d = "canvas", 1e9
    for nombre, hx in PALETA:
        r, g, b = hex_rgb(hx)
        d = (px[0] - r) ** 2 + (px[1] - g) ** 2 + (px[2] - b) ** 2
        if d < mejor_d:
            mejor, mejor_d = nombre, d
    return mejor if mejor_d <= UMBRAL_COLOR ** 2 else "otro"


def detectar_lienzo(clase: list[list[str]], w: int, h: int) -> list[list[bool]]:
    """Inunda desde el borde el color 'canvas' para separar fondo de blancos internos."""
    lienzo = [[False] * w for _ in range(h)]
    cola: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if clase[y][x] == "canvas" and not lienzo[y][x]:
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


def escribir_pbm(mask: list[list[bool]], w: int, h: int, destino: Path) -> None:
    filas = bytearray()
    for y in range(h):
        bits = bytearray()
        byte = 0
        nbits = 0
        for x in range(w):
            byte = (byte << 1) | (1 if mask[y][x] else 0)
            nbits += 1
            if nbits == 8:
                bits.append(byte)
                byte = 0
                nbits = 0
        if nbits:
            bits.append(byte << (8 - nbits))
        filas += bits
    destino.write_bytes(b"P4\n%d %d\n" % (w, h) + bytes(filas))


def trazar(pbm: Path) -> str:
    salida = pbm.with_suffix(".svg")
    subprocess.run(
        ["potrace", "--svg", "--turdsize", str(TURDSIZE), "--alphamax", "1.0",
         "--opttolerance", "0.2", "--unit", "1", "-o", str(salida), str(pbm)],
        check=True,
    )
    svg = salida.read_text()
    return " ".join(re.findall(r'<path[^>]*\bd="([^"]+)"', svg))


def main() -> int:
    if subprocess.run(["which", "potrace"], capture_output=True).returncode != 0:
        print("ERROR: potrace no está en el PATH. Instálalo con: sudo apt install potrace", file=sys.stderr)
        return 1
    if not SRC.exists():
        print(f"ERROR: no existe {SRC}", file=sys.stderr)
        return 1

    SALIDA.mkdir(parents=True, exist_ok=True)

    base = Image.open(SRC).convert("RGB")
    w0, h0 = base.size
    img = base.resize((w0 * ESCALA, h0 * ESCALA), Image.LANCZOS)
    w, h = img.size
    px = img.load()

    # 1) clasificación
    clase = [[asignar_clase(px[x, y]) for x in range(w)] for y in range(h)]
    # 2) lienzo
    lienzo = detectar_lienzo(clase, w, h)

    capas: list[tuple[str, list[list[bool]]]] = []
    for nombre, _ in PALETA:
        if nombre == "canvas":
            continue
        mask = [[False] * w for _ in range(h)]
        hay = False
        for y in range(h):
            fila = clase[y]
            for x in range(w):
                if fila[x] == nombre and not lienzo[y][x]:
                    mask[y][x] = True
                    hay = True
        if hay:
            capas.append((nombre, mask))

    # 3) trazar cada capa (con cierre morfológico para evitar costuras)
    por_nombre = dict(capas)
    grupo: list[str] = []
    for nombre in ORDEN_CAPAS:
        mask = por_nombre.get(nombre)
        if not mask:
            continue
        mimg = Image.new("1", (w, h), 0)
        mp = mimg.load()
        for y in range(h):
            for x in range(w):
                if mask[y][x]:
                    mp[x, y] = 1
        if nombre != "tinta":
            mimg = mimg.filter(ImageFilter.MaxFilter(3))
        pbm = SALIDA / f"_capa-{nombre}.pbm"
        escribir_pbm([[bool(mp[x, y]) for x in range(w)] for y in range(h)], w, h, pbm)
        d = trazar(pbm)
        color = dict(PALETA)[{"gris": "gris", "cian": "cian", "celeste": "celeste",
                              "agua": "agua", "azul": "azul", "amarillo": "amarillo",
                              "naranja": "naranja", "tinta": "tinta"}[nombre]]
        if d:
            grupo.append(f'  <path fill="{color}" d="{d}"/>')

    svg = (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w0} {h0}" '
        f'width="{w0}" height="{h0}" role="img" aria-label="Antena Parabólica Bajo Tigui">\n'
        f'  <g transform="scale({1/ESCALA})">\n' + "\n".join(grupo) + "\n  </g>\n</svg>\n"
    )
    destino = SALIDA / "logo-traza.svg"
    destino.write_text(svg)
    print(f"SVG crudo: {destino.relative_to(RAIZ)}")

    # 4) PNG de verificación (RSVG) + original para comparar
    subprocess.run(["convert", "-background", "none", str(destino), "-resize", "512x512",
                    str(SALIDA / "_verificacion-traza.png")], check=False)
    subprocess.run(["convert", str(SRC), "-resize", "512x512",
                    str(SALIDA / "_verificacion-original.png")], check=False)
    print("Verificación lista en docs/diseno/assets/_verificacion-*.png")
    for pbm in SALIDA.glob("_capa-*.pbm"):
        pbm.unlink()
    for pbm in SALIDA.glob("_capa-*.svg"):
        pbm.unlink()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
