import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function AdminAsociados() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Asociados</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        Gestión de asociados (UI). Persistencia en Fase 4.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <h3 style={{ margin: 0, fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>Juan Pérez (ejemplo)</h3>
          <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)" }}>
            Barrio: por confirmar · Tel: 312 274 0219
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-4)" }}>
            <Button variant="outline" size="sm">Editar</Button>
            <Button variant="ghost" size="sm">Desactivar</Button>
          </div>
        </Card>
      </div>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Button variant="primary" size="lg">+ Nuevo asociado</Button>
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La gestión real de asociados (CRUD + auditoría) se conecta a la BD en la Fase 4.
      </PorConfirmar>
    </main>
  );
}
