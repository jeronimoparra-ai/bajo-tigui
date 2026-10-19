#!/usr/bin/env bash
# =============================================================================
#  delegar-con-respaldo.sh — delega una tarea de diseño a un agente y, si ese
#  agente falla (cuota agotada, CLI que no está, modo incompatible…), prueba
#  el siguiente de la cadena sin intervention humana.
#
#  USO
#    tools/delegar-con-respaldo.sh <tarea> <archivo-brief> [cadena]
#
#  <cadena>   lista separada por comas:  <agente>[:<modelo>]
#             por defecto:  antigravity:gemini-3.8-flash-high,opencode2:,codex:
#
#  CÓMO SE DETECTA QUE UN AGENTE TERMINÓ
#    1) si el agente tiene el hook de Orca, llega un mensaje worker_done;
#    2) si no lo tiene (opencode2, y probablemente cursor/copilot/codex), se
#       detecta el centinela ORCA-DONE:<tarea> en la transcripción del terminal.
#    Por eso el runner AÑADE al final del brief la instrucción de escribir ese
#    centinela: es lo que permite trabajar con agentes sin hook.
#
#  VARIABLES DE ENTORNO
#    CADENA_AGENTES          cadena alternativa
#    RAMA_BASE               rama base del worktree (por defecto: fase-1b-antigravity)
#    FE_DELEGATE_TIMEOUT_MS  espera total por agente (por defecto 1800000)
#    SONDA_MS                ventana de espera del primer sondeo (por defecto 240000)
#    LOGDIR                  dónde dejar los logs (por defecto /tmp/bajo-tegui-delegaciones)
#
#  SALIDA
#    0 = algún agente terminó el trabajo    1 = ninguno pudo
#
#  NUNCA borra ni commitea: solo lanza workers en worktrees desechables.
# =============================================================================
set -uo pipefail

RAIZ="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
TAREA="${1:?uso: delegar-con-respaldo.sh <tarea> <archivo-brief> [cadena]}"
BRIEF="${2:?falta el archivo con el brief}"
[ -f "$BRIEF" ] || { echo "ERROR: no existe el brief: $BRIEF" >&2; exit 2; }

CADENA="${3:-${CADENA_AGENTES:-antigravity:gemini-3.8-flash-high,opencode2:,codex:}}"
BASE="${RAMA_BASE:-fase-1b-antigravity}"
TIMEOUT_MS="${FE_DELEGATE_TIMEOUT_MS:-1800000}"
SONDA_MS="${SONDA_MS:-240000}"
LOGDIR="${LOGDIR:-/tmp/bajo-tegui-delegaciones}"
ORCA="${ORCA_CLI:-orca-ide}"
FE="${FE_DELEGATE:-$(command -v fe-delegate || echo "$HOME/.local/bin/fe-delegate")}"
SENTINELA_FILE="/tmp/orca-done-$TAREA"

mkdir -p "$LOGDIR"
mkdir -p "$LOGDIR/estado"
RESUMEN="$LOGDIR/$TAREA-resumen.txt"
: > "$RESUMEN"

# --- cortacircuitos ------------------------------------------------------------
# Si un agente murió por CUOTA, no se reintenta en cada tarea: se salta durante
# SKIP_MINUTOS. Con FORZAR_AGENTE=1 se ignora el cortacircuitos.
SKIP_MINUTOS="${SKIP_MINUTOS:-360}"
QUEDA_VIVO() {  # $1 = agente
  local f="$LOGDIR/estado/$1.cuota" ahora ts
  [ -f "$f" ] || return 1
  ahora=$(date +%s); ts=$(stat -c %Y "$f")
  [ $(( (ahora - ts) / 60 )) -lt "$SKIP_MINUTOS" ]
}

# --- CLI que cada agente necesita en el sistema -------------------------------
declare -A CLI_QUE=(
  [antigravity]=agy          [opencode]=opencode   [opencode2]=opencode
  [codex]=codex              [cursor]=cursor-agent  [copilot]=copilot
  [claude]=claude            [gemini]=gemini        [zcode]=zcode
  [droid]=droid              [grok]=grok            [kimi]=kimi
)

