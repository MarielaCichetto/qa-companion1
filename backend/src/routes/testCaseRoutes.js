import { Router } from 'express';
import { createTestCase, listTestCases } from '../controllers/testCaseController.js';

const router = Router();

router.get('/', listTestCases);
router.post('/', createTestCase);

export default router;
