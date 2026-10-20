#!/usr/bin/env node
/**
 * Verificador de maquetas — Bajo Tigui
 *
 * Uso:
 *   node tools/verificar-maqueta.mjs <archivo.html> [anchos...]
 *
 * Comprueba en un navegador real (Playwright/Chromium):
 *   1. Desborde horizontal REAL (fuerza overflow-x: visible en <html>).
 *   2. Contraste AA de todo texto visible, componiendo alfa y leyendo el fondo
 *      de los pseudo-elementos (los pinceles bt-brush son ::before).
 *   3. Un solo <h1>, jerarquía sin saltos, <img> sin alt.
 *   4. Peticiones de red remotas (debe ser 0: todo local).
 *   5. Duraciones de animación con prefers-reduced-motion y [data-motion="lite"].
 *   6. Capturas fullPage a 390 y 1440 si se pasa --capturas <dir>.
 */
import { chromium } from 'playwright';
import path from 'node:path';
import fs from 'node:fs';

const args = process.argv.slice(2);
const archivo = args.find((a) => a.endsWith('.html'));
const capturasIdx = args.indexOf('--capturas');
const dirCapturas = capturasIdx >= 0 ? args[capturasIdx + 1] : null;
const anchos = args
  .filter((a) => /^\d+$/.test(a))
  .map(Number);
const ANCHOS = anchos.length ? anchos : [320, 360, 390, 768, 1024, 1440];

if (!archivo) {
  console.error('Uso: node verificar-maqueta.mjs <archivo.html> [anchos...] [--capturas dir]');
  process.exit(2);
}
const url = 'file://' + path.resolve(archivo);
if (!fs.existsSync(archivo)) {
  console.error('No existe:', archivo);
  process.exit(2);
}

const LUMA = (c) => {
  const f = (v) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
};
const RATIO = (a, b) => {
  const l1 = LUMA(a), l2 = LUMA(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

const browser = await chromium.launch();
let fallos = 0;
const linea = (ok, texto) => {
  console.log(`  ${ok ? 'OK  ' : 'FALLA'} ${texto}`);
  if (!ok) fallos++;
};

console.log(`\nARCHIVO: ${archivo}\n`);

// ── 1. Desborde horizontal ────────────────────────────────────────────────
console.log('1) DESBORDE HORIZONTAL (overflow-x: visible forzado)');
for (const w of ANCHOS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, locale: 'es-CO' });
  const p = await ctx.newPage();
  const remotas = [];
  p.on('request', (r) => { if (!r.url().startsWith('file://') && !r.url().startsWith('data:')) remotas.push(r.url()); });
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(250);
  const r = await p.evaluate(() => {
    const d = document.documentElement;
    d.style.overflowX = 'visible';
    const lim = d.clientWidth;
    const culpables = [];
    for (const el of document.querySelectorAll('body *')) {
      const bb = el.getBoundingClientRect();
      if (bb.width > 0 && bb.right > lim + 1) {
        const cs = getComputedStyle(el);
        // ignora lo que el propio contenedor recorta
        let recortado = false;
        for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
          if (['hidden', 'clip', 'auto', 'scroll'].includes(getComputedStyle(n).overflowX)) { recortado = true; break; }
        }
        if (!recortado) culpables.push(`${el.tagName.toLowerCase()}.${String(el.className?.baseVal ?? el.className ?? '').split(' ').slice(0, 2).join('.')} (+${Math.round(bb.right - lim)}px)`);
      }
    }
    return { sw: d.scrollWidth, lim, culpables: [...new Set(culpables)].slice(0, 5), remotas: 0 };
  });
  linea(r.sw <= r.lim, `${String(w).padStart(5)} px → scrollWidth ${r.sw} / ${r.lim}` + (r.culpables.length ? `  culpables: ${r.culpables.join(', ')}` : ''));
  if (remotas.length) { console.log(`        peticiones remotas: ${remotas.slice(0, 3).join(', ')}`); fallos++; }
  await ctx.close();
}

