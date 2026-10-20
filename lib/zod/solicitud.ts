import { z } from "zod";

export const SolicitudSchema = z.object({
  nombre: z.string().min(2).max(120),
  telefono: z.string().max(20).optional(),
  correo: z.string().email().max(120).optional(),
  tipo: z.enum(["peticion", "queja", "reclamo", "sugerencia", "otro"]),
  mensaje: z.string().min(5).max(2000),
  autorizacion: z.literal(true),
}).refine((d) => !!(d.telefono || d.correo), {
  message: "Debe indicar al menos teléfono o correo",
  path: ["telefono"],
});

export type Solicitud = z.infer<typeof SolicitudSchema>;
