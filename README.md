
# 🗂️ DotFiles

![Estado del repositorio](https://img.shields.io/badge/estado-activo-brightgreen)
[![Licencia](https://img.shields.io/badge/licencia-MIT-blue)](LICENSE)
![SO](https://img.shields.io/badge/SO-Linux-FCC624?logo=linux&logoColor=black)

¡Bienvenido! Este repositorio reúne mis archivos de configuración y documentación para distintas herramientas y entornos que uso día a día. Es mi espacio personal para respaldar y compartir mis dotfiles, pero si algo te resulta útil, ¡adelante! Puedes tomar, adaptar o mejorar cualquier configuración.

## 🛠️ Herramientas para Personalizar e Instalar

<p align="left">
	<img src="https://img.shields.io/badge/Obsidian-483699?logo=obsidian&logoColor=white&style=for-the-badge" alt="Obsidian badge"/>
	<img src="https://img.shields.io/badge/VS%20Code-007ACC?logo=visualstudiocode&logoColor=white&style=for-the-badge" alt="VS Code badge"/>
	<img src="https://img.shields.io/badge/Docker-2496ED?logo=docker&logoColor=white&style=for-the-badge" alt="Docker badge"/>
	<img src="https://img.shields.io/badge/Flameshot-E24329?style=for-the-badge" alt="Flameshot badge"/>
	<img src="https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white&style=for-the-badge" alt="Python badge"/>
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge" alt="JavaScript badge"/>
	<img src="https://img.shields.io/badge/1Password-0094F5?logo=1password&logoColor=white&style=for-the-badge" alt="1Password badge"/>
</p>

- [`.bashrc`](.bashrc): Alias de Bash y personalizaciones de la terminal 🖥️
- [`.mcp.json`](.mcp.json): Servidores MCP (Notion y SonarQube); el token se toma de la variable de entorno `SONAR_TOKEN`.
- [`keybindings.json`](keybindings.json): Atajos de teclado de VS Code (referencia/respaldo).
- [`.vscode/settings.json`](.vscode/settings.json): Ajustes generales de VS Code.
- [`.vscode/keybindings.global.json`](.vscode/keybindings.global.json): Atajos globales de VS Code (referencia/respaldo).
- [`.vscode.javascript/`](.vscode.javascript): Ajustes de VS Code para JavaScript/TypeScript, más una tarea para mostrar/ocultar archivos excluidos.
- [`chrome-theme/`](chrome-theme): Tema "Refined Aqua Green" para Chrome.
- [`.github/`](.github): Guías de docstrings y de tests.
- [`TERMINAL_IDE.md`](TERMINAL_IDE.md): Terminal como IDE para desarrollo Python en Ubuntu 24.04 💻
- [`Flameshot.md`](Flameshot.md): Configurar Flameshot como herramienta por defecto para capturas 📸
- [`Obsidian.md`](Obsidian.md): Instrucciones para instalar y configurar Obsidian 📝
- [`VSCode+1password.md`](VSCode+1password.md): Integración de VS Code con 1Password 🔐

Explora los archivos markdown para encontrar instrucciones de configuración, consejos y personalizaciones para cada herramienta. Puedes copiar o adaptar las configuraciones según tus necesidades.

## 🔒 Hook de pre-commit (escaneo de secretos)

El repo versiona archivos de configuración que podrían contener credenciales (`.mcp.json`, `.vscode/settings.json`). Para bloquear un commit con un secreto literal, activa el hook una sola vez por clon (requiere [gitleaks](https://github.com/gitleaks/gitleaks)):

```bash
git config core.hooksPath .githooks
```

## ✅ Validación

Este repo no tiene CI ni suite de tests: son archivos de configuración y documentación, sin código que compilar o probar. Es una decisión deliberada para un repo de un solo dueño. La validación es local:

- El hook de pre-commit escanea secretos en cada commit.
- Para una revisión más amplia (secretos, configuraciones inseguras) se corre `trivy fs .` a mano cuando hace falta.

## 📄 Licencia

Este repositorio contiene mi configuración personal, pero eres libre de usar, modificar o compartir cualquier archivo si te resulta útil. Los términos están en [LICENSE](LICENSE) (MIT). ¡Espero que encuentres algo que te ayude a mejorar tu entorno!
