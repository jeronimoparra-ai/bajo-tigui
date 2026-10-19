# public/brand — derivados del logo (uso en la web)

Los originales están intactos en `identidad-visual/marca/`. Aquí solo van **derivados**.

## Variantes previstas

| Archivo | Uso | Estado |
|---|---|---|
| `logo-icono.svg` | Ícono canónico (color), favicon, marca de agua | ⏳ pendiente de potrace |
| `logo-mono-tinta.svg` | Silueta de un color (tinta) | ⏳ pendiente |
| `logo-mono-blanco.svg` | Silueta de un color (blanco) | ⏳ pendiente |
| `logo-horizontal.svg` | Ícono + "ANTENA PARABÓLICA / BAJO TIGUI" | ⏳ pendiente |
| `logo-vertical.svg` | Apilado | ⏳ pendiente |
| `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` | Navegador / iOS / PWA | ⏳ pendiente |
| `og-1200x630.png` | Open Graph / WhatsApp | ⏳ pendiente (se hornea en la 1B con Playwright) |

## Reglas

- No deformar, no recolorear fuera de `docs/diseno/tokens.css`, no aplicar degradados.
- **Sobre fondos oscuros** el logo va sobre una **placa crema** (`#F7F4EC`) o se usa la
  versión monocroma: el contorno negro del logo desaparece sobre navy.
- Zona de protección: 25 % del ancho del ícono. Tamaño mínimo del ícono: 24 px digital.
- El **wordmark** usa Bricolage Grotesque Black; en los SVG se entrega como texto con
  `font-family` y se hornea a paths/PNG (Playwright) para OG, favicon y correos.
