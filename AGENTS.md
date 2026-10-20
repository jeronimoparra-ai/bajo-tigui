# AGENTS.md — Antena Parabólica Bajo Tigui

> Léelo completo al iniciar CADA sesión. Es la fuente de verdad del proyecto.

## 1. Proyecto
Sitio web + aplicativo para **Antena Parabólica Bajo Tigui**, organización **sin ánimo de lucro** de **El Bagre, Antioquia (Colombia)**. Ofrece televisión por antena parabólica (redes y canales) y, desde este año, **internet por fibra óptica** a buen precio para El Bagre y sus alrededores. Los clientes son "asociados". Frase de la marca: «La señal viaja lejos. Aquí se queda.».
Tono: cercano, comunitario, honesto, confiable. Nunca corporativo frío. Español colombiano.

## 2. Identidad visual (ruta del proyecto)
Los materiales están en `./identidad-visual/`:

- `./identidad-visual/marca/` — **SOLO LECTURA. Fuente de verdad. No modificar, renombrar ni borrar nada.**
  1. `logo_APBT.png` — **único símbolo canónico** (ilustración de parabólica en azul, celeste y verde agua con contorno negro grueso). Se usa sin alterar su forma y se vectoriza a SVG.
  2. `Promoción Antena Parabólica Bajo Tigui.png`, `Oferta de Antena y Televisión Familiar.png`, `Aviso importante sobre servicios parabólicos.png` — flyers de marca, **solo referencia** de paleta, tipografía, trazos de pincel, stickers, píldoras con ícono y ondas wifi. No se publican tal cual.
  3. **No usar las caras de las familias** de los flyers en la web.
- `./identidad-visual/referencia/` — **material de terceros** (competencia como Cable Familia, imágenes con marca de agua Vecteezy/Dreamstime/Shutterstock, fotos de linieros sin licencia confirmada). **Solo referencia de composición; prohibido publicar.** Excluido de git.

Los derivados (SVG vectorizado, imágenes optimizadas, variantes de logo) van en `./public/brand/` y `./docs/diseno/assets/`; los originales quedan intactos. El inventario detallado vive en `./docs/diseno/inventario.md`.

**Paleta base** (derivada de los flyers): navy `#002E84`, cobalto `#0058B0`, celeste `#8FCCF0`, verde agua `#A1D9D4`, amarillo `#FFD806`, naranja `#FE6301`, crema `#F7F4EC`, tinta `#0B0B0B`; verde WhatsApp `#25D366` **solo** en su botón.

## 3. Datos reales del negocio (usar tal cual; editables desde admin, no quemados)
- Nombre: **Bajo Tigui** (sin tilde). Organización sin ánimo de lucro, El Bagre, Antioquia.
- Plan principal: Internet fibra óptica **50 Mbps de descarga** (no afirmar simetría) + TV **90 canales SD + HD**. **$70.000 COP/mes**. **1 mes gratis** (confirmado).
- Instalación gratis: **POR CONFIRMAR** — solo en borrador/maqueta hasta confirmación.
- Beneficios: internet de alta velocidad, TV por satélite, sin interrupciones.
- Contacto: WhatsApp/llamadas **312 274 0219**. Zona de cobertura (mapa).
- Aviso administrable: suspensión de servicios de parabólica con saldo superior a **$37.000**, sin fecha fija (la define el admin; banner inactivo en la semilla).
- Horario humano: **lunes a viernes 7:00 a. m.–5:00 p. m.**, zona `America/Bogota`. Sin atención sábados, domingos ni festivos de Colombia.
- POR CONFIRMAR (no inventar): correos oficiales (placeholders **no publicables**: `contacto@bajotigui.co`, `soporte@bajotigui.co`, `pagos@bajotigui.co`), zonas exactas de cobertura (barrios/veredas + polígono), instalación gratis, parrilla real de los 90 canales, vigencia/cierre de la promoción, NIT/razón social, dirección física y redes sociales.

## 4. Dirección UI/UX (obligatoria)
Moderno y DISTINTO. Prohibido el look "plantilla de IA": hero centrado con degradado morado, rejillas de tarjetas idénticas, iconos genéricos en todas partes, secciones simétricas, glassmorphism por defecto, fuentes por defecto (Inter/Roboto/Arial).
Ver detalle en `fases/fase-1-diseno.md`. Principios:
- Composición editorial y asimétrica, tipografía grande con personalidad.
- Narrativa de scroll: "el viaje de la señal" (satélite → parabólica en el techo → casa → TV/celular).
- Lenguaje visual propio derivado del logo y los flyers: contornos gruesos, formas planas superpuestas, stickers, trazos de pincel, ondas de señal.
- Microinteracciones con sentido (la parabólica sigue al cursor, el dial de sintonía elige plan).
- Mobile-first real: la mayoría entra desde celular con datos limitados. Versión ligera sin 3D en equipos lentos y `prefers-reduced-motion` respetado.
- Accesibilidad WCAG AA (contraste, foco visible, teclado, alt, aria).

## 5. Stack
- Next.js (App Router) + TypeScript + Tailwind CSS + React Three Fiber + GSAP/Framer Motion.
- Backend: rutas API de Next.js, Zod, auth (NextAuth o JWT), rate limiting, Turnstile/hCaptcha.
- BD: PostgreSQL (Supabase) con migraciones. Alternativa MySQL solo si lo pido.
- Correo: Resend o Nodemailer. Pagos: Wompi (+ ePayco respaldo) tras interfaz `PaymentProvider`. WhatsApp: Cloud API de Meta. Chatbot: API de Claude (Anthropic) desde el backend.
- Despliegue: Vercel + Supabase. CI: GitHub Actions.

## 6. Reglas de trabajo (opencode)
- Trabaja por fases (`fases/`). Al terminar cada una, DETENTE y espera mi aprobación. No avances solo.
- Antes de codificar cada fase: plan corto con archivos a crear/modificar.
- Usa las skills disponibles (especialmente diseño frontend) y los MCP conectados: documentación de librerías (no inventes APIs), base de datos/Supabase, GitHub, navegador/Playwright para probar y capturar pantallas en móvil y escritorio, Figma si está disponible. Si falta un MCP, dime qué configurar en `opencode.json`; no lo simules.
- Un commit por tarea, mensaje claro, rama por fase.
- Secretos solo en `.env`; entrega `.env.example`. Nunca expongas API keys en el frontend.
- No ocultes errores ni simules funciones no implementadas. Explica la causa real antes de reintentar.
- Cada fase termina con: qué se hizo, cómo probarlo, pendientes y "POR CONFIRMAR".
- Lo no definido: propón un valor por defecto y márcalo "POR CONFIRMAR".

## 7. Cumplimiento
HTTPS, bcrypt/argon2, Ley 1581 de 2012 (habeas data): política de privacidad y consentimiento en formularios, no almacenar datos de tarjeta, términos y condiciones, política de reembolsos.
