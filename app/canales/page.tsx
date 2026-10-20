import { ParrillaCanales } from "@/components/sections/ParrillaCanales";
import { Button } from "@/components/ui/Button";

export default function Canales() {
  return (
    <main id="contenido" tabIndex={-1}>
      <div className="bt-escena-bloque" data-escena="poste">
        <div className="bt-escena-bloque__fondo" aria-hidden="true"></div>
        <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Canales, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            Los 90 canales<br />de la <span className="bt-brush">parabólica.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            SD + HD. La parrilla real está por confirmar; aquí una muestra filtrable.
          </p>
        </div>
      </section>
      </div>

      <section className="bt-section bt-section--paper" id="parrilla" aria-labelledby="h-parrilla">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 02 · La parrilla</p>
          <h2 className="bt-display bt-display--2xl" id="h-parrilla" style={{ marginTop: "var(--bt-space-2)" }}>
            Zapping <span className="bt-brush bt-brush--aqua">digital.</span>
          </h2>
          <div style={{ marginTop: "var(--bt-space-5)" }}>
            <ParrillaCanales />
          </div>
        </div>
      </section>

      <section className="bt-section bt-section--navy" id="cierre" aria-labelledby="h-cierre">
        <div className="bt-container">
          <h2 className="bt-display bt-display--2xl" id="h-cierre">Contratar o preguntar.</h2>
          <div style={{ marginTop: "var(--bt-space-5)" }}>
            <Button href="https://wa.me/573122740219" variant="primary" size="lg">
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
