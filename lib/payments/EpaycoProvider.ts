import type { PaymentProvider, CheckoutResult } from "./PaymentProvider";

// Implementación ePayco (respaldo). Requiere EPAYCO_PUBLIC_KEY, EPAYCO_PRIVATE_KEY.
export const EpaycoProvider: PaymentProvider = {
  nombre: "epayco",
  async createCheckout(params): Promise<CheckoutResult> {
    throw new Error("EpaycoProvider.createCheckout: POR IMPLEMENTAR (falta credencial EPAYCO_PRIVATE_KEY)");
  },
  async verifyWebhook(_payload, _firma) {
    return false;
  },
  parseWebhook(_payload) {
    return { referencia: "", estado: "pendiente", monto: 0 };
  },
};
