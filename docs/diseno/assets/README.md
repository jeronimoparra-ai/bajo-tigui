# Assets de diseño

Derivados de `identidad-visual/marca/` (los originales no se tocan).

## Estado (Fase 1A)

| Archivo | Estado | Descripción |
|---|---|---|
| `logo-traza.svg` | ⏳ pendiente de ejecutar | Trazo crudo por capas de potrace (generado por `tools/vectorizar-logo.py`) |
| `_verificacion-original.png` | — | Original 512 px para comparar |
| `_verificacion-traza.png` | — | Render del trazo para comparar |

## Pipeline

```bash
# 1. Requisito (lo instala el usuario): sudo apt install potrace
# 2. Trazar por capas de color
python3 tools/vectorizar-logo.py
# 3. Revisar _verificacion-traza.png vs _verificacion-original.png
# 4. Limpieza manual y exportación a /public/brand
```

La limpieza manual ajusta: nodos redundantes, costuras entre capas, y snap final a
la paleta de `tokens.css`. El resultado final vive en `public/brand/`.
