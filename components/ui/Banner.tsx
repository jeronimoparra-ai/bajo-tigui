import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Banner({
  tag = "Aviso importante",
  children,
  className,
}: {
  tag?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside className={cn("bt-banner-aviso", className)} role="alert" aria-live="polite">
      <span className="bt-banner-aviso__tag">{tag}</span>
      <div className="bt-banner-aviso__content">{children}</div>
    </aside>
  );
}
