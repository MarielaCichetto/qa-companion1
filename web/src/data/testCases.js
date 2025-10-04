const testCases = [
  {
    id: 'TC-001',
    title: 'Login con credenciales válidas',
    status: 'Passed',
    set: 'Autenticación',
    userStory: 'US-01',
    steps: ['Ingresar usuario válido', 'Ingresar contraseña válida', 'Presionar login'],
    expectedResult: 'El usuario accede al dashboard'
  },
  {
    id: 'TC-002',
    title: 'Login con contraseña incorrecta',
    status: 'Failed',
    set: 'Autenticación',
    userStory: 'US-01',
    steps: ['Ingresar usuario válido', 'Ingresar contraseña inválida', 'Presionar login'],
    expectedResult: 'Se muestra mensaje de error'
  },
  {
    id: 'TC-010',
    title: 'Crear bug desde dashboard',
    status: 'Blocked',
    set: 'Gestión',
    userStory: 'US-05',
    steps: ['Abrir módulo de bugs', 'Presionar nuevo bug', 'Completar formulario', 'Guardar'],
    expectedResult: 'Bug se almacena y se muestra en la lista'
  }
];

export default testCases;
