const testCases = [
  ['TC-001', 'Login con credenciales válidas', 'Passed', 'Autenticación', 'US-01', 'El usuario accede al dashboard'],
  ['TC-002', 'Login con contraseña incorrecta', 'Failed', 'Autenticación', 'US-01', 'Se muestra mensaje de error'],
  ['TC-010', 'Crear bug desde dashboard', 'Blocked', 'Gestión', 'US-05', 'Bug se almacena correctamente']
];

const bugs = [
  ['BUG-101', 'Error 500 al guardar test case', 'Alta', 'Alta', 'Abierto', 'Guardar test case', 'Error 500', 'Ocurre en producción'],
  ['BUG-120', 'No se cargan checklists en Safari', 'Media', 'Media', 'En progreso', 'Checklist visible', 'Pantalla en blanco', 'Revisar compatibilidad']
];

export const seedData = (db) => {
  db.serialize(() => {
    db.all('SELECT COUNT(*) as total FROM test_cases', (err, rows) => {
      if (!err && rows[0].total === 0) {
        const stmt = db.prepare('INSERT INTO test_cases VALUES (?, ?, ?, ?, ?, ?)');
        testCases.forEach((testCase) => stmt.run(testCase));
        stmt.finalize();
      }
    });

    db.all('SELECT COUNT(*) as total FROM bugs', (err, rows) => {
      if (!err && rows[0].total === 0) {
        const stmt = db.prepare('INSERT INTO bugs VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
        bugs.forEach((bug) => stmt.run(bug));
        stmt.finalize();
      }
    });
  });
};
