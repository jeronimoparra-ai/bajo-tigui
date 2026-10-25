# Auditoría y mejoras — 25 de octubre de 2026

Rama autorizada: `fase-1b-antigravity`. Referencia inicial: `eee306e8fbbdf2d9a4ce22d8cbcb8701e1857f9b`.

## A. Resumen ejecutivo

Portada estática con logo y plan confirmado, navegación móvil nativa y contenido visible sin JavaScript. Se conservan Next.js, la marca, las páginas y las integraciones existentes. El frontend modificado compila y supera 98 comprobaciones. No se declara la aplicación completa lista para producción.

## B. Cambios implementados

- `components/sections/HeroSenal.tsx`: componente servidor estático; se eliminan los bucles de señal y la pantalla animada. Precio $70.000 COP/mes, 50 Mbps de descarga, 90 canales SD + HD y un mes gratis.
- `app/page.tsx`: CTA de contratación por WhatsApp y salto al plan; horario explícito con exclusión de festivos. El badge cliente anterior ignoraba festivos y añadía contenido tras hidratar.
- `components/layout/Nav.tsx`: `details/summary`, página activa, Escape, clic exterior y cierre al navegar/pasar a escritorio. El desplegable funciona sin JS.
- `components/ui/Reveal.tsx`: contenedor estático, sin IntersectionObserver ni estado cliente. Antes `.bt-reveal` quedaba invisible sin JS.
- `app/styles/motion.css`: panel editorial, menú responsive, foco, controles táctiles y anclajes; el índice ya no es un segundo sticky.
- `app/layout.tsx`: enlace de salto a contenido.
- `eslint.config.mjs`: FlatCompat, reglas Next 15 y TypeScript; no se desactivan reglas. Se ignoran salidas/dependencias y `next-env.d.ts`, generado por Next.
- `tools/verificar-frontend.mjs`, `tools/auditar-local.mjs`: verificaciones reproducibles.
- `design.md`: dirección aprobada y límites.

Sin cambios en dependencias/lockfile, backend, auth, pagos, RLS, migraciones ni originales de marca.

## C. Validaciones

Entorno local sin credenciales externas: Node 26, Next 15.5.28 resuelto por el lockfile original y Chrome headless con Playwright existente.

| Comando | Resultado |
|---|---|
| `npm ci` | Correcto; lockfile original. |
| `npm run lint` antes | Falló: faltaba configuración ESLint 9. |
| `npm run lint` después | Código 0, 0 errores, 12 advertencias de variables sin uso en archivos previos. |
| `npm run typecheck` | Correcto. |
| `npm run build` | Correcto, 32 páginas generadas; advertencias previas visibles. |
| `git diff --check` | Correcto. |
| `node tools/verificar-frontend.mjs` | 98 comprobaciones correctas, repetidas tras el build final. |
| `node tools/auditar-local.mjs` | Correcto: dial, fallbacks, formulario, redirecciones y observaciones SEO. |
| `npm audit --json` | Código 1, 2 riesgos altos y 4 moderados. Pendiente, no aprobado. |

Playwright inicialmente no encontró su Chromium descargable; se usó Chrome ya instalado mediante `channel: "chrome"`. Un selector de auditoría se precisó a `form [role=alert]` porque Next añade su propio alert de rutas; no se redujo la expectativa de validación.

Inicio probado a 320, 360, 390, 768, 1024, 1280 y 1440 px: sin overflow del documento, contenido visible y cero animaciones en portada. Pruebas de menú, Escape, retorno de foco, navegación, página activa, salto al contenido, sin JS y movimiento reducido. Páginas públicas a 390 px: Planes, Cobertura, Canales, Nosotros, Atención, Cómo funciona y Buzón. Sin eventos pageerror en ese recorrido; revisión de capturas de inicio a 390/1440 px.

El dial cambia y vuelve. Chat: consentimiento y error real sin clave, no respuesta de IA simulada. Buzón: validación nativa, API 400 ante datos inválidos y 503 sin Supabase; no se probó persistencia real. `/admin` y `/portal` devuelven 307 a `/api/auth/error?error=Configuration`; no se probó login ni roles autenticados.

