# Assets de diseño — trazo del logo

Derivados de `identidad-visual/marca/logo_APBT.png` (original intacto).
Reproducible con los scripts de `tools/`.

## Pipeline y parámetros

```bash
# potrace 1.16 compilado dentro del proyecto (no requirió sudo):
#   tools/vendor/potrace-1.16  ->  tools/.local/bin/potrace
python3 tools/vectorizar-logo.py --out docs/diseno/assets/logo-traza.svg   # traza cruda + métrica
python3 tools/generar-assets-logo.py                                       # variantes + revisiones
```

Parámetros elegidos tras un barrido medido (`tools/vectorizar-logo.py` imprime la métrica):

| Configuración | Peso | Error medio | Píxeles malos |
|---|---|---|---|
| escala 8 · nearest · opttol 0.2 | 60,8 KB | 7,77/255 | 5,48 % |
| **escala 8 · lanczos · opttol 1.0** ✅ | **77,7 KB** | **6,93/255** | **4,43 %** |
| escala 12 · lanczos · opttol 1.0 | 104,1 KB | 6,84/255 | 4,39 % |

Método: clasificación a resolución nativa → descarte del lienzo (blanco conectado al borde) →
apertura morfológica por capa (borra halos de anti-aliasing) → ampliación LANCZOS + umbral →
potrace por capa → apilado (rellenos debajo, tinta arriba) → volteo del eje Y (potrace usa
origen abajo). Compresión real: el ícono pasa de 77,7 KB a **15,3 KB en gzip**.

## Artefactos de revisión

| Archivo | Qué muestra |
|---|---|
| `logo-traza.svg` | Traza cruda por capas (8 capas), sin recortar |
| `_comparacion.png` | Original \| traza, lado a lado |
| `_overlay.png` | Original \| traza \| superposición al 50 % (verificación de alineación) |
| `_variantes.png` | Ícono color · monocromo tinta · monocromo blanco sobre navy · logo sobre placa |
| `_v-lockups.png` | Lockups horizontal y vertical |
| `_favicon-32-zoom.png` | Favicon a 32 px ampliado 900 % (evidencia de legibilidad) |

## Limitaciones conocidas (para tu decisión)

1. **Es una traza automática de un PNG de 262×251 px.** La forma se conserva, pero los bordes
   anti-alias se aproximan; los microdetalles (tramas, guiones finos) se simplifican.
   Para impresión de gran formato conviene una versión vectorial de origen (no existe hoy).
2. **Favicon de 32 px:** el logo completo es muy detallado a ese tamaño (ver `_favicon-32-zoom.png`).
   Se entrega igual; si quieres, en la 1B se evalúa una versión recortada a la parabólica.
3. **Lockups:** el wordmark va como **texto vivo** (`font-family: Bricolage Grotesque`). Se hornea a
   paths/PNG en la 1B con Playwright, ya con la fuente real cargada.
