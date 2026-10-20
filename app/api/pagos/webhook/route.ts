import { NextRequest, NextResponse } from "next/server";

// Webhook de pasarela (Wompi/ePayco). Verifica firma + idempotencia (eventos_pasarela).
// El estado lo decide el backend, nunca el frontend.

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload) return NextResponse.json({ received: true }, { status: 200 });
  const firma = req.headers.get("x-event-checksum") ?? req.headers.get("x-signature") ?? "";
  // Identificar pasarela por header o payload.
  const pasarela = req.headers.get("x-pasarela") === "epayco" ? "epayco" : "wompi";
  const provider = pasarela === "epayco" ? (await import("@/lib/payments/EpaycoProvider")).EpaycoProvider : (await import("@/lib/payments/WompiProvider")).WompiProvider;
  const ok = await provider.verifyWebhook(payload, firma);
  if (!ok) {
    return NextResponse.json({ received: true, error: "firma inválida" }, { status: 401 });
  }
  const parsed = provider.parseWebhook(payload);
  // POR IMPLEMENTAR: idempotencia por evento_id en eventos_pasarela; actualizar factura/pago; enviar recibo por correo/WhatsApp.
  return NextResponse.json({ received: true, parsed, porImplementar: true });
}
