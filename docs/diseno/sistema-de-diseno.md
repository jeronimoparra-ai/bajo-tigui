# Sistema de diseño — Bajo Tigui

Fase 1A · `docs/diseno/sistema-de-diseno.md`
Tokens implementados en [`tokens.css`](./tokens.css). Inventario en [`inventario.md`](./inventario.md).

## 0. Principios

1. **La marca manda.** La paleta y las formas salen de `identidad-visual/marca/`; no se inventa identidad.
2. **Editorial, no plantilla.** Asimetría controlada, titulares que se salen de la retícula, ritmo de revista.
3. **Contorno y sticker.** Bordes negros gruesos, sombras sólidas desplazadas, figuras planas superpuestas.
4. **Mobile-first de verdad.** La mayoría entra desde celular con datos limitados: primero el móvil, luego se amplía.
5. **"Ligero" es una versión, no un recorte.** Sin 3D y sin animación pesada cuando el equipo o la conexión lo piden.
6. **AA o no es.** Todo par de color se verifica; foco visible; teclado; `prefers-reduced-motion`.

---

## 1. Paleta

Derivada de los flyers de marca (fuente de verdad) + acentos del logo. Tokens en `tokens.css` § 1–2.

| Token | Hex | Origen | Rol |
|---|---|---|---|
| `--bt-navy-800` | `#002E84` | Flyer | Marca principal, fondos, titulares |
| `--bt-navy-900` | `#001A4D` | Derivado | Fondo oscuro profundo (acto "Órbita") |
| `--bt-cobalt-600` | `#0058B0` | Flyer | Enlaces, fondos de sección, botón secundario |
| `--bt-cobalt-500` | `#0A6ECC` | Flyer | Hover, guías, elementos activos |
| `--bt-sky-400` | `#8FCCF0` | Logo | Resaltos, ondas, estados informativos |
| `--bt-sky-200` | `#DEFAFA` | Logo | Fondos suaves, texto sobre navy |
| `--bt-aqua-500` | `#A1D9D4` | Logo | Verde agua del logo; acentos y bloques |
| `--bt-yellow-400` | `#FFD806` | Flyer | Énfasis, precios, badges de promoción |
| `--bt-orange-500` | `#FE6301` | Flyer | Acento de acción, foco, "gratis" |
| `--bt-cream-100` | `#F7F4EC` | Derivado | Fondo papel (tema claro) |
| `--bt-ink-900` | `#0B0B0B` | Logo | Texto, contornos gruesos |
| `--bt-grey-500` | `#6B6B6B` | Derivado | Texto secundario |
| `--bt-whatsapp-500` | `#25D366` | WhatsApp | **Solo** el botón de WhatsApp |

**Reglas**
- El **verde WhatsApp** no se usa como color de marca; solo en su botón/ícono.
- El **amarillo** nunca lleva texto amarillo sobre crema; siempre tinta oscura sobre amarillo o amarillo sobre navy.
- El **naranja** no se usa para texto pequeño sobre blanco (no alcanza AA): para texto, se usa su variante oscura o tinta.
- En tema oscuro, el acento de foco pasa a amarillo (`#FFD806`).

---

## 2. Tipografía

**Par elegido (Google Fonts, autoalojadas con `next/font`):**

| Rol | Fuente | Por qué |
|---|---|---|
| Titulares, wordmark, cifras | **Archivo** (`wght 100–900`, `wdth 62–125`, `ital`) | Grotesca con **itálica real** (requisito de marca: "Bajo Tigui" es pesada e itálica, y **no se permite oblicua sintética**). Su eje de **ancho** cubre el display compacto tipo flyer (≈105) y el expandido tipo **valla/sticker** (≈122) con el mismo archivo; el rango 100–900 resuelve toda la jerarquía con **una sola familia variable** |
| Cuerpo, UI, formularios | **Karla** (`wght 400–800`, itálica) | Humanista con detalles reconocibles (la "g" de un solo piso) y **más contraste interno en tamaños pequeños** que una grotesca display: se lee mejor en móvil. Contraste tipográfico con Archivo sin competirle |

