import type { PaymentProvider, CheckoutResult } from "./PaymentProvider";

// Implementación Wompi. Requiere WOMPI_PUBLIC_KEY, WOMPI_PRIVATE_KEY, WOMPI_EVENTS_SECRET.
// POR CONFIRMAR: credenciales y métodos habilitados (Nequi, PSE, tarjetas, Bancolombia QR, Daviplata, efectivo).
export const WompiProvider: PaymentProvider = {
  nombre: "wompi",
  async createCheckout(params): Promise<CheckoutResult> {
    // TODO: llamar a la API de Wompi para crear la transacción.
    throw new Error("WompiProvider.createCheckout: POR IMPLEMENTAR (falta credencial WOMPI_PRIVATE_KEY)");
  },
  async verifyWebhook(payload, firma) {
    const secret = process.env.WOMPI_EVENTS_SECRET;
    if (!secret || !firma) return false;
    // Wompi: firma = SHA256(JSON.stringify(payload) + secret) (hex). Verificar en constant-time.
    const crypto = await import("node:crypto");
    const expected = crypto.createHash("sha256").update(JSON.stringify(payload) + secret).digest("hex");
    if (expected.length !== firma.length) return false;
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(firma));
  },
  parseWebhook(payload) {
    const p = payload as Record<string, unknown>;
    const data = (p.data as Record<string, unknown>) ?? {};
    const transaction = (data.transaction as Record<string, unknown>) ?? {};
    const referencia = String(transaction.reference ?? "");
    const estadoRaw = String(transaction.status ?? "PENDING").toUpperCase();
    const estado = estadoRaw === "APPROVED" ? "aprobado" : estadoRaw === "DECLINED" ? "rechazado" : "pendiente";
    const monto = Number(transaction.amount_in_cents ?? 0) / 100;
    return { referencia, estado, monto };
  },
};
