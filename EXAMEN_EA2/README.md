# Nova Servicios TI base EA2
Continúa el portal de semana 5 con cuatro retos nuevos pendientes. Lee docs/retos.md.
Abre la carpeta completa en VS Code. Requiere Node.js 22 o posterior.
Ejecuta `npm run dev` y abre http://127.0.0.1:5500. No abras index.html por file://.
No se necesitan paquetes externos ni npm install. Ctrl+C detiene el servidor.
`npm run check:project` revisa sintaxis y JSON; `npm test` revisa el servidor heredado.
Estos checks pasan aunque los retos sigan pendientes. La corrección funcional es independiente.
Prueba manualmente docs/pruebas.md después de implementar.

Archivos de trabajo: public/assets/js/ea2-logica.js y public/assets/css/ea2.css.
Puedes cambiar otros archivos si lo justificas. Respeta contratos y comportamiento anterior.
El modelo conceptual previo se resume en docs/modelo-continuidad.md; no se requiere base de datos real.
No copies respuestas de la versión docente. Identifica autor, base, cambios propios y apoyo de IA.

Despliegue Vercel: repositorio raíz que contiene package.json; Framework Other; sin comando
de build; Output Directory public (vercel.json incluido). No combines Root Directory public
con Output Directory public. Preview se verifica antes del merge. Main sirve a producción.
El workflow incluye checks básicos; para bloquear merge hay que configurar checks requeridos
en protección de rama o ruleset. El workflow solo no impone esa restricción.

Entrega: ZIP sin .git/node_modules/.env, repo, PR, Preview, producción, SHA de cada despliegue.
## Datos de entrega
- **Autor:** ___ (código ___, sección ___)
- **Base recibida:** Nova_EA2_Base_Alumno (interfaz de la semana 5 con los controles y listeners de EA2 ya conectados).
- **Cambios propios:**
  - `public/assets/js/ea2-logica.js`: se implementaron `filtrarServicios` (R1), `validarUrgencia` (R2), `cambiarEstado` (R3) y `registrarEvento` (R4).
  - `public/assets/css/ea2.css`: animación `ea2-confirmar` para `.ea2-actualizada` (600 ms); con `prefers-reduced-motion: reduce` se quita el movimiento y el mensaje sigue visible.
  - `public/assets/js/ea2-ui.js`: solo se cambió el texto del rechazo (se quitó "R3 debe estar implementado" porque ya está hecho).
  - `tests/ea2-logica.test.mjs` (nuevo): pruebas unitarias de las 4 funciones; `package.json` → `npm test` ahora también las ejecuta.
  - `docs/pruebas.md` completado y capturas en `docs/evidencias/`.
- **Herramientas y uso de IA:** VS Code, Node.js 22, Chromium. Me apoyé en Claude (asistente de IA) para redactar las funciones, las pruebas unitarias y la prueba en navegador. Revisé y probé el código y puedo explicarlo. La parte teórica la resolví sin IA.
- **Repo:** ___
- **PR (release/ea2 → main):** ___
- **Preview / SHA:** ___ / ___
- **Producción / SHA:** ___ / ___
- **Incidencias externas:** ninguna / ___

## Ejecución
`npm run dev` → http://127.0.0.1:5500 · `npm run check:project` · `npm test` (servidor + lógica EA2).

Continuidad hasta la semana 7: corregir observaciones, practicar revisión de HTML/CSS/JS,
modelo, integración, SEO y flujo de publicación. El EF solicitado es TEÓRICO; este proyecto
es apoyo de aprendizaje y no añade un entregable práctico calificado al EF.
