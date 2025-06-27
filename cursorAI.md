# 🧠 Instalación de Cursor en Linux (vía AppImage)

## 🔗 1. Descargar Cursor
Descarga la versión para Linux desde el sitio oficial:

👉 [https://cursor.sh](https://cursor.sh)

Guarda el archivo `.AppImage` en tu carpeta de Descargas.

## 📂 2. Mover y dar permisos de ejecución
```bash
mkdir -p ~/.local/bin
mv ~/Downloads/Cursor-*.AppImage ~/.local/bin/Cursor.AppImage
chmod +x ~/.local/bin/Cursor.AppImage
```

## 🎨 3. Agregar ícono personalizado
```bash
mkdir -p ~/.local/share/icons
wget https://cursor.sh/favicon.ico -O ~/.local/share/icons/cursor.ico
# (opcional) convertir a PNG si deseas
sudo apt install imagemagick
convert ~/.local/share/icons/cursor.ico ~/.local/share/icons/cursor.png
```

## 🖥️ 3. Crear el archivo `.desktop` para el menú de apps
```bash
nano ~/.local/share/applications/cursor.desktop
```

Pega el siguiente contenido (ajusta tu nombre de usuario si es necesario):

```ini
[Desktop Entry]
Name=Cursor
Comment=Cursor AI Editor
Exec=/home/tu_usuario/.local/bin/Cursor.AppImage --no-sandbox
Icon=/home/tu_usuario/.local/share/icons/cursor.png
Icon=cursor
Terminal=false
Type=Application
Categories=Development;IDE;
```

✅ Reemplaza `/home/tu_usuario/` por tu ruta real (usa `echo $HOME` si dudas).

## 🔁 5. Recargar la base de datos de aplicaciones
```bash
update-desktop-database ~/.local/share/applications
```

## ✅ ¡Listo!
Ahora deberías poder buscar **"Cursor"** en el menú de aplicaciones y ejecutarlo como cualquier otra app.
