import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Banner } from "@/components/ui/Banner";
import { StatusBadge } from "@/components/ui/StatusBadge";

export default function Contacto() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Atención, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            Del otro lado<br />hay <span className="bt-brush">una persona.</span>
          </h1>
          <div style={{ marginTop: "var(--bt-space-4)" }}>
            <StatusBadge />
          </div>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            WhatsApp y llamadas al 312 274 0219. De lunes a viernes, 7:00 a. m. – 5:00 p. m.
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
            <Button href="https://wa.me/573122740219" variant="wa" size="lg">
              Escribir por WhatsApp
            </Button>
            <Button href="tel:+573122740219" variant="outline" size="lg">
              Llamar al 312 274 0219
            </Button>
          </div>
        </div>
      </section>

      <section className="bt-section bt-section--paper" id="aviso" aria-labelledby="h-aviso">
        <div className="bt-container">
          <Banner>
            Los servicios de parabólica pueden suspenderse cuando el saldo supera los
            <strong>$37.000</strong>. No hay una fecha fija: la administración define cuándo.
          </Banner>
        </div>
      </section>

      <section className="bt-section bt-section--navy" id="cierre" aria-labelledby="h-cierre">
        <div className="bt-container">
          <Card>
            <p className="bt-kicker">Atención al asociado</p>
            <p style={{ fontFamily: "var(--bt-font-display)", fontWeight: 800, fontSize: "clamp(1.6rem,1.1rem+2vw,2.4rem)", color: "var(--bt-accent-readable)" }}>
              312 274 0219
            </p>
            <p style={{ marginTop: "var(--bt-space-2)", color: "var(--bt-sky-200)" }}>
              WhatsApp y llamadas, lunes a viernes, 7:00 a. m. – 5:00 p. m.
            </p>
          </Card>
        </div>
      </section>
    </main>
  );
}
