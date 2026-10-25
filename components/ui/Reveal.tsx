import type { CSSProperties, ReactNode } from "react";

/**
 * Contenedor compatible con las páginas existentes, ahora estático.
 * El contenido siempre está visible en el HTML, incluso sin JavaScript.
 * `delay` se conserva por compatibilidad, sin temporizadores ni observadores.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className = "",
  style,
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "header";
  className?: string;
  style?: CSSProperties;
}) {
  return <Tag className={`bt-reveal ${className}`.trim()} style={style}>{children}</Tag>;
}
