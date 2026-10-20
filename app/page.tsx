import { Button } from "@/components/ui/Button";
import { Hero3DClient } from "@/components/three/Hero3DClient";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DialSintonia } from "@/components/sections/DialSintonia";

export default function Home() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Inicio, El Bagre, Antioquia</p>
          <div style={{ marginTop: "var(--bt-space-2)" }}>
            <StatusBadge />
          </div>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            La señal viaja lejos.<br />
            <span className="bt-brush bt-brush--aqua">Aquí se queda.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            Internet por fibra óptica (50 Mbps de descarga) y televisión por antena
            parabólica (90 canales SD + HD) por $70.000 al mes. Un plan, sin letra menuda.
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
            <Button href="https://wa.me/573122740219" variant="primary" size="lg">
              Contrátalo por WhatsApp
            </Button>
            <Button href="/planes" variant="outline" size="lg">
              Ver planes
            </Button>
          </div>
          <div style={{ marginTop: "var(--bt-space-6)" }}>
            <Hero3DClient />
          </div>
        </div>
      </section>

      <section className="bt-section bt-section--paper" id="dial" aria-labelledby="h-dial">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 02 · Sintonía</p>
          <h2 className="bt-display bt-display--2xl" id="h-dial" style={{ marginTop: "var(--bt-space-2)" }}>
            Sintonice su <span className="bt-brush bt-brush--aqua">plan.</span>
          </h2>
          <div style={{ marginTop: "var(--bt-space-5)", maxWidth: "40rem" }}>
            <DialSintonia />
          </div>
        </div>
      </section>
    </main>
  );
}
