"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const details = menu.current;
    if (!details) return;
    details.open = false;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && details.open) {
        details.open = false;
        details.querySelector("summary")?.focus();
      }
    };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !details.contains(event.target)) details.open = false;
    };
    const desktop = window.matchMedia("(min-width: 75rem)");
    const closeOnDesktop = () => {
      if (desktop.matches) {
        const hadFocus = details.contains(document.activeElement);
        details.open = false;
        if (hadFocus) document.querySelector<HTMLAnchorElement>(".bt-nav__brand")?.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [pathname]);

  function renderLinks() {
    return links.map((link) => (
      <li key={link.href}>
        <Link href={link.href} aria-current={pathname === link.href ? "page" : undefined}
          onClick={() => { if (menu.current) menu.current.open = false; }}>
          {link.label}
        </Link>
      </li>
    ));
  }

  return (
    <header className="bt-nav">
      <div className="bt-container">
        <div className="bt-nav__inner">
          <Link href="/" className="bt-nav__brand" aria-label="Inicio — Antena Parabólica Bajo Tigui">
            <Image className="bt-nav__logo" src="/brand/logo-horizontal.svg"
              alt="Antena Parabólica Bajo Tigui" width={240} height={70} priority />
          </Link>
          <nav className="bt-nav__desktop" aria-label="Navegación principal">
            <ul className="bt-nav__links">{renderLinks()}</ul>
          </nav>
          <div className="bt-nav__actions">
            <a className="bt-btn bt-btn--wa bt-nav__whatsapp" href="https://wa.me/573122740219">
              WhatsApp
            </a>
            <details ref={menu} className="bt-nav__mobile">
              <summary className="bt-nav__toggle">
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
                  <path d="M3 5h14M3 10h14M3 15h14" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                Menú
              </summary>
              <nav className="bt-nav__panel" aria-label="Navegación móvil">
                <ul className="bt-nav__mobile-links">{renderLinks()}</ul>
                <a className="bt-btn bt-btn--wa" href="https://wa.me/573122740219">Escribir por WhatsApp</a>
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
