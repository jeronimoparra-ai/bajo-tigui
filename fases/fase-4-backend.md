# FASE 4 — Backend, panel admin, WhatsApp, correos y pagos
Lee `AGENTS.md`. Ejecuta SOLO esta fase. Pruebas primero en sandbox.

## Tareas
1. **Auth y roles**: asociado, soporte, admin. Hash seguro, sesiones, recuperación de contraseña, rate limiting, Turnstile en formularios públicos.
2. **API** con validación Zod y manejo de errores consistente, conectada a la BD de la Fase 2. Reemplaza los mocks del frontend.
3. **Panel admin**: CRUD de planes, canales, zonas, avisos y promociones; gestión de asociados, tickets, sugerencias y mensajes; configuración de horarios y festivos; métricas; exportación CSV/Excel; bitácora de auditoría.
4. **Horario**: lógica central `estaAbierto(fecha)` con `America/Bogota`, L–V 7–17 y festivos. Usada por UI, WhatsApp y chatbot.
5. **WhatsApp Cloud API**: webhook verificado, recepción/registro de mensajes, plantillas, respuesta automática fuera de horario, enlaces `wa.me` prellenados.
6. **Correos** (Resend/Nodemailer): confirmación de solicitud, respuesta a sugerencia, recibo de pago, recordatorio previo a suspensión.
7. **Pagos (solo Colombia, COP)**: interfaz `PaymentProvider`; Wompi principal y ePayco respaldo. Métodos según disponibilidad: Nequi, PSE, tarjetas, Botón/QR Bancolombia, Daviplata, efectivo. Webhook con verificación de firma e idempotencia; el estado lo decide el backend, nunca el frontend. Comprobante PDF por correo/WhatsApp, conciliación y reportes en admin. Validación de teléfono +57 y documento colombiano; checkout habilitado solo para Colombia sin bloquear el resto del sitio.
8. Recordatorios automáticos de pago antes de la fecha de suspensión (umbral $37.000), configurables.

## Entregables
`.env.example`, guía de configuración de Meta/Wompi/Resend, colección de pruebas (Bruno/Postman o tests), túnel para webhooks en desarrollo.

## Aceptación
Flujo completo en sandbox: solicitud → ticket → pago aprobado → recibo → registro en admin. DETENTE y espera aprobación.
