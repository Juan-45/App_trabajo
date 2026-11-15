---
applyTo: "frontend/**"
---

# Reglas del frontend

## Arquitectura y responsabilidades
- Conserva la arquitectura y los alias existentes en `vite.config.js`; no agregues capas, dependencias o aliases sin una necesidad concreta.
- Respeta las responsabilidades actuales: `main` organiza la aplicación; `pages`, las páginas; `components`, la interfaz reutilizable; `hooks`, la lógica reutilizable de React; `helpers`, las funciones auxiliares; `context`, el estado compartido; y `theme`, la configuración visual.
- Reutiliza soluciones existentes antes de duplicar componentes, hooks, helpers o estilos.
- Conserva las rutas, el contrato con el backend y la configuración del bundle, salvo que la tarea solicite cambiarlos explícitamente.
- No reorganices ni refactorices código ajeno a la tarea.

## Nombres y organización de archivos
- Para componentes y páginas nuevos, usa archivos y nombres de componentes en PascalCase.
- Para hooks nuevos, usa `use` seguido de un nombre en camelCase.
- Para helpers nuevos, prefiere nombres en camelCase.
- En carpetas existentes, respeta la ubicación y capitalización usadas allí.
- No renombres archivos, carpetas ni exports heredados solo para uniformarlos.

## Extensiones e imports
- Usa `.jsx` cuando el archivo contenga sintaxis JSX y `.js` cuando no la contenga.
- No confundas JSX con texto dentro de strings, plantillas XML o comentarios.
- Al cambiar la extensión de un módulo, actualiza sus imports y referencias de entrada relacionadas.
- Usa los alias existentes y asegúrate de que cualquier extensión explícita en un import coincida con el archivo real.

## Estilo de código
- Sigue el formato del código cercano. En archivos nuevos, usa el estilo predominante: indentación de dos espacios, punto y coma y comillas dobles en JavaScript.
- Mantén los cambios de formato limitados al código necesario; no reformatees archivos completos como parte de una tarea funcional.
- Evita duplicar lógica, mutar datos recibidos o desactivar reglas para eludir errores.

## React e interfaz
- Respeta las reglas de React Hooks: llamadas al nivel superior, dependencias correctas y limpieza de efectos cuando corresponda.
- Reutiliza los componentes, el tema y los patrones de estilo MUI existentes.
- Maneja explícitamente errores y estados de carga; no ocultes fallos con capturas genéricas o defaults engañosos.
