import { Card } from "@/components/ui/Card";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function AdminAuditoria() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Auditoría</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        Bitácora de acciones (UI). Se conecta a la BD en la Fase 4.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <p style={{ margin: 0, fontSize: "var(--bt-fs-sm)" }}>
            [2026-10-20] admin · creó · plan · (ejemplo)
          </p>
        </Card>
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La bitácora real (auditoria) se conecta a la BD en la Fase 4.
      </PorConfirmar>
    </main>
  );
}
