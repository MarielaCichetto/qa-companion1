import { Router } from 'express';
import {
  listTestCases,
  createTestCase,
  updateTestCase,
  deleteTestCase
} from '../controllers/testCaseController.js';

const router = Router();

router.get('/', listTestCases);
router.post('/', createTestCase);
router.put('/:id', updateTestCase);
router.delete('/:id', deleteTestCase);

export default router;
