-- 008_tickets_sugerencias.sql
CREATE TABLE tickets (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asociado_id     uuid REFERENCES asociados(id),
    asunto          text NOT NULL,
    tipo            text NOT NULL CHECK (tipo IN ('peticion','queja','reclamo','sugerencia','pqrs')),
    estado          text NOT NULL DEFAULT 'abierto' CHECK (estado IN ('abierto','en_proceso','resuelto','cerrado')),
    creado_en       timestamptz NOT NULL DEFAULT now(),
    actualizado_en  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE mensajes_ticket (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ticket_id       uuid NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
    autor_id        uuid REFERENCES usuarios(id),
    contenido       text NOT NULL,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE sugerencias (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asociado_id     uuid REFERENCES asociados(id),
    contenido       text NOT NULL,
    anonima         boolean NOT NULL DEFAULT false,
    ip_hash         text,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_tickets_asociado ON tickets(asociado_id);
CREATE INDEX idx_mensajes_ticket_ticket ON mensajes_ticket(ticket_id);