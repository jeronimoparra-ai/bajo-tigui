# Diccionario de datos — Bajo Tigui

Todas las fechas se almacenan en UTC (`timestamptz`) y se presentan en `America/Bogota`. El dinero se almacena como `integer` (COP, sin decimales flotantes).

## Tablas

### roles
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | Identificador |
| nombre | citext | UNIQUE, NOT NULL | Nombre del rol (admin, asociado) |
| descripcion | text | | Descripción |
| creado_en | timestamptz | NOT NULL, default now() | |

### usuarios
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| rol_id | uuid | FK → roles.id, NOT NULL | |
| email | citext | UNIQUE, NOT NULL | |
| password_hash | text | NOT NULL | bcrypt/argon2 |
| activo | boolean | NOT NULL, default true | |
| creado_en / actualizado_en | timestamptz | NOT NULL | |

### asociados
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| usuario_id | uuid | FK → usuarios.id (nullable) | |
| nombre_completo | text | NOT NULL | |
| documento | text | UNIQUE | |
| telefono | text | | |
| barrio / direccion | text | | |
| zona_id | uuid | FK → zonas_cobertura.id | |
| activo | boolean | NOT NULL, default true | |
| creado_en / actualizado_en | timestamptz | NOT NULL | |

### planes
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| nombre | text | NOT NULL | |
| descripcion | text | | |
| velocidad_mbps | integer | NOT NULL, >0 | Mbps de descarga (no simétrico) |
| canales_sd_hd | integer | NOT NULL, >0 | Cantidad de canales |
| precio_mensual | integer | NOT NULL, >=0 | COP |
| meses_gratis | integer | NOT NULL, default 0 | |
| activo | boolean | NOT NULL, default true | |
| creado_en | timestamptz | NOT NULL | |

### canales
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| nombre | text | NOT NULL | |
| numero | integer | | |
| categoria | text | | |
| hd | boolean | NOT NULL, default false | |
| activo | boolean | NOT NULL, default true | |
| por_confirmar | boolean | NOT NULL, default true | Parrilla real pendiente |
| creado_en | timestamptz | NOT NULL | |

### plan_canales
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| plan_id | uuid | PK, FK → planes.id (cascade) | |
| canal_id | uuid | PK, FK → canales.id (cascade) | |

### zonas_cobertura
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| nombre | text | NOT NULL | |
| tipo | text | CHECK (barrio/vereda/municipio) | |
| poligono | jsonb | | Polígono GeoJSON (POR CONFIRMAR) |
| por_confirmar | boolean | NOT NULL, default true | |
| activo | boolean | NOT NULL, default true | |
| creado_en | timestamptz | NOT NULL | |

### solicitudes_servicio
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| asociado_id | uuid | FK → asociados.id, NOT NULL | |
| zona_id | uuid | FK → zonas_cobertura.id | |
| tipo | text | CHECK (instalacion/soporte/cobertura/otro) | |
| descripcion | text | | |
| estado | text | CHECK (pendiente/en_revision/resuelto/cancelado), default pendiente | |
| creado_en / actualizado_en | timestamptz | NOT NULL | |

### suscripciones
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| asociado_id | uuid | FK → asociados.id, NOT NULL | |
| plan_id | uuid | FK → planes.id, NOT NULL | |
| estado | text | CHECK (activa/suspendida/cancelada), default activa | |
| fecha_inicio | timestamptz | NOT NULL, default now() | |
| fecha_fin | timestamptz | nullable | |
| creado_en | timestamptz | NOT NULL | |

### facturas
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| suscripcion_id | uuid | FK → suscripciones.id, NOT NULL | |
| periodo | text | NOT NULL | YYYY-MM |
| monto | integer | NOT NULL, >=0 | COP |
| estado | text | CHECK (pendiente/pagada/vencida/anulada), default pendiente | |
| fecha_emision | timestamptz | NOT NULL, default now() | |
| fecha_vencimiento | timestamptz | nullable | |
| creado_en | timestamptz | NOT NULL | |

### pagos
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| factura_id | uuid | FK → facturas.id, NOT NULL | |
| monto | integer | NOT NULL, >=0 | COP |
| metodo | text | CHECK (wompi/epayco/efectivo/transferencia/otro) | |
| estado | text | CHECK (pendiente/aprobado/rechazado/reembolsado), default pendiente | |
| referencia | text | | Referencia de la pasarela |
| creado_en | timestamptz | NOT NULL | |

### eventos_pasarela
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| pasarela | text | CHECK (wompi/epayco), NOT NULL | |
| evento_id | text | UNIQUE, NOT NULL | Idempotencia de webhooks |
| tipo | text | NOT NULL | |
| payload | jsonb | NOT NULL | |
| procesado | boolean | NOT NULL, default false | |
| creado_en | timestamptz | NOT NULL | |

### tickets
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| asociado_id | uuid | FK → asociados.id (nullable, anónimo) | |
| asunto | text | NOT NULL | |
| tipo | text | CHECK (peticion/queja/reclamo/sugerencia/pqrs) | |
| estado | text | CHECK (abierto/en_proceso/resuelto/cerrado), default abierto | |
| creado_en / actualizado_en | timestamptz | NOT NULL | |

### mensajes_ticket
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| ticket_id | uuid | FK → tickets.id (cascade), NOT NULL | |
| autor_id | uuid | FK → usuarios.id (nullable) | |
| contenido | text | NOT NULL | |
| creado_en | timestamptz | NOT NULL | |

### sugerencias
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| asociado_id | uuid | FK → asociados.id (nullable) | |
| contenido | text | NOT NULL | |
| anonima | boolean | NOT NULL, default false | |
| ip_hash | text | | Hash truncado (retención) |
| creado_en | timestamptz | NOT NULL | |

### conversaciones_chatbot / mensajes_chatbot
Ver migración `009`. `conversaciones_chatbot` (id, asociado_id nullable, canal web/whatsapp). `mensajes_chatbot` (id, conversacion_id FK cascade, rol usuario/bot/sistema, contenido, creado_en).

### mensajes_whatsapp
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| asociado_id | uuid | FK → asociados.id (nullable) | |
| direccion | text | CHECK (entrante/saliente), NOT NULL | |
| telefono | text | NOT NULL | |
| contenido | text | NOT NULL | |
| meta_id | text | UNIQUE | Id de Meta (idempotencia) |
| creado_en | timestamptz | NOT NULL | |

### avisos
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| titulo / contenido | text | NOT NULL | |
| activo | boolean | NOT NULL, default false | |
| creado_en / actualizado_en | timestamptz | NOT NULL | |

### configuracion
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| clave | text | PK | |
| valor | text | NOT NULL | |
| descripcion | text | | |
| actualizado_en | timestamptz | NOT NULL | |

### configuracion_horarios
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| dia_semana | integer | CHECK 0..6 | 0 = domingo |
| hora_inicio / hora_fin | time | NOT NULL | |
| activo | boolean | NOT NULL, default true | |
| UNIQUE (dia_semana, hora_inicio, hora_fin) | | | |

### festivos
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| fecha | date | PK | |
| nombre | text | NOT NULL | |

### auditoria
| Columna | Tipo | Restricciones | Descripción |
|---|---|---|---|
| id | uuid | PK | |
| usuario_id | uuid | FK → usuarios.id (nullable) | |
| accion | text | NOT NULL | |
| entidad | text | NOT NULL | |
| entidad_id | uuid | nullable | |
| detalle | jsonb | | |
| creado_en | timestamptz | NOT NULL | |