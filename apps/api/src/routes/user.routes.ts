import { Router } from 'express';
import * as userController from '../controllers/user.controller';
import { validate } from '../middleware/validate';
import { userCreateSchema, userUpdateSchema, userIdParamSchema } from '../schemas/user.schema';

const router = Router();

router.get('/', userController.getAllUsers);
router.get('/:id', validate({ params: userIdParamSchema }), userController.getUserById);
router.post('/', validate({ body: userCreateSchema }), userController.createUser);
router.put('/:id', validate({ params: userIdParamSchema, body: userUpdateSchema }), userController.updateUser);
router.delete('/:id', validate({ params: userIdParamSchema }), userController.deleteUser);

export default router;