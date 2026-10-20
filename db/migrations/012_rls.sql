-- 012_rls.sql
-- Row Level Security (Supabase). Ajustar claims segun el JWT de la app.
ALTER TABLE asociados ENABLE ROW LEVEL SECURITY;
ALTER TABLE suscripciones ENABLE ROW LEVEL SECURITY;
ALTER TABLE facturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE pagos ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes_ticket ENABLE ROW LEVEL SECURITY;
ALTER TABLE sugerencias ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversaciones_chatbot ENABLE ROW LEVEL SECURITY;
ALTER TABLE mensajes_chatbot ENABLE ROW LEVEL SECURITY;

-- Ejemplo de política: un asociado solo ve sus propios datos.
-- CREATE POLICY asociados_propios ON asociados
--   FOR SELECT USING (usuario_id = auth.uid());
-- CREATE POLICY suscripciones_propias ON suscripciones
--   FOR SELECT USING (asociado_id IN (SELECT id FROM asociados WHERE usuario_id = auth.uid()));