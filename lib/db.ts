// Cliente Supabase para Bajo Tigui (Fase 4).
// Requiere SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.
// POR IMPLEMENTAR: instalar @supabase/supabase-js y configurar el MCP de Supabase.
import { createClient } from "@supabase/supabase-js";
import ws from "ws";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase =
  url && key
    ? createClient(url, key, { auth: { persistSession: false }, realtime: { transport: ws as unknown as never } })
    : null;

export function requireSupabase() {
  if (!supabase) {
    throw new Error("Supabase no configurado: faltan SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");
  }
  return supabase;
}
