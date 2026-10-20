// Cliente del chatbot: llama a la API de Claude (Anthropic) desde el servidor.
// La clave NUNCA llega al navegador.
import { z } from "zod";

export const PeticionChatSchema = z.object({
  mensaje: z.string().min(1).max(2000),
  historial: z
    .array(
      z.object({
        rol: z.enum(["user", "assistant"]),
        contenido: z.string().max(4000),
      }),
    )
    .max(30)
    .default([]),
  sesionId: z.string().max(80).optional(),
  autorId: z.string().max(80).nullable().optional(),
});

export type PeticionChat = z.infer<typeof PeticionChatSchema>;

/** Prompt de sistema: se lee del archivo de docs para no duplicarlo. */
export async function promptDeSistema(): Promise<string> {
  const { readFile } = await import("node:fs/promises");
  const { join } = await import("node:path");
  try {
    const ruta = join(process.cwd(), "docs", "chatbot", "prompt-sistema.md");
    return await readFile(ruta, "utf8");
  } catch {
    return "Eres el asistente de Antena Parabólica Bajo Tigui. Responde con datos confirmados.";
  }
}

export type EventoStream =
  | { tipo: "texto"; texto: string }
  | { tipo: "error"; mensaje: string }
  | { tipo: "fin" };

/**
 * Consulta a la API de Anthropic con streaming y herramientas.
 * Sin ANTHROPIC_API_KEY devuelve un error claro: no se simula la IA.
 */
export async function consultarClaude(
  peticion: PeticionChat,
 ): Promise<{ eventos: AsyncGenerator<EventoStream> }> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  const modelo = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-5";

  async function* vacio(mensaje: string): AsyncGenerator<EventoStream> {
    yield { tipo: "error", mensaje };
    yield { tipo: "fin" };
  }

  if (!apiKey) {
    return {
      eventos: vacio(
        "Falta ANTHROPIC_API_KEY en el servidor: el asistente no está disponible todavía.",
      ),
    };
  }

  const sistema = await promptDeSistema();

  const cuerpo = {
    model: modelo,
    max_tokens: 1024,
    stream: true,
    system: sistema,
    messages: [
      ...peticion.historial.map((m) => ({ role: m.rol, content: m.contenido })),
      { role: "user" as const, content: peticion.mensaje },
    ],
    tools: [
      {
        name: "consultar_planes",
        description: "Devuelve el plan activo con precio, velocidad y canales.",
        input_schema: { type: "object", properties: {} },
      },
      {
        name: "consultar_cobertura",
        description: "Consulta si un barrio o vereda tiene zona de cobertura registrada.",
        input_schema: {
          type: "object",
          properties: { barrio: { type: "string", description: "Nombre del barrio o vereda" } },
        },
      },
      {
        name: "consultar_ticket",
        description: "Consulta el estado de un ticket por su código.",
        input_schema: {
          type: "object",
          properties: { codigo: { type: "string" } },
          required: ["codigo"],
        },
      },
      {
        name: "crear_ticket",
        description: "Crea un ticket de PQRS o sugerencia y devuelve su código.",
        input_schema: {
          type: "object",
          properties: {
            asunto: { type: "string" },
            tipo: { type: "string", enum: ["peticion", "queja", "reclamo", "sugerencia"] },
            descripcion: { type: "string" },
          },
          required: ["asunto", "tipo", "descripcion"],
        },
      },
      {
        name: "consultar_horario",
        description: "Devuelve si hay atención humana ahora y cuándo es la próxima apertura.",
        input_schema: { type: "object", properties: {} },
      },
    ],
  };

  async function* generar(): AsyncGenerator<EventoStream> {
    let res: Response;
    try {
      res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": apiKey as string,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify(cuerpo),
      });
    } catch (e) {
      yield { tipo: "error", mensaje: `No se pudo contactar al servicio: ${String(e)}` };
      yield { tipo: "fin" };
      return;
    }

    if (!res.ok || !res.body) {
      const detalle = await res.text().catch(() => "");
      yield { tipo: "error", mensaje: `El asistente respondió con error ${res.status}. ${detalle.slice(0, 200)}` };
      yield { tipo: "fin" };
      return;
    }

    const lector = res.body.getReader();
    const dec = new TextDecoder();
    let buffer = "";
    let mensajeActual = "";
    let esperandoHerramienta: { id: string; nombre: string; entrada: unknown } | null = null;
    let pendientes = 0;

    while (true) {
      const { done, value } = await lector.read();
      if (done) break;
      buffer += dec.decode(value, { stream: true });
      const partes = buffer.split("\n\n");
      buffer = partes.pop() ?? "";

      for (const parte of partes) {
        const linea = parte.split("\n").find((l) => l.startsWith("data:"));
        if (!linea) continue;
        const json = linea.slice(5).trim();
        if (!json || json === "[DONE]") continue;
        let evt: Record<string, unknown>;
        try {
          evt = JSON.parse(json);
        } catch {
          continue;
        }
        const tipo = evt.type as string;

        if (tipo === "content_block_start") {
          const bloque = evt.content_block as { type?: string; id?: string; name?: string };
          if (bloque?.type === "tool_use") {
            esperandoHerramienta = { id: bloque.id ?? "", nombre: bloque.name ?? "", entrada: {} };
            pendientes++;
          }
        }

        if (tipo === "content_block_delta") {
          const delta = evt.delta as { type?: string; text?: string; partial_json?: string };
          if (delta?.type === "text_delta" && delta.text) {
            mensajeActual += delta.text;
            yield { tipo: "texto", texto: delta.text };
          }
          if (delta?.type === "input_json_delta" && esperandoHerramienta) {
            esperandoHerramienta.entrada = {
              ...(esperandoHerramienta.entrada as object),
              ...JSON.parse(`{${delta.partial_json ?? ""}}`),
            };
          }
        }

        if (tipo === "content_block_stop" && esperandoHerramienta) {
          const herr = esperandoHerramienta;
          esperandoHerramienta = null;
          const resultado = await ejecutarHerramienta(herr.nombre, herr.entrada, peticion.autorId ?? null);
          yield {
            tipo: "texto",
            texto: `\n[herramienta ${herr.nombre}: ${resultado.ok ? "ok" : "error"}]`,
          };
          pendientes--;
        }
      }
    }

    yield { tipo: "fin" };
  }

  return { eventos: generar() };
}

async function ejecutarHerramienta(
  nombre: string,
  entrada: unknown,
  autorId: string | null,
) {
  const e = (entrada ?? {}) as Record<string, string>;
  const t = await import("@/lib/chatbot/herramientas");
  switch (nombre) {
    case "consultar_planes":
      return t.consultar_planes();
    case "consultar_cobertura":
      return t.consultar_cobertura(e.barrio);
    case "consultar_ticket":
      return t.consultar_ticket(e.codigo ?? "");
    case "crear_ticket":
      return t.crear_ticket({
        asunto: e.asunto ?? "Solicitud del chat",
        tipo: (e.tipo as "peticion") ?? "peticion",
        descripcion: e.descripcion ?? "",
        autorId,
      });
    case "consultar_horario":
      return t.consultar_horario();
    default:
      return { ok: false, dato: null, mensaje: `Herramienta desconocida: ${nombre}` };
  }
}
