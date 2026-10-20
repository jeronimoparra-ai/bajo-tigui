import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function AdminAvisos() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Avisos</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        CRUD de avisos administrables (UI). El aviso de $37.000 va inactivo en semilla.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <h3 style={{ margin: 0, fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>Suspensión por saldo</h3>
          <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)" }}>
            Los servicios de parabólica pueden suspenderse cuando el saldo supera los $37.000.
          </p>
          <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-xs)", color: "var(--bt-text-soft)" }}>
            Estado: inactivo (semilla)
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-4)" }}>
            <Button variant="outline" size="sm">Editar</Button>
            <Button variant="primary" size="sm">Activar</Button>
          </div>
        </Card>
      </div>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Button variant="primary" size="lg">+ Nuevo aviso</Button>
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La gestión real de avisos (CRUD + auditoría) se conecta a la BD en la Fase 4.
      </PorConfirmar>
    </main>
  );
}
