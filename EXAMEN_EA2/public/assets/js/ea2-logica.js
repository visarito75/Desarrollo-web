// Completa las funciones conservando estas firmas. Requisitos en docs/retos.md.

const ESTADOS_VALIDOS = ['Pendiente', 'En proceso', 'Resuelto', 'Cerrado/Cancelado'];
const EVENTOS_PERMITIDOS = ['select_service', 'submit_request'];
const CATEGORIAS_VALIDAS = ['Accesos', 'Hardware', 'Red', 'Software'];
const MINIMO_URGENCIA = 15;

/**
 * R1: Devuelve una lista NUEVA con los servicios de la categoría indicada.
 * "Todas" devuelve una copia completa; sin coincidencias devuelve [].
 * No modifica la lista original (filter y el spread crean arreglos nuevos).
 */
export function filtrarServicios(lista, categoria) {
  if (!Array.isArray(lista)) return [];
  if (categoria === 'Todas') return [...lista];
  return lista.filter((servicio) => servicio?.categoria === categoria);
}

/**
 * R2: Si la prioridad es alta, el motivo debe tener al menos 15 caracteres
 * útiles (después de trim). Devuelve el mensaje de error o "" si cumple.
 */
export function validarUrgencia(prioridad, motivo) {
  if (prioridad !== 'alta') return '';
  const util = String(motivo ?? '').trim().length;
  if (util >= MINIMO_URGENCIA) return '';
  return (
    'Para prioridad alta explica el impacto con al menos ' +
    MINIMO_URGENCIA +
    ' caracteres útiles; llevas ' +
    util +
    '.'
  );
}

/**
 * R3: Solo el rol "tecnico" cambia el estado de una solicitud existente a un
 * estado válido y distinto. Si algo falla devuelve false sin tocar datos.
 * En éxito cambia el estado, agrega UNA auditoría y devuelve true.
 * Nota: esta validación en el navegador es demostrativa; no es autenticación
 * ni autorización de servidor.
 */
export function cambiarEstado(solicitudes, id, nuevoEstado, actor, auditoria) {
  if (!Array.isArray(solicitudes) || !Array.isArray(auditoria)) return false;
  if (!actor || actor.rol !== 'tecnico') return false;
  if (!ESTADOS_VALIDOS.includes(nuevoEstado)) return false;

  const solicitud = solicitudes.find((s) => s.id === id);
  if (!solicitud) return false;

  const anterior = solicitud.estado;
  if (anterior === nuevoEstado) return false;

  // Todas las validaciones pasaron: recién ahora se modifican los datos.
  solicitud.estado = nuevoEstado;
  auditoria.push({
    id: auditoria.length + 1,
    actor_id: actor.id,
    solicitud_id: solicitud.id,
    accion: 'CAMBIO_ESTADO',
    anterior,
    nuevo: nuevoEstado,
    fecha: new Date().toISOString(),
  });
  return true;
}

/**
 * R4: Registra un evento solo si el consentimiento es "aceptado", el nombre es
 * select_service o submit_request y el servicio es válido. Guarda únicamente
 * { event, service_id (texto), categoria }: ningún dato personal.
 */
export function registrarEvento(consentimiento, nombre, servicio, eventos) {
  if (!Array.isArray(eventos)) return false;
  if (consentimiento !== 'aceptado') return false;
  if (!EVENTOS_PERMITIDOS.includes(nombre)) return false;
  if (
    !servicio ||
    !Number.isSafeInteger(servicio.id) ||
    servicio.id <= 0 ||
    !CATEGORIAS_VALIDAS.includes(servicio.categoria)
  )
    return false;

  eventos.push({
    event: nombre,
    service_id: String(servicio.id),
    categoria: servicio.categoria,
  });
  return true;
}
