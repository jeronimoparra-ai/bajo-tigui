# FASE 1 — Dirección de arte, logo y sistema de diseño
Lee primero `AGENTS.md`. Ejecuta SOLO esta fase.

## Objetivo
Definir una identidad digital moderna y distinta, fiel a la marca, y entregar maquetas aprobables antes de programar.

## Tareas
1. **Inventario de identidad visual** de `./identidad-visual/marca/` y `./identidad-visual/referencia/` (ver AGENTS.md §2, entregable `docs/diseno/inventario.md`). Extrae paleta real (hex), tipografías observadas, patrones y recursos gráficos.
2. **Logo**: vectoriza la ilustración de parabólica a SVG limpio sin alterar su forma. Entrega: ícono solo, horizontal con "ANTENA PARABÓLICA / BAJO TIGUI", vertical, versión sobre fondo claro y oscuro, favicon, OG image (1200x630).
3. **Concepto creativo** (1 página): propón y justifica UNA idea rectora. Punto de partida sugerido: **"La señal"** — la web como un viaje de la señal desde el satélite hasta la sala de tu casa en El Bagre. Puedes mejorarla, pero no caer en lo genérico.
4. **Sistema de diseño**:
   - Paleta como tokens CSS (claro y oscuro): azul navy/cobalto, celeste, verde agua del logo, amarillo y naranja de acento, blanco. Verde WhatsApp solo en su botón.
   - Tipografía: par propio de Google Fonts con carácter (titulares display itálica pesada para "Bajo Tigui", cuerpo legible). Justifica la elección. Nada de Inter/Roboto/Arial.
   - Lenguaje gráfico: contornos gruesos oscuros, formas planas superpuestas (del logo), trazos de pincel tras textos clave, stickers, píldoras con ícono, chispas de énfasis, círculos concéntricos y ondas de señal, textura de papel sutil.
   - Componentes: botones, píldoras, tarjetas de plan, banner de aviso, formularios, chat widget, navegación, footer, estados vacíos/errores/carga.
   - Motion: principios (duraciones, easings, qué anima y qué NO), versión `prefers-reduced-motion`.
   - Iconografía propia (SVG) en el mismo estilo; evita sets genéricos.
5. **Ideas de interacción distintivas** (prototipa las que viabilices): parabólica que sigue el cursor/giroscopio; **dial de sintonía** para elegir plan; parrilla de canales como "zapping" de TV; medidor de señal en el mapa de cobertura; cursor con ondas; transición de secciones como "cambio de canal" (ruido estático breve).
6. **Maquetas de todas las pantallas** (móvil y escritorio) como HTML/CSS estático navegable o Figma si hay MCP: Inicio, Planes, Cómo funciona, Cobertura, Canales, Nosotros, Contacto/Atención, Buzón, Login/Portal del asociado, Pagos, Panel admin, 404, página de mantenimiento.
7. **Contenido**: textos reales en español colombiano para cada sección (breves, cálidos, sin relleno tipo lorem ipsum).

## Entregables
`/docs/diseno/`: concepto.md, sistema-de-diseno.md, tokens.css, assets/ (SVG), maquetas/. Capturas de cada pantalla.

## Criterio de aceptación
- Las maquetas no parecen una plantilla genérica y se reconocen como Bajo Tigui.
- Contraste AA verificado. Logo en todas sus variantes.
- DETENTE y espera mi aprobación.
