# Concepto creativo — Antena Parabólica Bajo Tigui

Fase 1A · `docs/diseno/concepto.md`

## La idea rectora

> **"La señal viaja lejos. Aquí se queda."**
> La web no cuenta que hay un servicio: **recorre el trayecto de la señal**, desde que sale de la
> órbita hasta que se sienta en la sala de una casa de El Bagre.

No es un tema decorativo ("poner antenas por todas partes"), es una **estructura narrativa**:
cada sección es una **estación** de ese viaje y el usuario **sintoniza** mientras hace scroll.
El sitio se comporta como un **receptor**: se recorre, se sintoniza y se ajusta.

## El viaje, en cuatro actos

| Acto | Dónde ocurre | Qué se siente | Qué se cuenta ahí |
|---|---|---|---|
| **1 · Órbita** | Espacio, silencio, casi negro | Expectativa, precisión | La señal existe, viene de lejos y es estable |
| **2 · Azotea** | Techo de una casa de El Bagre, cielo turquesa | El clic, "llegó" | La parabólica recibe; nosotros instalamos y damos soporte |
| **3 · El barrio** | Calle, sombra, vecinos, sticker y valla | Cercanía, confianza | Organización **sin ánimo de lucro**, asociados, cobertura local |
| **4 · Sala** | Interior, TV encendida, celular con wifi | Recompensa | El plan: 50 Mbps de descarga + 90 canales SD/HD, $70.000/mes, 1 mes gratis |

El **descenso** es literal: los elementos de cada sección caen de la anterior (la onda del acto 1
es el borde del techo del acto 2, el cable del acto 2 se vuelve el tendido de fibra del acto 3,
la fibra entra a la sala en el acto 4). El scroll es una **bajada de señal**, no una lista de bloques.

### Versión corta (modo ligero)

Cuando la página entra en **modo ligero** (`[data-motion="lite"]`) o el equipo no puede con 3D, el
relato **no desaparece**: se cuenta igual, sin el aparato. Las mismas cuatro estaciones son
**secciones normales**, una debajo de otra, con el mismo texto y el mismo orden.

| Acto | Cómo se cuenta en modo ligero |
|---|---|
| **1 · Órbita** | Sección navy de cabecera: titular, subtítulo y el dato del plan. Sin parallax ni campo de estrellas |
| **2 · Azotea** | Sección crema con **una imagen fija** de la antena (ícono SVG ≤ 480 px, nunca agrandado) y los pasos de instalación |
| **3 · El barrio** | Sección con el bloque de "sin ánimo de lucro", cobertura y contacto. Sin valla animada |
| **4 · Sala** | Sección de plan y CTA: 50 Mbps de descarga + 90 canales SD/HD, $70.000/mes, 1 mes gratis |

Reglas de la versión corta: **una sección por acto, en orden**; sin scroll narrativo largo, sin
3D, sin estática de cambio de canal, sin la "línea de señal" persistente (queda como un borde
estático que separa secciones). Se conserva **todo** el contenido y **todos** los CTA: no hay nada
que solo exista en la versión con movimiento.

> **Nombre de la marca:** *Bajo Tigui*, sin diéresis ni tilde, en todos los documentos y pantallas.
> No se le asigna ningún significado. Si más adelante se confirma el origen del nombre, se ajusta el
> relato; mientras tanto el acto 3 se titula **"El barrio"** y es un título neutro.

## Cómo se ve (y cómo NO se ve)

**Sí:**
- Composición **editorial y asimétrica**: titulares gigantes que se salen de la retícula, texto en
  una columna estrecha contra un bloque de color grande, bloques que se desalinean a propósito.
- **Collage de valla y sticker**: píldoras con ícono, chapas, chispas de énfasis, trazos de pincel
  detrás de palabras clave, contorno negro grueso y **sombra sólida** desplazada (no difusa).
- **Papel**: fondo crema con textura sutil, como el flyer impreso pegado en la pared.
- **Ondas de señal** y **círculos concéntricos** como motivo estructural (separadores, fondos,
  indicadores), no como adorno suelto.
- El **dial de sintonía** y la **parrilla como zapping** como interacciones propias.

**No:**
- Hero centrado con degradado morado. ✗
- Rejillas de tarjetas idénticas. ✗
- Iconos genéricos repartidos por todas partes. ✗
- Degradados suaves de plantilla, glassmorphism por defecto, secciones simétricas aburridas. ✗
- Inter / Roboto / Arial. ✗

## El gesto que lo vuelve inconfundible

**La señal se dibuja.** Un trazo continuo (la "línea de señal") entrelaza toda la página: nace en
la órbita, baja por la azotea, cruza el barrio, atraviesa la puerta de la casa y termina en la
pantalla. Esa línea es **el hilo de scroll**: se ilumina a medida que se avanza y marca dónde
está el usuario en el viaje. Ningún template de IA tiene un hilo narrativo; tienen secciones.

En la azotea, la antena no es el logo agrandado: es una **parabólica 3D propia** que el usuario
orienta (detalle y topes en [`hero-3d.md`](./hero-3d.md)). En modo ligero, esa sección queda con
una imagen fija (§ Versión corta).

## Tono y voz

- **Español colombiano, cercano y comunitario.** "Asociado", no "usuario". Frases cortas.
- Honesto: se dice lo que se sabe y, cuando algo no está confirmado, **no se promete**
  (cobertura, instalación gratis, vigencia de la promo quedan marcados POR CONFIRMAR).
- El lema interno *"Recuerde señor asociado: que me es cumplido, me es pago"* se usa **con respeto**,
  como firma de compromiso en la página "Nosotros", no como slogan comercial.
- Se evita el lenguaje frío de corporación: nada de "soluciones integrales de conectividad".

## Qué debe lograr cada pantalla (resumen)

| Pantalla | Debe lograr |
|---|---|
| Inicio | Que en 5 segundos se entienda qué se vende, a qué precio y que es una organización local |
| Planes | Comparar y decidir; el dial de sintonía convierte la elección en un gesto |
| Cómo funciona | Que se vea sencillo: señal, fibra, instalación |
| Cobertura | Que la persona responda "¿llega a mi casa?" sin escribir |
| Canales | Demostrar volumen (90) con zapping real, sin prometer parrilla no confirmada |
| Nosotros | Explicar qué es ser sin ánimo de lucro y por qué el precio es justo |
| Atención | Resolver dudas ya: WhatsApp, horario real, correos por área |
| Buzón | Que la gente hable sin miedo, incluso en anónimo |
| Portal / Pagos | Que el asociado vea su estado y pague fácil (Nequi, PSE, etc.) |
| Admin | Trabajo, no adorno: cambiar precios, avisos y responder tickets rápido |
| 404 / Mantenimiento | Mantener el humor y el canal de contacto abierto (WhatsApp) |
