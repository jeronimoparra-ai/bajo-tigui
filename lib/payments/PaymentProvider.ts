// Interfaz común de pagos (Wompi / ePayco). El estado lo decide el backend.
export interface CheckoutResult {
  url: string;
  referencia: string;
}

export interface PaymentProvider {
  nombre: "wompi" | "epayco";
  createCheckout(params: {
    monto: number; // COP entero
    referencia: string;
    descripcion: string;
    redirectUrl: string;
    telefono?: string;
  }): Promise<CheckoutResult>;
  verifyWebhook(payload: unknown, firma: string): Promise<boolean>;
  parseWebhook(payload: unknown): {
    referencia: string;
    estado: "aprobado" | "rechazado" | "pendiente";
    monto: number;
  };
}
