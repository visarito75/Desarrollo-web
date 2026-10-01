---

###  Parte 2: Código JavaScript Independiente (`script.js`)

Este archivo se encarga de cambiar los estados del Modo Oscuro guardando la preferencia en caché (`localStorage`), renderizar dinámicamente los gráficos/iconos vectoriales de Lucide y capturar el envío del formulario.

```javascript
/**
 * PORTAL DE SOPORTE TI - COMPORTAMIENTOS DINÁMICOS
 * Código modular independiente.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Inicializar el motor de renderizado de iconos Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ==========================================================================
    // 1. MANEJO INTERNO Y AUTOMÁTICO DE CONFIGURACIÓN DE TEMA (DARK MODE)
    // ==========================================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIconElement = document.getElementById('theme-icon');
    
    // Recuperar la caché almacenada o evaluar los parámetros del Sistema Operativo
    const temaGuardado = localStorage.getItem('theme');
    const sistemaOperativoOscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Determinar estado inicial preferido
    const temaInicial = temaGuardado || (sistemaOperativoOscuro ? 'dark' : 'light');
    aplicarTemaGrafico(temaInicial);

    // Escuchador de clic para alternancia manual
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const temaActual = document.documentElement.getAttribute('data-theme');
            const proximoTema = temaActual === 'dark' ? 'light' : 'dark';
            aplicarTemaGrafico(proximoTema);
        });
    }

    /**
     * Aplica los atributos estructurales en el DOM para inyectar las paletas CSS correspondientes
     */
    function aplicarTemaGrafico(tema) {
        document.documentElement.setAttribute('data-theme', tema);
        localStorage.setItem('theme', tema);
        
        if (!themeIconElement) return;

        // Actualizar reactivamente los identificadores del set de datos Lucide
        if (tema === 'dark') {
            themeIconElement.setAttribute('data-lucide', 'sun');
        } else {
            themeIconElement.setAttribute('data-lucide', 'moon');
        }
        
        // Forzar actualización visual limpia en la interfaz
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // ==========================================================================
    // 2. COMPORTAMIENTO DEL MENÚ INTERACTIVO MÓVIL
    // ==========================================================================
    const botonNavToggle = document.querySelector('.nav-toggle');
    const contenedorMenuNav = document.querySelector('.nav-menu');

    if (botonNavToggle && contenedorMenuNav) {
        botonNavToggle.addEventListener('click', () => {
            const estaDesplegado = botonNavToggle.getAttribute('aria-expanded') === 'true';
            botonNavToggle.setAttribute('aria-expanded', !estaDesplegado);
            contenedorMenuNav.classList.toggle('is-open');
        });
    }

    // ==========================================================================
    // 3. CAPTURA Y PROCESADO DEL FORMULARIO DE PRÁCTICA DE SOPORTE
    // ==========================================================================
    const formSoporteTecnico = document.getElementById('soporte-form');
    const cajaMensajeSimulacion = document.getElementById('mensaje-simulacion');

    if (formSoporteTecnico) {
        formSoporteTecnico.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Detener transmisión o redirección de página habitual
            
            // Extracción nativa y limpia de valores internos
            const inputNombre = document.getElementById('nombre').value.trim();
            const inputDescripcion = document.getElementById('descripcion').value.trim();

            // Capa de control complementaria a los validadores nativos HTML5
            if (inputNombre.length < 3 || inputDescripcion.length < 10) {
                alert('Fallo en la validación: Por favor rectifique las longitudes de texto ingresadas en el formulario.');
                return;
            }

            // Renderizar la alerta explicativa requerida localmente de manera estética
            if (cajaMensajeSimulacion) {
                cajaMensajeSimulacion.textContent = 'Simulación exitosa: La solicitud ha sido procesada correctamente de forma local. Este formulario es una simulación de demostración y NO envía ni guarda tickets en ninguna base de datos.';
                cajaMensajeSimulacion.style.display = 'block';
                cajaMensajeSimulacion.className = 'alerta-exito';
                
                // Efecto de paneo/scroll elegante hacia el bloque inferior de confirmación
                cajaMensajeSimulacion.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
            
            // Limpieza integral de las cajas e inputs rellenados
            formSoporteTecnico.reset();
        });
    }
});