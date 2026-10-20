import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bt-footer" role="contentinfo" aria-label="Pie de página">
      <div className="bt-container">
        <div className="bt-footer__grid">
          <div>
            <Image
              src="/brand/logo-mono-blanco.svg"
              alt=""
              width={112}
              height={112}
              loading="lazy"
            />
            <p className="bt-footer__lema">&ldquo;La señal viaja lejos.<br />Aquí se queda.&rdquo;</p>
            <p style={{ marginTop: "var(--bt-space-2)", fontSize: "var(--bt-fs-sm)", color: "var(--bt-sky-200)" }}>
              Organización sin ánimo de lucro<br />
              El Bagre, Antioquia, Colombia
            </p>
          </div>
          <div>
            <p className="bt-kicker" style={{ color: "var(--bt-sky-400)" }}>Servicios</p>
            <ul className="bt-footer__list">
              <li><Link href="/planes">Plan $70.000 / mes</Link></li>
              <li><Link href="/cobertura">Cobertura</Link></li>
              <li><Link href="/canales">TV 90 canales SD + HD</Link></li>
              <li><Link href="/contacto">Atención al asociado</Link></li>
            </ul>
          </div>
          <div>
            <p className="bt-kicker" style={{ color: "var(--bt-sky-400)" }}>Contacto</p>
            <ul className="bt-footer__list">
              <li>
                <a href="tel:+573122740219" aria-label="WhatsApp y llamadas: 312 274 0219">
                  WhatsApp / llamadas: 312 274 0219
                </a>
              </li>
              <li>Lun – Vie · 7:00 a. m. – 5:00 p. m.</li>
              <li><Link href="/buzon">Buzón de PQRS</Link></li>
            </ul>
          </div>
        </div>
        <div className="bt-footer__bottom">
          <p style={{ margin: 0 }}>© 2026 Antena Parabólica Bajo Tigui.</p>
          <p style={{ fontSize: "var(--bt-fs-xs)", color: "var(--bt-sky-400)" }}>
            Tratamos sus datos personales según la Ley 1581 de 2012.
          </p>
        </div>
      </div>
    </footer>
  );
}
