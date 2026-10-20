import { z } from "zod";

const AdjuntoSchema = z.object({
  nombre: z.string().min(1).max(120),
  tipo: z.string().max(80),
  tamano: z.number().int().positive().max(5 * 1024 * 1024), // 5 MB
});

export const BuzonSchema = z.object({
  tipo: z.enum(["sugerencia", "queja", "felicitacion", "mejora", "peticion", "reclamo"]),
  asunto: z.string().min(3).max(160),
  mensaje: z.string().min(10).max(4000),
  nombre: z.string().max(120).optional(),
  telefono: z.string().max(20).optional(),
  correo: z.string().email().max(120).optional(),
  anonima: z.boolean().default(false),
  autorizacion: z.literal(true),
  adjuntos: z.array(AdjuntoSchema).max(3).default([]),
});

export type Buzon = z.infer<typeof BuzonSchema>;

export const TIPOS_A_TICKET: Record<string, "peticion" | "queja" | "reclamo" | "sugerencia"> = {
  sugerencia: "sugerencia",
  mejora: "sugerencia",
  queja: "queja",
  reclamo: "reclamo",
  peticion: "peticion",
  felicitacion: "peticion",
};
