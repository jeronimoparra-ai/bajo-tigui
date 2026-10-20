import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function AdminZonas() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Zonas de cobertura</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        CRUD de zonas (UI). El polígono está por confirmar.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <h3 style={{ margin: 0, fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>El Bagre (centro)</h3>
          <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)" }}>
            Tipo: municipio · por_confirmar: true
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-4)" }}>
            <Button variant="outline" size="sm">Editar polígono</Button>
            <Button variant="ghost" size="sm">Desactivar</Button>
          </div>
        </Card>
      </div>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Button variant="primary" size="lg">+ Nueva zona</Button>
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La gestión real de zonas (CRUD + polígono) se conecta a la BD en la Fase 4.
      </PorConfirmar>
    </main>
  );
}
