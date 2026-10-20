-- 002_usuarios_roles.sql
CREATE TABLE roles (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre      citext UNIQUE NOT NULL,
    descripcion text,
    creado_en   timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE usuarios (
    id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    rol_id        uuid NOT NULL REFERENCES roles(id),
    email         citext UNIQUE NOT NULL,
    password_hash text NOT NULL,
    activo        boolean NOT NULL DEFAULT true,
    creado_en     timestamptz NOT NULL DEFAULT now(),
    actualizado_en timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX idx_usuarios_rol ON usuarios(rol_id);