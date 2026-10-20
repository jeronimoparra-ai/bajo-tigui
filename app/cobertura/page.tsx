import { CoberturaMapClient } from "@/components/map/CoberturaMapClient";
import { Button } from "@/components/ui/Button";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function Cobertura() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Cobertura, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            ¿Llega<br />a <span className="bt-brush">mi casa?</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            Consulte por su barrio o vereda. Las zonas exactas todavía están por confirmar.
          </p>
        </div>
      </section>

      <section className="bt-section bt-section--paper" id="mapa" aria-labelledby="h-mapa">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 02 · El mapa</p>
          <h2 className="bt-display bt-display--2xl" id="h-mapa" style={{ marginTop: "var(--bt-space-2)" }}>
            Cobertura <span className="bt-brush bt-brush--aqua">aproximada.</span>
          </h2>
          <div style={{ marginTop: "var(--bt-space-5)" }}>
            <CoberturaMapClient />
          </div>
          <PorConfirmar style={{ marginTop: "var(--bt-space-4)" }}>
            Las zonas exactas de cobertura (barrios/veredas + polígono) están por confirmar.
          </PorConfirmar>
        </div>
      </section>

      <section className="bt-section bt-section--navy" id="cierre" aria-labelledby="h-cierre">
        <div className="bt-container">
          <h2 className="bt-display bt-display--2xl" id="h-cierre">Empecemos por su casa.</h2>
          <div style={{ marginTop: "var(--bt-space-5)" }}>
            <Button href="https://wa.me/573122740219" variant="primary" size="lg">
              Consultar por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