- **Verificado, no supuesto:** Bricolage Grotesque **no tiene itálica** (la API devuelve 0 caras
  `font-style: italic`), por eso quedó descartada. Prueba y capturas en
  [`tipografia/comparacion.md`](./tipografia/comparacion.md) y [`tipografia/prueba-tipografica.html`](./tipografia/prueba-tipografica.html).
- **Uso de los ejes:** `wdth` ≈ **100** en titulares de sección, ≈ **108** en el wordmark,
  ≈ **122** en bloques tipo valla/sticker. Nunca se aplica `skewX` ni `font-style: oblique`:
  la itálica es la de la fuente.
- **Cifras:** precios y contadores usan `font-variant-numeric: tabular-nums` para que no bailen.
- **Nunca** se usan Inter, Roboto, Arial ni fuentes de sistema como display.

**Escala fluida** (tokens `--bt-fs-*`), mobile-first:
`4xl` 3.5→8.5 rem (portada) · `3xl` 2.75→5.5 rem (títulos de sección) · `2xl` 2→3.25 rem ·
`xl` 1.5→2 rem · `lg` 1.25→1.5 rem · `md` 1.06→1.19 rem (cuerpo) · `sm/xs/2xs` 1/0.875/0.75 rem.
Interletrado display `-0.02em`; versalitas de etiqueta `+0.08em`.

---

## 3. Retícula y composición

- **12 columnas**, pero **asimétricas**: los bloques ocupan 5/7, 4/6/2, 8/4… y a veces rompen el
  contenedor (full-bleed). Contenedor `--bt-container` 76 rem; estrecho 44 rem para lectura.
- **Ritmo editorial:** alternancia de secciones "claras" (crema) y "oscuras" (navy), con una sección
  **valla** (bloque de color a sangre) cada 3–4 secciones para cortar la monotonía.
- **Desalineación intencional:** los elementos de un mismo grupo no comparten línea base; hay
  desplazamientos verticales de 1–3 rem entre columnas (clase de utilidad, no `margin` casual).
- **Móvil primero:** una columna, titulares con `clamp()`, secciones a `--bt-section-y`, áreas
  táctiles ≥ 44×44 px. Los bloques asimétricos se apilan en orden de lectura.
- Breakpoints: 480 / 768 / 1024 / 1280 px.

---

## 4. Lenguaje gráfico (derivado del logo y los flyers)

| Recurso | Cómo se hace | Dónde |
|---|---|---|
| **Contorno grueso** | `--bt-border-w-thick` 3 px, esquinas redondeadas, negro tinta | Botones, tarjetas, píldoras, ilustraciones |
| **Sombra sólida** | `--bt-shadow-hard` (6 px 6 px 0 tinta), **no difusa** | Botones y stickers; hover desplaza la sombra |
| **Formas planas superpuestas** | Rectángulos y cuñas del logo, sin degradado | Fondos de sección, marcos de imagen |
| **Trazos de pincel** | Máscara SVG con borde irregular | Detrás de palabras clave (precio, "gratis", "sin ánimo de lucro") |
| **Stickers / chapas** | Círculo o cuña con contorno + sombra sólida, rotado −8°…8° | Beneficios, "1 mes gratis", lema |
| **Píldoras con ícono** | Cápsula con contorno, ícono propio + etiqueta | Beneficios del plan, filtros de canales |
| **Chispas de énfasis** | Pequeños destellos de 3 y 4 puntas | Alrededor de titulares, sin saturar |
| **Círculos concéntricos** | Anillos de 1–2 px, opacidad decreciente | Fondos, indicador de cobertura, medidor de señal |
| **Ondas de señal** | Arcos concéntricos | Separadores, wifi, "activo" |
| **Retícula de puntos** | Patrón de puntos navy | Esquinas de bloques (del aviso de marca) |
| **Esquina achaflanada** | `clip-path` con `--bt-corner` | Tarjetas y bloques de aviso (del flyer de aviso) |
| **Textura de papel** | Ruido sutil (SVG `<feTurbulence>` en línea, ligero) | Fondo crema; nunca sobre texto largo |

Todo el lenguaje es **plano y de alto contraste**: nada de degradados suaves salvo el cielo de la
sección "Azotea", que es un degradado **de solo dos franjas** (no el típico morado genérico).

---

## 5. Componentes

Con estados `default · hover · focus-visible · active · disabled · cargando · error`.

