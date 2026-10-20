-- 005_cobertura.sql
CREATE TABLE zonas_cobertura (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre          text NOT NULL,
    tipo            text NOT NULL CHECK (tipo IN ('barrio','vereda','municipio')),
    poligono        jsonb,
    por_confirmar   boolean NOT NULL DEFAULT true,
    activo          boolean NOT NULL DEFAULT true,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

-- FK asociados.zona_id
ALTER TABLE asociados
    ADD CONSTRAINT fk_asociados_zona
    FOREIGN KEY (zona_id) REFERENCES zonas_cobertura(id);