import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function PorConfirmar({
  tag = "Por confirmar",
  className,
  style,
  children,
}: {
  tag?: string;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <div className={cn("bt-por-confirmar", className)} role="note" style={style}>
      <span className="bt-por-confirmar__tag">{tag}</span>
      <span>{children}</span>
    </div>
  );
}
