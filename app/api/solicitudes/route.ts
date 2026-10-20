import { NextRequest, NextResponse } from "next/server";
import { SolicitudSchema } from "@/lib/zod/solicitud";
import { supabase } from "@/lib/db";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = SolicitudSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }
  // Persistir en BD (solicitudes_servicio) + crear ticket. Enviar correo de confirmación.
  if (supabase) {
    const { data: sol, error } = await supabase
      .from("solicitudes_servicio")
      .insert({
        asociado_id: null,
        tipo: parsed.data.tipo === "peticion" || parsed.data.tipo === "queja" || parsed.data.tipo === "reclamo" || parsed.data.tipo === "sugerencia"
          ? parsed.data.tipo === "peticion" ? "otro" : parsed.data.tipo
          : "otro",
        descripcion: parsed.data.mensaje,
        estado: "pendiente",
      })
      .select("id")
      .single();
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
    }
    // Crear ticket asociado.
    if (sol?.id) {
      await supabase.from("tickets").insert({
        asunto: parsed.data.mensaje.slice(0, 80),
        tipo: parsed.data.tipo === "sugerencia" ? "sugerencia" : parsed.data.tipo === "peticion" ? "peticion" : parsed.data.tipo === "queja" ? "queja" : parsed.data.tipo === "reclamo" ? "reclamo" : "pqrs",
        estado: "abierto",
      });
    }
  }
  return NextResponse.json({ ok: true, id: "recibido", porImplementar: !supabase }, { status: 201 });
}