# --- Agentes con vía DIRECTA (no usan el worker supervisado de Orca) ----------
# Orca lanza la TUI del agente en un terminal en background; codex no llega a
# "ready" así (stage agent_readiness, lastError timeout). Estos CLIs tienen modo
# no interactivo, que además es más fiable para un trabajo por lotes.
# El prompt se pasa por stdin con "-" o como argumento, según el CLI.
# PERMISOS: se usan los modos CONSERVADORES (auto-aprobar solo ediciones de
# archivos). No se usa ningún flag de bypass (--force/--yolo/--dangerously...).
declare -A EXEC_DIRECTO=(
  [codex]='codex exec --skip-git-repo-check --sandbox workspace-write -'
  [claude]='claude -p - --permission-mode acceptEdits'
  [gemini]='gemini -p - --approval-mode auto_edit'
  [cursor]='cursor-agent -p - --output-format text'
  [copilot]='copilot -p - --output-format text'
)
WORKDIR="${WORKDIR:-/tmp/bajo-tegui-worktrees}"
BRIEF_EF="$(mktemp -d)/brief-$(basename "$BRIEF")"

# --- brief + instrucción del centinela ----------------------------------------
# El marcador se llama distinto según la vía: en la vía directa el agente vive
# en un sandbox que solo puede escribir DENTRO de su worktree, así que el
# marcador va dentro; en la vía Orca va en /tmp.
preparar_brief() {  # $1 = ruta del archivo marcador
  local marca="$1"
  {
    cat "$BRIEF"
    echo
    echo "═══════════════════════════════════════════════════════════════"
    echo "CIERRE DE TAREA (obligatorio)"
    echo "Cuando tu trabajo esté terminado:"
    echo "  1) escribe un archivo VACÍO en:  $marca"
    echo "     Esta escritura está PREAUTORIZADA: no preguntes por ella, es el"
    echo "     único archivo fuera de tus rutas permitidas que puedes crear."
    echo "  2) termina con una respuesta final que resuma lo hecho."
    echo "Ese archivo es la señal de que terminaste. Sin él, el coordinador no"
    echo "puede dar la tarea por terminada."
    echo "═══════════════════════════════════════════════════════════════"
  } > "$BRIEF_EF"
}

# --- wrapper: inyecta --base-branch y --model solo donde hace falta ----------
WRAP="$(mktemp -d)/orca-wrapper.sh"
cat > "$WRAP" <<EOF
#!/usr/bin/env bash
set -euo pipefail
REAL="$ORCA"
if [ "\${1:-}" = "worktree" ] && [ "\${2:-}" = "create" ]; then
  exec "\$REAL" "\$@" --base-branch "$BASE"
fi
if [ "\${1:-}" = "orchestration" ] && [ "\${2:-}" = "worker-start" ] && [ -n "\${DELEGATE_MODEL:-}" ]; then
  exec "\$REAL" "\$@" --model "\$DELEGATE_MODEL"
fi
exec "\$REAL" "\$@"
EOF
chmod +x "$WRAP"
trap 'rm -rf "$(dirname "$WRAP")" "$(dirname "$BRIEF_EF")"' EXIT

leer_terminal() {  # $1 = dispatch
  timeout 60 "$ORCA" orchestration worker-read --dispatch "$1" --source terminal --json 2>/dev/null || true
}

