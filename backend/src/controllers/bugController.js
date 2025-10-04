import { getDb } from '../models/database.js';

export const listBugs = async (_req, res) => {
  const db = await getDb();
  const items = await db.all('SELECT * FROM bugs ORDER BY id DESC');
  res.json(items);
};

export const createBug = async (req, res) => {
  const db = await getDb();
  const { id, title, description, severity, priority, steps, expectedResult, actualResult } = req.body;
  await db.run(
    `INSERT OR REPLACE INTO bugs (id, title, description, severity, priority, steps, expectedResult, actualResult)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    ,
    [id, title, description, severity, priority, steps, expectedResult, actualResult]
  );
  res.status(201).json({ id, title, description, severity, priority, steps, expectedResult, actualResult });
};

export const updateBug = async (req, res) => {
  const db = await getDb();
  const { title, description, severity, priority, steps, expectedResult, actualResult } = req.body;
  await db.run(
    `UPDATE bugs SET title = ?, description = ?, severity = ?, priority = ?, steps = ?, expectedResult = ?, actualResult = ?
     WHERE id = ?`
    ,
    [title, description, severity, priority, steps, expectedResult, actualResult, req.params.id]
  );
  res.json({ id: req.params.id, title, description, severity, priority, steps, expectedResult, actualResult });
};

export const deleteBug = async (req, res) => {
  const db = await getDb();
  await db.run('DELETE FROM bugs WHERE id = ?', req.params.id);
  res.status(204).end();
};
