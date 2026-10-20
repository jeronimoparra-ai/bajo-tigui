// Descarga imágenes de Wikimedia Commons con licencia libre (CC0/CC-BY/CC-BY-SA/PD),
// filtrando por tema y palabras clave del título para evitar fotos ajenas.
// Uso: node scripts/bajar-fotos.mjs
import fs from "node:fs";
import path from "node:path";

const UA = "BajoTiguiDesignBot/1.0 (https://github.com/jeronimoparra-ai/bajo-tigui)";
const OUT = path.join(process.cwd(), "public", "assets", "fotos");
const CREDITOS = path.join(OUT, "CREDITOS.md");

const OK_LICENCIAS = ["cc0", "public domain", "cc by", "cc-by", "attribution", "gfdl"];
const MALAS = ["telescope", "radio telescope", "radio dish", "spacecraft", "satellite in space",
  "observatory", "boiler", "hospital", "military", "aircraft", "cable car", "lighthouse"];

const OBJETIVOS = [
  { slug: "parabolica-casa", q: "satellite dish house roof residential", w: 1600,
    claves: ["dish", "antenna", "parabol", "satellite"], excluir: ["radio", "telescope", "observatory"] },
  { slug: "receptor-lnb", q: "satellite receiver LNB dish ku band", w: 1400,
    claves: ["dish", "antenna", "lnb", "satellite"], excluir: ["radio telescope", "spacecraft"] },
  { slug: "fibra-cable", q: "fiber optic cable network installation", w: 1600,
    claves: ["fiber", "fibre", "cable", "optic"], excluir: ["boiler", "submarine"] },
  { slug: "tecnico-cable", q: "cable technician installing coaxial cable wall", w: 1600,
    claves: ["cable", "technician", "install", "fiber", "fibre"], excluir: ["military", "aircraft"] },
  { slug: "television-casa", q: "television set living room sofa", w: 1600,
    claves: ["television", "tv", "crt", "living room"], excluir: ["hospital", "museum", "trade show", "booth"] },
  { slug: "futbol", q: "football match stadium players", w: 1600,
    claves: ["football", "soccer", "fútbol", "estadio", "stadium"], excluir: ["logo", "coat of arms"] },
  { slug: "cine", q: "cinema movie theater screen", w: 1600,
    claves: ["cinema", "movie", "film", "theater", "theatre", "cine"], excluir: ["poster"] },
  { slug: "barrio-colombiano", q: "El Bagre Antioquia Colombia pueblo", w: 1600,
    claves: ["bagre", "antioquia", "colombia", "pueblo", "town", "village"], excluir: ["map", "mapa", "flag", "escudo"] },
  { slug: "casa-colombiana", q: "Colombian house neighborhood streets", w: 1600,
    claves: ["colombia", "colombian", "casa", "house", "barrio"], excluir: ["map", "flag", "coat"] },
  { slug: "herramientas", q: "electrician tools multimeter installation", w: 1400,
    claves: ["electric", "tool", "install", "cable", "wire"], excluir: ["logo", "icon"] },
];

async function api(params) {
  const url = "https://commons.wikimedia.org/w/api.php?" + new URLSearchParams({ format: "json", ...params });
  const res = await fetch(url, { headers: { "User-Agent": UA } });
  if (!res.ok) throw new Error(`API ${res.status}`);
  return res.json();
}

function licenciaOk(meta) {
  const lic = String(meta?.LicenseShortName?.value ?? "").toLowerCase();
  const licUrl = String(meta?.License?.value ?? "").toLowerCase();
  if (!lic) return false;
  if (lic.includes("nc")) return false;                    // NonCommercial
  if (lic.includes("fair use") || lic.includes("non-free")) return false;
  if (lic.includes("nd")) return false;                    // NoDerivatives
  return OK_LICENCIAS.some((l) => lic.includes(l) || licUrl.includes(l));
}

function limpiar(html) {
  return String(html ?? "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

function tituloOk(titulo, obj) {
  const t = titulo.toLowerCase();
  if (MALAS.some((m) => t.includes(m))) return false;
  if (obj.excluir?.some((m) => t.includes(m))) return false;
  return obj.claves.some((c) => t.includes(c));
}

const creditos = [];
let total = 0;

for (const obj of OBJETIVOS) {
  let ok = 0;
  try {
    const search = await api({
      action: "query", generator: "search", gsrsearch: obj.q, gsrnamespace: "6",
      gsrlimit: "40", prop: "imageinfo",
      iiprop: "url|extmetadata|size|mime", iiurlwidth: String(obj.w),
    });
    const pages = Object.values(search?.query?.pages ?? {});
    for (const p of pages) {
      if (ok >= 2) break;
      const info = p.imageinfo?.[0];
      if (!info) continue;
      if (!/image\/(jpeg|png)/.test(info.mime ?? "")) continue;
      if (!licenciaOk(info.extmetadata)) continue;
      if ((info.width ?? 0) < 1000) continue;
      const titulo = limpiar(info.extmetadata?.ObjectName?.value) || p.title.replace("File:", "");
      if (!tituloOk(titulo, obj)) continue;
      const url = info.thumburl ?? info.url;
      const destino = path.join(OUT, `${obj.slug}-${ok + 1}.jpg`);
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) continue;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 40000) continue;
      fs.writeFileSync(destino, buf);
      const m = info.extmetadata ?? {};
      creditos.push({
        archivo: path.basename(destino), tema: obj.slug, titulo,
        autor: limpiar(m.Artist?.value) || "Desconocido",
        licencia: limpiar(m.LicenseShortName?.value) || "CC",
        fuente: info.descriptionurl,
      });
      ok++; total++;
    }
  } catch (e) {
    console.error(`${obj.slug}: ERROR ${e.message}`);
  }
  console.log(`${obj.slug}: ${ok}`);
}

let md = "# Créditos de las fotos\n\n";
md += "Fotos de **Wikimedia Commons** con licencia libre (CC0 / CC BY / dominio público).\n";
md += "Se usan como fondos con velo duotono del sistema (`.bt-escena-bloque__fondo`).\n\n";
for (const c of creditos) {
  md += `## ${c.archivo}\n- **Tema:** ${c.tema}\n- **Título:** ${c.titulo}\n- **Autor:** ${c.autor}\n- **Licencia:** ${c.licencia}\n- **Fuente:** ${c.fuente}\n\n`;
}
fs.writeFileSync(CREDITOS, md, "utf8");
console.log(`\nTotal: ${total} fotos. Créditos: ${CREDITOS}`);
