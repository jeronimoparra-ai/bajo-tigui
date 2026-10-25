import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { LiteMode } from "@/components/ui/LiteMode";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Antena Parabólica Bajo Tigui",
  description:
    "Internet por fibra óptica y televisión por antena parabólica para El Bagre y alrededores. Organización sin ánimo de lucro.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "El Bagre",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  telephone: "+573122740219",
  url: "https://bajotigui.co",
  priceRange: "$$",
};

export const metadata: Metadata = {
  title: "Antena Parabólica Bajo Tigui — Internet y TV en El Bagre, Antioquia",
  description:
    "Internet por fibra óptica y televisión por antena parabólica para El Bagre y alrededores. Un solo plan: $70.000 al mes. Organización sin ánimo de lucro.",
  metadataBase: new URL("https://bajotigui.co"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CO" data-theme="dark">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LiteMode />
        <a className="bt-skip-link" href="#contenido">Saltar al contenido</a>
        <Nav />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}
