import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

// Ejecutar con el servidor arrancado: node tools/verificar-frontend.mjs [URL]
const base = process.argv[2] ?? "http://localhost:3000";
const output = ".playwright/frontend";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
let checks = 0;
const check = (value, message) => { assert.ok(value, message); checks++; };

try {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [320, 360, 390, 768, 1024, 1280, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    const response = await page.goto(base, { waitUntil: "networkidle" });
    check(response?.ok(), `Inicio HTTP ${width}`);
    const geometry = await page.evaluate(() => ({
      viewport: innerWidth,
      width: document.documentElement.scrollWidth,
      animatedHero: document.querySelector("#portada").getAnimations({ subtree: true }).length,
      hiddenContent: [...document.querySelectorAll(".bt-reveal")].some((el) => getComputedStyle(el).opacity === "0"),
      logo: document.querySelector(".hero-plan__brand img").getBoundingClientRect().width,
    }));
    check(geometry.width <= geometry.viewport, `Sin overflow ${width}`);
    check(geometry.animatedHero === 0, `Portada sin animación ${width}`);
    check(!geometry.hiddenContent, `Contenido visible ${width}`);
    check(geometry.logo > 0, `Marca visible ${width}`);
    check(await page.locator(".hero-plan").innerText().then((text) => text.includes("$70.000") && text.includes("90")), `Plan visible ${width}`);
    if (width < 1200) {
      await page.locator(".bt-nav__toggle").click();
      check(await page.locator(".bt-nav__mobile").getAttribute("open") !== null, `Abrir menú ${width}`);
      check(await page.getByRole("navigation", { name: "Navegación móvil" }).isVisible(), `Enlaces móviles visibles ${width}`);
      await page.keyboard.press("Escape");
      check(await page.locator(".bt-nav__mobile").getAttribute("open") === null, `Escape cierra ${width}`);
      check(await page.locator(".bt-nav__toggle").evaluate((el) => el === document.activeElement), `Foco vuelve ${width}`);
    } else {
      check(await page.getByRole("navigation", { name: "Navegación principal", exact: true }).isVisible(), `Menú escritorio ${width}`);
    }
    if ([390, 1440].includes(width)) await page.screenshot({ path: `${output}/inicio-${width}.png`, fullPage: true });
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.keyboard.press("Tab");
  check(await page.locator(".bt-skip-link").evaluate((el) => el === document.activeElement), "Primer tab: saltar al contenido");
  await page.keyboard.press("Enter");
  check(await page.locator("#contenido").evaluate((el) => el === document.activeElement), "Salto enfoca el contenido");
  await page.locator(".bt-nav__toggle").click();
  await page.getByRole("navigation", { name: "Navegación móvil" }).getByRole("link", { name: "Planes", exact: true }).click();
  await page.waitForURL("**/planes");
  check(await page.locator(".bt-nav__mobile").getAttribute("open") === null, "Menú cierra al navegar");
  await page.locator(".bt-nav__toggle").click();
  check(await page.locator('.bt-nav__mobile-links a[aria-current="page"]').innerText() === "Planes", "Página actual indicada");
  await page.setViewportSize({ width: 1440, height: 900 });
  check(await page.locator(".bt-nav__mobile").getAttribute("open") === null, "Menú cierra al ampliar a escritorio");

  for (const route of ["/planes", "/cobertura", "/canales", "/nosotros", "/contacto", "/como-funciona", "/buzon"]) {
    await page.setViewportSize({ width: 390, height: 844 });
    const response = await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
    check(response?.ok(), `Ruta ${route}`);
    check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Sin overflow ${route}`);
    check(await page.locator("#contenido").count() === 1, `Destino de salto ${route}`);
  }
  check(errors.length === 0, `Sin errores JS: ${errors.join("; ")}`);

  const noJS = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const staticPage = await noJS.newPage();
  await staticPage.goto(base);
  check(await staticPage.locator("h1").isVisible(), "Título visible sin JS");
  check(await staticPage.locator(".hero-plan").isVisible(), "Plan visible sin JS");
  check(await staticPage.locator(".bt-reveal").evaluateAll((els) => els.every((el) => getComputedStyle(el).opacity === "1")), "Todas las secciones visibles sin JS");
  await staticPage.locator(".bt-nav__toggle").click();
  check(await staticPage.getByRole("navigation", { name: "Navegación móvil" }).isVisible(), "Menú funciona sin JS");
  await staticPage.getByRole("navigation", { name: "Navegación móvil" }).getByRole("link", { name: "Planes", exact: true }).click();
  await staticPage.waitForURL("**/planes");
  check(await staticPage.locator("h1").isVisible(), "Navegación sin JS");
  await noJS.close();

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(base);
  check(await page.locator(".hero-plan").isVisible(), "Plan visible con movimiento reducido");
  check(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior === "auto"), "Scroll reducido respetado");
  console.log(`${checks} comprobaciones correctas. Capturas en ${output}`);
} finally {
  await browser.close();
}
