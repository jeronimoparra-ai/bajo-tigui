// Envío de mensajes vía WhatsApp Cloud API (Meta). Requiere META_ACCESS_TOKEN y META_PHONE_NUMBER_ID.
export async function sendWhatsAppMessage(to: string, body: string) {
  const token = process.env.META_ACCESS_TOKEN;
  const phoneId = process.env.META_PHONE_NUMBER_ID;
  if (!token || !phoneId) {
    console.warn("WhatsApp no configurado: faltan META_ACCESS_TOKEN / META_PHONE_NUMBER_ID. Mensaje no enviado.");
    return { ok: false, porImplementar: true };
  }
  try {
    const res = await fetch(`https://graph.facebook.com/v20.0/${phoneId}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to,
        type: "text",
        text: { body },
      }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("Error enviando WhatsApp:", err);
      return { ok: false, error: err };
    }
    return { ok: true };
  } catch (e) {
    console.error("Error enviando WhatsApp:", e);
    return { ok: false, error: String(e) };
  }
}

export function fueraDeHorarioMessage() {
  return "Hola, somos Bajo Tigui. Nuestro horario de atención es lunes a viernes, 7:00 a. m. – 5:00 p. m. (hora de Colombia). Su mensaje quedó registrado y le responderemos cuando abramos. La señal viaja lejos. Aquí se queda.";
}
