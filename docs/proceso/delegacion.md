# Proceso de delegación con cadena de respaldo

Fase 1B · 2026-10-19 · «Antena Parabólica Bajo Tigui»

Motivo: **Antigravity agotó su cuota** (7 días) a mitad de la primera tarea. El diseño no puede
depender de una sola herramienta, así que la delegación se hace con **cadena de respaldo**: si un
agente falla por cuota, por falta de CLI o por modo incompatible, pasa al siguiente sin que nadie
tenga que intervenir.

## 1. La herramienta

```bash
tools/delegar-con-respaldo.sh <tarea> <archivo-brief> [<cadena>]
```

- `<cadena>` = lista separada por comas: `<agente>[:<modelo>]`.
  Por defecto: `antigravity:gemini-3.8-flash-high,opencode2:,codex:`
- Variables: `CADENA_AGENTES`, `RAMA_BASE`, `FE_DELEGATE_TIMEOUT_MS`, `SONDA_MS`, `LOGDIR`.
- Logs y transcripciones en `/tmp/bajo-tegui-delegaciones/` (fuera del repo).
- **No commitea, no borra y no mergea**: solo lanza workers en worktrees desechables.
  La revisión del diff la hago yo antes de integrar nada.

### Cómo sabe que un agente terminó

1. Los agentes **con hook de Orca** (Antigravity) envían un mensaje `worker_done`.
2. Los agentes **sin hook** (opencode2 y, previsiblemente, cursor/copilot/codex) no envían nada.
   Por eso el runner **añade al brief** la instrucción de terminar con el centinela
   `ORCA-DONE:<tarea>`, y lo busca en la transcripción del terminal del worker.

### Modos de fallo que detecta y cómo reacciona

| Veredicto | Causa | Reacción |
|---|---|---|
| `OK` | `worker_done` o marcador de cierre | cierra el worker, imprime el `git diff --stat` y sale |
| `CUOTA` | `quota reached` / `Resets in Nh` | cierra el worker, anota el cortacircuitos y pasa al siguiente |
| `MODO_INCOMPATIBLE` | `agent_not_in_foreground` | cierra el worker y pasa al siguiente |
| `NO_DISPONIBLE` | falta el CLI del agente en el sistema | no wastea una delegación; pasa al siguiente |
| `SIN_LOGIN` | el CLI responde «not logged in» | pasa al siguiente (tú lo arreglas con el login) |
| `SIN_VEREDICTO` | el worker sigue vivo sin cerrar | sigue sondeando hasta agotar el tiempo |

## 1.1 Las dos vías de ejecución

**Vía Orca** (preferida): el agente corre como *worker supervisado* de Orca, con terminal propia,
worktree de Orca y mensajería. Es la que usa `antigravity` y `opencode2`. Orca gestiona el
worktree, el arranque y el `worker_done`.

**Vía directa** (`EXEC_DIRECTO`): el CLI se lanza en modo **no interactivo** dentro de un
worktree git propio. La usa `codex`, `claude`, `gemini`, `cursor` y `copilot`, porque su TUI no
llega a estado *ready* cuando Orca la lanza en background (`stage: agent_readiness`,
`lastError: timeout`).

Motivos técnicos de la vía directa:
- El marcador de cierre va **dentro** del worktree, porque el sandbox del agente solo escribe ahí.
- `codex` corre con `--sandbox workspace-write`: puede editar su worktree, no el sistema.
- Modos de permiso **conservadores**: `claude --permission-mode acceptEdits`,
  `gemini --approval-mode auto_edit`. **No** se usa ningún flag de bypass
  (`--force`, `--yolo`, `--dangerously-skip-permissions`).
- Si el login falta, el CLI responde rápido y el runner pasa al siguiente agente.


## 2. Mapa de agentes (verificado en esta máquina, 2026-10-19)

| Agente | CLI | Estado real | Para habilitarlo |
|---|---|---|---|
| **antigravity** | `agy` 1.4.2 | ✅ funciona · **cuota agotada ~167 h** | esperar la cuota. Modelos: `agy models` |
| **opencode2** | `opencode` v2.0.32 | ✅ **arranca y responde** · no emite `worker_done` → se usa el centinela | nada |
| **codex** | `codex` 0.163.0 | ✅ **instalado y autenticado** (ChatGPT) · la TUI no llega a *ready* bajo Orca, pero `codex exec` funciona | nada |
| **cursor** | `cursor-agent` 2026.10.16 | ⚠️ instalado, **sin login** | `agent login` |
| **copilot** | `copilot` 1.0.98 | ⚠️ instalado, **sin login** | `copilot` → `/login` (o `gh auth login`) |
| **claude** | `claude` 2.1.197 | ⚠️ instalado, **sin login** | `claude` → `/login` |
| **gemini** | `gemini` 0.64.0 | ⚠️ instalado, **sin auth y carpeta no confiable** | método de auth en `~/.gemini/settings.json` (intocable: lo haces tú) y confiar la carpeta |
| **zcode / droid / grok / kimi** | sus CLIs | ❌ sin CLI | instalar |

