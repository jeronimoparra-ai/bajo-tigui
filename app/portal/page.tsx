import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export default function Portal() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Portal del asociado</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            Su espacio<br />de <span className="bt-brush">asociado.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            UI en construcción. La lógica real (login, pagos, estado de cuenta) se conecta
            en la Fase 4.
          </p>
        </div>
      </section>

      <section className="bt-section bt-section--paper" id="login" aria-labelledby="h-login">
        <div className="bt-container">
          <Card style={{ maxWidth: "28rem", margin: "0 auto" }}>
            <h2 className="bt-display bt-display--xl" id="h-login">Ingresar</h2>
            <form style={{ marginTop: "var(--bt-space-4)", display: "grid", gap: "var(--bt-space-3)" }}>
              <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
                <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>Correo o documento</span>
                <input
                  type="text"
                  style={{
                    minHeight: 48,
                    padding: "0.7rem 0.9rem",
                    background: "var(--bt-bg-sunken)",
                    border: "2px solid var(--bt-border)",
                    borderRadius: "var(--bt-radius-sm)",
                    color: "var(--bt-text)",
                  }}
                />
              </label>
              <label style={{ display: "grid", gap: "var(--bt-space-1)" }}>
                <span style={{ fontWeight: 700, fontSize: "var(--bt-fs-sm)" }}>Contraseña</span>
                <input
                  type="password"
                  style={{
                    minHeight: 48,
                    padding: "0.7rem 0.9rem",
                    background: "var(--bt-bg-sunken)",
                    border: "2px solid var(--bt-border)",
                    borderRadius: "var(--bt-radius-sm)",
                    color: "var(--bt-text)",
                  }}
                />
              </label>
              <Button type="submit" block>
                Ingresar
              </Button>
            </form>
          </Card>
        </div>
      </section>
    </main>
  );
}
