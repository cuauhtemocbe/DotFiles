# Terminal IDE Setup — Ubuntu 24.04

Stack para desarrollo Python usando la terminal como IDE.

## Layout

```
┌──────────┬──────────────────────┐
│ neo-tree │     código .py       │
│  (nvim)  │      (nvim)          │
├──────────┴──────────────────────┤
│            claude               │
└─────────────────────────────────┘
```

## Flujo de trabajo diario

```bash
ide                  # abre el layout completo en el directorio actual
ide ~/mi-proyecto    # abre en un proyecto específico
```

## Script `~/.local/bin/ide`

```bash
#!/bin/bash
DIR="${1:-$(pwd)}"
cd "$DIR"
exec zellij --layout ide
```

- Acepta un directorio como argumento opcional; si se omite usa el directorio actual.
- Hace `cd` al directorio antes de lanzar Zellij, así nvim y claude arrancan desde ahí.
- `exec` reemplaza el proceso del shell con Zellij (sin shell padre colgado).
- `--layout ide` le dice a Zellij que cargue `~/.config/zellij/layouts/ide.kdl`.

## Layout de Zellij — `~/.config/zellij/layouts/ide.kdl`

```kdl
layout {
    pane split_direction="horizontal" {
        pane size="60%" command="nvim" {
            args "."
        }
        pane size="40%" command="claude"
    }
}
```

| Campo | Valor | Efecto |
|---|---|---|
| `split_direction="horizontal"` | horizontal | Los paneles se dividen lado a lado (izquierda / derecha) |
| `pane size="60%"` | 60 % del ancho | Panel izquierdo — lanza `nvim .` (árbol + editor) |
| `pane size="40%"` | 40 % del ancho | Panel derecho — lanza `claude` |
| `args "."` | directorio actual | nvim abre el directorio actual (activa neo-tree) |

El layout arranca exactamente dos paneles; no hay barra de tabs ni paneles ocultos.

## Stack instalado

| Herramienta | Versión | Rol |
|-------------|---------|-----|
| Neovim | 0.12.2 | Editor principal (`~/.local/bin/nvim`) |
| LazyVim | latest | Configuración de Neovim con plugins |
| Zellij | 0.44.1 | Multiplexor de terminal (layouts) |
| fzf | 0.44 | Búsqueda fuzzy |
| ripgrep | 14.1 | Búsqueda de código |
| lazygit | 0.61 | Git con TUI visual |
| ruff | 0.15 | Linter + formatter Python |
| pyright | 1.1.409 | LSP / type checking Python |
| debugpy | latest | Debugger Python |
| FiraCode Nerd Font | latest | Fuente con íconos |

## Rutas importantes

```
~/.config/nvim/                         # configuración de Neovim/LazyVim
~/.config/nvim/lua/config/lazy.lua      # imports de extras (lang.python aquí)
~/.config/nvim/lua/plugins/python.lua   # config Python (LSP, ruff)
~/.config/nvim/lua/plugins/extras.lua   # lazygit plugin
~/.config/zellij/layouts/ide.kdl        # layout del IDE
~/.local/bin/ide                        # script de arranque
~/.local/bin/                           # nvim, lazygit, ruff, debugpy, zellij
~/.npm-global/bin/                      # pyright
~/.local/share/fonts/FiraCode/          # FiraCode Nerd Font
```

## Temas / Colores

Paleta personalizada **kuautli** aplicada en toda la stack:

| Color | Hex | Rol |
|---|---|---|
| Pink | `#FC618D` | keywords, control flow, operadores |
| Teal | `#1AC5B0` | funciones, nombres de clase |
| Blue | `#58B0E3` | tipos, `class`/`def`, identifiers |
| Yellow | `#F7DB6A` | parámetros, atributos |
| Light Blue | `#7AD3F8` | member access |
| Gray | `#8D8C8C` | comentarios (italic) |
| White | `#E0E0E0` | strings, foreground |
| Bg | `#1C1C2A` | fondo principal |

