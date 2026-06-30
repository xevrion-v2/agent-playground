import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, updateUserSchema, userIdSchema } from '../schemas/user.schema';

const router = Router();

router.get('/search', userController.searchUsers);

// User CRUD
router.post('/', validate(createUserSchema), userController.createUser);
router.get('/:id', userController.getUserById);
router.put('/:id', validate(userIdSchema, 'params'), validate(updateUserSchema), userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;