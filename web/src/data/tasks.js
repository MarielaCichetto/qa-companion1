export const taskBoardSeed = {
  columns: {
    todo: {
      id: 'todo',
      title: 'To Do',
      color: 'cobalt',
      items: [
        {
          id: 'card-1',
          title: 'Diseñar smoke suite mobile',
          description: 'Crear checklist de 25 casos críticos para app iOS',
          priority: 'Alta',
          owner: 'Lucía',
          estimate: '5h'
        },
        {
          id: 'card-2',
          title: 'Configurar data de pruebas pagos',
          description: 'Sembrar órdenes mockeadas en entorno QA',
          priority: 'Media',
          owner: 'Marcos',
          estimate: '3h'
        }
      ]
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      color: 'magenta',
      items: [
        {
          id: 'card-3',
          title: 'Automatizar regression API',
          description: 'Migrar colecciones Postman a Newman pipeline',
          priority: 'Alta',
          owner: 'Paula',
          estimate: '8h'
        }
      ]
    },
    done: {
      id: 'done',
      title: 'Done',
      color: 'lime',
      items: [
        {
          id: 'card-4',
          title: 'Refinar test cases checkout',
          description: 'Actualizar pasos y datos para flujo feliz y edge',
          priority: 'Media',
          owner: 'Emilio',
          estimate: '2h'
        }
      ]
    }
  },
  columnOrder: ['todo', 'inProgress', 'done']
};
