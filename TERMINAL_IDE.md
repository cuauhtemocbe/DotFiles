# Terminal IDE Setup — Ubuntu 24.04

Stack para desarrollo Python usando la terminal como IDE.

## Layout

```
┌──────────┬──────────────────────┐
│  snacks  │     código .py       │
│ explorer │      (nvim)          │
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
~/.config/zellij/config.kdl             # config principal de Zellij (colores + keybinds)
~/.config/zellij/layouts/ide.kdl        # layout del IDE
~/.local/bin/ide                        # script de arranque
~/.local/bin/                           # nvim, lazygit, ruff, debugpy, zellij
~/.npm-global/bin/                      # pyright
~/.local/share/fonts/FiraCode/          # FiraCode Nerd Font
```

## File Explorer — Snacks.nvim

LazyVim usa `folke/snacks.nvim` como explorador de archivos (reemplazó a neo-tree a finales de 2024).

### Atajos del explorador

| Atajo | Acción |
|-------|--------|
| `Space+e` | Toggle explorador |
| `H` | Mostrar/ocultar archivos gitignored y dotfiles |
| `I` | Toggle archivos ignorados |

### Archivos gitignored

Por defecto, `Snacks.explorer` oculta archivos en `.gitignore`. Al presionar `H` se muestran, pero con el color de `NonText` (`#3A3A4A` en kuautli) — casi invisible sobre el fondo oscuro.

**Fix:** definir `SnacksPickerPathIgnored` directamente en `~/.config/nvim/colors/kuautli.lua` (no en autocmd, porque snacks carga sus highlights lazy después del evento `ColorScheme`):

```lua
hi("SnacksPickerPathIgnored", { fg = "#9e9e9e" })  -- plateado
hi("SnacksPickerPathHidden",  { fg = "#9e9e9e" })
```

---

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
| Zellij | `theme "kuautli"` definido inline en `~/.config/zellij/config.kdl` |
| Neovim | colorscheme `kuautli` — `~/.config/nvim/colors/kuautli.lua` |

### mini.icons — highlight groups explícitos

`mini.icons` (proveedor de íconos de LazyVim) usa 10 grupos fijos `MiniIcons*`. Por defecto los registra con `default = true` y los vincula a grupos estándar:

```lua
-- defaults de mini.icons (en su propio código)
MiniIconsOrange → DiagnosticWarn
MiniIconsYellow → DiagnosticWarn   -- ambos apuntan al mismo grupo
```

**Problema:** si tu colorscheme define `DiagnosticWarn` como amarillo, tanto `MiniIconsOrange` como `MiniIconsYellow` renderizan igual — el ícono de `.gitlab-ci.yml` (naranja) aparece amarillo.

**Fix:** definir los 10 grupos explícitamente en `~/.config/nvim/colors/kuautli.lua`. Paleta ampliada con los colores faltantes:

```lua
-- colores nuevos en la paleta
orange   = "#FC8C3A",
green    = "#9ECE6A",
purple   = "#9D7CD8",

-- grupos mini.icons al final del colorscheme
hi("MiniIconsAzure",  { fg = c.lblue  })
hi("MiniIconsBlue",   { fg = c.blue   })
hi("MiniIconsCyan",   { fg = c.teal   })
hi("MiniIconsGreen",  { fg = c.green  })
hi("MiniIconsGrey",   { fg = c.gray   })
hi("MiniIconsOrange", { fg = c.orange })
hi("MiniIconsPurple", { fg = c.purple })
hi("MiniIconsRed",    { fg = c.pink   })
hi("MiniIconsWhite",  { fg = c.white  })
hi("MiniIconsYellow", { fg = c.yellow })
```

> Los grupos con `default = true` solo aplican si el grupo **no está definido**. Definirlos explícitamente en el colorscheme los sobreescribe sin tocar el código de mini.icons.

### Color de selección en GNOME Terminal

Cuando Zellij corre, establece su propio fondo oscuro (`#1C1C2A`) via ANSI. El color de selección por defecto (tema GTK) queda invisible contra ese fondo. Se configuran colores explícitos para el highlight:

```bash
PROFILE="b1dcc9dd-5262-4d8d-a863-c897e6d979b9"
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/$PROFILE/ highlight-colors-set true
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/$PROFILE/ highlight-background-color '#58B0E3'
gsettings set org.gnome.Terminal.Legacy.Profile:/org/gnome/terminal/legacy/profiles:/$PROFILE/ highlight-foreground-color '#1C1C2A'
```

| Key | Valor | Efecto |
|---|---|---|
| `highlight-colors-set` | `true` | Usa colores custom en lugar del tema GTK |
| `highlight-background-color` | `#58B0E3` | Azul kuautli — visible sobre fondo oscuro |
| `highlight-foreground-color` | `#1C1C2A` | Texto oscuro sobre el highlight azul |

## Zellij — `~/.config/zellij/config.kdl`

```kdl
theme "kuautli"

pane_frames false
show_startup_tips false
show_release_notes false
mouse_hover_effects false

keybinds {
    normal {
        bind "Ctrl f" { ToggleFocusFullscreen; }
    }
}

themes {
    kuautli {
        fg      "#E0E0E0"
        bg      "#1C1C2A"
        black   "#252535"
        red     "#FC618D"
        green   "#1AC5B0"
        yellow  "#F7DB6A"
        blue    "#58B0E3"
        magenta "#FC618D"
        cyan    "#7AD3F8"
        white   "#E0E0E0"
        orange  "#F7DB6A"
    }
}
```

## Zellij — atajos

| Atajo | Acción |
|-------|--------|
| `Ctrl+f` | Maximizar / restaurar panel enfocado (toggle) |
| `Ctrl+p` + flechas | Navegar entre paneles |
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
| `Space+e` | Árbol de archivos — Snacks Explorer (toggle) |
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

## Delta — Git diff viewer

`delta` reemplaza el pager de git con syntax highlighting, números de línea y navegación entre hunks.

**Instalación:**
```bash
curl -Lo /tmp/delta.tar.gz "https://github.com/dandavison/delta/releases/download/0.19.2/delta-0.19.2-x86_64-unknown-linux-musl.tar.gz"
tar -xzf /tmp/delta.tar.gz -C /tmp
cp /tmp/delta-0.19.2-x86_64-unknown-linux-musl/delta ~/.local/bin/
```

**Configuración en `~/.gitconfig`:**
```ini
[core]
    pager = delta

[interactive]
    diffFilter = delta --color-only

[delta]
    navigate = true
    dark = true
    line-numbers = true
    side-by-side = false
    syntax-theme = gruvbox-dark

[diff]
    colorMoved = default
```

| Opción | Efecto |
|---|---|
| `navigate = true` | `n`/`N` para saltar entre hunks |
| `side-by-side = false` | Vista unificada (no split) |
| `syntax-theme` | Tema de colores del código |

Se activa automáticamente en `git diff`, `git show`, `git log -p`.

---

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
