import { NextResponse } from "next/server";
import { estaAbierto, proximaApertura } from "@/lib/horario";

export async function GET() {
  const ahora = new Date();
  const abierto = estaAbierto(ahora);
  const proxima = proximaApertura(ahora);
  return NextResponse.json({
    abierto,
    ahora: ahora.toISOString(),
    proximaApertura: proxima ? proxima.toISOString() : null,
  });
}
