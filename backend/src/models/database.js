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
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      passwordHash TEXT,
      language TEXT DEFAULT 'es',
      provider TEXT DEFAULT 'local',
      rememberToken TEXT,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);
  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'todo',
      priority TEXT DEFAULT 'Media',
      owner TEXT,
      tags TEXT,
      estimate TEXT,
      orderIndex INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP
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
  const usersSeed = [
    ['USR-1001', 'Lucía QA', 'lucia.qa@example.com', '$2a$10$uYSgjt6kKiC9JIhbSAVn0uKwxLBzME2YkdE5905EYXPLkZX31lr52', 'es', 'local', null],
    ['USR-1002', 'Marcus Lead', 'marcus.lead@example.com', null, 'en', 'google', null]
  ];
  const tasksSeed = [
    [
      'TASK-7001',
      'Definir plan de smoke release',
      'Actualizar los 25 casos críticos para el próximo corte de producción.',
      'todo',
      'Alta',
      'Lucía',
      'planificación,smoke',
      '5h',
      1
    ],
    [
      'TASK-7002',
      'Validar regresión checkout',
      'Ejecución completa del flujo de compra con cupones y métodos alternativos.',
      'inProgress',
      'Alta',
      'Paula',
      'regresión,checkout',
      '8h',
      1
    ],
    [
      'TASK-7003',
      'Analizar bugs críticos en mobile',
      'Revisar crashlytics y correlacionar con test cases afectados.',
      'done',
      'Media',
      'Emilio',
      'mobile,bugs',
      '3h',
      1
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
    ),
    ...usersSeed.map((values) =>
      db.run(
        `INSERT OR IGNORE INTO users (id, name, email, passwordHash, language, provider, rememberToken)
         VALUES (?, ?, ?, ?, ?, ?, ?)`
        ,
        values
      )
    ),
    ...tasksSeed.map((values) =>
      db.run(
        `INSERT OR IGNORE INTO tasks (id, title, description, status, priority, owner, tags, estimate, orderIndex)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ,
        values
      )
    )
  ]);

  return db;
};
