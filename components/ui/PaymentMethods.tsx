"use client";

import { cn } from "@/lib/cn";

type Method = {
  id: string;
  name: string;
  color: string;
  fg: string;
  kind: "wallet" | "corresponsal";
};

const methods: Method[] = [
  { id: "nequi", name: "Nequi", color: "#3D1E6D", fg: "#FFFFFF", kind: "wallet" },
  { id: "efecty", name: "Efecty", color: "#F58220", fg: "#FFFFFF", kind: "corresponsal" },
  { id: "baloto", name: "Baloto", color: "#00529B", fg: "#FFFFFF", kind: "corresponsal" },
  { id: "servientrega", name: "Servientrega", color: "#E30613", fg: "#FFFFFF", kind: "corresponsal" },
  { id: "gana", name: "Gana", color: "#00A651", fg: "#FFFFFF", kind: "corresponsal" },
];

export function PaymentMethods({ selected, onSelect }: { selected?: string; onSelect?: (id: string) => void }) {
  return (
    <div>
      <p style={{ fontWeight: 700, marginBottom: "var(--bt-space-3)" }}>Método de pago (por ahora: Nequi)</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "var(--bt-space-3)" }}>
        {methods.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onSelect?.(m.id)}
            className={cn(
              "bt-btn bt-btn--outline",
              selected === m.id && "bt-btn--primary",
            )}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "var(--bt-space-2)",
              padding: "var(--bt-space-3)",
              background: selected === m.id ? m.color : "var(--bt-surface)",
              color: selected === m.id ? m.fg : "var(--bt-text)",
              borderColor: m.color,
            }}
            aria-pressed={selected === m.id}
          >
            <span
              style={{
                display: "inline-grid",
                placeItems: "center",
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: m.color,
                color: m.fg,
                fontWeight: 800,
                fontSize: "var(--bt-fs-xs)",
              }}
            >
              {m.name.charAt(0)}
            </span>
            <span style={{ fontSize: "var(--bt-fs-xs)", fontWeight: 700 }}>{m.name}</span>
            <span style={{ fontSize: "0.65rem", color: selected === m.id ? m.fg : "var(--bt-text-soft)" }}>
              {m.kind === "wallet" ? "Billetera" : "Corresponsal"}
            </span>
          </button>
        ))}
      </div>
      <p style={{ marginTop: "var(--bt-space-3)", fontSize: "var(--bt-fs-xs)", color: "var(--bt-text-soft)" }}>
        Por ahora solo Nequi está habilitado; los demás corresponsales se activarán próximamente.
      </p>
    </div>
  );
}
