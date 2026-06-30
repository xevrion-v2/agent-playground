import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, updateUserSchema, userIdSchema } from '../schemas/user.schema';

const router = Router();
const userController = new UserController();
router.get('/', userController.getAllUsers.bind(userController));

// Get user by ID
router.get('/:id', validate(userIdSchema, 'params'), userController.getUserById.bind(userController));

// Create user
router.post('/', validate(createUserSchema, 'body'), userController.createUser.bind(userController));

// Update user
router.put('/:id', validate(userIdSchema, 'params'), validate(updateUserSchema, 'body'), userController.updateUser.bind(userController));

// Delete user
router.delete('/:id', validate(userIdSchema, 'params'), userController.deleteUser.bind(userController));

export default router;