// ── 2. Contraste AA ───────────────────────────────────────────────────────
console.log('\n2) CONTRASTE AA (texto visible, alfa compuesto, pseudo-fondos)');
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-CO' });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(250);
  const malos = await p.evaluate(() => {
    const parse = (cs) => {
      const m = cs.match(/[\d.]+/g);
      if (!m) return null;
      const n = m.map(Number);
      if (cs.startsWith('color(srgb')) return { r: n[0] * 255, g: n[1] * 255, b: n[2] * 255, a: n[3] ?? 1 };
      return { r: n[0], g: n[1], b: n[2], a: n[3] ?? 1 };
    };
    const over = (f, b) => ({ r: f.r * f.a + b.r * (1 - f.a), g: f.g * f.a + b.g * (1 - f.a), b: f.b * f.a + b.b * (1 - f.a), a: 1 });
    const lum = (c) => {
      const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
      return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
    };
    const ratio = (a, b) => { const l1 = lum(a), l2 = lum(b); return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05); };
    // fondo efectivo: pseudo-elemento con fondo (pincel) manda; si no, cadena de ancestros
    const fondo = (el) => {
      for (const pseudo of ['::before', '::after']) {
        const ps = getComputedStyle(el, pseudo);
        if (ps.content && ps.content !== 'none' && ps.position === 'absolute') {
          const bg = parse(ps.backgroundColor);
          if (bg && bg.a > 0.5) return bg;
        }
      }
      // Lienzo base opaco y capas del ancestro más lejano al más cercano:
      // acc = capa SOBRE acc (si se hiciera al revés, todo daría blanco).
      let acc = { r: 255, g: 255, b: 255, a: 1 };
      const cadena = [];
      for (let n = el; n; n = n.parentElement) cadena.push(n);
      for (const n of cadena.reverse()) {
        const cs = getComputedStyle(n);
        // Las imágenes de fondo son decorativas (arcos de señal): se ignora su
        // contenido y se compone solo el color de fondo de la capa.
        const bg = parse(cs.backgroundColor);
        if (bg && bg.a > 0) acc = over(bg, acc);
      }
      return acc;
    };
    const salida = [];
    for (const el of document.querySelectorAll('p,span,a,h1,h2,h3,h4,li,strong,b,em,button,label,td,th,figcaption,blockquote')) {
      const txt = (el.textContent || '').trim();
      if (!txt) continue;
      // Solo evalúa elementos con texto PROPIO: si el texto vive en un hijo,
      // el color del padre no es el que se pinta (falso positivo típico).
      const propio = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
      if (!propio) continue;
      if (el.closest('.bt-visually-hidden')) continue;
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none' || parseFloat(cs.opacity) < 0.5) continue;
      if (el.closest('[aria-hidden="true"]')) continue;
      const fg = parse(cs.color);
      if (!fg) continue;
      const bg = fondo(el);
      const f = fg.a < 1 ? over(fg, bg) : fg;
      const rr = ratio(f, bg);
      const size = parseFloat(cs.fontSize);
      const bold = Number(cs.fontWeight) >= 700;
      const min = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
      if (rr < min) salida.push({ t: txt.slice(0, 46).replace(/\s+/g, ' '), color: cs.color, bg: `rgb(${[bg.r, bg.g, bg.b].map(Math.round).join(',')})`, rr: +rr.toFixed(2), min, size: cs.fontSize });
    }
    return salida;
  });
  if (!malos.length) linea(true, 'todos los textos visibles pasan AA');
  else {
    fallos += malos.length;
    for (const m of malos.slice(0, 15)) console.log(`  FALLA ${m.rr} < ${m.min} | ${m.color} sobre ${m.bg} | ${m.size} | «${m.t}»`);
  }
  await ctx.close();
}

// ── 3. Estructura ─────────────────────────────────────────────────────────
console.log('\n3) ESTRUCTURA Y ACCESIBILIDAD BÁSICA');
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-CO' });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  const r = await p.evaluate(() => {
    const h1 = document.querySelectorAll('h1').length;
    const niveles = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => +h.tagName[1]);
    let salto = null;
    for (let i = 1; i < niveles.length; i++) if (niveles[i] - niveles[i - 1] > 1) salto = `h${niveles[i - 1]} → h${niveles[i]}`;
    const sinAlt = [...document.querySelectorAll('img')].filter((i) => !i.hasAttribute('alt')).length;
    const sinLang = document.documentElement.lang || '(vacío)';
    const huerfanas = [...document.querySelectorAll('a')].filter((a) => !a.textContent.trim() && !a.getAttribute('aria-label')).length;
    return { h1, salto, sinAlt, sinLang, huerfanas };
  });
  linea(r.h1 === 1, `${r.h1} <h1> (debe ser 1)`);
  linea(!r.salto, `jerarquía de encabezados${r.salto ? `: salto ${r.salto}` : ' sin saltos'}`);
  linea(r.sinAlt === 0, `${r.sinAlt} <img> sin alt`);
  linea(r.sinLang.startsWith('es'), `lang="${r.sinLang}"`);
  linea(r.huerfanas === 0, `${r.huerfanas} enlaces sin texto ni aria-label`);
  await ctx.close();
}

// ── 4. Movimiento ─────────────────────────────────────────────────────────
console.log('\n4) MOVIMIENTO (reduced-motion y modo lite)');
for (const [etiqueta, opciones] of [['prefers-reduced-motion: reduce', { reducedMotion: 'reduce' }], ['data-motion="lite"', null]]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, locale: 'es-CO', reducedMotion: opciones?.reducedMotion });
  const p = await ctx.newPage();
  await p.goto(url, { waitUntil: 'load' });
  if (!opciones) await p.evaluate(() => document.documentElement.setAttribute('data-motion', 'lite'));
  await p.waitForTimeout(150);
  const max = await p.evaluate(() => {
    let m = 0;
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      for (const v of [cs.animationDuration, cs.transitionDuration]) {
        for (const d of v.split(',')) {
          const n = parseFloat(d);
          if (!Number.isNaN(n) && d.includes('s') && !d.includes('ms')) m = Math.max(m, n * 1000);
          else if (!Number.isNaN(n) && d.includes('ms')) m = Math.max(m, n);
        }
      }
    }
    return m;
  });
  linea(max <= 1, `${etiqueta} → duración máxima ${max} ms`);
  await ctx.close();
}

// ── 5. Capturas ───────────────────────────────────────────────────────────
if (dirCapturas) {
  console.log('\n5) CAPTURAS');
  fs.mkdirSync(dirCapturas, { recursive: true });
  const base = path.basename(archivo, '.html');
  for (const [n, w, h, s] of [['movil', 390, 844, 2], ['escritorio', 1440, 900, 1]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: s, locale: 'es-CO' });
    const p = await ctx.newPage();
    await p.goto(url, { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(350);
    const destino = path.join(dirCapturas, `${base}-${n}-completa.png`);
    await p.screenshot({ path: destino, fullPage: true });
    console.log(`  OK   ${destino}`);
    await ctx.close();
  }
}

await browser.close();
console.log(`\nRESULTADO: ${fallos === 0 ? 'sin fallos' : `${fallos} fallo(s)`}\n`);
process.exit(fallos === 0 ? 0 : 1);
