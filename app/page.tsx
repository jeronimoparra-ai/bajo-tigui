import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DialSintonia } from "@/components/sections/DialSintonia";

export default function Home() {
  return (
    <main id="contenido" tabIndex={-1}>
      <div className="bt-escena-bloque" data-escena="poste">
        <div className="bt-escena-bloque__fondo" aria-hidden="true"></div>
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
          <div style={{ marginTop: "var(--bt-space-6)", display: "flex", justifyContent: "center" }}>
            <svg viewBox="0 0 240 120" width="100%" height="auto" style={{ maxWidth: 480, color: "var(--bt-sky-400)" }} aria-hidden="true" focusable="false">
              {/* Parabólica */}
              <g fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M 60 90 L 60 70" />
                <path d="M 30 70 Q 60 110 90 70" />
                <path d="M 30 70 Q 60 50 90 70" />
                <path d="M 60 70 L 60 60" />
                <circle cx="60" cy="54" r="5" fill="currentColor" stroke="none" />
                {/* Ondas de señal */}
                <path d="M 95 60 Q 110 40 125 60" opacity="0.9" />
                <path d="M 90 45 Q 110 20 130 45" opacity="0.7" />
                <path d="M 85 30 Q 110 0 135 30" opacity="0.5" />
                {/* Casa */}
                <rect x="160" y="55" width="60" height="45" rx="2" fill="none" />
                <path d="M 155 55 L 190 30 L 225 55" />
                <rect x="182" y="78" width="16" height="22" />
              </g>
            </svg>
          </div>
        </div>
      </section>
      </div>

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
