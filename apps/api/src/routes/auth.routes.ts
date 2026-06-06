import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { handleApiError } from '../utils/errorHandler';

const router = Router();

// Example route using the error handler
router.post('/register', (req, res, next) => {
  try {
    // Validation would happen here
    register(req, res, next);
  } catch (error) {
    next(error);
  }
});

router.post('/login', login);

export default router;