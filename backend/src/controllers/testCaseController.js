import { getDb } from '../models/database.js';

export const listTestCases = async (_req, res) => {
  const db = await getDb();
  const items = await db.all('SELECT * FROM test_cases ORDER BY id ASC');
  res.json(items);
};

export const createTestCase = async (req, res) => {
  const db = await getDb();
  const { id, title, status, testSet, userStory } = req.body;
  await db.run(
    'INSERT OR REPLACE INTO test_cases (id, title, status, testSet, userStory) VALUES (?, ?, ?, ?, ?)',
    [id, title, status, testSet, userStory]
  );
  res.status(201).json({ id, title, status, testSet, userStory });
};

export const updateTestCase = async (req, res) => {
  const db = await getDb();
  const { title, status, testSet, userStory } = req.body;
  await db.run(
    'UPDATE test_cases SET title = ?, status = ?, testSet = ?, userStory = ? WHERE id = ?',
    [title, status, testSet, userStory, req.params.id]
  );
  res.json({ id: req.params.id, title, status, testSet, userStory });
};

export const deleteTestCase = async (req, res) => {
  const db = await getDb();
  await db.run('DELETE FROM test_cases WHERE id = ?', req.params.id);
  res.status(204).end();
};
