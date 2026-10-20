-- 006_servicios_suscripciones.sql
CREATE TABLE solicitudes_servicio (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asociado_id     uuid NOT NULL REFERENCES asociados(id),
    zona_id         uuid REFERENCES zonas_cobertura(id),
    tipo            text NOT NULL CHECK (tipo IN ('instalacion','soporte','cobertura','otro')),
    descripcion     text,
    estado          text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','en_revision','resuelto','cancelado')),
    creado_en       timestamptz NOT NULL DEFAULT now(),
    actualizado_en  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE suscripciones (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asociado_id     uuid NOT NULL REFERENCES asociados(id),
    plan_id         uuid NOT NULL REFERENCES planes(id),
    estado          text NOT NULL DEFAULT 'activa' CHECK (estado IN ('activa','suspendida','cancelada')),
    fecha_inicio    timestamptz NOT NULL DEFAULT now(),
    fecha_fin       timestamptz,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_suscripciones_asociado ON suscripciones(asociado_id);
CREATE INDEX idx_solicitudes_asociado ON solicitudes_servicio(asociado_id);