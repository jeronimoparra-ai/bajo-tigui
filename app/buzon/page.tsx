import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function Buzon() {
  return (
    <main id="contenido" tabIndex={-1}>
      <div className="bt-escena-bloque" data-escena="poste">
        <div className="bt-escena-bloque__fondo" aria-hidden="true"></div>
        <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Buzón de PQRS, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            Déjelo<br />por <span className="bt-brush">escrito.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            Peticiones, quejas, reclamos y sugerencias. El formulario es una maqueta: todavía
            no envía ni guarda nada.
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
            <Button href="#formulario" variant="accent" size="lg">
              Ver el formulario
            </Button>
            <Button href="https://wa.me/573122740219" variant="wa" size="lg">
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </section>
      </div>

      <section className="bt-section bt-section--paper" id="formulario" aria-labelledby="h-formulario">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 02 · Formulario</p>
          <h2 className="bt-display bt-display--2xl" id="h-formulario" style={{ marginTop: "var(--bt-space-2)" }}>
            Cuéntenos<br />qué <span className="bt-brush bt-brush--aqua">pasó.</span>
          </h2>
          <Card style={{ marginTop: "var(--bt-space-5)" }}>
            <p style={{ color: "var(--bt-text-soft)", fontSize: "var(--bt-fs-sm)" }}>
              Formulario de PQRS (maqueta sin conexión). Los campos obligatorios son los
              únicos que se piden. Este formulario no tiene backend todavía.
            </p>
            <div style={{ marginTop: "var(--bt-space-4)" }}>
              <PorConfirmar>
                El correo o sistema que recibirá las solicitudes todavía no está definido.
              </PorConfirmar>
            </div>
          </Card>
        </div>
      </section>
    </main>
  );
}
