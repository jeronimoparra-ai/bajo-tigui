import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Admin() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Panel admin</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            Panel de<br /> <span className="bt-brush">administración.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            UI en construcción. La lógica real se conecta en la Fase 4.
          </p>
        </div>
      </section>

      <section className="bt-section bt-section--paper" id="modulos" aria-labelledby="h-modulos">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 02 · Módulos</p>
          <h2 className="bt-display bt-display--2xl" id="h-modulos" style={{ marginTop: "var(--bt-space-2)" }}>
            Lo que administra.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "var(--bt-space-4)", marginTop: "var(--bt-space-5)" }}>
            {["Asociados", "Planes", "Canales", "Cobertura", "Avisos", "Horarios", "Tickets", "Auditoría"].map((m) => (
              <Card key={m}>
                <h3 style={{ margin: 0, fontFamily: "var(--bt-font-display)", fontWeight: 800 }}>{m}</h3>
                <p style={{ margin: "var(--bt-space-2) 0 0", fontSize: "var(--bt-fs-sm)", color: "var(--bt-text-soft)" }}>
                  Gestión (por conectar).
                </p>
              </Card>
            ))}
          </div>
          <div style={{ marginTop: "var(--bt-space-6)" }}>
            <Button variant="outline" size="lg">
              Cerrar sesión
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
