import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "sky" | "aqua" | "sun" | "orange" | "navy" | "base";

const variantClass: Record<Variant, string> = {
  sky: "bt-pill--sky",
  aqua: "bt-pill--aqua",
  sun: "bt-pill--sun",
  orange: "bt-pill--orange",
  navy: "bt-pill--navy",
  base: "",
};

export function Pill({
  variant = "base",
  icon,
  className,
  children,
}: {
  variant?: Variant;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span className={cn("bt-pill", variantClass[variant], className)}>
      {icon ? <span className="bt-pill-icon">{icon}</span> : null}
      {children}
    </span>
  );
}
