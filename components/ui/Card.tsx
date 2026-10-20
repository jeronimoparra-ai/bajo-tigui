import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({
  chamfer,
  flat,
  className,
  style,
  children,
}: {
  chamfer?: boolean;
  flat?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "bt-card",
        flat && "bt-card--flat",
        chamfer && "bt-chamfer",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
