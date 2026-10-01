# Portal TI EA1

- **Código y nombre:** Victor Segundo Sanchez Rodriguez
- **Curso y sección:** DESARROLLO DE ENTORNOS WEB | 2V MIX | 4129-1115 |
- **Repositorio:** https://github.com
- **Pull Request:** No aplica (Trabajo individual en rama principal)
- **Preview:** URL de GitHub Pages o servidor local activo
- **SHA del commit evaluado:** se registra en el texto de entrega del Aula Virtual, fuera de este archivo.
- **Base utilizada:** proyecto propio
- **Fecha de entrega:** 01 de Octubre de 2026

## Inicio local
Abrir la carpeta con VS Code y public/index.html con Live Server. No existen diferencias críticas de estructura; el servidor local mapea correctamente los recursos relativos.

## Estructura
- **public/**: Contiene el archivo principal `index.html` que da estructura a la interfaz del Portal de Soporte.
- **assets/**: Almacena los estilos en hojas CSS (`estilos.css`), las imágenes institucionales y de los servicios en formatos optimizados, junto con tipografías locales.
- **docs/**: Contiene el archivo de control `pruebas.md` y el directorio `evidencias/` con las capturas de pantalla de validación.

## Cambios propios

| Cambio | Archivo | Qué recibí | Qué modifiqué | Evidencia o commit |
|---|---|---|---|---|
| Contenido | `public/index.html` | Estructura vacía o básica de HTML. | Agregué 4 tarjetas de servicios detalladas y el formulario de soporte con inputs específicos. | `feat: agregar estructura semántica y formulario` |
| HTML o CSS | `assets/estilos.css` | Sin estilos CSS asignados para el formulario. | Creé un diseño fluido usando Flexbox y CSS Grid para asegurar el comportamiento responsivo. | `feat: diseño fluido y media queries` |
| Corrección de prueba | `assets/estilos.css` | Entrada de inputs del formulario rígidos que rompían el ancho. | Configuré propiedades porcentuales para evitar desbordes en resoluciones móviles. | `fix: solucionar scroll horizontal en 320px` |

## Correcciones verificadas

### Problema Real 1: Desbordamiento horizontal en pantallas móviles (320px)
- **Síntoma:** Aparecía una barra de desplazamiento horizontal molesta al inspeccionar en la medida de 320px.
- **Evidencia anterior:** El formulario cortaba sus bordes derechos y se salía de la pantalla del celular.
- **Causa:** El contenedor del formulario tenía un ancho fijo asignado en píxeles (`width: 450px;`).
- **Cambio y archivo:** En `assets/estilos.css`, se reemplazó por un ancho flexible: `width: 100%; max-width: 450px; box-sizing: border-box;`.
- **Commit:** `fix: comportamiento responsivo en formulario`
- **Prueba repetida y resultado posterior:** Se volvió a ejecutar la prueba P02 y la página se adaptó verticalmente sin generar scroll horizontal.

### Problema Real 2: Bajo contraste de accesibilidad en los textos de las tarjetas
- **Síntoma:** El texto descriptivo de los servicios era difícil de leer sobre el fondo claro.
- **Evidencia anterior:** Lighthouse arrojó una alerta roja en el apartado de Accesibilidad bajando el puntaje.
- **Causa:** El color asignado al texto era un gris demasiado claro (`color: #a0aec0;`).
- **Cambio y archivo:** En `assets/estilos.css`, se modificó el color de la tipografía por un gris oscuro de alta densidad: `color: #2d3748;`.
- **Commit:** `fix: mejorar contraste de color por accesibilidad`
- **Prueba repetida y resultado posterior:** Al reejecutar Lighthouse, la sección de Accesibilidad subió a 98% con validación en verde.

## Decisión de cascada
En la hoja de estilos se aplicó la siguiente regla para los botones interactivos:
```css
.formulario .btn-enviar {
    background-color: #2b6cb0; /* Azul institucional */
}
```
* **Qué selector aplica:** Aplica a cualquier elemento con la clase `.btn-enviar` que esté contenido dentro de una sección con la clase `.formulario`.
* **Con qué otra regla compite:** Compite con una regla general declarada previamente para todos los botones del sitio: `button { background-color: #4a5568; }`.
* **Por qué prevalece:** Prevalece debido al principio de **especificidad de la cascada CSS**. El selector compuesto por dos clases (`.formulario .btn-enviar`) tiene un peso de especificidad significativamente mayor (0,0,2,0) que el selector de etiqueta simple `button` (0,0,0,1).

## Pruebas
Ver docs/pruebas.md y docs/evidencias/.

## Apoyos y recursos
Se utilizó como base el estándar semántico de HTML5 enseñado en el curso. Para la optimización del diseño adaptable, se consultaron las guías oficiales de MDN Web Docs sobre Flexbox y CSS Grid. Como apoyo de IA, se utilizó al asistente para la estructuración y formateo de las tablas de datos del archivo `pruebas.md` basándose en las restricciones de validación nativa del formulario, verificando manualmente que cada campo cumpliera con los atributos establecidos.

## Limitaciones
Formulario de demostración: trabaja exclusivamente en el lado del cliente (frontend) mediante validaciones nativas de HTML5; no realiza envíos de datos hacia servidores remotos ni persistencia en bases de datos. Pendiente real: integrar JavaScript para un manejo dinámico del DOM tras la confirmación de la simulación.

