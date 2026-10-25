import assert from "node:assert/strict";
import { chromium } from "playwright";

// Auditoría no destructiva del entorno LOCAL sin integraciones configuradas.
const base = process.argv[2] ?? "http://localhost:3000";
assert.ok(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "Solo entorno local");
// Evita crear tickets si el entorno local tiene una BD real conectada.
assert.equal((await fetch(`${base}/api/buzon?codigo=BZ-ABCDEF`)).status, 503, "Ejecutar sin Supabase configurado");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const observations = [];
try {
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await page.goto(base, { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Canal siguiente" }).click();
  assert.ok(await page.getByText("Solo TV", { exact: true }).isVisible());
  await page.getByRole("button", { name: "Canal anterior" }).click();
  assert.ok(await page.getByText("Fibra + TV", { exact: true }).isVisible());
  observations.push("Dial: cambia y vuelve al plan principal.");

  await page.getByRole("button", { name: "Abrir el asistente virtual" }).click();
  assert.ok(await page.getByRole("dialog").isVisible());
  await page.getByRole("button", { name: "Aceptar y continuar" }).click();
  await page.getByRole("button", { name: "¿Cuánto vale el plan?", exact: true }).click();
  await page.getByText(/no está disponible|no tengo conexión|no pude|no estoy conectado/i).first().waitFor({ timeout: 15000 });
  observations.push("Chat: consentimiento y aviso real de no disponibilidad sin clave Anthropic.");
  await page.getByRole("button", { name: "Cerrar el asistente" }).click();
  assert.equal(await page.getByRole("dialog").count(), 0);

  await page.goto(`${base}/buzon`);
  await page.getByRole("button", { name: "Enviar solicitud", exact: true }).click();
  assert.equal(await page.locator('input[name="asunto"]').evaluate((el) => el.validity.valueMissing), true);
  await page.locator('input[name="asunto"]').fill("Prueba local de validación");
  await page.locator('textarea[name="mensaje"]').fill("Mensaje local para comprobar el estado sin base de datos.");
  await page.getByLabel("Enviar de forma anónima", { exact: false }).check();
  await page.locator('input[name="autorizacion"]').check();
  await page.getByRole("button", { name: "Enviar solicitud", exact: true }).click();
  await page.locator('form [role="alert"]').waitFor();
  observations.push(`Buzón: validación nativa y error real: ${await page.locator('form [role="alert"]').innerText()}`);

  for (const route of ["/admin", "/portal"]) {
    const response = await fetch(`${base}${route}`, { redirect: "manual" });
    observations.push(`${route}: HTTP ${response.status}; redirección ${response.headers.get("location")}`);
    assert.equal(response.status, 307);
  }

  const invalid = await fetch(`${base}/api/buzon`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: "{}",
  });
  assert.equal(invalid.status, 400);
  observations.push("API buzón: HTTP 400 con cuerpo inválido.");
  const lookup = await fetch(`${base}/api/buzon?codigo=BZ-ABCDEF`);
  assert.equal(lookup.status, 503);
  observations.push("API buzón: HTTP 503 al consultar sin Supabase.");

  const meta = await page.evaluate(() => ({
    title: document.title,
    og: document.querySelectorAll('meta[property^="og:"]').length,
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null,
  }));
  observations.push(`SEO /buzon: ${JSON.stringify(meta)}`);
  const robots = await fetch(`${base}/robots.txt`).then((r) => r.text());
  const sitemap = await fetch(`${base}/sitemap.xml`).then((r) => r.text());
  observations.push(`robots permite todas las rutas: ${robots.includes("Allow: /")}; sitemap incluye portal: ${sitemap.includes("/portal")}`);
  console.log(observations.join("
"));
} finally {
  await browser.close();
}
