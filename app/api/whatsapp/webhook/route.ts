import { NextRequest, NextResponse } from "next/server";
import { estaAbierto } from "@/lib/horario";
import { supabase } from "@/lib/db";
import { sendWhatsAppMessage, fueraDeHorarioMessage } from "@/lib/whatsapp/send";

// Webhook de WhatsApp Cloud API (Meta).
// GET: verificación del webhook (Meta envía hub.challenge).
// POST: recepción de mensajes (verificar firma con META_APP_SECRET).

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");
  const verifyToken = process.env.META_VERIFY_TOKEN;
  if (mode === "subscribe" && token && token === verifyToken && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }
  return new NextResponse("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  // POR IMPLEMENTAR: verificar firma X-Hub-Signature-256 con META_APP_SECRET.
  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ received: true }, { status: 200 });

  const entries = (body as { entry?: unknown[] }).entry ?? [];
  for (const entry of entries) {
    const changes = (entry as { changes?: unknown[] }).changes ?? [];
    for (const change of changes) {
      const value = (change as { value?: Record<string, unknown> }).value ?? {};
      const messages = (value.messages as Array<Record<string, unknown>>) ?? [];
      for (const msg of messages) {
        const from = String(msg.from ?? "");
        const text = (msg.text as { body?: string })?.body ?? "";
        const metaId = String(msg.id ?? "");
        // Registrar mensaje (si hay BD).
        if (supabase) {
          await supabase.from("mensajes_whatsapp").insert({
            direccion: "entrante",
            telefono: from,
            contenido: text,
            meta_id: metaId || null,
          });
        }
        // Respuesta automática fuera de horario.
        if (!estaAbierto()) {
          await sendWhatsAppMessage(from, fueraDeHorarioMessage());
        }
      }
    }
  }
  return NextResponse.json({ received: true });
}
