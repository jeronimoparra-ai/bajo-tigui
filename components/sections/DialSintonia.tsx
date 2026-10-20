"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

const items = [
  { n: "01", name: "Fibra + TV", desc: "50 Mbps + 90 canales · $70.000/mes" },
  { n: "02", name: "Solo TV", desc: "90 canales SD+HD · por confirmar" },
  { n: "03", name: "Solo fibra", desc: "50 Mbps de descarga · por confirmar" },
];

export function DialSintonia() {
  const [idx, setIdx] = useState(0);
  const item = items[idx];
  return (
    <div className="bt-card" style={{ padding: "var(--bt-space-5)" }}>
      <p className="bt-kicker bt-kicker--ch">CH · Dial de sintonía</p>
      <div style={{ display: "flex", alignItems: "center", gap: "var(--bt-space-4)", marginTop: "var(--bt-space-3)" }}>
        <button
          type="button"
          className="bt-btn bt-btn--outline bt-btn--sm"
          onClick={() => setIdx((i) => (i - 1 + items.length) % items.length)}
          aria-label="Canal anterior"
        >
          ◀
        </button>
        <div style={{ flex: 1, textAlign: "center" }}>
          <div style={{ fontFamily: "var(--bt-font-mono)", fontSize: "2rem", fontWeight: 800, color: "var(--bt-accent-readable)" }}>
            CH {item.n}
          </div>
          <div style={{ fontFamily: "var(--bt-font-display)", fontWeight: 800, fontSize: "var(--bt-fs-lg)" }}>
            {item.name}
          </div>
          <div style={{ fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)", marginTop: "var(--bt-space-1)" }}>
            {item.desc}
          </div>
        </div>
        <button
          type="button"
          className="bt-btn bt-btn--outline bt-btn--sm"
          onClick={() => setIdx((i) => (i + 1) % items.length)}
          aria-label="Canal siguiente"
        >
          ▶
        </button>
      </div>
    </div>
  );
}
