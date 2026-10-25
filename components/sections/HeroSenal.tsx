import Image from "next/image";
import Link from "next/link";

/** Portada estática. Conserva el nombre para no romper los imports existentes. */
export function HeroSenal() {
  return (
    <aside className="hero-plan" aria-label="Resumen del plan de internet y televisión">
      <div className="hero-plan__brand">
        <Image src="/brand/logo-icono.svg" alt="" width={92} height={92} />
        <p>BAJO TIGUI<span>La conexión es de aquí.</span></p>
      </div>
      <div className="hero-plan__body">
        <p className="hero-plan__eyebrow">FIBRA ÓPTICA + TELEVISIÓN</p>
        <p className="hero-plan__price">$70.000<span>COP / mes</span></p>
        <dl className="hero-plan__features">
          <div><dt>50 <span>Mbps</span></dt><dd>Velocidad de descarga</dd></div>
          <div><dt>90 <span>canales</span></dt><dd>Televisión SD + HD</dd></div>
        </dl>
        <p className="hero-plan__promo">Tu primer mes, gratis.</p>
        <Link className="hero-plan__link" href="/cobertura">
          Consulta si llegamos a tu casa <span aria-hidden="true">↗</span>
        </Link>
      </div>
      <p className="hero-plan__footer">El Bagre, Antioquia · Organización sin ánimo de lucro</p>
    </aside>
  );
}
