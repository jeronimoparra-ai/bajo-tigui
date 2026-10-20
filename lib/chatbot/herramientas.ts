// Herramientas del chatbot: datos reales desde Supabase.
// Ninguna inventa: si la BD no responde, la herramienta lo dice.
import { supabase } from "@/lib/db";
import { estaAbierto, proximaApertura } from "@/lib/horario";

export type Herramienta =
  | "consultar_planes"
  | "consultar_cobertura"
  | "consultar_ticket"
  | "crear_ticket"
  | "consultar_horario";

export const HERRAMIENTAS: Herramienta[] = [
  "consultar_planes",
  "consultar_cobertura",
  "consultar_ticket",
  "crear_ticket",
  "consultar_horario",
];

export type ResultadoHerramienta = {
  ok: boolean;
  dato: unknown;
  mensaje?: string;
};

export async function consultar_planes(): Promise<ResultadoHerramienta> {
  if (!supabase) return { ok: false, dato: null, mensaje: "Base de datos no configurada." };
  const { data, error } = await supabase
    .from("planes")
    .select("nombre, descripcion, velocidad_mbps, canales_sd_hd, precio_mensual, meses_gratis, activo")
    .eq("activo", true);
  if (error) return { ok: false, dato: null, mensaje: error.message };
  return { ok: true, dato: data };
}

export async function consultar_cobertura(barrio?: string): Promise<ResultadoHerramienta> {
  if (!supabase) return { ok: false, dato: null, mensaje: "Base de datos no configurada." };
  let q = supabase
    .from("zonas_cobertura")
    .select("nombre, tipo, por_confirmar, activo")
    .eq("activo", true);
  if (barrio) q = q.ilike("nombre", `%${barrio}%`);
  const { data, error } = await q;
  if (error) return { ok: false, dato: null, mensaje: error.message };
  return {
    ok: true,
    dato: data,
    mensaje:
      !data || data.length === 0
        ? "No hay zona registrada con ese nombre. Las zonas exactas están por confirmar: registra una solicitud de cobertura."
        : "Las zonas exactas están marcadas como 'por_confirmar': la administración confirma caso por caso.",
  };
}

export async function consultar_ticket(codigo: string): Promise<ResultadoHerramienta> {
  if (!supabase) return { ok: false, dato: null, mensaje: "Base de datos no configurada." };
  const cod = codigo.trim().toUpperCase();
  if (!/^BZ-[A-F0-9]{6}$/.test(cod)) {
    return { ok: true, dato: null, mensaje: "El código no tiene el formato BZ-XXXXXX." };
  }
  const { data, error } = await supabase
    .from("tickets")
    .select("codigo, asunto, tipo, estado, creado_en")
    .eq("codigo", cod)
    .maybeSingle();
  if (error) return { ok: false, dato: null, mensaje: error.message };
  if (!data) return { ok: true, dato: null, mensaje: "No se encontró un ticket con ese código." };
  return { ok: true, dato: data };
}

export async function crear_ticket(params: {
  asunto: string;
  tipo: "peticion" | "queja" | "reclamo" | "sugerencia";
  descripcion: string;
  autorId?: string | null;
}): Promise<ResultadoHerramienta> {
  if (!supabase) return { ok: false, dato: null, mensaje: "Base de datos no configurada." };
  // Id generado aquí para calcular el código de seguimiento antes de insertar.
  const id = crypto.randomUUID();
  const codigo = `BZ-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
  const { data, error } = await supabase
    .from("tickets")
    .insert({
      id,
      codigo,
      asunto: params.asunto.slice(0, 160),
      tipo: params.tipo,
      estado: "abierto",
      asociado_id: params.autorId ?? null,
    })
    .select("codigo, asunto, tipo, estado")
    .single();
  if (error) return { ok: false, dato: null, mensaje: error.message };
  // Primer mensaje con el detalle.
  if (data) {
    await supabase.from("mensajes_ticket").insert({
      ticket_id: id,
      autor_id: params.autorId ?? null,
      contenido: params.descripcion,
    });
  }
  return { ok: true, dato: data };
}

export function consultar_horario(): ResultadoHerramienta {
  const ahora = new Date();
  const abierto = estaAbierto(ahora);
  const prox = proximaApertura(ahora);
  return {
    ok: true,
    dato: {
      abierto,
      proximaApertura: prox ? prox.toISOString() : null,
      horario: "lunes a viernes, 7:00 a. m. – 5:00 p. m. (America/Bogota)",
    },
  };
}
