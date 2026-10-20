import Link from "next/link";

export default function NotFound() {
  return (
    <main id="contenido" tabIndex={-1}>
      <section className="bt-section bt-section--navy" id="portada" aria-labelledby="h-portada">
        <div className="bt-container">
          <p className="bt-kicker">Error 404 · El Bagre, Antioquia</p>
          <h1 className="bt-display" id="h-portada" style={{ marginTop: "var(--bt-space-3)" }}>
            La señal<br />
            <span className="bt-brush bt-brush--orange">se perdió.</span>
          </h1>
          <p className="bt-lead" style={{ color: "var(--bt-sky-200)", marginTop: "var(--bt-space-5)" }}>
            Esta dirección del sitio no existe o cambió de lugar. Su televisor y su internet
            no tienen nada que ver con este aviso: es una página que no está.
          </p>
          <div className="bt-cluster" style={{ marginTop: "var(--bt-space-6)" }}>
            <Link className="bt-btn bt-btn--primary bt-btn--lg" href="/">
              Volver al inicio
            </Link>
            <a className="bt-btn bt-btn--wa bt-btn--lg" href="https://wa.me/573122740219">
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
