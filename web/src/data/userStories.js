export const userStoriesSeed = [
  {
    id: 'US-210',
    title: 'Como usuario quiero autenticarme con MFA',
    description: 'Habilitar factor extra de seguridad en login web',
    priority: 'Alta',
    acceptanceCriteria: [
      'El usuario recibe código vía email o SMS',
      'El código expira en 5 minutos',
      'Registrar intentos fallidos'
    ],
    linkedTestCases: ['TC-001', 'TC-003'],
    status: 'In Progress',
    owner: 'QA Squad A'
  },
  {
    id: 'US-214',
    title: 'Como usuario necesito ver el historial de órdenes',
    description: 'Listar órdenes en dashboard con filtros por estado',
    priority: 'Media',
    acceptanceCriteria: [
      'Visualizar últimas 50 órdenes',
      'Permitir exportar CSV',
      'Mostrar badges por estado'
    ],
    linkedTestCases: ['TC-011'],
    status: 'To Do',
    owner: 'QA Squad B'
  }
];
