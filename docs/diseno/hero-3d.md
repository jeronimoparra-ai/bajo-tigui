# Hero — por qué el logo trazado no se agranda y qué lo reemplaza

Fase 1A · complemento de decisión para el Acto 2 ("Azotea") y la portada.

Evidencia: [`hero/_hero-trazado-bordes.png`](./hero/_hero-trazado-bordes.png) — el mismo detalle del ícono
renderizado a **600 px (izquierda)** y **1200 px (derecha)**, ampliado para ver el trazo.

## 1. Medición (hecha, no supuesta)

Se rasterizó `public/brand/logo-icono.svg` a 600 px y a 1200 px de ancho y se recortó el borde
superior de la parábola (guiones gruesos, curva del plato y bloques azules de fondo).

**Lo que se ve en la evidencia:**

| A 600 px | A 1200 px |
|---|---|
| Los guiones del contorno salen **quebrados/ondulados** (segmentos rectos unidos en ángulos) | Igual, y además las **franjas de anti-aliasing** del origen se notan como rebordes grises sobre el negro |
| La curva del plato muestra **escalones** | Los escalones se agrandan con la escala |
| Aparecen **filos blancos** entre el plato y los bloques azules (separaciones de la apertura morfológica) | Los filos blancos se ven más gruesos |

**Conclusión:** el vector es fiel a 262 px, pero **no es un vector de origen**: es una
aproximación del raster. A partir de ~600 px el ojo detecta el ondulado. Por eso:

> **Regla:** `logo-icono.svg`, `logo-icono-recorte.svg`, `logo-sobre-oscuro.svg` y el favicon
> se usan **hasta 480 px** de ancho. Para el hero **no se agranda el vectorizado**.

## 2. Qué se usa en el hero (propuesta)

**Una parabólica 3D propia, modelada desde cero e inspirada en el logo** — no el logo escalado,
no un modelo de stock. Es la pieza del Acto 2: el usuario ajusta la antena y "llega" la señal.

### 2.1 Geometría (bloques, en orden de importancia)

| Pieza | Descripción | Fidelidad al logo |
|---|---|---|
| **Plato** | Paraboloide de revolución (radio 1, profundidad ~0.28), borde engrosado, **nervios radiales** en el dorso | Alto: el plato es el protagonista del símbolo |
| **Brazo y alimentador** | Viga recta desde el borde al foco + "bocina" cilíndrica apuntando al plato | Alto: es lo que se lee en el original |
| **Montura** | Horquilla con **eje de azimut** (vertical) y **eje de elevación** (horizontal) | Alto |
| **Base** | Trípode/arriostramiento + largueros (la escalerilla del dibujo) | Medio: se simplifica, no se copia el detalle |
| **Tornillería y bridas** | Detalles pequeños | Bajo: dan escala, no identidad |

Se **descartan** los elementos del logo que son de la ilustración, no del objeto: bloques azules de
fondo, puntos amarillos/naranja, guiones sueltos y el segundo plato pequeño. El 3D representa
**la antena**, no el dibujo completo.

### 2.2 Materiales y luz (para que parezca de la marca, no un render genérico)

- **Sombreado plano/cel**: bandas de color discretas (2–3 pasos), no degradados fotográficos.
  Es el puente con el lenguaje de formas planas del logo y los flyers.
- **Paleta** desde `tokens.css`: plato en celeste `#8FCCF0` con la cara interior en verde agua
  `#A1D9D4`; montura y base en navy `#002E84`; tornillería en cobalto `#0058B0`.
- **Contorno de tinta:** *inverted hull* (malla duplicada, `BackSide`, ligeramente dilatada) con el
  grosor **compensado por distancia** para que el contorno se mantenga constante, como el contorno
  grueso del dibujo. Es lo que hace que "se vea Bajo Tigui" y no un modelo cualquiera.
- **Sin** reflejos especulares, sin HDRI fotorrealista, sin glassmorphism. Una luz clave cálida y
  un relleno frío, ambas suaves; sombra de contacto pintada (no `shadowMap` caro) o `ContactShadows`.

### 2.3 Movimiento (con sentido)

- **Sigue el cursor / giroscopio:** azimut ±35°, elevación ±18°, con amortiguación (`damping`).
  Tope duro para que nunca gire enloquecido.
- **Hacia la señal:** al pasar del Acto 1 al 2, la antena **se orienta** y los **arcos de señal**
  (2–3 círculos concéntricos, mismos del sistema gráfico) aparecen en el foco.
- **Momentos:** ≤ 800 ms (`--bt-dur-4`), easing `--bt-ease-signal`. Sin bucles infinitos.
- **Reducción:** con `prefers-reduced-motion` o `[data-motion="lite"]` se muestra **un fotograma
  fijo** (misma composición, sin rotación) y los arcos quedan quietos.

### 2.4 Rendimiento y respaldo

- React Three Fiber + `drei` (`Environment` ligero o luces propias, `Preload`).
- Presupuesto: **≤ 25 k triángulos**, 1 malla por material, **Draco/KTX2** para geometría/texturas
  si hiciera falta; el modelo base es geometría pura, así que pesa poco.
- Carga diferida: el 3D entra con `lazy` + `Suspense`; el **primer pintado del hero no espera al 3D**
  (título, precio y CTA están en HTML y se ven de una).
- **Respaldo obligatorio** si no hay WebGL, si `saveData`, si gama baja o si el usuario desactiva:
  se muestra `logo-icono-recorte.svg` **a ≤ 480 px** sobre el bloque navy (o el lockup). Nunca el
  vectorizado a tamaño hero.

### 2.5 Accesibilidad

- El `<canvas>` va `aria-hidden="true"`; el hero comunica lo mismo con texto real
  ("Internet por fibra y TV por antena…") y una descripción textual de la escena.
- El 3D **no** es la única vía de nada: la orientación de la antena es un adorno con sentido.
- Sin trampa de teclado en el canvas; los controles reales (dial de plan, CTA) están en HTML.

## 3. Dónde se construye

- **Fase 3** (`fases/`): componente `HeroAntena` con R3F, en `components/hero/`.
- El modelo se guarda como código (primitivas + `three.js` CSG ligero) o como `.glb` optimizado en
  `public/modelos/`. Se decide en la fase, según el tamaño final.
- Hasta entonces, la maqueta de la 1B usa el **ícono SVG ≤ 480 px** o el bloque de color con título
  (estado seguro), y anota "aquí va la antena 3D".

## 4. POR CONFIRMAR

- ¿La antena 3D debe mostrar el detalle del logo (nervios, escalerilla) o una versión **más limpia**
  de 4–5 piezas? Mi recomendación: limpia; el detalle se pierde en movimiento y encarece el modelo.
- ¿Gira sola **un poco** al entrar (invitación a interactuar) o solo responde al cursor/giroscopio?
