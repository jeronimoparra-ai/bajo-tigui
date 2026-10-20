# Inventario de identidad visual — Antena Parabólica Bajo Tigui

Fase 1A · `docs/diseno/inventario.md`
Levantado el 2026-10-19 sobre `identidad-visual/`. Los archivos originales **no se modificaron**:
se movieron sin tocar su contenido (verificado con los SHA-256 de abajo).

## 0. Estructura resultante

```
identidad-visual/
├── marca/        → SOLO LECTURA · fuente de verdad (versionada en git)
└── referencia/   → terceros / marcas de agua (excluida de git, solo consulta)
```

## 1. `identidad-visual/marca/` — fuente de verdad

| Archivo | Formato · dimensiones | Qué es | Colores y tipografías observados | Uso permitido |
|---|---|---|---|---|
| `logo_APBT.png` | PNG · 262×251 px · RGBA **con alfa 100 % opaca (fondo blanco incrustado)** · 32 KB | **LOGO OFICIAL y único símbolo canónico**: ilustración de parabólica, **sin texto/wordmark**. El SVG derivado es una **traza automática** (ver § 5) | `#6E99E0` azul · `#8FCCF0` celeste · `#A1D9D4` verde agua · `#DEFAFA`/`#B3FFFF` cian claro · `#000000` contorno grueso · `#EDEDED` gris · `#FF9900` y `#FFE600` acentos. Sin tipografía | ✅ **USAR** — se vectoriza a SVG sin alterar su forma |
| `Promoción Antena Parabólica Bajo Tigui.png` | PNG · 1536×1024 · 2,3 MB | Flyer de marca: 50 megas + TV 90 canales SD+HD, **1 mes gratis**, `$70.000`, WhatsApp 312 274 0219 | Navy `#003EA3`/`#0058B0` · cobalto `#0058B0` · celeste `#8FE4FE` · amarillo `#FEDC01` · naranja `#FE6301` · blanco. Display pesada **itálica con acabado de pincel** + sans geométrica humanista. Píldoras con ícono, ondas wifi, stickers, trazos de pincel, destellos | 🟡 **Solo referencia** de paleta, tipografía y lenguaje gráfico. No publicar tal cual |
| `Oferta de Antena y Televisión Familiar.png` | PNG · 1024×1536 · 2,1 MB | Flyer de marca: **2 meses gratis** + **instalación gratis** (contradice el anterior) | Mismos colores (`#002E84`, `#FEDC01`, `#FE6301`). Misma familia tipográfica | 🟡 **Solo referencia** |
| `Aviso importante sobre servicios parabólicos.png` | PNG · 1024×1536 · 1,5 MB | Aviso de marca: suspensión de parabólica con saldo superior a `37.000`, línea de atención, lema "que me es cumplido me es pago" | Navy `#00317E`/`#003080` · celeste `#308DCE`/`#8FE4FE` · blanco. Sans geométrica de cuerpo + titulares extra-bold achaflanados; retícula de puntos; esquinas cortadas | 🟡 **Solo referencia** (el aviso real será administrable) |

**Reglas de uso del material `marca/`**
- **Prohibido** modificar, renombrar, recomprimir o borrar estos archivos.
- Los derivados (SVG, WebP/AVIF optimizados, variantes de logo) van en `public/brand/` y `docs/diseno/assets/`.
- **No usar las caras de las familias** de los flyers en el sitio web (decisión del cliente).
- Los flyers usan **dos versiones distintas del símbolo** (insignia circular con franja naranja) que **no** son el logo canónico; no se reproducen.

## 2. `identidad-visual/referencia/` — terceros, solo consulta

| Archivo | Formato · dimensiones | Qué es | Motivo | Uso permitido |
|---|---|---|---|---|
| `WhatsApp Image 2026-09-22 at 2.26.37 PM (1).jpeg` | JPEG · 450×1125 | Flyer de la competencia **"Cable Familia"** | Material de un competidor | ❌ **No usar** (solo referencia de composición) |
| `a-satellite-dish-…-bangkok-thailand-photo.jpg` | JPEG · 735×980 | Antenas en azotea | **Marca de agua Vecteezy** | ❌ **No usar** |
| `una-antena-parabólica-…-340366001.webp` | WEBP · 800×800 | Ícono de parabólica en blanco y negro | **Marca de agua Dreamstime** | ❌ **No usar** |
| `electrician-full-ppe-…-260nw-2759596403.webp` | WEBP · 389×280 | Técnico en poste con EPP | **Marca de agua Shutterstock** (id 2759596403) | ❌ **No usar** |
| `img-trabajadores1.jpg` | JPEG · 772×733 | 7 operarios junto a transformador con rótulo **"SUNTEC"** | Empresa de terceros visible; sin marca Bajo Tigui | 🟡 **Solo referencia** (no usar sin licencia) |
| `images.jpeg` | JPEG · 739×415 | Liniero en poste | Sin autoría/licencia confirmada | 🟡 **Solo referencia** |
| `images (1).jpeg` | JPEG · 678×452 | Dos linieros en poste | Sin autoría/licencia confirmada | 🟡 **Solo referencia** |

