import Image from "next/image";
import { Button } from "@/components/ui/Button";

export default function ComoFunciona() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 01 · Cómo funciona, El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            De la llamada<br />a la <span className="bt-brush">señal.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            Así se conecta un asociado de Bajo Tigui: hablamos, miramos su caso, instalamos y
            queda con fibra óptica y televisión por antena parabólica.
          </p>
        </div>
      </section>

      <section className="bt-section bt-section--paper" id="ruta" aria-labelledby="h-ruta">
        <div className="bt-container">
          <p className="bt-kicker bt-kicker--ch">CH 02 · La ruta del asociado</p>
          <h2 className="bt-display bt-display--2xl" id="h-ruta" style={{ marginTop: "var(--bt-space-2)" }}>
            Cuatro pasos,<br />sin <span className="bt-brush bt-brush--aqua">vueltas.</span>
          </h2>
          <div className="in-hero" style={{ marginTop: "var(--bt-space-5)" }}>
            <div>
              <ol style={{ display: "grid", gap: "var(--bt-space-3)", listStyle: "none", padding: 0, margin: 0 }}>
                {[
                  { n: "01", t: "Hablamos", d: "WhatsApp o llamada al 312 274 0219." },
                  { n: "02", t: "Miramos su caso", d: "Verificamos cobertura y plan." },
                  { n: "03", t: "Instalamos", d: "Equipo y cableado en su casa." },
                  { n: "04", t: "Queda conectado", d: "Fibra + TV listos para usar." },
                ].map((p) => (
                  <li key={p.n} className="bt-card" style={{ display: "flex", gap: "var(--bt-space-4)" }}>
                    <span style={{ fontFamily: "var(--bt-font-mono)", fontWeight: 800, color: "var(--bt-accent-readable)" }}>
                      {p.n}
                    </span>
                    <div>
                      <strong>{p.t}</strong>
                      <p style={{ margin: 0, color: "var(--bt-text-soft)", fontSize: "var(--bt-fs-sm)" }}>{p.d}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="in-hero__arte" style={{ display: "block" }}>
              <Image
                src="/assets/ilustraciones/fibra-sala.svg"
                alt="Ilustración de la fibra óptica llegando desde la caja de conexión hasta el televisor"
                width={1600}
                height={900}
                sizes="(max-width: 900px) 100vw, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bt-section bt-section--navy" id="cierre" aria-labelledby="h-cierre">
        <div className="bt-container">
          <h2 className="bt-display bt-display--2xl" id="h-cierre">Empecemos por una llamada.</h2>
          <div style={{ marginTop: "var(--bt-space-5)" }}>
            <Button href="https://wa.me/573122740219" variant="wa" size="lg">
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
