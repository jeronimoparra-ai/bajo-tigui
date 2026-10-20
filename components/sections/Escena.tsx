import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Bloque de escena con fondo visual.
 * - `foto`  →Duotono real (public/assets/fotos/*.webp)
 * - `ilust` → Ilustración SVG de marca (public/assets/ilustraciones/*.svg)
 * - `escena`→ Escena aprobada por el cliente (public/assets/escenas/*.webp)
 */
export function Escena({
  foto,
  ilust,
  escena,
  children,
  className,
}: {
  foto?: string;
  ilust?: string;
  escena?: "poste" | "cables" | "poste-b" | "cables-b";
  children: ReactNode;
  className?: string;
}) {
  if (foto) {
    return (
      <div className={cn("bt-escena-foto", className)}>
        <div
          className="bt-escena-foto__fondo"
          aria-hidden="true"
          style={{ backgroundImage: `url("${foto}")` }}
        />
        <div className="bt-escena-foto__contenido">{children}</div>
      </div>
    );
  }

  if (ilust) {
    return (
      <div className={cn("bt-escena-foto", className)}>
        <div
          className="bt-escena-foto__fondo bt-escena-foto__fondo--ilust"
          aria-hidden="true"
          style={{ backgroundImage: `url("${ilust}")` }}
        />
        <div className="bt-escena-foto__contenido">{children}</div>
      </div>
    );
  }

  return (
    <div className="bt-escena-bloque" data-escena={escena ?? "poste"}>
      <div className="bt-escena-bloque__fondo" aria-hidden="true" />
      {children}
    </div>
  );
}