> Esta carpeta está en `.gitignore`: no se versiona por ser material de terceros.

## 3. Huellas de integridad (SHA-256)

Permiten demostrar que los originales no se alteraron.

```
9bea99d7…0ae737  marca/Aviso importante sobre servicios parabólicos.png
0021422a…b403528  marca/logo_APBT.png
eeede9a6…c1253    marca/Oferta de Antena y Televisión Familiar.png
355a20fc…ff856f   marca/Promoción Antena Parabólica Bajo Tigui.png
27612ce4…bddbdf8  referencia/WhatsApp Image 2026-09-22 at 2.26.37 PM (1).jpeg
60ffaf75…cc1dfe   referencia/a-satellite-dish-…-bangkok-thailand-photo.jpg
2db1648c…09da22   referencia/electrician-full-ppe-…-2759596403.webp
47d06348…850f3a7  referencia/images (1).jpeg
9dc8cd01…c8b28c5  referencia/images.jpeg
42538344…c17c46e  referencia/img-trabajadores1.jpg
26cd9a55…f36b2    referencia/una-antena-parabólica-…-340366001.webp
```

## 4. Conclusiones del inventario

1. **Logo canónico:** `logo_APBT.png` (ilustración de parabólica). Es el único símbolo válido.
2. **Resolución insuficiente:** 262×251 px con fondo blanco incrustado → **hay que vectorizarlo** (traza por capas de color + limpieza manual). No hay versión de mayor resolución (confirmado por el cliente). La traza resultante es **aproximada**: sirve hasta 480 px en pantalla y **no para gran formato** (ver § 5).
3. **Paleta real** (de los flyers): navy `#002E84`, cobalto `#0058B0`, celeste `#8FCCF0`, verde agua `#A1D9D4`, amarillo `#FFD806`, naranja `#FE6301`, crema, tinta. Detalle en `tokens.css`.
4. **Tipografías:** los PNG **no embeben fuentes** ni texto editable; solo se observa el estilo (display pesada itálica de pincel + sans geométrica humanista). La equivalencia se define en `sistema-de-diseno.md` § 2.
5. **Datos en conflicto detectados en los flyers:** 1 mes vs 2 meses gratis · instalación gratis sí/no · fecha del aviso de suspensión ("martes catorce", vencida) y formato `37.000$` · typo "a partir del martes **del martes** catorce". Todo queda **POR CONFIRMAR** (ver `AGENTS.md` § 3).

## 5. Traza vectorial del logo (derivados) — alcance y límites

> **Aviso importante:** el SVG del logo **NO es un vector de origen**. Es una **traza automática**
> (potrace por capas de color) hecha a partir de un PNG de **262×251 px**. La forma se conserva,
> pero no es un dibujo vectorial redibujado a mano.

| Dato | Valor |
|---|---|
| Fuente | `identidad-visual/marca/logo_APBT.png` · **262×251 px** · RGBA con fondo blanco incrustado |
| Método | Clasificación por color a resolución nativa → descarte de lienzo → apertura morfológica → ampliación LANCZOS → potrace por capa |
| Parámetros | `escala=8 · interp=lanczos · opttol=1.0 · turdsize=16` |
| Calidad medida | **error medio 6,93/255** · **4,43 % de píxeles malos** (medido contra el original) |
| Reproducible con | `tools/vectorizar-logo.py` y `tools/generar-assets-logo.py` |
| Salidas | `public/brand/*.svg`, `docs/diseno/assets/logo-traza.svg` |

**No sirve para gran formato.** A partir de ~600 px de ancho se ven los defectos propios de una
traza: contornos **ondulados/quebrados**, escalones en las curvas, rebordes grises de anti-aliasing
y filos blancos entre formas. Evidencia medida en
[`hero/`](./hero/) (`_hero-trazado-bordes.png`, render a 600 px y 1200 px).

| Uso | ¿Permitido? |
|---|---|
| Web hasta **480 px** de ancho | ✅ Sí |
| Favicon, avatares, íconos de app | ✅ Sí (hay recorte a la parabólica) |
| Valla, banner impreso, gran formato, hero a pantalla completa | ❌ **No** — usar la **antena 3D propia** ([`hero-3d.md`](./hero-3d.md)) o redibujar el vector a mano |
| Impresión a cualquier tamaño | ❌ No sin redibujo manual (no existe original vectorial) |

Si en el futuro el cliente consigue el **archivo vectorial original** (AI/SVG/EPS), se reemplaza la
traza y estos límites desaparecen.
