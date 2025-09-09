# 🧠 Instalación de Obsidian en Linux (vía AppImage)

## 🔗 1. Descargar Obsidian
Descarga la versión para Linux desde el sitio oficial:

👉 [https://obsidian.md/download](https://obsidian.md/download)

Guarda el archivo `.AppImage` en tu carpeta de Descargas.

---

## 📂 2. Mover y dar permisos de ejecución
```bash
mkdir -p ~/.local/bin
mv ~/Descargas/Obsidian-*.AppImage ~/.local/bin/Obsidian.AppImage
chmod +x ~/.local/bin/Obsidian.AppImage
```

---

## 🎨 3. Agregar ícono personalizado
```bash
mkdir -p ~/.local/share/icons
wget https://github.com/obsidianmd/obsidian-releases/raw/master/logo/obsidian-icon-512.png -O ~/.local/share/icons/obsidian.png
```

---

## 🖥️ 4. Crear el archivo `.desktop` para el menú de apps
```bash
nano ~/.local/share/applications/obsidian.desktop
```

Pega el siguiente contenido (ajusta tu nombre de usuario si es necesario):

```ini
[Desktop Entry]
Name=Obsidian
Comment=Obsidian Knowledge Base
Exec=/home/tu_usuario/.local/bin/Obsidian.AppImage
Icon=/home/tu_usuario/.local/share/icons/obsidian.png
Terminal=false
Type=Application
Categories=Utility;TextEditor;
```

✅ Reemplaza `/home/tu_usuario/` por tu ruta real (usa `echo $HOME` si dudas).

---

## 🔁 5. Recargar la base de datos de aplicaciones
```bash
update-desktop-database ~/.local/share/applications
```

---

## ✅ ¡Listo!
Ahora deberías poder buscar **"Obsidian"** en el menú de aplicaciones y ejecutarlo como cualquier otra app.