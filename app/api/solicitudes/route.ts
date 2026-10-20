import { NextRequest, NextResponse } from "next/server";
import { SolicitudSchema } from "@/lib/zod/solicitud";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = SolicitudSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }
  // TODO: persistir en BD (solicitudes_servicio) y crear ticket; enviar correo.
  return NextResponse.json({ ok: true, id: "por-generar", porImplementar: true }, { status: 201 });
}
