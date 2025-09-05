alias killmongo='sudo kill -9 $(sudo lsof -ti:27017)'

alias obsidian='~/Applications/Obsidian/Obsidian-1.8.10.AppImage --no-sandbox'

docker() {
    if [[ "$1" == "ps" && "$2" == "names" ]]; then
        command docker ps --format "{{.Names}}"
    else
        command docker "$@"
    fi
}

_nnn_insert_anywhere() {
  local tmp sel
  tmp="$(mktemp)"                  # archivo temporal para la ruta
  nnn -p "$tmp"                   # abre nnn en modo picker
  [[ -s "$tmp" ]] || { rm -f "$tmp"; return; }
  sel="$(cat "$tmp")"
  rm -f "$tmp"

  # Inserta entre comillas en la posición del cursor
  READLINE_LINE="${READLINE_LINE:0:$READLINE_POINT}\"$sel\"${READLINE_LINE:$READLINE_POINT}"
  READLINE_POINT=$((READLINE_POINT + ${#sel} + 2))
}

# Bind para que Ctrl+N siempre llame a nnn
bind -x '"\C-n":_nnn_insert_anywhere'
