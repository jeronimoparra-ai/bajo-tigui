"use client";

import { useMemo, useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

type Cat = "todos" | "deportes" | "infantil" | "noticias" | "peliculas";
type Cal = "todos" | "sd" | "hd";

const canales = [
  { nombre: "Canal ejemplo 1", cat: "deportes" as Cat, cal: "hd" as Cal },
  { nombre: "Canal ejemplo 2", cat: "infantil" as Cat, cal: "sd" as Cal },
  { nombre: "Canal ejemplo 3", cat: "noticias" as Cat, cal: "hd" as Cal },
  { nombre: "Canal ejemplo 4", cat: "peliculas" as Cat, cal: "sd" as Cal },
  { nombre: "Canal ejemplo 5", cat: "deportes" as Cat, cal: "sd" as Cal },
  { nombre: "Canal ejemplo 6", cat: "noticias" as Cat, cal: "hd" as Cal },
];

export function ParrillaCanales() {
  const [cat, setCat] = useState<Cat>("todos");
  const [cal, setCal] = useState<Cal>("todos");
  const filtered = useMemo(
    () => canales.filter((c) => (cat === "todos" || c.cat === cat) && (cal === "todos" || c.cal === cal)),
    [cat, cal],
  );

  return (
    <div>
      <div className="bt-cluster" style={{ marginBottom: "var(--bt-space-4)" }}>
        {(["todos", "deportes", "infantil", "noticias", "peliculas"] as Cat[]).map((c) => (
          <button key={c} type="button" onClick={() => setCat(c)} className="bt-btn bt-btn--outline bt-btn--sm">
            {c}
          </button>
        ))}
      </div>
      <div className="bt-cluster" style={{ marginBottom: "var(--bt-space-5)" }}>
        {(["todos", "sd", "hd"] as Cal[]).map((c) => (
          <button key={c} type="button" onClick={() => setCal(c)} className="bt-btn bt-btn--outline bt-btn--sm">
            {c.toUpperCase()}
          </button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "var(--bt-space-3)" }}>
        {filtered.map((c, i) => (
          <div key={i} className="bt-card" style={{ padding: "var(--bt-space-3)" }}>
            <Pill variant={c.cal === "hd" ? "aqua" : "base"}>{c.cal.toUpperCase()}</Pill>
            <div style={{ marginTop: "var(--bt-space-2)", fontFamily: "var(--bt-font-display)", fontWeight: 700 }}>
              {c.nombre}
            </div>
            <div style={{ fontSize: "var(--bt-fs-xs)", color: "var(--bt-text-soft)", textTransform: "capitalize" }}>
              {c.cat}
            </div>
          </div>
        ))}
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La parrilla real de los 90 canales aún no está confirmada.
      </PorConfirmar>
    </div>
  );
}
