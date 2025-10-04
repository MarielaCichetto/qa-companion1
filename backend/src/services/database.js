import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import { seedData } from '../data/seed.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../../qa-companion.db');

export const createDatabase = () => {
  const db = new sqlite3.Database(dbPath);

  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS test_cases (
        id TEXT PRIMARY KEY,
        title TEXT,
        status TEXT,
        test_set TEXT,
        user_story TEXT,
        expected_result TEXT
      )`
    );

    db.run(
      `CREATE TABLE IF NOT EXISTS bugs (
        id TEXT PRIMARY KEY,
        title TEXT,
        severity TEXT,
        priority TEXT,
        status TEXT,
        expected TEXT,
        actual TEXT,
        notes TEXT
      )`
    );

    seedData(db);
  });

  return db;
};

export const getConnection = () => new sqlite3.Database(dbPath);
