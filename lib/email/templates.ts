// Plantillas de correo (Resend/Nodemailer). El envío real se conecta en Fase 4.4.
export const templates = {
  confirmacionSolicitud: (nombre: string) => ({
    subject: "Recibimos su solicitud — Bajo Tigui",
    html: `<p>Hola ${nombre},</p><p>Recibimos su solicitud. Le responderemos por WhatsApp o llamada en el horario de atención (lunes a viernes, 7:00 a. m. – 5:00 p. m.).</p><p>La señal viaja lejos. Aquí se queda.</p>`,
  }),
  respuestaSugerencia: (nombre: string) => ({
    subject: "Gracias por su sugerencia — Bajo Tigui",
    html: `<p>Hola ${nombre},</p><p>Gracias por su sugerencia. La revisaremos con la administración.</p>`,
  }),
  reciboPago: (nombre: string, monto: number, referencia: string) => ({
    subject: `Recibo de pago — Bajo Tigui (${referencia})`,
    html: `<p>Hola ${nombre},</p><p>Recibimos su pago de $${monto.toLocaleString("es-CO")} COP. Referencia: ${referencia}.</p>`,
  }),
  recordatorioSuspension: (nombre: string, saldo: number) => ({
    subject: "Recordatorio de pago — Bajo Tigui",
    html: `<p>Hola ${nombre},</p><p>Su saldo es de $${saldo.toLocaleString("es-CO")} COP. Recuerde que los servicios de parabólica pueden suspenderse cuando el saldo supera los $37.000.</p>`,
  }),
};