| Componente | Config |
|---|---|
| GNOME Terminal | Perfil "Kuautli" (predeterminado) — fondo `#1C1C2A`, texto `#E0E0E0` |
| Zellij | `theme "kanagawa"` en `~/.config/zellij/config.kdl` (colores actualizados) |
| Neovim | colorscheme `kuautli` — `~/.config/nvim/colors/kuautli.lua` |

## Zellij — config minimalista activa

```
pane_frames false       # sin bordes entre paneles
show_startup_tips false # sin tips al arrancar
show_release_notes false
mouse_hover_effects false
```

## Zellij — atajos

| Atajo | Acción |
|-------|--------|
| `Ctrl+p` + flechas | Navegar entre paneles |
| `Ctrl+p f` | Pantalla completa (toggle) |
| `Ctrl+p d` | Cerrar panel |
| `Ctrl+o d` | Detach (sesión queda viva) |
| Mouse | Navegar y hacer click directamente |

## Neovim — atajos esenciales

### Modos
| Tecla | Acción |
|-------|--------|
| `i` | Entrar a modo insertar (escribir) |
| `Esc` | Volver a modo normal |

### Archivos
| Atajo | Acción |
|-------|--------|
| `Space+e` | Árbol de archivos (toggle) |
| `Space+ff` | Buscar archivo |
| `Space+/` | Buscar texto en el proyecto |
| `:w` | Guardar |
| `:wq` | Guardar y salir |
| `:bd` | Cerrar archivo (sin salir de nvim) |
| `:q!` | Salir sin guardar |

### Git
| Atajo | Acción |
|-------|--------|
| `Space+gg` | Abrir lazygit |
| `lg` | lazygit desde terminal |

### Python / LSP
| Atajo | Acción |
|-------|--------|
| `gd` | Ir a definición |
| `K` | Documentación del símbolo |
| `Space+ca` | Code actions (fix imports, etc.) |
| `]d` / `[d` | Siguiente / anterior error |

## PATH en .bashrc

```bash
export PATH="$HOME/.local/bin:$HOME/.npm-global/bin:$PATH"
alias lg='lazygit'
alias vim='nvim'
alias vi='nvim'
alias ide='~/.local/bin/ide'
```

## Reinstalar desde cero

```bash
# Paquetes del sistema
sudo apt install -y tmux fzf ripgrep nodejs npm curl git unzip pipx

# Neovim latest (0.12+)
curl -Lo /tmp/nvim.tar.gz https://github.com/neovim/neovim/releases/latest/download/nvim-linux-x86_64.tar.gz
tar -xzf /tmp/nvim.tar.gz -C /tmp && cp -r /tmp/nvim-linux-x86_64/* ~/.local/

# Zellij
curl -L https://github.com/zellij-org/zellij/releases/latest/download/zellij-x86_64-unknown-linux-musl.tar.gz | tar -xz -C ~/.local/bin

# lazygit
LAZYGIT_VERSION=$(curl -s "https://api.github.com/repos/jesseduffield/lazygit/releases/latest" | grep '"tag_name"' | sed 's/.*"v\([^"]*\)".*/\1/')
curl -Lo /tmp/lazygit.tar.gz "https://github.com/jesseduffield/lazygit/releases/latest/download/lazygit_${LAZYGIT_VERSION}_Linux_x86_64.tar.gz"
tar -xzf /tmp/lazygit.tar.gz -C ~/.local/bin lazygit

# Python tools
pipx install ruff debugpy
npm config set prefix '~/.npm-global' && npm install -g pyright

# LazyVim
git clone https://github.com/LazyVim/starter ~/.config/nvim && rm -rf ~/.config/nvim/.git

# Layout de Zellij
mkdir -p ~/.config/zellij/layouts
# Copiar ide.kdl a ~/.config/zellij/layouts/

# FiraCode Nerd Font
mkdir -p ~/.local/share/fonts
curl -Lo /tmp/FiraCode.zip "https://github.com/ryanoasis/nerd-fonts/releases/latest/download/FiraCode.zip"
unzip -o /tmp/FiraCode.zip -d ~/.local/share/fonts/FiraCode/ && fc-cache -f
```
