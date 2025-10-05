import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('qa-companion.db');

export const ensureTables = () => {
  db.transaction((tx) => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS test_cases (id TEXT PRIMARY KEY NOT NULL, title TEXT, status TEXT, testSet TEXT);'
    );
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS bugs (id TEXT PRIMARY KEY NOT NULL, title TEXT, severity TEXT, priority TEXT);'
    );
  });
};

export const listTestCases = () =>
  new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM test_cases', [], (_, { rows }) => {
        resolve(rows._array);
      });
    });
  });

export const seedTestCases = (items) => {
  db.transaction((tx) => {
    items.forEach((testCase) => {
      tx.executeSql(
        'INSERT OR REPLACE INTO test_cases (id, title, status, testSet) values (?, ?, ?, ?);',
        [testCase.id, testCase.title, testCase.status, testCase.testSet]
      );
    });
  });
};

// Future iterations: add CRUD helpers for bugs, checklists y notas.