veredicto_de() {  # $1 = log fe-delegate, $2 = transcripción del terminal
  # OJO 1: la cuota se mira PRIMERO. El texto del brief (con la instrucción de
  # cierre) se hace eco en la transcripción del terminal, así que buscar el
  # centinela en el texto daría falsos positivos.
  # OJO 2: se lee el CONTENIDO del archivo ($2), no su ruta.
  # OJO 3: se usa <<< y no "$texto" como argumento de grep: un texto de varias
  # líneas pasado como argumento hace que grep trate cada línea como un
  # archivo y falle en silencio.
  local texto="$1"
  [ -f "$2" ] && texto="$texto
$(cat "$2")"
  if grep -qiE 'quota reached|Resets in [0-9]+h|insufficient_quota' <<< "$texto"; then echo "CUOTA"; return; fi
  if grep -qiE 'agent_not_in_foreground' <<< "$texto"; then echo "MODO_INCOMPATIBLE"; return; fi
  if grep -qiE 'agent_not_found|cli_not_found|ENOENT|command not found' <<< "$texto"; then echo "NO_DISPONIBLE"; return; fi
  if grep -qiE '"type": *"worker_done"' <<< "$texto"; then echo "OK"; return; fi
  if [ -f "$SENTINELA_FILE" ]; then echo "OK"; return; fi
  local err; err="$(grep -oE '"lastError": *"[^"]+"' <<< "$texto" | head -1 || true)"
  [ -n "$err" ] && { echo "ERROR$err"; return; }
  echo "SIN_VEREDICTO"
}

intentar_directo() {  # $1 = agente
  local agente="$1"
  local wt="$WORKDIR/$TAREA-$agente"
  local log="$LOGDIR/$TAREA-$agente.log"
  local cmd="${EXEC_DIRECTO[$agente]}"

  echo "" | tee -a "$RESUMEN"
  echo "─── $agente (vía directa, no interactiva) ───" | tee -a "$RESUMEN"

  local marca="$wt/.orca-done-$TAREA"
  rm -f "$marca" "$SENTINELA_FILE"
  mkdir -p "$WORKDIR"
  if [ ! -d "$wt" ]; then
    git -C "$RAIZ" worktree add --detach "$wt" "$BASE" >/dev/null 2>&1 \
      || { echo "   ERROR: no pude crear el worktree $wt" | tee -a "$RESUMEN"; return 4; }
  fi
  preparar_brief "$marca"

  ( cd "$wt" && timeout "$(( TIMEOUT_MS / 1000 ))" bash -lc "$cmd" < "$BRIEF_EF" ) > "$log" 2>&1
  local rc=$?

  local v
  if [ -f "$marca" ]; then v="OK"; rm -f "$marca"
  elif grep -qiE 'quota reached|insufficient_quota|rate limit' "$log"; then v="CUOTA"
  elif grep -qiE 'not logged in|login required|unauthorized|401' "$log"; then v="SIN_LOGIN"
  elif [ $rc -ne 0 ]; then v="ERROR rc=$rc"
  else v="SIN_VEREDICTO"; fi

  echo "   veredicto: $v" | tee -a "$RESUMEN"
  echo "$v" > "$LOGDIR/$TAREA-$agente.estado"
  [ "$v" = "CUOTA" ] && date +%s > "$LOGDIR/estado/$agente.cuota"

  if [ "$v" = "OK" ]; then
    echo "   diff del worktree:" | tee -a "$RESUMEN"
    git -C "$wt" diff --stat 2>/dev/null | tee -a "$RESUMEN"
    git -C "$wt" status --short 2>/dev/null | head -20 | tee -a "$RESUMEN"
    return 0
  fi
  tail -25 "$log" | sed 's/^/   | /' | tee -a "$RESUMEN"
  return 3
}

intentar() {  # $1 = agente, $2 = modelo
  local agente="$1" modelo="$2"
  local log="$LOGDIR/$TAREA-$agente.log"
  local term="$LOGDIR/$TAREA-$agente-terminal.json"
  local cli="${CLI_QUE[$agente]:-}"

  echo "" | tee -a "$RESUMEN"
  echo "─── $agente ${modelo:+(modelo: $modelo)} ───" | tee -a "$RESUMEN"

  if [ -n "$cli" ] && ! command -v "$cli" >/dev/null 2>&1; then
    echo "   NO_DISPONIBLE: falta el CLI '$cli' en el sistema" | tee -a "$RESUMEN"
    echo "NO_DISPONIBLE" > "$LOGDIR/$TAREA-$agente.estado"; return 3
  fi

  if [ "${FORZAR_AGENTE:-0}" != "1" ] && QUEDA_VIVO "$agente"; then
    echo "   SALTADO: '$agente' murió por cuota hace poco (se reintenta en $SKIP_MINUTOS min)" | tee -a "$RESUMEN"
    echo "SALTADO_POR_CUOTA" > "$LOGDIR/$TAREA-$agente.estado"; return 3
  fi

  # Agentes con vía directa (no pasan por el worker de Orca)
  if [ -n "${EXEC_DIRECTO[$agente]:-}" ] && [ "${MODO_DIRECTO:-1}" = "1" ]; then
    intentar_directo "$agente"
    return $?
  fi

  rm -f "$SENTINELA_FILE"
  preparar_brief "$SENTINELA_FILE"
  DELEGATE_MODEL="$modelo" ORCA_CLI="$WRAP" FE_DELEGATE_AGENT="$agente" \
  FE_DELEGATE_TIMEOUT_MS="$SONDA_MS" \
    "$FE" "$RAIZ" "$TAREA" "$(cat "$BRIEF_EF")" > "$log" 2>&1 &
  local fe_pid=$!
  # Si el agente escribe el marcador de cierre, no hace falta esperar a que
  # fe-delegate agote la sonda: se corta la espera y se sigue.
  while kill -0 "$fe_pid" 2>/dev/null; do
    [ -f "$SENTINELA_FILE" ] && { kill "$fe_pid" 2>/dev/null; break; }
    sleep 10
  done
  wait "$fe_pid" 2>/dev/null

  local disp; disp="$(grep -oE 'dispatch=ctx_[a-z0-9]+' "$log" | head -1 | cut -d= -f2 || true)"
  [ -n "$disp" ] && leer_terminal "$disp" > "$term"

  # Si el agente no tiene hook, su fin no produce worker_done: se sondea la
  # transcripción del terminal hasta que aparezca el centinela.
  local restante=$(( TIMEOUT_MS / 1000 )) espera=0 v=""
  while :; do
    v="$(veredicto_de "$log" "$term")"
    [ "$v" = "SIN_VEREDICTO" ] || break
    [ "$espera" -ge "$restante" ] && break
    sleep 30; espera=$(( espera + 30 ))
    [ -n "$disp" ] && leer_terminal "$disp" > "$term"
  done

  echo "   veredicto: $v" | tee -a "$RESUMEN"
  echo "$v" > "$LOGDIR/$TAREA-$agente.estado"
  [ "$v" = "CUOTA" ] && date +%s > "$LOGDIR/estado/$agente.cuota"

  if [ "$v" = "OK" ]; then
    [ -n "$disp" ] && timeout 60 "$ORCA" orchestration worker-stop --dispatch "$disp" --json >/dev/null 2>&1 || true
    echo "   diff del worktree:" | tee -a "$RESUMEN"
    local wt; wt="$(grep -oE 'worktree: .*' "$log" | head -1 | cut -d' ' -f2 || true)"
    [ -n "$wt" ] && git -C "$wt" diff --stat 2>/dev/null | tee -a "$RESUMEN"
    return 0
  fi

  [ -n "$disp" ] && timeout 60 "$ORCA" orchestration worker-stop --dispatch "$disp" --json >/dev/null 2>&1 || true
  return 3
}

echo "Tarea:    $TAREA"
echo "Repo:     $RAIZ"
echo "Rama:     $BASE"
echo "Cadena:   $CADENA"
echo "Logs:     $LOGDIR"
echo "Brief:    $BRIEF  (+ marcador de cierre: $SENTINELA_FILE)"

GANADOR=""
for item in ${CADENA//,/ }; do
  [ -z "$item" ] && continue
  agente="${item%%:*}"; modelo=""
  case "$item" in *:*) modelo="${item#*:}";; esac
  if intentar "$agente" "$modelo"; then GANADOR="$agente"; break; fi
done

echo "" | tee -a "$RESUMEN"
if [ -n "$GANADOR" ]; then
  echo "RESULTADO: completado por '$GANADOR' — revisa el diff antes de integrar" | tee -a "$RESUMEN"
  exit 0
fi
echo "RESULTADO: ningún agente de la cadena pudo terminar la tarea" | tee -a "$RESUMEN"
exit 1
