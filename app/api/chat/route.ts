import { NextRequest, NextResponse } from "next/server";
import { PeticionChatSchema, consultarClaude } from "@/lib/chatbot/cliente";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Límite simple por IP (en memoria). Suficiente para el sandbox; en producción
// con varias instancias esto debe ir a Redis/KV.
const MAX_POR_MINUTO = 12;
const golpes = new Map<string, number[]>();

function limite(ip: string): boolean {
  const ahora = Date.now();
  const lista = (golpes.get(ip) ?? []).filter((t) => ahora - t < 60_000);
  lista.push(ahora);
  golpes.set(ip, lista);
  return lista.length <= MAX_POR_MINUTO;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (!limite(ip)) {
    return NextResponse.json(
      { ok: false, error: "Demasiadas consultas. Espere un minuto e intente de nuevo." },
      { status: 429 },
    );
  }

  const cuerpo = await req.json().catch(() => null);
  const parsed = PeticionChatSchema.safeParse(cuerpo);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Mensaje inválido" }, { status: 400 });
  }

  // Filtro de datos sensibles: no se guardan ni se reenvían credenciales.
  const mensaje = parsed.data.mensaje;
  if (/(tarjeta|credit card|\d{4}[- ]?\d{4}[- ]?\d{4}[- ]?\d{4}|clave|contraseña|password|pin\b|cvv|codigo de seguridad)/i.test(mensaje)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "No me envíes datos de tarjeta, contraseñas ni códigos de seguridad: no los guardo y podés borrarlos. Para pagos usamos Nequi.",
      },
      { status: 200 },
    );
  }

  const { eventos } = await consultarClaude(parsed.data);

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        for await (const ev of eventos) {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(ev)}\n\n`));
        }
      } catch (e) {
        controller.enqueue(
          encoder.encode(
            `data: ${JSON.stringify({ tipo: "error", mensaje: String(e) })}\n\n`,
          ),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
