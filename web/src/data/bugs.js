const bugs = [
  {
    id: 'BUG-101',
    title: 'Error 500 al guardar test case',
    severity: 'Alta',
    priority: 'Alta',
    status: 'Abierto',
    stepsToReproduce: ['Ir a Test Cases', 'Crear nuevo', 'Completar datos', 'Guardar'],
    expected: 'Se guarda correctamente',
    actual: 'Se muestra error 500',
    notes: 'Ocurre solo con set Autenticación'
  },
  {
    id: 'BUG-120',
    title: 'No se cargan checklists en Safari',
    severity: 'Media',
    priority: 'Media',
    status: 'En progreso',
    stepsToReproduce: ['Abrir app en Safari', 'Ir a Checklists'],
    expected: 'Se muestran elementos',
    actual: 'Pantalla en blanco',
    notes: 'Verificar compatibilidad con WebKit'
  }
];

export default bugs;
