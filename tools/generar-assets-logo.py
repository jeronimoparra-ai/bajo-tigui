#!/usr/bin/env python3
"""
Genera las variantes del logo a partir del trazo de tools/vectorizar-logo.py.

Salidas:
  public/brand/logo-icono.svg        color, recortado, fondo transparente
  public/brand/logo-mono-tinta.svg   silueta de un color (tinta)
  public/brand/logo-mono-blanco.svg  silueta de un color (blanco)
  public/brand/logo-sobre-oscuro.svg color sobre placa crema (para fondos oscuros)
  public/brand/logo-horizontal.svg   ícono + wordmark (texto vivo, ver nota)
  public/brand/logo-vertical.svg     apilado (texto vivo, ver nota)
  public/brand/favicon.svg           ícono sobre placa crema redondeada
  public/brand/favicon-32.png, apple-touch-icon.png (180), icon-512.png
  docs/diseno/assets/_variantes.png  montaje de revisión

Nota: los lockups llevan el wordmark como TEXTO con font-family "Archivo" (900, itálica real;
Bricolage Grotesque NO tiene itálica). Se hornean a paths/PNG en la Fase 1B (Playwright).
"""
from __future__ import annotations

import importlib.util
import subprocess
from pathlib import Path

from PIL import Image, ImageOps

RAIZ = Path(__file__).resolve().parent.parent
BRAND = RAIZ / "public/brand"
ASSETS = RAIZ / "docs/diseno/assets"
TMP = ASSETS

# Carga del módulo (el nombre tiene guion -> importlib)
spec = importlib.util.spec_from_file_location("vectorizar_logo", RAIZ / "tools/vectorizar-logo.py")
vl = importlib.util.module_from_spec(spec)
spec.loader.exec_module(vl)  # type: ignore[union-attr]

ESCALA = 8
PAD_PCT = 0.06


def svg_header(vb, w, h, extra: str = "") -> str:
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]} {vb[1]} {vb[2]} {vb[3]}" '
            f'width="{w}" height="{h}"{extra}>\n')


