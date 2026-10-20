-- 011_auditoria.sql
CREATE TABLE auditoria (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id      uuid REFERENCES usuarios(id),
    accion          text NOT NULL,
    entidad         text NOT NULL,
    entidad_id      uuid,
    detalle         jsonb,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_auditoria_usuario ON auditoria(usuario_id);
CREATE INDEX idx_auditoria_entidad ON auditoria(entidad, entidad_id);