import { Card } from "@/components/ui/Card";

export default function PortalFacturas() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Mis facturas</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        UI en construcción. La lógica real se conecta en la Fase 4.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <p style={{ margin: 0, fontSize: "var(--bt-fs-sm)" }}>Factura ejemplo · $70.000 · pendiente</p>
        </Card>
      </div>
    </main>
  );
}
