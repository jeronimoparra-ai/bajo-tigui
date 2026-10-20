"use client";

import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("@/components/three/Hero3D").then((m) => m.Hero3D), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "420px",
        background: "var(--bt-navy-900)",
        display: "grid",
        placeItems: "center",
        color: "var(--bt-sky-400)",
      }}
    >
      Cargando señal…
    </div>
  ),
});

export function Hero3DClient() {
  return <Hero3D />;
}
