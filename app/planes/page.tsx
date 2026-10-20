import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Pill } from "@/components/ui/Pill";

export default function Planes() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Planes, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            La fibra y la tele,<br />en una sola <span className="bt-brush">cuenta.</span>
          </h1>
        </div>
      </section>

      <section className="bt-section bt-section--paper" id="plan" aria-labelledby="h-plan">
        <div className="bt-container">
          <Card>
            <Pill variant="aqua">Plan único</Pill>
            <h2 className="bt-display bt-display--2xl" id="h-plan" style={{ marginTop: "var(--bt-space-3)" }}>
              Fibra + TV
            </h2>
            <p style={{ fontFamily: "var(--bt-font-display)", fontWeight: 800, fontSize: "clamp(2rem,1.4rem+2vw,3rem)", color: "var(--bt-accent-readable)", marginTop: "var(--bt-space-2)" }}>
              $70.000 <span style={{ fontSize: "0.5em", color: "var(--bt-text-soft)" }}>COP / mes</span>
            </p>
            <ul style={{ marginTop: "var(--bt-space-4)", display: "grid", gap: "var(--bt-space-2)" }}>
              <li>Internet por fibra óptica · 50 Mbps de descarga</li>
              <li>Televisión por antena parabólica · 90 canales SD + HD</li>
              <li>1 mes gratis al contratar</li>
            </ul>
            <div style={{ marginTop: "var(--bt-space-5)" }}>
              <Button href="https://wa.me/573122740219" block>
                Contratar por WhatsApp
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
