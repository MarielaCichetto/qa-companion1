import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let dbInstance;

export const getDb = async () => {
  if (!dbInstance) {
    dbInstance = await open({
      filename: path.resolve(__dirname, '../../qa-companion.db'),
      driver: sqlite3.Database
    });
  }
  return dbInstance;
};

export const initDb = async () => {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS test_cases (
      id TEXT PRIMARY KEY,
      title TEXT,
      status TEXT,
      testSet TEXT,
      userStory TEXT
    );
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS bugs (
      id TEXT PRIMARY KEY,
      title TEXT,
      description TEXT,
      severity TEXT,
      priority TEXT,
      steps TEXT,
      expectedResult TEXT,
      actualResult TEXT
    );
  `);

  const testCasesSeed = [
    ['TC-001', 'Login success', 'Passed', 'Authentication', 'US-101'],
    ['TC-002', 'Login failure', 'Failed', 'Authentication', 'US-101']
  ];
  const bugsSeed = [
    [
      'BUG-1001',
      'API tester crash',
      'App crashes when payload is large',
      'High',
      'P1',
      '1. Abrir API tester\n2. Enviar request grande',
      'Debería mostrar mensaje amigable',
      'La app se cierra'
    ]
  ];

  await Promise.all([
    ...testCasesSeed.map((values) =>
      db.run(
        'INSERT OR IGNORE INTO test_cases (id, title, status, testSet, userStory) VALUES (?, ?, ?, ?, ?)',
        values
      )
    ),
    ...bugsSeed.map((values) =>
      db.run(
        `INSERT OR IGNORE INTO bugs (id, title, description, severity, priority, steps, expectedResult, actualResult)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        ,
        values
      )
    )
  ]);

  return db;
};
