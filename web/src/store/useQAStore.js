import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';
import { bugsSeed } from '../data/bugs';
import { testCasesSeed } from '../data/testCases';
import { taskBoardSeed } from '../data/tasks';
import { userStoriesSeed } from '../data/userStories';
import { coverageSeed, kpiSeed, qualityPulseSeed, velocityTrendSeed } from '../data/dashboard';
import { taskService } from '../services/taskService';

const defaultReports = [
  {
    id: 'REP-9001',
    name: 'Sprint 12 - Ejecución',
    type: 'CSV',
    createdAt: '2024-03-17',
    owner: 'Lucía'
  },
  {
    id: 'REP-9002',
    name: 'Cobertura funcional',
    type: 'PDF',
    createdAt: '2024-03-14',
    owner: 'Marcos'
  }
];

const taskStatuses = ['todo', 'inProgress', 'done'];

const seedTasks = taskBoardSeed.columnOrder.flatMap((columnId) =>
  taskBoardSeed.columns[columnId].items.map((item, index) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    status: columnId,
    priority: item.priority,
    owner: item.owner,
    tags: item.tags ?? [],
    estimate: item.estimate,
    orderIndex: index + 1
  }))
);

const buildBoardFromTasks = (tasks = []) => {
  const board = {
    columnOrder: [...taskBoardSeed.columnOrder],
    columns: taskBoardSeed.columnOrder.reduce((acc, columnId) => {
      const seedColumn = taskBoardSeed.columns[columnId];
      acc[columnId] = { ...seedColumn, items: [] };
      return acc;
    }, {})
  };

  tasks.forEach((task) => {
    const columnId = taskStatuses.includes(task.status) ? task.status : 'todo';
    board.columns[columnId].items.push({
      id: task.id,
      title: task.title,
      description: task.description,
      priority: task.priority,
      owner: task.owner,
      tags: Array.isArray(task.tags) ? task.tags : task.tags ? String(task.tags).split(',').filter(Boolean) : [],
      estimate: task.estimate,
      orderIndex: task.orderIndex ?? 0
    });
  });

  board.columnOrder.forEach((columnId) => {
    board.columns[columnId].items.sort((a, b) => (a.orderIndex ?? 0) - (b.orderIndex ?? 0));
  });

  return board;
};

const flattenBoard = (board) =>
  board.columnOrder.flatMap((columnId) =>
    board.columns[columnId].items.map((item, index) => ({
      id: item.id,
      title: item.title,
      description: item.description,
      status: columnId,
      priority: item.priority,
      owner: item.owner,
      tags: item.tags ?? [],
      estimate: item.estimate,
      orderIndex: index + 1
    }))
  );

const cloneBoard = (board) => ({
  columnOrder: [...board.columnOrder],
  columns: board.columnOrder.reduce((acc, columnId) => {
    const column = board.columns[columnId];
    acc[columnId] = {
      ...column,
      items: column.items.map((item) => ({ ...item }))
    };
    return acc;
  }, {})
});

const generateId = (prefix) => `${prefix}-${nanoid(6).toUpperCase()}`;

