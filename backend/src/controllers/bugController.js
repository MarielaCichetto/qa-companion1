import { getConnection } from '../services/database.js';

export const listBugs = (req, res) => {
  const db = getConnection();
  db.all('SELECT * FROM bugs', (err, rows) => {
    db.close();
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
};

export const createBug = (req, res) => {
  const { id, title, severity, priority, status, expected, actual, notes } = req.body;
  const db = getConnection();
  const stmt = db.prepare('INSERT INTO bugs VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  stmt.run([id, title, severity, priority, status, expected, actual, notes], (err) => {
    stmt.finalize();
    db.close();
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id, title, severity, priority, status, expected, actual, notes });
  });
};
