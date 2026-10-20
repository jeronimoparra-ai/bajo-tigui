import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { DialSintonia } from "@/components/sections/DialSintonia";
import { HeroSenal } from "@/components/sections/HeroSenal";
import { Escena } from "@/components/sections/Escena";
import { Reveal } from "@/components/ui/Reveal";
import { Pill } from "@/components/ui/Pill";
import { PorConfirmar } from "@/components/ui/PorConfirmar";

const CAPITULOS = [
  { href: "#portada", n: "01", t: "Inicio" },
  { href: "#plan", n: "02", t: "Plan" },
  { href: "#sintonia", n: "03", t: "Sintonía" },
  { href: "#cobertura", n: "04", t: "Cobertura" },
  { href: "#canales", n: "05", t: "Canales" },
  { href: "#barrio", n: "06", t: "El barrio" },
  { href: "#atencion", n: "07", t: "Atención" },
];

export default function Home() {
  return (
    <main id="contenido" tabIndex={-1}>
      {/* Índice de capítulos: un solo recorrido, salto directo a cada módulo */}
      <nav className="bt-capitulos" aria-label="Capítulos de la página">
        <div className="bt-container">
          <ul className="bt-capitulos__lista">
            {CAPITULOS.map((c) => (
              <li key={c.href}>
                <Link href={c.href}>
                  CH {c.n} · {c.t}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── 01 · Portada ───────────────────────────────────────────── */}
      <section className="bt-section bt-section--navy bt-seccion" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <div className="in-hero">
            <Reveal>
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
                  Contratar por WhatsApp
                </Button>
                <Button href="/planes" variant="outline" size="lg">
                  Ver planes
                </Button>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="in-hero__arte" style={{ display: "block" }}>
                <HeroSenal />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 02 · El plan ───────────────────────────────────────────── */}
      <section className="bt-section bt-section--paper bt-seccion" id="plan" aria-labelledby="h-plan">
        <div className="bt-container">
          <Reveal>
            <p className="bt-kicker bt-kicker--ch">CH 02 · El plan</p>
            <h2 className="bt-display bt-display--2xl" id="h-plan" style={{ marginTop: "var(--bt-space-2)" }}>
              Fibra y tele,<br />en una sola <span className="bt-brush">cuenta.</span>
            </h2>
          </Reveal>
          <div className="in-grid-modulos" style={{ marginTop: "var(--bt-space-6)" }}>
            <Reveal className="in-modulo">
              <Pill variant="aqua">Plan único</Pill>
              <p className="in-precio">
                $70.000 <span>COP / mes</span>
              </p>
              <ul className="in-lista">
                <li>Internet por fibra óptica · 50 Mbps de descarga</li>
                <li>Televisión por antena parabólica · 90 canales SD + HD</li>
                <li>1 mes gratis al contratar</li>
              </ul>
              <Button href="/planes" variant="primary" block>
                Ver el plan completo
              </Button>
            </Reveal>
            <Reveal className="in-modulo" delay={120}>
              <Pill variant="sun">Lo que incluye</Pill>
              <ul className="in-lista">
                <li>Sin letra menuda: un solo recibo al mes</li>
                <li>50 Mbps de descarga (no es simétrico)</li>
                <li>Atención de lunes a viernes, 7:00 a. m. – 5:00 p. m.</li>
                <li>WhatsApp y llamadas al 312 274 0219</li>
              </ul>
              <PorConfirmar>La instalación gratis está por confirmar.</PorConfirmar>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 03 · Sintonía (dial) ───────────────────────────────────── */}
      <section className="bt-section bt-section--sunken bt-seccion" id="sintonia" aria-labelledby="h-sintonia">
        <div className="bt-container">
          <Reveal>
            <p className="bt-kicker bt-kicker--ch">CH 03 · Sintonía</p>
            <h2 className="bt-display bt-display--2xl" id="h-sintonia" style={{ marginTop: "var(--bt-space-2)" }}>
              Sintonice su <span className="bt-brush bt-brush--aqua">plan.</span>
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ marginTop: "var(--bt-space-5)", maxWidth: "40rem" }}>
              <DialSintonia />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 04 · Cobertura ─────────────────────────────────────────── */}
      <Escena foto="/assets/fotos/barrio-1.webp">
        <section className="bt-section bt-section--navy bt-seccion" id="cobertura" aria-labelledby="h-cobertura">
          <div className="bt-container">
            <Reveal>
              <p className="bt-kicker bt-kicker--ch">CH 04 · Cobertura</p>
              <h2 className="bt-display bt-display--2xl" id="h-cobertura" style={{ marginTop: "var(--bt-space-2)" }}>
                ¿Llega a <span className="bt-brush bt-brush--aqua">mi casa?</span>
              </h2>
              <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)", maxWidth: "56ch" }}>
                Consulte por su barrio o vereda. Las zonas exactas todavía están por confirmar:
                lo revisamos caso por caso, sin adivinar.
              </p>
              <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
                <Button href="/cobertura" variant="primary" size="lg">
                  Ver el mapa
                </Button>
                <Button href="https://wa.me/573122740219" variant="outline" size="lg">
                  Consultar por WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </Escena>

      {/* ── 05 · Canales ───────────────────────────────────────────── */}
      <section className="bt-section bt-section--paper bt-seccion" id="canales" aria-labelledby="h-canales">
        <div className="bt-container">
          <Reveal>
            <p className="bt-kicker bt-kicker--ch">CH 05 · Canales</p>
            <h2 className="bt-display bt-display--2xl" id="h-canales" style={{ marginTop: "var(--bt-space-2)" }}>
              Zapping <span className="bt-brush bt-brush--orange">digital.</span>
            </h2>
            <p className="bt-lead" style={{ marginTop: "var(--bt-space-4)", maxWidth: "56ch" }}>
              90 canales SD + HD: deportes, infantil, noticias y películas. La parrilla real
              todavía está por confirmar.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <div style={{ marginTop: "var(--bt-space-6)" }}>
              <div className="in-canales">
                {["Deportes", "Infantil", "Noticias", "Películas", "HD", "SD"].map((c) => (
                  <Pill key={c} variant={c === "HD" ? "aqua" : c === "SD" ? "base" : "sky"}>
                    {c}
                  </Pill>
                ))}
              </div>
              <div style={{ marginTop: "var(--bt-space-5)" }}>
                <Button href="/canales" variant="primary" size="lg">
                  Ver la parrilla
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 06 · El barrio ─────────────────────────────────────────── */}
      <Escena foto="/assets/fotos/barrio-2.webp">
        <section className="bt-section bt-section--navy bt-seccion" id="barrio" aria-labelledby="h-barrio">
          <div className="bt-container">
            <Reveal>
              <p className="bt-kicker bt-kicker--ch">CH 06 · El barrio</p>
              <h2 className="bt-display bt-display--2xl" id="h-barrio" style={{ marginTop: "var(--bt-space-2)" }}>
                Bajo Tigui es <span className="bt-brush bt-brush--aqua">del barrio.</span>
              </h2>
              <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)", maxWidth: "56ch" }}>
                Organización sin ánimo de lucro de El Bagre, Antioquia. No es una empresa de
                afuera: la señal la pone gente del mismo pueblo.
              </p>
              <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
                <Button href="/nosotros" variant="primary" size="lg">
                  Conócenos
                </Button>
                <Button href="/como-funciona" variant="outline" size="lg">
                  Cómo funciona
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      </Escena>

      {/* ── 07 · Atención ──────────────────────────────────────────── */}
      <section className="bt-section bt-section--sunken bt-seccion" id="atencion" aria-labelledby="h-atencion">
        <div className="bt-container">
          <Reveal>
            <p className="bt-kicker bt-kicker--ch">CH 07 · Atención</p>
            <h2 className="bt-display bt-display--2xl" id="h-atencion" style={{ marginTop: "var(--bt-space-2)" }}>
              Del otro lado hay <span className="bt-brush bt-brush--aqua">una persona.</span>
            </h2>
            <p className="bt-lead" style={{ marginTop: "var(--bt-space-4)", maxWidth: "56ch" }}>
              WhatsApp y llamadas al 312 274 0219, de lunes a viernes, 7:00 a. m. – 5:00 p. m.
              Sábados, domingos y festivos no hay atención.
            </p>
            <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
              <Button href="https://wa.me/573122740219" variant="wa" size="lg">
                Escribir por WhatsApp
              </Button>
              <Button href="/buzon" variant="outline" size="lg">
                Buzón de PQRS
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Cierre ─────────────────────────────────────────────────── */}
      <section className="bt-section bt-section--navy bt-seccion" id="cierre" aria-labelledby="h-cierre">
        <div className="bt-container">
          <Reveal>
            <p className="bt-kicker bt-kicker--ch">CH 08 · Cierre</p>
            <h2 className="bt-display bt-display--2xl" id="h-cierre" style={{ marginTop: "var(--bt-space-2)" }}>
              La señal viaja lejos.<br />Aquí <span className="bt-brush bt-brush--orange">se queda.</span>
            </h2>
            <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
              <Button href="https://wa.me/573122740219" variant="primary" size="lg">
                Contratar por WhatsApp
              </Button>
              <Button href="/planes" variant="outline" size="lg">
                Ver planes
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
