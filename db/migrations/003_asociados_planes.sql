-- 003_asociados_planes.sql
CREATE TABLE asociados (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id      uuid REFERENCES usuarios(id),
    nombre_completo text NOT NULL,
    documento       text UNIQUE,
    telefono        text,
    barrio          text,
    direccion       text,
    zona_id         uuid,
    activo          boolean NOT NULL DEFAULT true,
    creado_en       timestamptz NOT NULL DEFAULT now(),
    actualizado_en  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE planes (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre          text NOT NULL,
    descripcion     text,
    velocidad_mbps  integer NOT NULL CHECK (velocidad_mbps > 0),
    canales_sd_hd   integer NOT NULL CHECK (canales_sd_hd > 0),
    precio_mensual  integer NOT NULL CHECK (precio_mensual >= 0),
    meses_gratis    integer NOT NULL DEFAULT 0,
    activo          boolean NOT NULL DEFAULT true,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE plan_canales (
    plan_id     uuid NOT NULL REFERENCES planes(id) ON DELETE CASCADE,
    canal_id    uuid NOT NULL,
    PRIMARY KEY (plan_id, canal_id)
);