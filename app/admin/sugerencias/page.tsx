import { Card } from "@/components/ui/Card";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function AdminSugerencias() {
  return (
    <main>
      <h1 className="bt-display bt-display--xl">Sugerencias</h1>
      <p style={{ color: "var(--bt-text-soft)", marginTop: "var(--bt-space-2)" }}>
        Bandeja de sugerencias (UI). La persistencia se conecta en la Fase 4.
      </p>
      <div style={{ marginTop: "var(--bt-space-5)" }}>
        <Card>
          <p style={{ margin: 0, fontSize: "var(--bt-fs-sm)" }}>
            &ldquo;Sería bueno tener un canal de deportes en HD.&rdquo;
          </p>
          <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-xs)", color: "var(--bt-text-soft)" }}>
            Anónima: no · Fecha: por confirmar
          </p>
        </Card>
      </div>
      <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
        La gestión real de sugerencias (anonimización + retención) se conecta a la BD en la Fase 4.
      </PorConfirmar>
    </main>
  );
}
