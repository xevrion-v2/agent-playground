import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { z } from 'zod';

const router = Router();

router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

const userIdSchema = z.object({
  id: z.string().uuid('Invalid user ID format'),
});

const createUserSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
  }),
});

const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid('Invalid user ID format'),
  }),
  body: z.object({
    email: z.string().email('Invalid email format').optional(),
    name: z.string().min(1, 'Name is required').max(100, 'Name too long').optional(),
  }),
});

// Apply validation to routes
router.post('/', validate(createUserSchema), userController.createUser);
router.get('/:id', validate(z.object({ params: userIdSchema })), userController.getUserById);
router.put('/:id', validate(updateUserSchema), userController.updateUser);
router.delete('/:id', validate(z.object({ params: userIdSchema })), userController.deleteUser);

// Remove or comment out old unvalidated routes
// router.post('/', userController.createUser);
// router.get('/:id', userController.getUserById);
// router.put('/:id', userController.updateUser);
// router.delete('/:id', userController.deleteUser);

export default router;