Orca trae *hooks* para ~25 agentes (`amp, antigravity, claude, codex, copilot, cursor, devin,
droid, gemini, grok, hermes, jcode, kimi, kiro, mimo, muse, omp, opencode, pi, prime, qoder,
qwen, zcode`): si instalas el CLI y haces login, el resto de la lista se activa sola.

> En VS Code tienes además la extensión **Kilo Code** (`kilocode.kilo-code`), que no usa Orca
> pero sirve para trabajar a mano en paralelo.

### 2.1 Instaladores (verificados contra el registro npm y la doc oficial, 2026-10-19)

**Ya instalados en esta máquina** (npm global bajo nvm + enlaces en `~/.local/bin`, que es lo
único que ven los agentes de Orca; `node` también enlazado ahí porque los CLIs de npm son
scripts con `#!/usr/bin/env node`):

| CLI | Origen | Versión |
|---|---|---|
| `cursor-agent` / `agent` | instalador oficial `cursor.com/install` (sin sudo, a `~/.local/share/cursor-agent`) | 2026.10.16-e3cb207 |
| `codex` | `npm i -g @openai/codex` | 0.163.0 |
| `copilot` | `npm i -g @github/copilot` | 1.0.98 |
| `claude` | `npm i -g @anthropic-ai/claude-code` | 2.1.197 |
| `gemini` | `npm i -g @google/gemini-cli` | 0.64.0 |

**Los logins son tuyos** (son credenciales; no las toco):

```bash
agent login          # cursor
copilot              # luego /login   (o: gh auth login)
claude               # luego /login
# gemini: método de auth en ~/.gemini/settings.json (intocable para mí)
```

### 2.2 Si instalas Cursor o Copilot

Cursor y Copilot exigen **foreground**: si Orca los lanza en background fallan con
`agent_not_in_foreground`. Es el ajuste «cómo corren las pestañas nuevas de agente» de la UI de
Orca (§ 3). Sin ese ajuste, los dos quedan inutilizables desde la vía de Orca; la **vía directa**
(§ 1) sí les sirve, porque no usa el worker supervisado.



## 3. Los dos ajustes de Orca que NO tienen flag

El CLI lo dice explícitamente: *"How the worker runs follows the user's own setting for new agent
tabs; there is no flag for it"*. Son **ajustes de la UI de Orca** y afectan a todos los agentes:

1. **Foreground vs background** → `codex` exige foreground y falla con `agent_not_in_foreground`.
   Antigravity y opencode2 funcionan en background.
2. **Auto-aprobar comandos** → Orca lanzó a Antigravity con `--dangerously-skip-permissions`
   (dos veces). El worker respetó «pregunta antes de ejecutar» porque se lo exigí en el brief, pero
   **el permiso real estaba saltado**. Para que la garantía sea real hay que cambiar ese ajuste.

## 4. Flujo de una delegación

1. Escribo el **brief** (objetivo visual, rutas permitidas y prohibidas, stack, reglas de datos,
   criterio de terminado, instrucción de preguntar antes de cualquier comando).
2. Lo lanzo: `tools/delegar-con-respaldo.sh <tarea> <brief> "<cadena>"`.
3. Si un agente cae por cuota, el runner pasa al siguiente y deja registro en
   `/tmp/bajo-tegui-delegaciones/<tarea>-resumen.txt`.
4. **Reviso el diff yo**: que solo toque las rutas permitidas, que no haya CDN, y **mido en
   navegador** (contrastes, desbordes, movimiento reducido). El worker declara el arreglo antes de
   medirlo: ya ha pasado tres veces, así que su reporte no es evidencia.
5. Verifico, corrijo lo que falte, y solo entonces integro en la rama.

## 5. Reglas que no se relajan en ninguna delegación

- El agente **solo** escribe en las rutas que el brief le permite.
- **Cero CDN y cero fuentes remotas**; las fuentes van en `.woff2` locales con `@font-face`.
- Tokens de `docs/diseno/tokens.css`: no se duplican ni se editan.
- Datos no confirmados → `POR CONFIRMAR`. No se inventan canales, correos ni cobertura.
- El nombre es **«Bajo Tigui»**, sin tilde ni diéresis, y no se le asigna ningún significado.
- El agente **pregunta** antes de ejecutar un comando fuera de lo previsto.
