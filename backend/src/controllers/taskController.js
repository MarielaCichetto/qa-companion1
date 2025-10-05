import { nanoid } from 'nanoid';
import { getDb } from '../models/database.js';

const serializeTags = (tags) => {
  if (Array.isArray(tags)) {
    return tags.join(',');
  }
  if (typeof tags === 'string') {
    return tags;
  }
  return '';
};

const presentTask = (row) => ({
  id: row.id,
  title: row.title,
  description: row.description ?? '',
  status: row.status ?? 'todo',
  priority: row.priority ?? 'Media',
  owner: row.owner ?? '',
  tags: row.tags ? row.tags.split(',').filter(Boolean) : [],
  estimate: row.estimate ?? '',
  orderIndex: row.orderIndex ?? 0,
  createdAt: row.createdAt
});

export const listTasks = async (_req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM tasks ORDER BY status, orderIndex, createdAt DESC');
    res.json({ tasks: rows.map(presentTask) });
  } catch (error) {
    console.error('listTasks error', error);
    res.status(500).json({ message: 'Failed to fetch tasks.' });
  }
};

export const createTask = async (req, res) => {
  const { title, description = '', status = 'todo', priority = 'Media', owner = '', tags = [], estimate = '' } = req.body ?? {};
  if (!title) {
    return res.status(400).json({ message: 'Title is required.' });
  }

  try {
    const db = await getDb();
    const id = `TASK-${nanoid(8).toUpperCase()}`;
    const normalizedStatus = ['todo', 'inProgress', 'done'].includes(status) ? status : 'todo';
    const maxOrderRow = await db.get('SELECT COALESCE(MAX(orderIndex), 0) as maxOrder FROM tasks WHERE status = ?', [normalizedStatus]);
    const nextOrder = (maxOrderRow?.maxOrder ?? 0) + 1;
    await db.run(
      `INSERT INTO tasks (id, title, description, status, priority, owner, tags, estimate, orderIndex)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ,
      [id, title.trim(), description.trim(), normalizedStatus, priority, owner.trim(), serializeTags(tags), estimate, nextOrder]
    );
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', [id]);
    res.status(201).json({ task: presentTask(task) });
  } catch (error) {
    console.error('createTask error', error);
    res.status(500).json({ message: 'Failed to create task.' });
  }
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const { title, description, status, priority, owner, tags, estimate, orderIndex } = req.body ?? {};
  if (!taskId) {
    return res.status(400).json({ message: 'Task id is required.' });
  }

  try {
    const db = await getDb();
    const existing = await db.get('SELECT * FROM tasks WHERE id = ?', [taskId]);
    if (!existing) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    const payload = {
      title: title ?? existing.title,
      description: description ?? existing.description,
      status: status ? (['todo', 'inProgress', 'done'].includes(status) ? status : existing.status) : existing.status,
      priority: priority ?? existing.priority,
      owner: owner ?? existing.owner,
      tags: tags !== undefined ? serializeTags(tags) : existing.tags,
      estimate: estimate ?? existing.estimate,
      orderIndex: orderIndex ?? existing.orderIndex
    };

    await db.run(
      `UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, owner = ?, tags = ?, estimate = ?, orderIndex = ?
       WHERE id = ?`
      ,
      [payload.title, payload.description, payload.status, payload.priority, payload.owner, payload.tags, payload.estimate, payload.orderIndex, taskId]
    );
    const task = await db.get('SELECT * FROM tasks WHERE id = ?', [taskId]);
    res.json({ task: presentTask(task) });
  } catch (error) {
    console.error('updateTask error', error);
    res.status(500).json({ message: 'Failed to update task.' });
  }
};

export const deleteTask = async (req, res) => {
  const { taskId } = req.params;
  if (!taskId) {
    return res.status(400).json({ message: 'Task id is required.' });
  }

  try {
    const db = await getDb();
    await db.run('DELETE FROM tasks WHERE id = ?', [taskId]);
    res.status(204).end();
  } catch (error) {
    console.error('deleteTask error', error);
    res.status(500).json({ message: 'Failed to delete task.' });
  }
};

export const reorderTasks = async (req, res) => {
  const { updates } = req.body ?? {};
  if (!Array.isArray(updates)) {
    return res.status(400).json({ message: 'Updates array is required.' });
  }

  const db = await getDb();
  try {
    await db.run('BEGIN TRANSACTION');
    for (const update of updates) {
      if (!update?.id) continue;
      const normalizedStatus = update.status && ['todo', 'inProgress', 'done'].includes(update.status) ? update.status : undefined;
      await db.run(
        `UPDATE tasks SET status = COALESCE(?, status), orderIndex = COALESCE(?, orderIndex) WHERE id = ?`
        ,
        [normalizedStatus, update.orderIndex ?? null, update.id]
      );
    }
    await db.run('COMMIT');
    const rows = await db.all('SELECT * FROM tasks ORDER BY status, orderIndex, createdAt DESC');
    res.json({ tasks: rows.map(presentTask) });
  } catch (error) {
    console.error('reorderTasks error', error);
    await db.run('ROLLBACK');
    res.status(500).json({ message: 'Failed to reorder tasks.' });
  }
};
