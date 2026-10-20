-- 007_facturas_pagos_pasarela.sql
CREATE TABLE facturas (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    suscripcion_id  uuid NOT NULL REFERENCES suscripciones(id),
    periodo         text NOT NULL,
    monto           integer NOT NULL CHECK (monto >= 0),
    estado          text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','pagada','vencida','anulada')),
    fecha_emision   timestamptz NOT NULL DEFAULT now(),
    fecha_vencimiento timestamptz,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE pagos (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    factura_id      uuid NOT NULL REFERENCES facturas(id),
    monto           integer NOT NULL CHECK (monto >= 0),
    metodo          text NOT NULL CHECK (metodo IN ('wompi','epayco','efectivo','transferencia','otro')),
    estado          text NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente','aprobado','rechazado','reembolsado')),
    referencia      text,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE eventos_pasarela (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    pasarela        text NOT NULL CHECK (pasarela IN ('wompi','epayco')),
    evento_id       text NOT NULL UNIQUE,
    tipo            text NOT NULL,
    payload         jsonb NOT NULL,
    procesado       boolean NOT NULL DEFAULT false,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_facturas_suscripcion ON facturas(suscripcion_id);
CREATE INDEX idx_pagos_factura ON pagos(factura_id);
CREATE INDEX idx_eventos_pasarela_evento ON eventos_pasarela(evento_id);