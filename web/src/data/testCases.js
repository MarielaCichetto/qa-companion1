export const testCasesSeed = [
  {
    id: 'TC-001',
    title: 'Login con credenciales válidas',
    description: 'Validar acceso al dashboard con MFA habilitado',
    status: 'Passed',
    priority: 'Alta',
    sprint: 'S-12',
    userStory: 'US-210',
    steps: ['Abrir login', 'Ingresar credenciales válidas', 'Ingresar código MFA', 'Validar acceso'],
    expectedResult: 'Usuario accede al dashboard'
  },
  {
    id: 'TC-003',
    title: 'MFA expira correctamente',
    description: 'El código debe expirar a los 5 minutos',
    status: 'Blocked',
    priority: 'Alta',
    sprint: 'S-12',
    userStory: 'US-210',
    steps: ['Generar MFA', 'Esperar 5 minutos', 'Ingresar código'],
    expectedResult: 'Mensaje de código expirado'
  },
  {
    id: 'TC-008',
    title: 'Historial ordenes - filtros',
    description: 'Validar filtro por estado en lista de órdenes',
    status: 'In Progress',
    priority: 'Media',
    sprint: 'S-13',
    userStory: 'US-214',
    steps: ['Ingresar a dashboard', 'Seleccionar pestaña órdenes', 'Aplicar filtro'],
    expectedResult: 'Lista filtrada correctamente'
  },
  {
    id: 'TC-011',
    title: 'Exportar reporte órdenes a CSV',
    description: 'Debe descargarse archivo con encabezados correctos',
    status: 'Failed',
    priority: 'Alta',
    sprint: 'S-13',
    userStory: 'US-214',
    steps: ['Ingresar a órdenes', 'Click exportar CSV'],
    expectedResult: 'Se descarga archivo con datos completos'
  }
];
