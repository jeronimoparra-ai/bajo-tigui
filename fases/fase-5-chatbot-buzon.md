# FASE 5 — Chatbot con IA y buzón de sugerencias
Lee `AGENTS.md`. Ejecuta SOLO esta fase.

## Chatbot (widget flotante, 24/7)
- Backend propio llamando a la API de Claude (Anthropic); la clave nunca llega al navegador. Streaming de respuestas.
- Prompt de sistema (entrégalo en `/docs/chatbot/prompt-sistema.md`): conoce planes, precios, cobertura, horario, pagos y fallas comunes (sin señal, internet lento, canal no sintoniza, router, cableado); guía diagnósticos paso a paso; español colombiano, amable y breve.
- Datos desde la BD vía herramientas (consultar planes, cobertura, estado de ticket). **No inventa precios ni promesas**; si no sabe, lo dice.
- Crea ticket cuando no resuelve y ofrece pasar a humano por WhatsApp. Fuera de horario informa cuándo responderá un humano (próximo día hábil).
- Historial por sesión, límites de uso por IP/usuario, filtro de contenido y de datos sensibles (no pide ni guarda claves ni números de tarjeta), consentimiento de datos al primer uso.
- Evaluación: crea 30 preguntas de prueba (precios, cobertura, fallas, quejas, preguntas fuera de tema, intentos de manipulación) y reporta resultados.

## Buzón de recomendaciones
Formulario (sugerencia, queja, felicitación, mejora), anonimato opcional, adjuntos con validación de tipo/tamaño, código de seguimiento, estado visible para quien envía, respuesta por correo/WhatsApp, panel de gestión con etiquetas y prioridad.

## Aceptación
Chatbot resuelve la batería de pruebas sin inventar datos; buzón funciona de punta a punta. DETENTE y espera aprobación.
