# Maquetas — Bajo Tigui

Carpeta de trabajo de diseño. **Todo es HTML + CSS plano, sin build, sin dependencias y sin red.**

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| `_base.css` | **Sistema de diseño**: importa `../tokens.css` y define las clases `bt-*` (nav, footer, botones, píldoras, tarjeta de plan, banner de aviso, widget de chatbot, stickers, pincel, arcos, notas POR CONFIRMAR) |
| `componentes.html` | **Muestra viva de todos los componentes**, con los ratios de contraste medidos en el propio archivo |
| `fonts/` | Archivo y Karla variables en `.woff2` (normal e itálica × latin y latin-ext), **locales** |
| `capturas/` | Capturas de revisión con Playwright (móvil 390 px y escritorio 1440 px) |
| `../assets/escenas/` | Escenas duotono para los fondos fijos por módulo (ver su `README.md`) |
| `wip-1b-i/` | **Archivo del WIP 1B-i** (mismas 3 páginas y sus capturas) con su propia hoja `.mq-*`. Referencia histórica, no se actualiza |

## Reglas que este sistema cumple (no reintroducirlas)

1. **Cero CDN y cero fuentes remotas.** Nada de `@import` de Google Fonts ni `<link>` a `fonts.googleapis.com`.
   Las 8 fuentes están en `fonts/` y se declaran con `@font-face`. Debe abrir con `file://` **y sin red**.
2. **Los tokens son la fuente de verdad.** `_base.css` hace `@import url("../tokens.css")` y usa variables
   semánticas (`--bt-brand`, `--bt-text`, `--bt-space-*`, `--bt-shadow-hard`…). No se duplican hexadecimales.
3. **Contraste AA verificado en el navegador**, no de memoria. Los ratios están anotados junto a cada
   componente. Ojo: el blanco sobre verde WhatsApp **no** pasa (1,98:1) → ese botón va con texto tinta.
4. **Cero desbordes horizontales**, medido a 320, 360, 390, 768, 1024 y 1440 px. Para comprobarlo de verdad,
   hay que **forzar `overflow-x: visible`** en `document.documentElement`: el sistema usa `overflow-x: clip`
   como red de seguridad, y con el `clip` puesto un desborde real pasa desapercibido.
5. **Las cadenas sin espacios** (correos, URLs, tokens CSS) deben poder partirse: `overflow-wrap: anywhere`
   y `min-width: 0` en los hijos flex.
6. **Movimiento**：`prefers-reduced-motion` y `[data-motion="lite"]` llevan las duraciones a 0.
7. **Datos no confirmados** van con `.bt-por-confirmar`. No se inventa nada.
8. El nombre es **"Bajo Tigui"**, sin tilde ni diéresis, y no se le asigna ningún significado.
9. **Los fondos de módulo no usan `background-attachment: fixed`.** Safari en iOS lo ignora. Se usa el
   wrapper `.bt-escena-bloque` (fondo `sticky` + `overflow: clip`), que funciona igual en móvil y escritorio.

## Fondos por módulo

Cada escena envuelve la sección completa:

```html
<div class="bt-escena-bloque" data-escena="poste">
  <div class="bt-escena-bloque__fondo" aria-hidden="true"></div>
  <section class="bt-section bt-section--navy ...">...</section>
</div>
```

- `data-escena="poste"` y `data-escena="cables"` mapean a `../assets/escenas/*.webp`.
- El fondo es `position: sticky; top: 0; height: 100vh` con margen negativo: la imagen queda quieta y el
  contenido pasa por encima. El wrapper la recorta al módulo, así que cambia al entrar en el siguiente.
- Solo en módulos oscuros. El velo navy (84–90 %) y la trama de puntos mantienen el contraste AA; si se
  pone en una sección clara hay que medir de nuevo.
- `[data-motion="lite"]` quita las imágenes y deja el navy del sistema.
- Para reemplazar una foto, conservar el nombre y el duotono (ver `docs/diseno/assets/escenas/README.md`).

## Cómo verlo

```bash
# abrir la muestra de componentes (doble clic o)
xdg-open docs/diseno/maquetas/componentes.html

# capturas nuevas con Playwright
npm run maquetas:capturar

# verificar una pantalla: desborde real (fuerza overflow-x: visible), contraste AA
# con alfa y pseudo-elementos, un solo h1, jerarquía, alt, red remota y movimiento.
# Sale con código 1 si hay cualquier fallo (sirve para el gate de cada pantalla).
node tools/verificar-maqueta.mjs docs/diseno/maquetas/inicio.html
```

## Estado de la 1B

**Hechas:** Inicio · Planes · Cómo funciona · Cobertura · Canales · Nosotros · Atención · Buzón ·
404 · Mantenimiento.

**Pendiente:** conectar el widget del chatbot a su backend. (Login, Pagos, Portal y Admin quedan
para después; el buzón ya tiene el formulario, pero su backend también está pendiente).

Todas se construyen **con este sistema**: no se redefinen tokens ni colores, se componen clases `bt-*`.
