import type { MetadataRoute } from "next";

const base = "https://bajotigui.co";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/planes",
    "/como-funciona",
    "/cobertura",
    "/canales",
    "/nosotros",
    "/contacto",
    "/buzon",
    "/portal",
  ];  return routes.map((r) => ({
    url: `${base}${r}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.8,
  }));
}
