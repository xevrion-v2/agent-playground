import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/', userController.listUsers.bind(userController));
router.get('/search', validate('searchUsers'), userController.searchUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));

// Protected routes
router.use(authenticate);
router.put('/:id', validate('updateUser'), userController.updateUser.bind(userController));
router.delete('/:id', validate('deleteUser'), userController.deleteUser.bind(userController));

export default router;