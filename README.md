<p align="center">
  <img src="public/assets/yaguarete_icon.png" width="120" alt="YAGUARETÉ Logo" />
</p>

<h1 align="center">🌐 Yaguareté.org — Portal Web Oficial de YAGUARETÉ</h1>

<p align="center">
  <strong>Sitio web oficial inspirado en python.org para el lenguaje de programación en español fuertemente tipado YAGUARETÉ (<code>.yaguarete</code>).</strong>
</p>

---

## ✨ Características del Portal Web

- 🐆 **Identidad Oficial "Jaguar Gamer" & Electric Blue (`v0.1.2`)**: Paleta cibernética (`#080c14`, `#0f172a`, `#0066ff`, `#00d4ff`) con soporte nativo de modo Claro/Oscuro (`color-scheme` y `light-dark()`).
- 🎠 **Carrusel Interactivo de Código en el Hero (estilo `python.org`)**: 5 diapositivas numeradas (`1..5`) con resaltado de sintaxis oficial de YAGUARETÉ y ejecución en un clic.
- 💻 **Playground Interactivo y Consola REPL en el Navegador**:
  - **Editor `.yaguarete`**: Ejecuta programas completos en el navegador (`yaguarete run --time`) con soporte para estructuras (`ESTRUCTURA`), referencias nulas (`NULO`), matrices bidimensionales, división entera (`//`), módulo (`%`) y archivos virtuales (`ARCHIVO`), además de verificador estático (`yaguarete check`).
  - **Consola `yaguarete repl`**: Evaluación interactiva de expresiones con balanceo multilínea y metacomandos `:ayuda`, `:variables` (tabla ASCII), `:limpiar`, `:cancel` y `:salir`.
- 📥 **Detección Automática de Sistema Operativo en Descargas**: Sugiere automáticamente el instalador gráfico `Instalador_Yaguarete.exe` en Windows o el paquete nativo `.deb` / `.tar.gz` en GNU/Linux, enlazando directamente a `caidevOficial/Yaguarete_Lang/releases`.
- 🔍 **Buscador Instantáneo (`Ctrl + K`)**: Modal nativo `<dialog closedby="any">` con búsqueda en tiempo real sobre tipos primitivos, funciones incorporadas, operadores, comandos CLI y recetas de código.
- 📚 **Arquitectura Multipágina Completa**:
  - **Acerca de (`/`)**: Hero con carrusel, pilares del lenguaje, benchmarks del motor Rust (`<1 ms`) y Playground embebido.
  - **Descargas (`/#/descargas`)**: Instaladores Windows (`.exe`), paquetes Linux (`.deb` y `.tar.gz`), extensión `.vsix` y comandos de terminal con copiado rápido.
  - **Documentación (`/#/documentacion`)**: Especificación completa del sistema de tipos (`FLOTANTE` vs `REAL`), arreglos, estructuras, punteros `NULO`, operadores y CLI.
  - **Ejemplos y Recetas (`/#/ejemplos`)**: Algoritmos reales ejecutables en el navegador (`ejemplo_completo.yaguarete`, `lista_enlazada.yaguarete`, `matrices.yaguarete`, `sort.yaguarete`).
  - **Extensión VS Code (`/#/vscode`)**: Guía de IntelliSense prioritario, diagnósticos LSP en `<0.2 ms` y depurador interactivo DAP con breakpoints.
  - **Novedades (`/#/novedades`)**: Historial de lanzamientos SemVer (`v0.1.2`, `v0.1.1`, `v0.1.0-rc.3`, `v0.1.0-rc.2`, `v0.1.0-rc.1`, `v0.1.0-beta.1`, `v0.1.0-alpha.1`) y resumen arquitectónico `ADR-001`.

---
