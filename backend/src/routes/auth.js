import { Router } from 'express';
import { googleSignIn, login, register, updateLanguage } from '../controllers/authController.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleSignIn);
router.patch('/:userId/language', updateLanguage);

export default router;
