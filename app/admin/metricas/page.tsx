import { Card } from "@/components/ui/Card";

export default function AdminMetricas() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Métricas</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        Indicadores (UI). Se conectan a la BD en la Fase 4.
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "var(--bt-space-4)", marginTop: "var(--bt-space-5)" }}>
        {[
          { k: "Asociados", v: "—" },
          { k: "Suscripciones activas", v: "—" },
          { k: "Facturas pendientes", v: "—" },
          { k: "Tickets abiertos", v: "—" },
        ].map((m) => (
          <Card key={m.k}>
            <p style={{ margin: 0, fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)" }}>{m.k}</p>
            <p style={{ margin: "var(--bt-space-2) 0 0", fontFamily: "var(--bt-font-display)", fontWeight: 800, fontSize: "var(--bt-fs-2xl)" }}>
              {m.v}
            </p>
          </Card>
        ))}
      </div>
    </main>
  );
}