- **Botones:** primario (navy con sombra sólida), secundario (contorno), acento (naranja), fantasma,
  y **WhatsApp** (verde, con ícono propio, texto tinta porque blanco no alcanza AA sobre `#25D366`).
- **Píldoras** de ícono y etiqueta; **chapas/stickers**.
- **Tarjeta de plan** con profundidad (tilt 3D sutil en escritorio, sin 3D en modo ligero), badge de promoción,
  lista de beneficios, botón "Lo quiero" con WhatsApp prellenado.
- **Comparador** y **calculadora de precio**; **dial de sintonía** (selector de plan).
- **Banner/modal de aviso importante** alimentado por datos (cerrable y recordado).
- **Formularios:** campos con contorno, etiqueta siempre visible (nunca solo `placeholder`),
  mensajes de error junto al campo, consentimiento de datos (Ley 1581).
- **Chat widget** flotante (24/7), con estado abierto/cerrado y hora de Colombia.
- **Navegación** (móvil: panel a pantalla completa; escritorio: barra con indicador de sección).
- **Footer** con ondas, contacto, política, lema.
- **Estados:** vacío, error, carga (skeleton con ondas de señal, no spinner genérico).

---

## 6. Movimiento

**Qué se anima**
- La "línea de señal" que progresa con el scroll (hilo narrativo).
- La parabólica de portada que sigue el cursor / giroscopio (3D útil: muestra cómo se orienta).
- El dial de sintonía al elegir plan; el medidor de señal en el mapa de cobertura.
- Cambio de sección como **"cambio de canal"** (≤200 ms de estática + barrido), solo una vez por sección.

**Qué NO se anima**
- El texto de lectura: nunca parpadea, no entra letra por letra.
- Nada que compita con el CTA de WhatsApp.
- Nada automático en bucle infinito salvo el ícono "activo" (respeta `prefers-reduced-motion`).

**Parámetros** (`tokens.css` § 6): 120 / 220 / 420 / 800 ms; easings `out`, `inout`, `signal`
(desaceleración de onda) y `snap` (rebote de sticker). Movimiento de entrada ≤ 24 px, nunca más.

**Reducción:** `prefers-reduced-motion: reduce` y el interruptor **modo ligero** (`[data-motion="lite"]`)
llevan todas las duraciones a ~0 y eliminan 3D, parallax y la estática de "cambio de canal".

---

## 7. Iconografía propia

Set SVG propio, **no** un paquete genérico:
- Trazo `--bt-stroke-icon` 2.25 px, remates y uniones redondeados, contorno oscuro, relleno plano.
- Construido con la geometría del logo: **arco de parabólica**, **arcos de señal**, **onda wifi**,
  **televisor**, **fibra/cable**, **soporte/herramienta**, **asociado/persona**, **mapa**, **pago**.
- Íconos con dos planos: contorno negro + una sola forma de color (celeste, verde agua o naranja).
- Se entregan en `docs/diseno/assets/iconos/` (Fase 1B/3) y se exportan como componentes React.

---

## 8. Accesibilidad (WCAG AA)

**Contrastes verificados** (calculados sobre la paleta real):

| Combinación | Ratio | Resultado |
|---|---|---|
| Tinta `#0B0B0B` sobre crema `#F7F4EC` | 17.9 | AAA |
| Navy `#002E84` sobre crema | 11.1 | AAA |
| Blanco sobre navy `#002E84` | 12.2 | AAA |
| Blanco sobre cobalto `#0058B0` | 6.95 | AA |
| Cobalto `#0058B0` sobre crema | 6.32 | AA |
| Amarillo `#FFD806` sobre navy | 8.75 | AAA |
| Tinta sobre amarillo `#FFD806` | 14.1 | AAA |
| Tinta sobre naranja `#FE6301` | 6.56 | AA |
| Tinta sobre celeste `#8FCCF0` | 11.3 | AAA |
| Tinta sobre verde agua `#A1D9D4` | 12.6 | AAA |
| Blanco sobre naranja `#FE6301` | 3.00 | **solo ≥ 24 px / no texto pequeño** |
| Blanco sobre WhatsApp `#25D366` | 1.98 | ❌ **prohibido** → el botón usa **texto tinta** (9.92 AAA) |

