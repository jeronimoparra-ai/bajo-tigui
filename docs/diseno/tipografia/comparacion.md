# Prueba tipográfica — Bricolage Grotesque vs. Archivo

Página de prueba: [`prueba-tipografica.html`](./prueba-tipografica.html)
Capturas: [`escritorio-1280.png`](./escritorio-1280.png) · [`movil-390.png`](./movil-390.png)

## 1. Verificación previa (dato duro, no opinión)

Se consultó la API de Google Fonts y el metadato de cada familia:

| Familia | Ejes disponibles | ¿Itálica real? |
|---|---|---|
| **Bricolage Grotesque** | `wght 200–800`, `wdth 75–100`, `opsz 12–96` | ❌ **NO.** La API responde 200 pero devuelve **0 caras** `font-style: italic`; el metadato solo lista pesos upright |
| **Archivo** | `wght 100–900`, `wdth 62–125`, **`ital`** | ✅ **SÍ.** 6 caras itálicas reales (p. ej. `100i`, `900i`) |

Pruebas ejecutadas:

```bash
curl -s "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:ital,wght@0,400..800;1,400..800" | grep -c "font-style: italic"   # -> 0
curl -s "https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,400..900;1,400..900"                  | grep -c "font-style: italic"   # -> 6
```

**Conclusión:** con Bricolage la "itálica" sería **oblicua sintética** (una inclinación por software
sobre letras dibujadas para ir rectas). Se ve en la captura, muestra A2: el trazo queda igual de
grueso y las letras conservan su construcción vertical, así que no lee como una itálica diseñada.
Queda **descartada**.

## 2. Lo que muestra la prueba

**A · "Bajo Tigui"** (captura de escritorio, sección A)
- **A1** Bricolage 800 upright: con carácter y simpática, pero **recta**.
- **A2** Bricolage 800 + oblicua sintética: parece "una recta inclinada", no una itálica.
- **A3** **Archivo 900 itálica real (ancho 110)**: inclinación y construcción itálica de verdad;
  es lo más cerca del rótulo de los flyers.
- **A4** Archivo 900 itálica real (ancho 125): más ancha, con aire de **valla**; útil para el
  titular de portada, no tanto para el lockup del logo.

**B · Titular de plan "50 MEGAS + TV 90 CANALES"**
- **B1** Bricolage 800: amable y redonda; buena, pero pide una itálica que no existe.
- **B2** Archivo 800 recta: sólida y clara, muy legible en móvil.
- **B3** Archivo 800 itálica: más energía; sirve para destacar el dato, no para todo el titular.

**C · Cuerpo** (móvil, sección C): Karla 400 se lee mejor que Bricolage 400; Karla tiene más
contraste interno en tamaños pequeños, y por eso **se mantiene**.

## 3. Recomendación

> ### Display/titulares/wordmark → **Archivo** (variable: `wght`, `wdth`, `ital` 900i)
> ### Cuerpo/UI → **Karla** (variable: `wght 400–800`, itálica)

**Por qué Archivo**
1. **Itálica real** (no hay deformación sintética), requisito explícito de la marca para "Bajo Tigui".
2. **Eje de ancho 62–125**: el mismo archivo cubre el display compacto tipo flyer (≈105) y el
   expandido tipo **valla/sticker** (≈120–125) que pide el lenguaje gráfico.
3. **Rango 100–900**: toda la jerarquía (etiquetas de 13 px hasta titulares de 8 rem) con
   **una sola familia variable**.
4. **Una familia menos**: se elimina Bricolage → menos peso y menos peticiones (mobile-first real).

**Por qué no "Bricolage upright + Archivo italic"**: serían 3 familias, dos displays compitiendo, y
la mezcla se nota (Bricolage tiene formas irregulares propias que choca con la neutralidad de Archivo).

**Cómo se usa (para 1B/3)**
- Wordmark "BAJO TIGUI": `Archivo 900 italic`, `wdth 105–110`.
- Titulares de sección: `Archivo 800 upright`, tracking `-0.02em`.
- Datos/precios: `Archivo 800` con `font-variant-numeric: tabular-nums`.
- Cuerpo: `Karla 400/700`.
- Etiquetas/versalitas: `Karla 700`, `letter-spacing .08em`.

## 4. Impacto en los archivos del sistema

- `tokens.css`: `--bt-font-display` pasa a `"Archivo"` (se elimina Bricolage).
- `sistema-de-diseno.md` § 2: par tipográfico actualizado y justificado.
- `public/brand/logo-horizontal.svg` y `logo-vertical.svg`: wordmark pasa a **Archivo 900 italic**
  (hoy texto vivo; se hornea a paths en la 1B).
