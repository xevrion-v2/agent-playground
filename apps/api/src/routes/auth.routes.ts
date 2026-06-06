import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { sendApiError } from '../utils/apiError';

const router = Router();

router.post('/register', register);
router.post('/login', login);

export default router;
router.post('/register', register);
export default router;