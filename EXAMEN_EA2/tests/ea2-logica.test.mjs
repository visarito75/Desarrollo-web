import { test } from 'node:test';
import assert from 'node:assert/strict';
import { filtrarServicios, validarUrgencia, cambiarEstado, registrarEvento } from '../public/assets/js/ea2-logica.js';

const fuente = [
  { id: 1, nombre: 'Restablecer contraseña', categoria: 'Accesos' },
  { id: 2, nombre: 'Falla de impresora', categoria: 'Hardware' },
  { id: 3, nombre: 'Sin acceso a internet', categoria: 'Red' },
  { id: 4, nombre: 'Instalar software', categoria: 'Software' },
  { id: 5, nombre: 'Actualizar sistema operativo', categoria: 'Software' },
];

test('R1 Todas devuelve copia completa sin mutar la fuente', () => {
  const copia = structuredClone(fuente);
  const r = filtrarServicios(fuente, 'Todas');
  assert.equal(r.length, 5);
  assert.notEqual(r, fuente);
  assert.deepEqual(fuente, copia);
});
test('R1 categoría exacta y sin coincidencias', () => {
  assert.deepEqual(filtrarServicios(fuente, 'Red').map(s => s.id), [3]);
  assert.equal(filtrarServicios(fuente, 'Software').length, 2);
  assert.deepEqual(filtrarServicios(fuente, 'red'), []);
  assert.deepEqual(filtrarServicios(fuente, 'Impresión'), []);
  assert.equal(fuente.length, 5);
});

test('R2 alta exige 15 caracteres útiles', () => {
  assert.notEqual(validarUrgencia('alta', 'a'.repeat(14)), '');
  assert.notEqual(validarUrgencia('alta', '   ' + 'a'.repeat(14) + '   '), '');
  assert.notEqual(validarUrgencia('alta', ' '.repeat(30)), '');
  assert.equal(validarUrgencia('alta', 'a'.repeat(15)), '');
  assert.equal(validarUrgencia('media', ''), '');
  assert.equal(validarUrgencia('baja', ''), '');
});

function escenario() {
  return { sols: [{ id: 1, estado: 'Pendiente' }, { id: 2, estado: 'Pendiente' }], aud: [] };
}
const tecnico = { id: 2, rol: 'tecnico' }, solicitante = { id: 1, rol: 'solicitante' };

test('R3 rechazos no modifican datos ni auditoría', () => {
  const { sols, aud } = escenario();
  const antes = structuredClone(sols);
  assert.equal(cambiarEstado(sols, 1, 'Resuelto', solicitante, aud), false);
  assert.equal(cambiarEstado(sols, 99, 'Resuelto', tecnico, aud), false);
  assert.equal(cambiarEstado(sols, 1, 'Archivado', tecnico, aud), false);
  assert.equal(cambiarEstado(sols, 1, 'Pendiente', tecnico, aud), false);
  assert.deepEqual(sols, antes);
  assert.equal(aud.length, 0);
});
test('R3 éxito cambia y audita una vez con id correlativo', () => {
  const { sols, aud } = escenario();
  assert.equal(cambiarEstado(sols, 1, 'En proceso', tecnico, aud), true);
  assert.equal(sols[0].estado, 'En proceso');
  assert.equal(aud.length, 1);
  const a = aud[0];
  assert.deepEqual(Object.keys(a).sort(), ['accion','actor_id','anterior','fecha','id','nuevo','solicitud_id']);
  assert.equal(a.id, 1); assert.equal(a.actor_id, 2); assert.equal(a.solicitud_id, 1);
  assert.equal(a.accion, 'CAMBIO_ESTADO'); assert.equal(a.anterior, 'Pendiente'); assert.equal(a.nuevo, 'En proceso');
  assert.equal(new Date(a.fecha).toISOString(), a.fecha);
  assert.equal(cambiarEstado(sols, 1, 'En proceso', tecnico, aud), false);
  assert.equal(cambiarEstado(sols, 2, 'Cerrado/Cancelado', tecnico, aud), true);
  assert.equal(aud.length, 2); assert.equal(aud[1].id, 2);
});

test('R4 solo con aceptado, evento permitido y servicio válido', () => {
  const ev = [];
  const s = { id: 3, nombre: 'Sin acceso', descripcion: 'x', categoria: 'Red', correo: 'a@b.c' };
  assert.equal(registrarEvento('sin-decision', 'select_service', s, ev), false);
  assert.equal(registrarEvento('rechazado', 'select_service', s, ev), false);
  assert.equal(registrarEvento('aceptado', 'page_view', s, ev), false);
  assert.equal(registrarEvento('aceptado', 'select_service', undefined, ev), false);
  assert.equal(registrarEvento('aceptado', 'select_service', { id: 0, categoria: 'Red' }, ev), false);
  assert.equal(registrarEvento('aceptado', 'select_service', { id: 1.5, categoria: 'Red' }, ev), false);
  assert.equal(registrarEvento('aceptado', 'select_service', { id: '3', categoria: 'Red' }, ev), false);
  assert.equal(registrarEvento('aceptado', 'select_service', { id: 3, categoria: 'Otra' }, ev), false);
  assert.equal(ev.length, 0);
  assert.equal(registrarEvento('aceptado', 'select_service', s, ev), true);
  assert.equal(registrarEvento('aceptado', 'submit_request', s, ev), true);
  assert.deepEqual(ev, [
    { event: 'select_service', service_id: '3', categoria: 'Red' },
    { event: 'submit_request', service_id: '3', categoria: 'Red' },
  ]);
  assert.equal(registrarEvento('rechazado', 'submit_request', s, ev), false);
  assert.equal(ev.length, 2);
});
