# Maquetas — Bajo Tigui

Carpeta de trabajo de diseño. **Todo es HTML + CSS plano, sin build, sin dependencias y sin red.**

## Qué hay aquí

| Ruta | Qué es |
|---|---|
| `_base.css` | **Sistema de diseño**: importa `../tokens.css` y define las clases `bt-*` (nav, footer, botones, píldoras, tarjeta de plan, banner de aviso, widget de chatbot, stickers, pincel, arcos, notas POR CONFIRMAR) |
| `componentes.html` | **Muestra viva de todos los componentes**, con los ratios de contraste medidos en el propio archivo |
| `fonts/` | Archivo y Karla variables en `.woff2` (normal e itálica × latin y latin-ext), **locales** |
| `capturas/` | Capturas de revisión con Playwright (móvil 390 px y escritorio 1440 px) |
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

## Pendiente de la 1B (screens aún sin diseñar)

Inicio · Planes · Cómo funciona · Cobertura · Canales · Nosotros · Contacto/Atención · Buzón ·
404 · Mantenimiento · widget del chatbot · (Login, Pagos, Portal y Admin quedan para después).

Todas se construyen **con este sistema**: no se redefinen tokens ni colores, se componen clases `bt-*`.
