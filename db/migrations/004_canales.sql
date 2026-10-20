-- 004_canales.sql
CREATE TABLE canales (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre      text NOT NULL,
    numero      integer,
    categoria   text,
    hd          boolean NOT NULL DEFAULT false,
    activo      boolean NOT NULL DEFAULT true,
    por_confirmar boolean NOT NULL DEFAULT true,
    creado_en   timestamptz NOT NULL DEFAULT now()
);

-- FK diferida: plan_canales.canal_id -> canales.id
ALTER TABLE plan_canales
    ADD CONSTRAINT fk_plan_canales_canal
    FOREIGN KEY (canal_id) REFERENCES canales(id) ON DELETE CASCADE;