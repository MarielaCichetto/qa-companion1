export const bugsSeed = [
  {
    id: 'BUG-1001',
    title: 'Crash en API tester cuando la respuesta supera 5MB',
    severity: 'Alta',
    priority: 'Crítica',
    status: 'Investigando',
    project: 'QA Companion',
    reporter: 'Lucía',
    assignee: 'Diego',
    createdAt: '2024-03-12',
    tags: ['API', 'Stability'],
    stepsToReproduce: [
      'Abrir API Tester',
      'Enviar GET a /reports/export',
      'La app se cierra'
    ],
    expectedResult: 'Mostrar error controlado',
    actualResult: 'Se cierra la pestaña'
  },
  {
    id: 'BUG-1004',
    title: 'Badge de prioridad no se actualiza',
    severity: 'Media',
    priority: 'Alta',
    status: 'En progreso',
    project: 'Portal Clientes',
    reporter: 'Paula',
    assignee: 'Rocío',
    createdAt: '2024-03-14',
    tags: ['UI'],
    stepsToReproduce: ['Asignar prioridad a bug', 'Refrescar tablero'],
    expectedResult: 'Badge muestra nuevo color',
    actualResult: 'Permanece en gris'
  },
  {
    id: 'BUG-1010',
    title: 'Error 500 al exportar CSV de órdenes',
    severity: 'Alta',
    priority: 'Crítica',
    status: 'Abierto',
    project: 'Portal Clientes',
    reporter: 'Emilio',
    assignee: 'Marina',
    createdAt: '2024-03-16',
    tags: ['Backend', 'CSV'],
    stepsToReproduce: ['Ingresar a reportes', 'Click exportar CSV'],
    expectedResult: 'Descarga exitosa',
    actualResult: 'API responde 500'
  }
];
