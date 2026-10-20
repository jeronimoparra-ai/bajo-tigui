# Sesión — Tema "Señal de TV" + acento + Fase 5 (chatbot + buzón)

## Proyecto
Antena Parabólica Bajo Tigui — sitio en producción: **https://bajo-tigui.vercel.app**
Repo: **https://github.com/jeronimoparra-ai/bajo-tigui** (privado, rama `fase-1b-antigravity`)

## Estado actual
| Commit | Contenido |
|---|---|
| `0f45876`–`1ae3630` | Tema oscuro "señal de TV" (lotes 1 y 2) |
| `35bebc4` | Lote 3: 404, mantenimiento, buzón, componentes |
| `ac502b0` | Acento amarillo → verde agua `#A1D9D4` en todo el sitio |
| `65d9f54` | Fotos reales (barrio, CC BY-SA) + ilustraciones propias SVG + tema más claro |
| `7a1af89` | Más espacio al texto en el hero |
| `38cd73f` | Hero animado de señal, transiciones de scroll, home de un solo recorrido |
| `1aaf7cd` | **Fase 5**: chatbot con IA + buzón de PQRS |

## Fase 5 — qué quedó hecho
- **Chatbot**: API `/api/chat` con streaming SSE hacia Anthropic (la clave nunca llega al
  navegador). 5 herramientas con datos reales de Supabase. Widget con consentimiento
  (Ley 1581), filtro de datos sensibles y límite por IP. Prompt en
  `docs/chatbot/prompt-sistema.md`.
- **Buzón**: formulario completo (anonimato, adjuntos, autorización) → crea ticket + mensaje
  y devuelve código `BZ-XXXXXX`; consulta de estado por código. **Verificado 8/8** contra
  la BD real.
- **Batería de 30 preguntas** automatizada: `npm run chatbot:probar`
  (falta `ANTHROPIC_API_KEY` para ejecutarla; criterios en
  `docs/chatbot/evaluacion-chatbot.md`).

## ⚠️ Secretos que faltan (bloquean funciones reales)
| Variable | Para qué |
|---|---|
| `ANTHROPIC_API_KEY` | Chatbot con IA (sin ella responde con honestidad que no está disponible) |
| `WOMPI_PRIVATE_KEY`, `WOMPI_EVENTS_SECRET` | Pagos (por ahora solo Nequi) |
| `META_ACCESS_TOKEN`, `META_PHONE_NUMBER_ID`, `META_VERIFY_TOKEN` | WhatsApp Cloud API |
| `RESEND_API_KEY` | Correos |
| `TURNSTILE_SECRET_KEY` | Protección de formularios públicos |

Se configuran en **Vercel → Settings → Environment Variables** y en `.env.local`.

## Herramientas cableadas
- **MCP**: `filesystem` ✓, `playwright` ✓ (Chromium 1248), `context7` (en `opencode.json` del proyecto), `rea` (deshabilitado).
- La config global tenía `type: "stdio"` y `env`; V2 exige `"local"` y `"environment"`. Corregido (backup `opencode.jsonc.bak.pre-mcpfix-*`).
- **Orca**: repo registrado, base ref `fase-1b-antigravity`. `antigravity` sin cuota (reset ~85 h); `codex`, `cursor`, `claude`, `gemini` disponibles.
- `opencode.json` del proyecto: MCP scoped al repo. La sesión debe estar en la carpeta del repo para cargarla.

## Verificación
- `node tools/verificar-maqueta.mjs <archivo> 320 360 390 768 1024 1440` (maquetas: sin fallos)
- `node scripts/migrate.mjs` (migraciones + seed) · `node scripts/duotono.sh` (duotono de fotos)
- `npm run chatbot:probar` (batería del chatbot, requiere la clave)

## Referencias clave
- Backups pre-porte: `/tmp/opencode/_base.css.bak-portado`, `/tmp/opencode/tokens.css.bak-portado`
- Créditos de fotos: `public/assets/fotos/CREDITOS.md`
- Regla AGENTS.md: no tocar `identidad-visual/marca/` (solo lectura), **no publicar** `identidad-visual/referencia/`, datos POR CONFIRMAR con ese rótulo.
