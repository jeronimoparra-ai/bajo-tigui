# public/brand — derivados del logo (uso en la web)

Los originales están intactos en `identidad-visual/marca/`. Aquí solo hay **derivados**
generados por `tools/generar-assets-logo.py` a partir de la traza de `tools/vectorizar-logo.py`.

## Entregado (Fase 1A)

| Archivo | Peso (gzip) | Uso |
|---|---|---|
| `logo-icono.svg` | 77,7 KB (15,3 KB) | Ícono a color, recortado, fondo transparente. Cabecera, footer, contenido |
| `logo-mono-tinta.svg` | 37,1 KB (8,6 KB) | Línea en tinta `#0B0B0B`. Sellos, grabados, fondos claros |
| `logo-mono-blanco.svg` | 37,1 KB (8,6 KB) | Línea en blanco. Fondos navy/fotos oscuras |
| `logo-sobre-oscuro.svg` | 77,8 KB (15,5 KB) | Ícono color sobre **placa crema** redondeada: tratamiento para fondos oscuros |
| `logo-horizontal.svg` | 78,0 KB (15,5 KB) | Ícono + "ANTENA PARABÓLICA / BAJO TIGUI" |
| `logo-vertical.svg` | 78,0 KB | Apilado |
| `favicon.svg` | 56,6 KB (11,1 KB) | Favicon (traza más ligera, placa crema) |
| `favicon-32.png`, `apple-touch-icon.png` (180), `icon-512.png` | 5 / 74 / 406 KB | Navegador, iOS, PWA |

## Reglas de uso

- No deformar, no recolorear fuera de `docs/diseno/tokens.css`, no aplicar degradados.
- **Sobre fondos oscuros** el contorno negro desaparece: usar `logo-sobre-oscuro.svg`
  (placa crema) o `logo-mono-blanco.svg`. **No** poner `logo-icono.svg` directo sobre navy.
- Zona de protección: 25 % del ancho del ícono. Tamaño mínimo del ícono: 24 px digital.
- **No usar las caras de las familias** de los flyers en el sitio.

## Pendiente (Fase 1B)

- `og-1200x630.png` (Open Graph / WhatsApp) horneado con Playwright.
- Lockups `logo-horizontal.svg` / `logo-vertical.svg` con el **wordmark convertido a paths**
  (hoy va como texto vivo con la fuente Bricolage Grotesque).
- Evalúa si se recorta el ícono para el favicon de 16–32 px.
