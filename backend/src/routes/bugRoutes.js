import { Router } from 'express';
import { createBug, listBugs } from '../controllers/bugController.js';

const router = Router();

router.get('/', listBugs);
router.post('/', createBug);

export default router;
