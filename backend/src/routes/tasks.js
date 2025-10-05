import { Router } from 'express';
import { createTask, deleteTask, listTasks, reorderTasks, updateTask } from '../controllers/taskController.js';

const router = Router();

router.get('/', listTasks);
router.post('/', createTask);
router.patch('/:taskId', updateTask);
router.delete('/:taskId', deleteTask);
router.put('/reorder', reorderTasks);

export default router;
