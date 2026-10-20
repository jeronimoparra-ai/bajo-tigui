# Políticas de retención de datos personales — Bajo Tigui

Cumplimiento: Ley 1581 de 2012 (habeas data), Decreto 1377 de 2013, y principios de minimización y finalidad.

## Principios
- **Minimización**: solo se piden nombre, un contacto (teléfono o correo), tipo y mensaje en el buzón. No documentos, claves ni datos de tarjeta.
- **Finalidad**: los datos se usan únicamente para atender la solicitud y hacer seguimiento. No se usan para publicidad ni se comparten con terceros ajenos al servicio.
- **No se almacenan datos de tarjeta** ni información financiera.

## Clasificación de campos
| Campo | Sensible | Cifrado | Retención |
|---|---|---|---|
| `usuarios.password_hash` | Sí | bcrypt/argon2 (hash irreversible) | Mientras la cuenta exista |
| `asociados.documento` | Sí (PII) | Cifrado en reposo (pgcrypto) | Mientras la cuenta exista + 5 años |
| `asociados.telefono`, `email` | Sí (PII) | Cifrado en reposo | Mientras la cuenta exista + 5 años |
| `sugerencias.contenido` (anónima) | No (anonimizada) | N/A | 2 años, luego anonimización |
| `sugerencias.ip_hash` | Cuasi-PII | Hash truncado (no reversible) | 90 días |
| `mensajes_whatsapp.contenido` | Sí (PII) | Cifrado en reposo | 2 años |
| `auditoria.detalle` | Variable | Sanitizar antes de guardar | 5 años |
| `eventos_pasarela.payload` | Sí (PII del pagador) | Cifrado en reposo | 5 años (fiscal) |

## Anonimización de sugerencias
- Sugerencias marcadas `anonima = true` no almacenan `asociado_id` ni `ip_hash` (se descartan al guardar).
- Tras 2 años, el `contenido` se anonimiza (se reemplaza por un resumen genérico) y se elimina el `ip_hash`.

## Derechos del titular (Ley 1581)
- Conocer, actualizar, rectificar y solicitar la eliminación de sus datos personales.
- Canal oficial para ejercer estos derechos: POR CONFIRMAR (hoy se usa WhatsApp/llamada).

## Responsable del tratamiento
- Antena Parabólica Bajo Tigui (organización sin ánimo de lucro, El Bagre, Antioquia).
- NIT y razón social: POR CONFIRMAR.
- Correo del responsable de habeas data: POR CONFIRMAR (no publicar placeholders).