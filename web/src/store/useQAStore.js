import { create } from 'zustand';
import { nanoid } from 'nanoid/non-secure';
import { bugsSeed } from '../data/bugs';
import { testCasesSeed } from '../data/testCases';
import { taskBoardSeed } from '../data/tasks';
import { userStoriesSeed } from '../data/userStories';
import { coverageSeed, kpiSeed, qualityPulseSeed, velocityTrendSeed } from '../data/dashboard';

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

const generateId = (prefix) => `${prefix}-${nanoid(6).toUpperCase()}`;

export const useQAStore = create((set, get) => ({
  loading: true,
  kpis: kpiSeed,
  velocityTrend: velocityTrendSeed,
  coverage: coverageSeed,
  qualityPulse: qualityPulseSeed,
  userStories: userStoriesSeed,
  testCases: testCasesSeed,
  bugs: bugsSeed,
  taskBoard: taskBoardSeed,
  reports: defaultReports,

  initialize: () => {
    set({ loading: false });
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

  createTaskCard: (columnId, card) =>
    set((state) => ({
      taskBoard: {
        ...state.taskBoard,
        columns: {
          ...state.taskBoard.columns,
          [columnId]: {
            ...state.taskBoard.columns[columnId],
            items: [
              ...state.taskBoard.columns[columnId].items,
              { ...card, id: card.id || generateId('CARD') }
            ]
          }
        }
      }
    })),

  deleteTaskCard: (columnId, cardId) =>
    set((state) => ({
      taskBoard: {
        ...state.taskBoard,
        columns: {
          ...state.taskBoard.columns,
          [columnId]: {
            ...state.taskBoard.columns[columnId],
            items: state.taskBoard.columns[columnId].items.filter((item) => item.id !== cardId)
          }
        }
      }
    })),

  moveTaskCard: ({ source, destination }) => {
    if (!destination) return;

    const state = get();
    const sourceColumn = state.taskBoard.columns[source.droppableId];
    const destColumn = state.taskBoard.columns[destination.droppableId];
    const sourceItems = Array.from(sourceColumn.items);
    const [moved] = sourceItems.splice(source.index, 1);
    const destinationItems = Array.from(destColumn.items);
    destinationItems.splice(destination.index, 0, moved);

    set({
      taskBoard: {
        ...state.taskBoard,
        columns: {
          ...state.taskBoard.columns,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destinationItems
          }
        }
      }
    });
  },

  addReport: (report) =>
    set((state) => ({
      reports: [{ ...report, id: report.id || generateId('REP') }, ...state.reports]
    }))
}));
