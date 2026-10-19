# Bajo Tigui — Kit de prompts para opencode

## Cómo usarlo
1. Copia `AGENTS.md` a la raíz del proyecto (junto a la carpeta `identidad-visual/`) y verifica la ruta de la sección 2.
2. La carpeta `fases/` ya está en la raíz del proyecto.
3. En opencode, trabaja UNA fase a la vez con este mensaje:
   > Lee AGENTS.md y fases/fase-N-....md y ejecuta solo esa fase. Al terminar, detente y resume.
4. Revisa, pide ajustes y recién entonces pasa a la siguiente fase.

## Orden
1. `fases/fase-1-diseno.md` — dirección de arte, logo SVG, sistema de diseño, maquetas
2. `fases/fase-2-datos.md` — modelo de datos y SQL
3. `fases/fase-3-frontend.md` — sitio completo con 3D y animaciones
4. `fases/fase-4-backend.md` — auth, panel admin, WhatsApp, correos, pagos
5. `fases/fase-5-chatbot-buzon.md` — chatbot IA y buzón
6. `fases/fase-6-calidad-despliegue.md` — pruebas, accesibilidad, rendimiento, despliegue

## Antes de empezar (trámites que tardan)
- Verificar negocio y número en Meta (WhatsApp Cloud API).
- Cuenta de Wompi (y/o ePayco): piden documentos legales de la organización.
- Definir correos oficiales y confirmar los datos "POR CONFIRMAR" de AGENTS.md.
