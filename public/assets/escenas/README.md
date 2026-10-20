# Escenas de fondo

Imágenes derivadas que alimentan los fondos fijos por módulo de las maquetas.

## Origen y autorización

| Archivo derivado | Original | Autorización |
|---|---|---|
| `escena-poste.webp` | `identidad-visual/referencia/images.jpeg` | El cliente declaró el 2026-10-19 que la foto es propia o tiene derechos para publicarla. |
| `escena-cables.webp` | `identidad-visual/referencia/images (1).jpeg` | El cliente declaró el 2026-10-19 que la foto es propia o tiene derechos para publicarla. |

No provienen de SUNTEC, Cable Familia ni de los bancos de imágenes con marca de
agua (Shutterstock, Dreamstime) que también están en `referencia/`. Esas siguen
prohibidas.

## Tratamiento

- Recorte 16:9, 1600×900 px.
- Duotono `#001A4D` → `#9FD6F2`, con desenfoque leve para que la ampliación se
  lea como textura y no como pixelado.
- WebP calidad 84, ~75 KB por imagen.
- El velo navy (84–90 %) y la trama de puntos van en CSS (`_base.css`, sección
  16). No están horneados en la imagen: así se puede ajustar el contraste sin
  regenerar el archivo.

## Reglas

- No usar caras identificables sin consentimiento (Ley 1581 de 2012).
- Si se reemplazan por fotos propias en alta resolución, conservar el duotono y
  el mismo nombre de archivo para no tocar el CSS.
- No redistribuir estas imágenes fuera del sitio.
