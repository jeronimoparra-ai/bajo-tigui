# FASE 2 — Modelo de datos
Lee `AGENTS.md`. Ejecuta SOLO esta fase. Usa el MCP de base de datos si está disponible.

## Tareas
1. Diagrama entidad-relación (Mermaid en `/docs/datos/er.md`).
2. Esquema SQL con migraciones versionadas (`/db/migrations`), claves, índices, restricciones y RLS (si Supabase).
3. Tablas mínimas: `usuarios`, `roles`, `asociados`, `planes`, `canales`, `plan_canales`, `zonas_cobertura`, `solicitudes_servicio`, `suscripciones`, `facturas`, `pagos`, `eventos_pasarela` (webhooks, idempotencia), `tickets`, `mensajes_ticket`, `sugerencias`, `conversaciones_chatbot`, `mensajes_chatbot`, `mensajes_whatsapp`, `avisos`, `configuracion`, `configuracion_horarios`, `festivos`, `auditoria`.
4. Dinero en COP como entero (sin decimales flotantes). Fechas en UTC, presentación en `America/Bogota`.
5. Datos semilla: plan de $70.000, canales de ejemplo marcados como "por confirmar", horario L–V 7–17, festivos de Colombia, aviso de $37.000 (inactivo).
6. Políticas de retención de datos personales y campos sensibles (qué se cifra, qué se anonimiza en sugerencias anónimas).

## Entregables
Migraciones, seed, `er.md`, `diccionario-de-datos.md`.

## Aceptación
Migraciones corren de cero sin errores, seed carga, relaciones coherentes. DETENTE y espera aprobación.
