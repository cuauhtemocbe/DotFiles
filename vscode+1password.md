# Lanzador de VS Code con entorno de 1Password

Sigue estos pasos para crear un acceso directo (.desktop) que abra Visual Studio Code con variables de entorno cargadas desde 1Password.

## 1) Crear el directorio (si no existe) y abrir el archivo .desktop

```bash
mkdir -p ~/.local/share/applications
nano ~/.local/share/applications/code-projects-env.desktop
```

## 2) Pegar el contenido del archivo .desktop

```desktop
[Desktop Entry]
Name=Visual Studio Code (Projects env)
Comment=Open VS Code with env from 1Password
Exec=sh -c 'op run --env-file=/home/kuautli/Projects/.env -- code /home/kuautli/Projects'
Icon=vscode
Type=Application
Terminal=false
Categories=Development;IDE;
```

Guarda y cierra el editor.

## 3) Dar permisos de ejecución

```bash
chmod +x ~/.local/share/applications/code-projects-env.desktop
```

Después de esto, deberías ver el lanzador en tu menú de aplicaciones bajo la categoría “Development”.

## 4) Búscalo en el lanzador (Activities) como “Visual Studio Code (Projects env)” y anótalo al dock si quieres.
