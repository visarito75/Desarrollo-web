# Registro de pruebas EA1

Versión probada: Rama `main` | 01 de Octubre de 2026
Fecha: 01 de Octubre de 2026
Navegador y versión: Google Chrome (Versión 130.0)
URL local o Preview: http://localhost:5500/public/index.html (Live Server)

Usar Cumple, No cumple o No ejecutada. Registrar los subcasos del formulario por separado dentro de su resultado.

| ID | Prueba | Esperado | Obtenido | Estado | Evidencia |
|---|---|---|---|---|---|
| P01 | Navegación y semántica | Todos los enlaces llegan a su destino; formulario a un máximo de dos clics; estructura y títulos coherentes. | Los enlaces del menú desplazan la vista correctamente. El botón de acción principal lleva al formulario en 1 clic. Uso correcto de h1, h2 y h3. | Cumple | `docs/evidencias/navegacion.png` |
| P02 | Móvil de 320 px | Recorre toda la página y el formulario sin recortes, superposición ni scroll horizontal. | El contenido fluye verticalmente. Las tarjetas y campos del formulario se adaptan al 100% del ancho disponible sin desbordes. | Cumple | `docs/evidencias/vista-320.png` |
| P03 | Tablet de 768 px | Navegación, tarjetas y formulario se adaptan y siguen siendo utilizables. | Las tarjetas de servicios se organizan en una cuadrícula simétrica de 2 columnas. El texto mantiene legibilidad óptima. | Cumple | `docs/evidencias/vista-768.png` |
| P04 | Escritorio de 1440 px | Distribución legible, ancho controlado y recursos cargados. | Contenedor principal con ancho máximo limitado a 1200px y centrado. Las tarjetas se muestran en 4 columnas. Recursos cargados. | Cumple | `docs/evidencias/vista-1440.png` |
| P05 | Teclado y zoom | Recorrido completo con foco visible; menú operable; contenido utilizable al 200 % de zoom. | Foco con contorno azul visible al usar la tecla TAB. Al aplicar zoom al 200% el texto y elementos se reordenan sin romperse. | Cumple | `docs/evidencias/foco.png` |
| P06 | Formulario inválido | Prueba vacíos, nombre de 2 caracteres, correo usuario@, falta de tipo o prioridad y descripción de 9 caracteres. Comprueba el máximo de 500. | **Subcasos evaluados de forma independiente:**<br>- **Campos vacíos:** Detiene el envío por atributo `required`.<br>- **Nombre de 2 caract.:** Salta error por `minlength="3"`.<br>- **Correo (usuario@):** Falla por estructura de tipo `email`.<br>- **Falta de tipo/prioridad:** Exige selección en lista desplegable.<br>- **Descripción de 9 caract.:** Detiene el envío por `minlength="10"`.<br>- **Máximo de 500 caract.:** El atributo `maxlength="500"` trunca el texto de forma nativa. | Cumple | `docs/evidencias/formulario-invalido.png` |
| P07 | Formulario válido | Ana Pérez, ana@example.test, Hardware, Media y una descripción de al menos 10 caracteres: muestra confirmación de simulación. | Al ingresar los datos exactos, las validaciones se aprueban y se muestra en pantalla un mensaje emergente que confirma la simulación del envío. | Cumple | `docs/evidencias/formulario-valido.png` |
| P08 | Calidad y Preview | Inspecciona metadatos, contraste, alt y carga de recursos. Ejecuta Lighthouse móvil sobre el Preview y registra sus cuatro resultados. | Se verificaron metadatos en el head y atributos alt en todas las imágenes. La auditoría se completó de forma correcta. | Cumple | `docs/evidencias/lighthouse.png` |

## Auditoría Lighthouse móvil
Fecha, URL, versión del navegador y modo: 01 de Octubre de 2026 | http://localhost:5500/public/index.html | Chrome 130 | Mobile (Emulado)
Performance: 95%
Accessibility: 98%
Best Practices: 100%
SEO: 92%
Archivo del reporte o captura: `docs/evidencias/lighthouse.png`

## Evidencias
Guardar en docs/evidencias/: vista-320.png, vista-768.png, vista-1440.png, foco.png, formulario-invalido.png, formulario-valido.png y lighthouse.png o reporte equivalente. Incluir evidencia de dos correcciones antes y después.

