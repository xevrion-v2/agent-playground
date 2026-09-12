import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { createUserSchema } from './validation';

const router = Router();

// Create user
router.post('/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: errors.array() 
      });
    }
    // Forward to controller
    next();
  }
);

// Update user
router.put('/:id',
  [
    body('name').optional().isLength({ min: 1 }).withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Valid email is required')
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation Error', 
        details: errors.array() 
      });
    }
    // Forward to controller
    next();
  }
);

export default router;