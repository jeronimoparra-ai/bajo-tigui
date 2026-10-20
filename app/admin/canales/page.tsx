import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function AdminCanales() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Canales</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        CRUD de canales (UI). La parrilla real está por confirmar.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <h3 style={{ margin: 0, fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>Canal ejemplo 1</h3>
          <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)" }}>
            Categoría: por confirmar · HD: por confirmar · por_confirmar: true
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-4)" }}>
            <Button variant="outline" size="sm">Editar</Button>
            <Button variant="ghost" size="sm">Desactivar</Button>
          </div>
        </Card>
      </div>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Button variant="primary" size="lg">+ Nuevo canal</Button>
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La gestión real de canales (CRUD + auditoría) se conecta a la BD en la Fase 4.
      </PorConfirmar>
    </main>
  );
}