def main() -> int:
    potrace = vl.hallar_potrace()
    if not potrace:
        print("ERROR: falta potrace")
        return 1
    BRAND.mkdir(parents=True, exist_ok=True)
    w, h, paths, fg, bbox = vl.generar(potrace, ESCALA, "lanczos", 1.0, 16, tmp_dir=TMP)

    x0, y0, x1, y1 = bbox
    lado = max(x1 - x0, y1 - y0)
    pad = lado * PAD_PCT
    vb = (round(x0 - pad, 2), round(y0 - pad, 2), round((x1 - x0) + 2 * pad, 2), round((y1 - y0) + 2 * pad, 2))

    # --- 1. ícono a color, recortado -------------------------------------------------
    capas = []
    for nombre in vl.ORDEN:
        d = paths.get(nombre)
        if not d:
            continue
        color = vl.COLORES[nombre]
        if nombre == "tinta":
            capas.append(f'  <path fill="{color}" d="{d}"/>')
        else:
            capas.append(f'  <path fill="{color}" stroke="{color}" stroke-width="0.4" '
                         f'stroke-linejoin="round" d="{d}"/>')
    grupo = (f'  <g transform="matrix({1 / ESCALA} 0 0 {-1 / ESCALA} 0 {h})">\n'
             + "\n".join(capas) + "\n  </g>\n")
    icono = (svg_header(vb, vb[2], vb[3], ' role="img" aria-label="Antena Parabólica Bajo Tigui"')
             + grupo + "</svg>\n")
    (BRAND / "logo-icono.svg").write_text(icono)

    # --- 2. versiones monocromas: SOLO la línea dibujada (tinta) ---------------------
    # La unión de todos los rellenos da una mancha irreconocible; el trazo de línea
    # (contorno grueso) sí se lee como marca en un solo color.
    d_tinta = paths.get("tinta", "")
    for nombre_archivo, color in (("logo-mono-tinta.svg", "#0B0B0B"), ("logo-mono-blanco.svg", "#FFFFFF")):
        s = (svg_header(vb, vb[2], vb[3], ' role="img" aria-label="Antena Parabólica Bajo Tigui"')
             + f'  <g transform="matrix({1 / ESCALA} 0 0 {-1 / ESCALA} 0 {h})">\n'
             + f'  <path fill="{color}" d="{d_tinta}"/>\n  </g>\n</svg>\n')
        (BRAND / nombre_archivo).write_text(s)

    # --- 3. logo sobre fondo oscuro (placa crema) -----------------------------------
    placa = (round(x0 - pad * 2, 2), round(y0 - pad * 2, 2),
             round((x1 - x0) + 4 * pad, 2), round((y1 - y0) + 4 * pad, 2))
    r = round(lado * 0.14, 2)
    sobre_oscuro = (svg_header(placa, placa[2], placa[3],
                               ' role="img" aria-label="Antena Parabólica Bajo Tigui"')
                    + f'  <rect x="{placa[0]}" y="{placa[1]}" width="{placa[2]}" height="{placa[3]}" '
                      f'rx="{r}" fill="#F7F4EC"/>\n'
                    + grupo + "</svg>\n")
    (BRAND / "logo-sobre-oscuro.svg").write_text(sobre_oscuro)

    # --- 4. favicon: traza ligera + placa crema redondeada --------------------------
    # El ícono completo es muy detallado para 16-32 px: se usa una traza más gruesa
    # (menos nodos) para que el archivo pese poco y se lea en tamaños pequeños.
    w2, h2, paths2, _, bbox2 = vl.generar(potrace, 4, "lanczos", 2.0, 10, tmp_dir=TMP)
    x0b, y0b, x1b, y1b = bbox2
    lado2 = max(x1b - x0b, y1b - y0b)
    pad2 = lado2 * PAD_PCT
    vb2 = (round(x0b - pad2, 2), round(y0b - pad2, 2),
           round((x1b - x0b) + 2 * pad2, 2), round((y1b - y0b) + 2 * pad2, 2))
    placa2 = (round(x0b - pad2 * 2, 2), round(y0b - pad2 * 2, 2),
              round((x1b - x0b) + 4 * pad2, 2), round((y1b - y0b) + 4 * pad2, 2))
    capas2 = []
    for nombre in vl.ORDEN:
        d = paths2.get(nombre)
        if not d:
            continue
        color = vl.COLORES[nombre]
        if nombre == "tinta":
            capas2.append(f'  <path fill="{color}" d="{d}"/>')
        else:
            capas2.append(f'  <path fill="{color}" stroke="{color}" stroke-width="0.4" '
                          f'stroke-linejoin="round" d="{d}"/>')
    fav = (svg_header(placa2, placa2[2], placa2[3],
                      ' role="img" aria-label="Antena Parabólica Bajo Tigui"')
           + f'  <rect x="{placa2[0]}" y="{placa2[1]}" width="{placa2[2]}" height="{placa2[3]}" '
             f'rx="{round(lado2 * 0.14, 2)}" fill="#F7F4EC"/>\n'
           + f'  <g transform="matrix({1 / 4} 0 0 {-1 / 4} 0 {h2})">\n'
           + "\n".join(capas2) + "\n  </g>\n</svg>\n")
    (BRAND / "favicon.svg").write_text(fav)

    # --- 5. lockups con wordmark (texto vivo) ---------------------------------------
    ic_h = 236.0                    # alto del ícono en el lockup horizontal
    ic_s = ic_h / h                 # escala del ícono (h = alto nativo 251)
    horizontal = (svg_header((0, 0, 900, 264), 900, 264,
                             ' role="img" aria-label="Antena Parabólica Bajo Tigui"')
                  + f'  <g transform="translate(4,12) scale({ic_s:.4f})">\n'
                    f'    <g transform="matrix({1 / ESCALA} 0 0 {-1 / ESCALA} 0 {h})">\n'
                  + "\n".join(capas) + "\n    </g>\n  </g>\n"
                  + '  <g font-family="\'Archivo\', system-ui, sans-serif" fill="#0B0B0B">\n'
                  + '    <text x="278" y="112" font-size="44" font-weight="700" letter-spacing="1.5">ANTENA PARABÓLICA</text>\n'
                  + '    <text x="276" y="196" font-size="82" font-weight="900" font-style="italic" '
                    'letter-spacing="-1" fill="#002E84">BAJO TIGUI</text>\n'
                  + '  </g>\n</svg>\n')
    (BRAND / "logo-horizontal.svg").write_text(horizontal)

    icv_h = 300.0
    icv_s = icv_h / h
    icx = (420 - w * icv_s) / 2
    vertical = (svg_header((0, 0, 420, 560), 420, 560,
                           ' role="img" aria-label="Antena Parabólica Bajo Tigui"')
                + f'  <g transform="translate({icx:.1f},8) scale({icv_s:.4f})">\n'
                  f'    <g transform="matrix({1 / ESCALA} 0 0 {-1 / ESCALA} 0 {h})">\n'
                + "\n".join(capas) + "\n    </g>\n  </g>\n"
                + '  <g font-family="\'Archivo\', system-ui, sans-serif" text-anchor="middle">\n'
                + '    <text x="210" y="420" font-size="32" font-weight="700" letter-spacing="1.5" fill="#0B0B0B">ANTENA PARABÓLICA</text>\n'
                + '    <text x="210" y="492" font-size="56" font-weight="900" font-style="italic" fill="#002E84">BAJO TIGUI</text>\n'
                + '  </g>\n</svg>\n')
    (BRAND / "logo-vertical.svg").write_text(vertical)

    # --- 6. rasterizados + artefactos de revisión -----------------------------------
    exports = [("favicon-32.png", 32), ("apple-touch-icon.png", 180), ("icon-512.png", 512)]
    for archivo, tam in exports:
        subprocess.run(["convert", "-strip", "-background", "none", str(BRAND / "favicon.svg"),
                        "-resize", f"{tam}x{tam}", str(BRAND / archivo)], check=False)

    def render(svg: Path, bg: str, ancho: str, out: str):
        subprocess.run(["convert", "-strip", "-background", bg, str(svg), "-resize", ancho, "-flatten",
                        str(ASSETS / out)], check=False)

    render(BRAND / "logo-icono.svg", "white", "512x", "_v-icono.png")
    render(BRAND / "logo-mono-tinta.svg", "#F7F4EC", "512x", "_v-mono-tinta.png")
    render(BRAND / "logo-mono-blanco.svg", "#002E84", "512x", "_v-mono-blanco.png")
    render(BRAND / "logo-sobre-oscuro.svg", "#002E84", "512x", "_v-oscuro.png")
    render(BRAND / "logo-horizontal.svg", "#F7F4EC", "700x", "_v-horizontal.png")
    render(BRAND / "logo-vertical.svg", "#F7F4EC", "320x", "_v-vertical.png")
    subprocess.run(["convert", "-strip", *[str(ASSETS / t) for t in
                                 ("_v-icono.png", "_v-mono-tinta.png", "_v-mono-blanco.png", "_v-oscuro.png")],
                    "-resize", "240x", "-background", "white", "-gravity", "center",
                    "-extent", "260x280", "+append", str(ASSETS / "_variantes.png")], check=False)
    subprocess.run(["convert", "-strip", str(ASSETS / "_v-horizontal.png"), str(ASSETS / "_v-vertical.png"),
                    "-background", "white", "-gravity", "center", "-extent", "700x640", "+append",
                    str(ASSETS / "_v-lockups.png")], check=False)
    subprocess.run(["convert", "-strip", str(BRAND / "favicon-32.png"), "-scale", "900%",
                    "-background", "white", "-flatten", str(ASSETS / "_favicon-32-zoom.png")], check=False)
    for t in ("_v-icono.png", "_v-mono-tinta.png", "_v-mono-blanco.png", "_v-oscuro.png",
              "_v-horizontal.png", "_v-vertical.png"):
        (ASSETS / t).unlink(missing_ok=True)

    # comparaciones original vs trazo
    subprocess.run(["convert", "-strip", str(vl.SRC), "-background", "white", "-alpha", "remove", "-alpha", "off",
                    "-resize", "560x", str(ASSETS / "_o.png")], check=False)
    subprocess.run(["convert", "-strip", "-background", "white", str(ASSETS / "logo-traza.svg"), "-alpha", "remove",
                    "-alpha", "off", "-resize", "560x", str(ASSETS / "_t.png")], check=False)
    for base in ("_o", "_t"):
        subprocess.run(["convert", "-strip", str(ASSETS / f"{base}.png"), "-bordercolor", "#bbbbbb",
                        "-border", "3", str(ASSETS / f"{base}b.png")], check=False)
    subprocess.run(["convert", "-strip", str(ASSETS / "_ob.png"), str(ASSETS / "_tb.png"), "+append",
                    str(ASSETS / "_comparacion.png")], check=False)
    subprocess.run(["composite", "-dissolve", "50", str(ASSETS / "_o.png"), str(ASSETS / "_t.png"),
                    str(ASSETS / "_ov.png")], check=False)
    subprocess.run(["convert", "-strip", str(ASSETS / "_ov.png"), "-bordercolor", "#bbbbbb", "-border", "3",
                    str(ASSETS / "_ovb.png")], check=False)
    subprocess.run(["convert", "-strip", str(ASSETS / "_ob.png"), str(ASSETS / "_tb.png"), str(ASSETS / "_ovb.png"),
                    "+append", str(ASSETS / "_overlay.png")], check=False)
    for t in ("_o.png", "_t.png", "_ob.png", "_tb.png", "_ov.png", "_ovb.png",
              "_verificacion-original.png", "_verificacion-traza.png", "_triple.png"):
        (ASSETS / t).unlink(missing_ok=True)

    print("Variantes escritas en public/brand/")
    for p in sorted(BRAND.glob("*")):
        print(f"  {p.name:24} {p.stat().st_size / 1024:7.1f} KB")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
