import Link from "next/link";
import Image from "next/image";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/planes", label: "Planes" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/cobertura", label: "Cobertura" },
  { href: "/canales", label: "Canales" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Atención" },
];

export function Nav() {
  return (
    <header className="bt-nav">
      <div className="bt-container">
        <div className="bt-nav__inner">
          <Link href="/" className="bt-nav__brand" aria-label="Inicio — Antena Parabólica Bajo Tigui">
            <Image
              src="/brand/logo-horizontal.svg"
              alt="Antena Parabólica Bajo Tigui"
              width={240}
              height={70}
              priority
            />
          </Link>
          <nav aria-label="Navegación principal">
            <ul className="bt-nav__links">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="bt-nav__actions">
            <a
              className="bt-btn bt-btn--wa"
              href="https://wa.me/573122740219"
              aria-label="Escribir por WhatsApp o llamar al 312 274 0219"
            >
              <span className="at-nav__label">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