export const useQAStore = create((set, get) => ({
  loading: true,
  syncError: null,
  kpis: kpiSeed,
  velocityTrend: velocityTrendSeed,
  coverage: coverageSeed,
  qualityPulse: qualityPulseSeed,
  userStories: userStoriesSeed,
  testCases: testCasesSeed,
  bugs: bugsSeed,
  taskBoard: buildBoardFromTasks(seedTasks),
  tasks: seedTasks,
  reports: defaultReports,

  initialize: async () => {
    if (!get().loading) return;
    await get().refreshTasks(true);
    set({ loading: false });
  },

  refreshTasks: async (fromInit = false) => {
    try {
      const tasks = await taskService.fetchTasks();
      set({ taskBoard: buildBoardFromTasks(tasks), tasks, syncError: null });
    } catch (error) {
      console.warn('Falling back to seed tasks', error);
      if (fromInit && !get().tasks?.length) {
        set({ taskBoard: buildBoardFromTasks(seedTasks), tasks: seedTasks });
      }
      set({ syncError: 'tasks' });
    }
  },

  addUserStory: (story) =>
    set((state) => ({
      userStories: [...state.userStories, { ...story, id: story.id || generateId('US') }]
    })),

  linkTestCaseToStory: (storyId, testCaseId) =>
    set((state) => ({
      userStories: state.userStories.map((story) =>
        story.id === storyId && !story.linkedTestCases.includes(testCaseId)
          ? { ...story, linkedTestCases: [...story.linkedTestCases, testCaseId] }
          : story
      )
    })),

  addTestCase: (testCase) =>
    set((state) => ({
      testCases: [...state.testCases, { ...testCase, id: testCase.id || generateId('TC') }]
    })),

  updateTestCaseStatus: (testCaseId, status) =>
    set((state) => ({
      testCases: state.testCases.map((testCase) =>
        testCase.id === testCaseId ? { ...testCase, status } : testCase
      )
    })),

  addBug: (bug) =>
    set((state) => ({
      bugs: [...state.bugs, { ...bug, id: bug.id || generateId('BUG'), createdAt: bug.createdAt || new Date().toISOString() }]
    })),

  updateBugStatus: (bugId, status) =>
    set((state) => ({
      bugs: state.bugs.map((bug) => (bug.id === bugId ? { ...bug, status } : bug))
    })),

  addBugComment: (bugId, comment) =>
    set((state) => ({
      bugs: state.bugs.map((bug) =>
        bug.id === bugId
          ? {
              ...bug,
              comments: [
                ...(bug.comments || []),
                {
                  id: generateId('CMT'),
                  message: comment,
                  createdAt: new Date().toISOString()
                }
              ]
            }
          : bug
      )
    })),

  createTaskCard: async (columnId, card) => {
    const payload = {
      title: card.title,
      description: card.description,
      status: columnId,
      priority: card.priority,
      owner: card.owner,
      tags: card.tags ?? [],
      estimate: card.estimate
    };
    const created = await taskService.createTask(payload);
    set((state) => {
      const tasks = [...state.tasks, created];
      return { taskBoard: buildBoardFromTasks(tasks), tasks, syncError: null };
    });
    return created;
  },

  updateTaskCard: async (taskId, updates) => {
    const updated = await taskService.updateTask(taskId, updates);
    set((state) => {
      const tasks = state.tasks.map((task) => (task.id === taskId ? { ...task, ...updated } : task));
      return { taskBoard: buildBoardFromTasks(tasks), tasks, syncError: null };
    });
    return updated;
  },

  deleteTaskCard: async (taskId) => {
    await taskService.deleteTask(taskId);
    set((state) => {
      const tasks = state.tasks.filter((task) => task.id !== taskId);
      return { taskBoard: buildBoardFromTasks(tasks), tasks };
    });
  },

  moveTaskCard: async ({ source, destination }) => {
    if (!destination) return;
    const previous = get();
    const boardCopy = cloneBoard(previous.taskBoard);
    const sourceColumn = boardCopy.columns[source.droppableId];
    const destColumn = boardCopy.columns[destination.droppableId];
    const [moved] = sourceColumn.items.splice(source.index, 1);
    destColumn.items.splice(destination.index, 0, moved);

    const stagedTasks = flattenBoard(boardCopy);
    set({ taskBoard: boardCopy, tasks: stagedTasks });

    try {
      const updates = stagedTasks.map((task) => ({ id: task.id, status: task.status, orderIndex: task.orderIndex }));
      const tasks = await taskService.reorderTasks(updates);
      set({ taskBoard: buildBoardFromTasks(tasks), tasks, syncError: null });
    } catch (error) {
      console.error('Failed to persist task reorder', error);
      set({ taskBoard: buildBoardFromTasks(previous.tasks), tasks: previous.tasks, syncError: 'tasks' });
    }
  },

  addReport: (report) =>
    set((state) => ({
      reports: [{ ...report, id: report.id || generateId('REP') }, ...state.reports]
    }))
}));
