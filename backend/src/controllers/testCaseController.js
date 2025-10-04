import { getConnection } from '../services/database.js';

export const listTestCases = (req, res) => {
  const db = getConnection();
  db.all('SELECT * FROM test_cases', (err, rows) => {
    db.close();
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const createTestCase = (req, res) => {
  const { id, title, status, test_set, user_story, expected_result } = req.body;
  const db = getConnection();
  const stmt = db.prepare('INSERT INTO test_cases VALUES (?, ?, ?, ?, ?, ?)');
  stmt.run([id, title, status, test_set, user_story, expected_result], (err) => {
    stmt.finalize();
    db.close();
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, title, status, test_set, user_story, expected_result });
  });
};