Build de `/`: módulo de ruta 785 B y First Load JS 113 kB. No equivale a transferencia real ni comparación antes/después. No se ejecutaron Lighthouse, 3G simulado, lector de pantalla ni certificación WCAG completa.

## D. Seguridad y regresiones

### P0 — no corregidos fuera del alcance frontend

- `middleware.ts` solo valida presencia de token; falta autorización admin por rol. Hallazgo de código, no explotación autenticada probada.
- `app/api/whatsapp/webhook/route.ts` procesa POST sin verificar firma Meta. Requiere `META_APP_SECRET`, validación del cuerpo original y pruebas.

### P1 — pendientes comprobados por inspección

- Buzón: adjuntos son solo metadatos; faltan almacenamiento, antibot/rate limit y comprobación/transacción de inserciones secundarias. Revisar enumeración de códigos cortos y descarte de nombre/contacto al recibir `anonima: true` desde clientes manipulados.
- API: algunos errores devuelven mensajes internos de Supabase o excepciones del chat; revisar sanitización. No se observó una clave real expuesta.
- RLS: la migración activa RLS, con políticas de ejemplo comentadas. El cliente servidor usa service role. Estado real de Supabase no inspeccionado.
- Portal/admin: interfaces por conectar. Formulario de portal no llama signIn; pago/cerrar sesión sin acciones completas; `/admin/horarios` no existe en el árbol. No se reescribieron.
- Checkout: Wompi/ePayco lanzan error de función pendiente. Webhook aún sin idempotencia ni actualización de factura; validar protocolo Wompi. Sin pruebas de cobro.
- Chat: preservado; faltan foco/Escape del diálogo y revisión del reemplazo del último mensaje durante streaming. Las 30 preguntas con IA real no se ejecutaron.
- Horario: verificar carga de festivos, ya que la caché arranca vacía; la portada no afirma ahora abierto/cerrado dinámicamente.
- Audit: Zod/PostCSS altos; Next —transitivo—, Tailwind, postcss-nested y postcss-selector-parser moderados. No prueba explotabilidad; revisar actualizaciones dirigidas, no `audit fix --force`.

### P2 — SEO/contenido

`/buzon` usa título global, no tiene canonical ni OG. Sitemap incluye portal protegido y robots permite todas las rutas. Confirmar dominio: configuración usa `bajotigui.co`, documentación cita Vercel. No se cambió por otro dominio supuesto. Confirmar instalación, cobertura exacta, parrilla, promoción, NIT, dirección y correos. Documentación de retención no sustituye políticas legales públicas.

## E. Pendientes y bloqueos

Supabase y usuarios por rol para persistencia/auth; Anthropic para evaluación real; credenciales Wompi/ePayco más implementación completa; variables Meta y firma; Resend con remitente real; integración antibot. Las claves no bastan para completar lógica pendiente. No se pidieron porque no se implementaron servicios fuera del alcance.

Cerrar P0 antes de habilitar funciones sensibles, probar auth/BD/pagos sandbox, revisar RLS y adjuntos/anonimato, SEO con dominio confirmado, pruebas Lighthouse/3G/WCAG. No se completó ni firmó la aceptación integral de la Fase 6.

## F. Resultado y reproducción

Commits directos autorizados en la rama actual, mediante conector GitHub. Sin PR, migraciones, despliegue manual ni publicación en Runable. Estado del despliegue automático de Vercel no verificado.

```bash
npm ci
npm run lint
npm run typecheck
npm run build
npm start
# En otra terminal, Chrome instalado:
node tools/verificar-frontend.mjs
# Solo entorno LOCAL sin credenciales externas:
node tools/auditar-local.mjs
```

Capturas: `.playwright/frontend/inicio-390.png` e `inicio-1440.png`, carpeta ignorada en Git. La auditoría local comprueba 503 antes de probar envío para evitar tickets en una BD conectada.

Fuentes: AGENTS, README, fase 6, documentos de diseño/retención/proceso, código y migración RLS, comandos y navegador locales. Configuración contrastada con [documentación oficial Next.js 15](https://nextjs.org/docs/15/app/api-reference/config/eslint). Las notas históricas no se usaron como prueba de funcionamiento actual. Esto no es una prueba de penetración ni certificación legal.
