#!/usr/bin/env bash
# Procesa fotos a duotono de marca (navy #001A4D -> celeste #9FD6F2), 1600x900, WebP q84.
# Recorta y desenfoca levemente: la ampliacion se lee como textura, no como pixelado.
set -euo pipefail

DIR="$(cd "$(dirname "$0")/.." && pwd)/public/assets/fotos"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

procesar() {
  local src="$1" out="$2" pos="${3:-center}"
  # Duotono: escala de grises invertida + paleta de la marca (celeste -> navy).
  # La receta con -clut es la que reproduce el duotono de docs/diseno/assets/escenas.
  magick "$src" \
    -auto-orient \
    -resize "1600x900^" \
    -gravity "$pos" -extent 1600x900 \
    -blur 0x5 \
    -colorspace Gray -negate \
    \( -size 256x1 gradient:"#9FD6F2-#001A4D" \) -clut \
    -fill "#001A4D" -colorize 22% \
    -quality 84 \
    "$out"
  echo "OK  $out ($(du -h "$out" | cut -f1))"
}

# Barrio colombiano (fotos propias de Wikimedia Commons, licencia libre).
procesar "$DIR/casa-colombiana-1.jpg" "$DIR/barrio-1.webp" center
procesar "$DIR/casa-colombiana-2.jpg" "$DIR/barrio-2.webp" center

echo "Listo."
