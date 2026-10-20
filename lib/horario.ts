// Lógica central de horario de atención — Bajo Tigui.
// America/Bogota, L–V 7:00–17:00, sin sábados/domingos/festivos.
// Usada por UI, WhatsApp y chatbot.

const TZ = "America/Bogota";
const OPEN_MIN = 7 * 60; // 07:00
const CLOSE_MIN = 17 * 60; // 17:00

export type Festivo = { fecha: string; nombre?: string };

let festivosCache: Set<string> | null = null;

export function setFestivos(fechas: string[]) {
  festivosCache = new Set(fechas);
}

function isFestivo(fecha: Date): boolean {
  const iso = fecha.toLocaleDateString("en-CA", { timeZone: TZ }); // YYYY-MM-DD
  return festivosCache?.has(iso) ?? false;
}

export function estaAbierto(fecha: Date = new Date()): boolean {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = fmt.formatToParts(fecha);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const hour = Number(parts.find((p) => p.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const isWeekday = !["Sat", "Sun"].includes(weekday);
  if (!isWeekday || isFestivo(fecha)) return false;
  const mins = hour * 60 + minute;
  return mins >= OPEN_MIN && mins < CLOSE_MIN;
}

export function proximaApertura(fecha: Date = new Date()): Date | null {
  // Devuelve la próxima apertura (L–V 07:00) o null si no se puede calcular.
  const d = new Date(fecha);
  for (let i = 0; i < 14; i++) {
    const cand = new Date(d.getTime() + i * 24 * 60 * 60 * 1000);
    const fmt = new Intl.DateTimeFormat("en-US", { timeZone: TZ, weekday: "short" });
    const wd = fmt.format(cand);
    if (["Sat", "Sun"].includes(wd)) continue;
    if (isFestivo(cand)) continue;
    // construir 07:00 del día en TZ
    const iso = cand.toLocaleDateString("en-CA", { timeZone: TZ });
    const openAt = new Date(`${iso}T07:00:00-05:00`);
    if (openAt.getTime() > fecha.getTime()) return openAt;
  }
  return null;
}
