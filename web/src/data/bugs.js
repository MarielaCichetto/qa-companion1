export const bugsSeed = [
  {
    id: 'BUG-1001',
    title: 'Crash on API tester when response > 5MB',
    severity: 'High',
    priority: 'P1',
    status: 'Open',
    stepsToReproduce: [
      'Open API Tester',
      'Send GET request to /reports endpoint',
      'Observe application crash'
    ],
    expectedResult: 'App should display error toast',
    actualResult: 'App closes unexpectedly'
  },
  {
    id: 'BUG-1002',
    title: 'Checklist items not persisting',
    severity: 'Medium',
    priority: 'P2',
    status: 'In Progress',
    stepsToReproduce: [
      'Open smoke checklist',
      'Mark item as done',
      'Reload page'
    ],
    expectedResult: 'Item remains checked',
    actualResult: 'Item resets to unchecked'
  }
];
