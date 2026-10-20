-- 001_seed.sql
-- Datos semilla. No inventar datos no confirmados (ver AGENTS.md §3).
-- Los canales se marcan como "por confirmar" hasta que la administración entregue la parrilla real.

-- Roles
INSERT INTO roles (nombre, descripcion) VALUES
  ('admin', 'Administración de Bajo Tigui'),
  ('asociado', 'Asociado (cliente)');

-- Plan principal (confirmado)
INSERT INTO planes (nombre, descripcion, velocidad_mbps, canales_sd_hd, precio_mensual, meses_gratis, activo)
VALUES ('Fibra + TV', 'Internet por fibra óptica 50 Mbps de descarga + TV por antena parabólica 90 canales SD+HD', 50, 90, 70000, 1, true);

-- Canales de ejemplo (POR CONFIRMAR)
INSERT INTO canales (nombre, numero, categoria, hd, por_confirmar) VALUES
  ('Canal de ejemplo 1', 1, 'Entretenimiento', false, true),
  ('Canal de ejemplo 2', 2, 'Noticias', false, true);

-- Horario L–V 7:00–17:00 (America/Bogota)
INSERT INTO configuracion_horarios (dia_semana, hora_inicio, hora_fin, activo) VALUES
  (1, '07:00', '17:00', true),
  (2, '07:00', '17:00', true),
  (3, '07:00', '17:00', true),
  (4, '07:00', '17:00', true),
  (5, '07:00', '17:00', true);

-- Festivos de Colombia (ejemplos — completar por año)
INSERT INTO festivos (fecha, nombre) VALUES
  ('2026-01-01', 'Año Nuevo'),
  ('2026-01-12', 'Reyes Magos'),
  ('2026-03-23', 'San José'),
  ('2026-04-02', 'Jueves Santo'),
  ('2026-04-03', 'Viernes Santo'),
  ('2026-05-01', 'Día del Trabajo'),
  ('2026-05-18', 'Ascensión del Señor'),
  ('2026-06-08', 'Corpus Christi'),
  ('2026-06-15', 'Sagrado Corazón'),
  ('2026-06-29', 'San Pedro y San Pablo'),
  ('2026-07-20', 'Grito de Independencia'),
  ('2026-08-07', 'Batalla de Boyacá'),
  ('2026-08-17', 'Asunción de la Virgen'),
  ('2026-10-12', 'Día de la Raza'),
  ('2026-11-02', 'Todos los Santos'),
  ('2026-11-16', 'Independencia de Cartagena'),
  ('2026-12-08', 'Inmaculada Concepción'),
  ('2026-12-25', 'Navidad');

-- Aviso de suspensión (inactivo en semilla)
INSERT INTO avisos (titulo, contenido, activo) VALUES
  ('Suspensión por saldo', 'Los servicios de parabólica pueden suspenderse cuando el saldo supera los $37.000. La administración define cuándo.', false);

-- Configuración general
INSERT INTO configuracion (clave, valor, descripcion) VALUES
  ('saldo_suspension', '37000', 'Saldo a partir del cual se puede suspender el servicio de parabólica (COP)'),
  ('whatsapp_telefono', '3147182506', 'WhatsApp y llamadas (sin espacios)'),
  ('zona_horaria', 'America/Bogota', 'Zona horaria de presentación'),
  ('instalacion_gratis', 'por_confirmar', 'Instalación gratuita (POR CONFIRMAR)');