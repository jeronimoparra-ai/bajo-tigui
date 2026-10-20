-- 009_chatbot_whatsapp.sql
CREATE TABLE conversaciones_chatbot (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asociado_id     uuid REFERENCES asociados(id),
    canal           text NOT NULL DEFAULT 'web' CHECK (canal IN ('web','whatsapp')),
    creada_en       timestamptz NOT NULL DEFAULT now(),
    actualizada_en  timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE mensajes_chatbot (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    conversacion_id uuid NOT NULL REFERENCES conversaciones_chatbot(id) ON DELETE CASCADE,
    rol             text NOT NULL CHECK (rol IN ('usuario','bot','sistema')),
    contenido       text NOT NULL,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE mensajes_whatsapp (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    asociado_id     uuid REFERENCES asociados(id),
    direccion       text NOT NULL CHECK (direccion IN ('entrante','saliente')),
    telefono        text NOT NULL,
    contenido       text NOT NULL,
    meta_id         text UNIQUE,
    creado_en       timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_mensajes_chatbot_conv ON mensajes_chatbot(conversacion_id);