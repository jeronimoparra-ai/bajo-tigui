import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/db";
import { BuzonSchema, TIPOS_A_TICKET } from "@/lib/buzon/schema";

// Buzón de sugerencias y PQRS: crea ticket + mensaje, y devuelve código de seguimiento.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Código de seguimiento legible: BZ-XXXXXX (6 primeros hex del uuid). */
function codigoSeguimiento(id: string): string {
  return `BZ-${id.replace(/-/g, "").slice(0, 6).toUpperCase()}`;
}

export async function POST(req: NextRequest) {
  const cuerpo = await req.json().catch(() => null);
  const parsed = BuzonSchema.safeParse(cuerpo);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Revise los datos del formulario", detalles: parsed.error.flatten() },
      { status: 400 },
    );
  }
  const d = parsed.data;

  if (!d.anonima && !d.telefono && !d.correo) {
    return NextResponse.json(
      { ok: false, error: "Deje un teléfono o un correo para poder responderle" },
      { status: 400 },
    );
  }

  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "El buzón no está conectado todavía" },
      { status: 503 },
    );
  }

  // El id se genera en la app para poder calcular el código de seguimiento
  // antes de insertar (el índice único lo garantiza).
  const id = crypto.randomUUID();
  const codigo = codigoSeguimiento(id);

  const { data: ticket, error } = await supabase
    .from("tickets")
    .insert({
      id,
      codigo,
      asunto: d.asunto,
      tipo: TIPOS_A_TICKET[d.tipo] ?? "peticion",
      estado: "abierto",
      asociado_id: null,
    })
    .select("id, codigo, asunto, tipo, estado, creado_en")
    .single();

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const detalle = [
    d.mensaje,
    d.nombre ? `\n\n— ${d.nombre}` : "",
    d.telefono ? `\nTeléfono: ${d.telefono}` : "",
    d.correo ? `\nCorreo: ${d.correo}` : "",
    d.adjuntos.length ? `\nAdjuntos: ${d.adjuntos.map((a) => a.nombre).join(", ")}` : "",
  ].join("");

  await supabase.from("mensajes_ticket").insert({
    ticket_id: ticket.id,
    autor_id: null,
    contenido: detalle,
  });

  // Sugerencia: va también a su propia tabla (bandeja de sugerencias).
  if (d.tipo === "sugerencia" || d.tipo === "mejora") {
    await supabase.from("sugerencias").insert({
      asociado_id: null,
      contenido: d.mensaje,
      anonima: d.anonima,
      ip_hash: null,
    });
  }

  return NextResponse.json(
    {
      ok: true,
      codigo,
      ticket: { asunto: ticket.asunto, tipo: ticket.tipo, estado: ticket.estado },
      mensaje:
        "Recibimos su solicitud. Guarde este código para consultar su estado por WhatsApp al 312 274 0219.",
    },
    { status: 201 },
  );}

/** Consulta el estado de un ticket por su código de seguimiento. */
export async function GET(req: NextRequest) {
  const codigo = (req.nextUrl.searchParams.get("codigo") ?? "").trim().toUpperCase();
  if (!/^BZ-[A-F0-9]{6}$/.test(codigo)) {
    return NextResponse.json({ ok: false, error: "Código inválido" }, { status: 400 });
  }
  if (!supabase) {
    return NextResponse.json({ ok: false, error: "Buzón no conectado" }, { status: 503 });
  }
  const { data, error } = await supabase
    .from("tickets")
    .select("id, asunto, tipo, estado, creado_en")
    .eq("codigo", codigo)
    .maybeSingle();
  if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ ok: true, encontrado: false });
  return NextResponse.json({
    ok: true,
    encontrado: true,
    ticket: {
      asunto: data.asunto,
      tipo: data.tipo,
      estado: data.estado,
      creado_en: data.creado_en,
    },
  });
}
