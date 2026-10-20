import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function PortalTickets() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Mis tickets</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        UI en construcción. La lógica real se conecta en la Fase 4.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <p style={{ margin: 0, fontSize: "var(--bt-fs-sm)" }}>Ticket #001 · reclamo · abierto</p>
        </Card>
      </div>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Button variant="primary" size="lg">Nuevo ticket</Button>
      </div>
    </main>
  );
}
