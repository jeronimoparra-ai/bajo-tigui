import { BuzonForm } from "@/components/sections/BuzonForm";
import { PorConfirmar } from "@/components/ui/PorConfirmar";
import { Reveal } from "@/components/ui/Reveal";

export default function Buzon() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy bt-seccion" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <Reveal>
            <p className="bt-kicker bt-kicker--ch">CH 01 · Buzón de PQRS, El Bagre, Antioquia</p>
            <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
              Déjelo<br />por <span className="bt-brush">escrito.</span>
            </h1>
            <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
              Peticiones, quejas, reclamos, sugerencias y felicitaciones. Cada solicitud
              recibe un código de seguimiento para consultar su estado.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bt-section bt-section--paper bt-seccion" id="formulario" aria-labelledby="h-formulario">
        <div className="bt-container">
          <Reveal>
            <p className="bt-kicker bt-kicker--ch">CH 02 · Formulario</p>
            <h2 className="bt-display bt-display--2xl" id="h-formulario" style={{ marginTop: "var(--bt-space-2)" }}>
              Cuéntenos<br />qué <span className="bt-brush bt-brush--aqua">pasó.</span>
            </h2>
          </Reveal>
          <Reveal delay={100} style={{ marginTop: "var(--bt-space-6)", maxWidth: "46rem" }}>
            <BuzonForm />
          </Reveal>
          <div style={{ marginTop: "var(--bt-space-6)", maxWidth: "46rem" }}>
            <PorConfirmar>
              El correo o sistema que recibe las solicitudes y el tiempo de respuesta todavía
              no están definidos. No se promete un plazo.
            </PorConfirmar>
          </div>
        </div>
      </section>
    </main>
  );
}
