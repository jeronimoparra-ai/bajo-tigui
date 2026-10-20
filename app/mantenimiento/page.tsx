import { Button } from "@/components/ui/Button";

export default function Mantenimiento() {
  return (
    <main id="contenido" tabIndex={-1}>
      <div className="bt-escena-bloque" data-escena="poste">
        <div className="bt-escena-bloque__fondo" aria-hidden="true"></div>
        <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Mantenimiento, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            Estamos ajustando<br />la <span className="bt-brush bt-brush--aqua">antena.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            El sitio está en mantenimiento mientras se hacen ajustes. No hay una hora de
            regreso confirmada.
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
            <Button href="https://wa.me/573122740219" variant="wa" size="lg">
              Escribir por WhatsApp
            </Button>
            <Button href="/" variant="outline" size="lg">
              Ver si ya volvió
            </Button>
          </div>
        </div>
      </section>
      </div>
    </main>
  );
}
