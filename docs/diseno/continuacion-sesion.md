# Sesión — Tema "Señal de TV" + cambio de acento (Fase 1B)

## Proyecto
Antena Parabólica Bajo Tigui — `docs/diseno/maquetas/`

## Estado actual (tema oscuro "señal de TV")
| Lote | Commit | Pantallas |
|---|---|---|
| Porte base | `0f45876` | `tokens.css` + `_base.css` (sección 15bis) + `inicio.html` |
| Lote 1 | `0667eff` | `planes`, `nosotros`, `como-funciona` |
| Lote 2 | `1ae3630` | `canales`, `cobertura`, `contacto` |
| Lote 3 | `35bebc4` | `404`, `mantenimiento`, `buzon`, `componentes` |
| Acento | `ac502b0` | Verde agua `#A1D9D4` en todo el sitio (claro + oscuro) |

- Las 11 pantallas verificadas **sin fallos** a 320/360/390/768/1024/1440.
- Fallo que costó: en `contacto.html` el que fallaba era `.at-buzon__tel` (no `.at-form-mock__tag`). Usaba `--bt-brand`, que en noche ya es celeste claro; se quitó el override.
- Cambio de acento: el amarillo `#FFD806` (del flyer, no está en el logo) se sustituyó por verde agua `#A1D9D4` (color del logo). Mapeo: `--bt-yellow-400/500` → `--bt-aqua-500`; `--bt-yellow-200` → `--bt-aqua-200` (nuevo, `#E9F7F5`); hex `#FFD806/#FFC800/#FFD211/#FEDC01` → `#A1D9D4`; `#FEF3B0/#FFF3B8` → `#E9F7F5`; `rgb(255 216 6 / x)` → `rgb(161 217 212 / x)`; `--bt-glow-yellow` → `--bt-glow-aqua`. Nuevo token `--bt-accent-readable` (navy en claro, aqua en oscuro) para texto que era amarillo. Los primitivos `--bt-yellow-*` se conservan como referencia de paleta, pero ya no se usan. El anillo de foco claro se mantiene en naranja (no era amarillo).

## Herramientas cableadas
- **MCP**: `filesystem` ✓, `playwright` ✓ (Chromium 1248), `context7` (en `opencode.json` del proyecto), `rea` (deshabilitado).
- La config global tenía `type: "stdio"` y `env`; V2 exige `"local"` y `"environment"`. Corregido (backup `opencode.jsonc.bak.pre-mcpfix-*`).
- **Orca**: repo registrado, base ref `fase-1b-antigravity`. Agentes reconocidos: `antigravity` (sin cuota: *Individual quota reached, reset en ~85 h*), `codex` (auth), `cursor`, `claude`, `gemini`, `omp`, `grok`, `codebuddy`.
- El agente Antigravity se quedó sin cuota; el cambio de acento se ejecutó con **Codex vía Orca** (worktree `fe-acento-verde-agua`). `git diff --check` pasó y la búsqueda estática no encontró amarillo. Verificador sin fallos en las 11 pantallas.
- `opencode.json` del proyecto: MCP scoped al repo. La sesión debe estar en la carpeta del repo para cargarla (la sesión en `/home/andresdev` usa la config global).

## Verificación
`node tools/verificar-maqueta.mjs <archivo> 320 360 390 768 1024 1440`

## Referencias clave
- Spike desechable: `docs/diseno/maquetas/inicio-signal-spike.html`, `_spike-signal.css`
- Backups pre-porte: `/tmp/opencode/_base.css.bak-portado`, `/tmp/opencode/tokens.css.bak-portado`
- Rama git: `fase-1b-antigravity`
- Regla AGENTS.md: no tocar `identidad-visual/marca/` (solo lectura), no publicar referencias prohibidas, datos POR CONFIRMAR con ese rótulo.
