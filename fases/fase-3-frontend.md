# FASE 3 — Frontend completo
Lee `AGENTS.md`, `docs/diseno/` y usa las skills de diseño frontend. Ejecuta SOLO esta fase.

## Tareas
Implementa fielmente las maquetas aprobadas, con datos reales o mock tipados que luego se conectan al backend.
1. **Hero con parabólica 3D** (React Three Fiber): rota con mouse/scroll/giroscopio, emite ondas de señal animadas hacia una casa. CTAs: "Contrátalo por WhatsApp" y "Ver planes".
2. **Planes**: tarjetas con profundidad 3D (tilt, reflejos), comparador, calculadora de precio, badge de promoción, dial de sintonía; botón "Lo quiero" abre WhatsApp con mensaje prellenado del plan.
3. **Cómo funciona** (scroll narrativo, GSAP ScrollTrigger/Lottie): señal satelital → TV; fibra óptica → casa; instalación paso a paso.
4. **Cobertura**: mapa interactivo (Leaflet/MapLibre) de El Bagre y alrededores + formulario "¿llega a mi casa?".
5. **Canales**: parrilla filtrable (deportes, infantil, noticias, películas; SD/HD).
6. **Nosotros**: misión sin ánimo de lucro, transparencia, equipo.
7. **Atención**: botón flotante, indicador "Abierto/Cerrado" con hora de Colombia, correos `mailto:` por área, llamada directa, formulario.
8. **Aviso importante** como banner/modal alimentado por datos.
9. **Modo ligero**: detecta dispositivo/conexión lenta y sirve versión sin 3D; lazy-load de modelos; imágenes WebP/AVIF; fuentes optimizadas.
10. SEO local (metadatos, schema.org LocalBusiness, sitemap) orientado a "internet y televisión en El Bagre, Antioquia".
11. Portal del asociado y panel admin: solo la UI (sin lógica real aún).

## Aceptación
Lighthouse móvil > 90 en la página de inicio (modo ligero), sin errores de consola, capturas móvil/escritorio comparadas con maquetas. DETENTE y espera aprobación.
