import { PorConfirmar } from "@/components/ui/PorConfirmar";

export default function Nosotros() {
  return (
    <main id="contenido" tabIndex={-1}>
      <div className="bt-escena-bloque" data-escena="poste">
        <div className="bt-escena-bloque__fondo" aria-hidden="true"></div>
        <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Nosotros, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            Bajo Tigui<br />es <span className="bt-brush">del barrio.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            Organización sin ánimo de lucro de El Bagre, Antioquia. Televisión por
            antena parabólica e internet por fibra óptica para sus asociados.
          </p>
        </div>
      </section>
      </div>

      <section className="bt-section bt-section--paper" id="que" aria-labelledby="h-que">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 02 · Qué es Bajo Tigui</p>
          <h2 className="bt-display bt-display--2xl" id="h-que" style={{ marginTop: "var(--bt-space-2)" }}>
            Una organización<br />
            <span className="bt-brush bt-brush--orange">sin ánimo</span> de lucro.
          </h2>
          <p style={{ marginTop: "var(--bt-space-4)", maxWidth: "60ch" }}>
            Bajo Tigui existe para que sus asociados tengan televisión e internet a buen
            precio. No es una empresa de afuera: es del barrio.
          </p>
          <PorConfirmar style={{ marginTop: "var(--bt-space-5)" }}>
            NIT y razón social pendientes de confirmación.
          </PorConfirmar>
        </div>
      </section>
    </main>
  );
}
