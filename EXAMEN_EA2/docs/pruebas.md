# Registro de pruebas EA2

Entorno: `npm run dev` (http://127.0.0.1:5500), Chromium, Node.js 22. Pruebas unitarias: `npm test` (12/12 OK).
Capturas en `docs/evidencias/`. **Antes de entregar, repite las pruebas tú y reemplaza o añade tus propias capturas.**

| ID | Acción | Esperado | Resultado real | Estado | Evidencia |
|---|---|---|---|---|---|
| P01 | Todas y luego Red | 5 y 1 tarjetas; fuente y selector intactos | Todas: 5 tarjetas, "5 servicios visibles". Red: 1 tarjeta, "1 servicios visibles". El selector del formulario conserva 5 servicios (+ opción inicial) | Aprobado | 1440.png; test R1 |
| P02 | Filtro por categoría sin coincidencia en prueba de función | Lista vacía y mensaje en vista | `filtrarServicios(servicios,'Impresión')` devuelve `[]`; la vista muestra "No hay servicios en esta categoría."; la fuente sigue con 5 | Aprobado | test R1 (consola) |
| P03 | Alta y motivo de 14 caracteres o espacios | Error y foco; ninguna solicitud | Con 14 caracteres y con solo espacios aparece "…al menos 15 caracteres útiles; llevas 14/0", el foco va a `#motivo-urgencia`, 0 solicitudes | Aprobado | test R2 |
| P04 | Alta con motivo 15; media con motivo vacío | Ambos válidos; una fila por envío | Alta + 15 caracteres con doble clic: 1 solicitud (sin duplicado). Media + motivo vacío enviado con Enter: 2 solicitudes, SOL-0002 | Aprobado | test R2 |
| P05 | Solicitante intenta cambiar estado | Ningún cambio ni auditoría | Mensaje "No se realizó el cambio…"; la fila sigue en Pendiente; auditoría vacía | Aprobado | test R3 |
| P06 | Técnico cambia y repite estado | Una auditoría con anterior/nuevo; repetido no añade | "Actor 2 \| Solicitud 1 \| CAMBIO_ESTADO \| Pendiente → Resuelto \| fecha ISO"; al repetir Resuelto se rechaza y sigue habiendo 1 registro. Se aplica la animación `ea2-confirmar` | Aprobado | P06_auditoria.png |
| P07 | Sin decisión/rechazar y enviar válido | Solicitud funciona sin nuevos eventos | Sin decisión y con rechazo las solicitudes se crean con normalidad; el contador sigue en "0 eventos" | Aprobado | test R4 |
| P08 | Aceptar, elegir y enviar válido | Un evento por acción, solo tres claves | "Elegir" → 1 evento; enviar → 2 eventos: `{event:'select_service',service_id:'2',categoria:'Hardware'}` y `{event:'submit_request',…}`; sin nombre, correo ni descripción | Aprobado | test R4 |
| P09 | Revocar y volver a elegir | No crece historial; no se borra lo anterior | Tras rechazar, elegir otro servicio y enviar: sigue en 2 eventos (no se borra el historial). Al volver a aceptar y elegir: 3 eventos | Aprobado | consola |
| P10 | 320, 768, 1440 px, teclado y zoom 200 % | Contenido operable, sin recorte de página | scrollWidth = ancho del viewport en 320, 768, 1440 y 640 px (zoom 200 % de 1280); sin scroll horizontal de página. Tab recorre enlace de salto, menú, filtro y botones con foco visible (outline) | Aprobado | 320.png, 768.png, 1440.png, zoom200_640.png |
| P11 | Reducir movimiento y cambiar estado | Confirmación visible sin animación | Con `prefers-reduced-motion: reduce`: animation `none`, transform `none`, opacity 1; el texto "Estado actualizado…" sigue visible con fondo y borde | Aprobado | P11_reduced.png |
| P12 | Preview/producción y SHA | Versión correspondiente y URLs accesibles | Preview https://desarrollo-web-examenea2-git-release-ea2-visarito75.vercel.app/ (SHA 8427c3c, pública sin login). Merge del PR #1 (04cafd1) → producción https://desarrollo-web-examenea2.vercel.app/. SHA final de producción registrado en Aula Virtual | Aprobado | PR #1, comentario de Vercel |
