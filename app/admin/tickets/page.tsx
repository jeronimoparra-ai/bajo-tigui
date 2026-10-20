import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function AdminTickets() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Tickets (PQRS)</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        Gestión de tickets (UI). La persistencia se conecta en la Fase 4.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <h3 style={{ margin: 0, fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>Ticket #001 (ejemplo)</h3>
          <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)" }}>
            Tipo: reclamo · Estado: abierto · Asociado: por confirmar
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-4)" }}>
            <Button variant="outline" size="sm">Ver detalle</Button>
            <Button variant="primary" size="sm">Responder</Button>
          </div>
        </Card>
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La gestión real de tickets (CRUD + mensajes + auditoría) se conecta a la BD en la Fase 4.
      </PorConfirmar>
    </main>
  );
}
