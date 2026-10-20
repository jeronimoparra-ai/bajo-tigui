"use client";

import dynamic from "next/dynamic";

const CoberturaMap = dynamic(() => import("@/components/map/CoberturaMap").then((m) => m.CoberturaMap), {
  ssr: false,
  loading: () => (
    <div style={{ height: 360, width: "100%", background: "var(--bt-navy-900)", display: "grid", placeItems: "center", color: "var(--bt-sky-400)" }}>
      Cargando mapa…
    </div>
  ),
});

export function CoberturaMapClient() {
  return <CoberturaMap />;
}
