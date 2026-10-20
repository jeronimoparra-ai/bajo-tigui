-- 010_avisos_configuracion.sql
CREATE TABLE avisos (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    titulo          text NOT NULL,
    contenido       text NOT NULL,
    activo          boolean NOT NULL DEFAULT false,
    creado_en       timestamptz NOT NULL DEFAULT now(),
    actualizado_en  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE configuracion (
    clave           text PRIMARY KEY,
    valor           text NOT NULL,
    descripcion     text,
    actualizado_en  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE configuracion_horarios (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    dia_semana      integer NOT NULL CHECK (dia_semana BETWEEN 0 AND 6),
    hora_inicio     time NOT NULL,
    hora_fin        time NOT NULL,
    activo          boolean NOT NULL DEFAULT true,
    UNIQUE (dia_semana, hora_inicio, hora_fin)
);

CREATE TABLE festivos (
    fecha           date PRIMARY KEY,
    nombre          text NOT NULL
);