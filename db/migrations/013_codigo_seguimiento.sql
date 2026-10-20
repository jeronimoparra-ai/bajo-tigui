-- 013_codigo_seguimiento.sql
-- Código de seguimiento legible para los tickets (buzón de PQRS y chatbot).
-- Se genera como BZ-XXXXXX a partir de los 6 primeros hex del uuid.

ALTER TABLE tickets
  ADD COLUMN IF NOT EXISTS codigo text;

-- Backfill para los tickets ya creados.
UPDATE tickets
SET codigo = 'BZ-' || upper(substr(replace(id::text, '-', ''), 1, 6))
WHERE codigo IS NULL;

-- Unicidad: dos tickets no pueden compartir código.
CREATE UNIQUE INDEX IF NOT EXISTS idx_tickets_codigo
  ON tickets (codigo)
  WHERE codigo IS NOT NULL;

-- El código es obligatorio a partir de ahora.
ALTER TABLE tickets
  ALTER COLUMN codigo SET NOT NULL;

COMMENT ON COLUMN tickets.codigo IS 'Código público de seguimiento (BZ-XXXXXX) para que el asociado consulte su estado.';
