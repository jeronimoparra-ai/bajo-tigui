import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Imagenes locales; sin remotePatterns (todo local).
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Sin trailing slash para rutas limpias.
  trailingSlash: false,
};

export default nextConfig;
