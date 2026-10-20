// Envío de correos (Resend). Requiere RESEND_API_KEY y RESEND_FROM_EMAIL.
// POR IMPLEMENTAR: configurar el MCP/API de Resend y las plantillas HTML finales.
import { Resend } from "resend";
import { templates } from "./templates";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function sendEmail(to: string, template: keyof typeof templates, ...args: unknown[]) {
  if (!resend) {
    console.warn("Resend no configurado: falta RESEND_API_KEY. Correo no enviado.");
    return { ok: false, porImplementar: true };
  }
  const tpl = (templates[template] as (...a: unknown[]) => { subject: string; html: string })(...args);
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "contacto@bajotigui.co",
      to,
      subject: tpl.subject,
      html: tpl.html,
    });
    return { ok: true };
  } catch (e) {
    console.error("Error enviando correo:", e);
    return { ok: false, error: String(e) };
  }
}