**Reglas duras**
- Foco visible siempre: `--bt-focus-ring` (halo naranja de 3 px + separación), nunca `outline: none` sin sustituto.
- Todo operable con teclado; orden de tabulación lógico; `skip link` a contenido.
- `alt` real en imágenes informativas, `alt=""` en decorativas; `aria-label` en íconos-botón.
- Nunca se comunica por color solo (los estados llevan texto/ícono).
- Áreas táctiles ≥ 44×44 px; texto base ≥ 1 rem; no hay texto en imagen sin equivalente HTML.
- `lang="es-CO"`; `prefers-reduced-motion` respetado; contraste de foco ≥ 3:1 sobre cualquier fondo.

---

## 9. Sistema de logo y variantes

`logo_APBT.png` es el **único símbolo canónico**. Vectorizado por capas con potrace
(`tools/vectorizar-logo.py`, error medio 6,93/255 · píxeles malos 4,43 %) y exportado a
`public/brand/` con `tools/generar-assets-logo.py`.

| Variante | Archivo | Uso |
|---|---|---|
| Ícono solo | `logo-icono.svg` | Cabecera, contenido, marca de agua |
| Línea monocroma tinta | `logo-mono-tinta.svg` | Sellos, grabados, fondos claros |
| Línea monocroma blanco | `logo-mono-blanco.svg` | Fondos navy/fotos oscuras |
| Ícono sobre placa crema | `logo-sobre-oscuro.svg` | **Tratamiento para fondos oscuros** (el contorno negro desaparece sobre navy) |
| Horizontal con wordmark | `logo-horizontal.svg` | Cabecera, footer, correos |
| Vertical apilado | `logo-vertical.svg` | OG, valla, presentaciones |
| Favicon | `favicon.svg` + `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | Navegador, iOS, PWA |
| OG image | `og-1200x630.png` | **Fase 1B** (se hornea con Playwright) |

Reglas: no deformar, no recolorear fuera de tokens, no aplicar degradados, no usar el símbolo sobre
fotos sin placa de color, zona de protección = 25 % del ancho del ícono, tamaño mínimo del ícono 24 px
(digital) / 12 mm (impreso). El **wordmark** "ANTENA PARABÓLICA / BAJO TIGUI" se compone con Archivo
900 itálica (según § 2); en los lockups va hoy como texto vivo y en la 1B se hornea a paths/PNG.

> **Pendientes declarados:** el ícono es una traza automática de un PNG de 262×251 px (no existe
> original vectorial); el favicon completo es muy detallado a 16–32 px; los lockups necesitan el
> horneado del wordmark. Detalle en `docs/diseno/assets/README.md`.

---

## 10. Modo ligero

- Detección por `navigator.connection.saveData` / `effectiveType`, `prefers-reduced-motion`,
  hardware modesto (`deviceMemory`, `hardwareConcurrency`) o interruptor manual visible en el footer.
- `[data-motion="lite"]` desactiva 3D, parallax y transiciones; el hilo narrativo queda como línea estática.
- Imágenes WebP/AVIF con `sizes`, `loading="lazy"`, LCP sin `lazy` (fuentes autoalojadas con `next/font`).
- Regla: **todos** los contenidos y CTAs funcionan igual sin 3D.

---

## 11. Tokens

Todo valor visual sale de `tokens.css`: primitivas → semánticas → tema oscuro → tipografía →
espacio → formas → movimiento → capas. Los componentes usan **semánticas**, nunca primitivas en crudo.
Tailwind (Fase 3) se mapea a estos tokens en `tailwind.config` (`theme.extend`), sin duplicar valores.

---

## 12. POR CONFIRMAR

1. **Instalación gratis** (no mostrar como definitiva hasta tu confirmación).
2. **Par tipográfico:** Archivo (display) + Karla (cuerpo) — recomendado con capturas en
   `tipografia/comparacion.md`; pendiente de tu visto bueno.
3. **Correos oficiales** (placeholders no publicables), zonas exactas de cobertura y **parrilla real** de canales.
4. **Vigencia de la promoción** y fecha del aviso de suspensión.
5. **Significado de "tigüí"** para el acto 3 del relato.
6. Estilo de la "estática" de cambio de canal: ¿la quieres o preferís saltar ese detalle sensorial?
