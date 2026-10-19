#!/usr/bin/env node
/**
 * Capturas de las maquetas de la Fase 1B con Playwright (paquete npm del proyecto).
 *
 * Para cada maqueta toma dos fotos por dispositivo:
 *   -portada.png   lo que se ve al abrir (primer pantallazo)
 *   -completa.png  la página entera
 *
 * Uso:
 *   npm run maquetas:capturar            # móvil + escritorio
 *   node tools/capturar-maquetas.mjs --solo inicio
 */
import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const MAQUETAS = path.join(RAIZ, "docs/diseno/maquetas");
const SALIDA = path.join(MAQUETAS, "capturas");

const PAGINAS = ["inicio", "planes", "chatbot"];
const DISPOSITIVOS = [
  { nombre: "movil", width: 390, height: 844, dsf: 2 },
  { nombre: "escritorio", width: 1440, height: 900, dsf: 1 },
];

const soloArg = process.argv.indexOf("--solo");
const filtro = soloArg !== -1 ? process.argv[soloArg + 1] : null;
const paginas = filtro ? PAGINAS.filter((p) => p === filtro) : PAGINAS;

if (paginas.length === 0) {
  console.error(`No hay maqueta llamada "${filtro}". Opciones: ${PAGINAS.join(", ")}`);
  process.exit(1);
}

async function prepararPagina(browser, dev, url) {
  const contexto = await browser.newContext({
    viewport: { width: dev.width, height: dev.height },
    deviceScaleFactor: dev.dsf,
    locale: "es-CO",
    colorScheme: "light",
    reducedMotion: "no-preference",
  });
  const page = await contexto.newPage();
  await page.goto(url, { waitUntil: "load" });
  // Fuentes autoalojadas/cargadas: esperar a que estén listas antes de la foto
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(350); // asentar el último pintado
  return { contexto, page };
}

async function main() {
  await mkdir(SALIDA, { recursive: true });
  const browser = await chromium.launch();

  for (const nombre of paginas) {
    const url = `file://${path.join(MAQUETAS, `${nombre}.html`)}`;
    for (const dev of DISPOSITIVOS) {
      const { contexto, page } = await prepararPagina(browser, dev, url);
      const base = path.join(SALIDA, `${nombre}-${dev.nombre}`);

      await page.screenshot({ path: `${base}-portada.png` });
      await page.screenshot({ path: `${base}-completa.png`, fullPage: true });

      const alto = await page.evaluate(() => document.documentElement.scrollHeight);
      console.log(
        `${nombre}/${dev.nombre}  ${dev.width}×${dev.height} (dsf ${dev.dsf})  alto total ${alto}px`,
      );
      await contexto.close();
    }
  }

  await browser.close();
  console.log(`\nCapturas en ${path.relative(RAIZ, SALIDA)}/`);
}

main().catch((err) => {
  console.error("Falló la captura:", err.message);
  process.exit(1);
});
