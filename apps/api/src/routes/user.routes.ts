// TODO: Implement GET /users - List all users with pagination and filtering by role/skills
// TODO: Implement GET /users/:id - Get single user profile with related tasks and reviews
import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';
import { updateUserSchema } from '../validation/user.schema';

const router = Router();

// TODO: Add rate limiting for user search endpoints to prevent abuse
router.get('/', getUsers);

// TODO: Return 404 Not Found when user id does not exist
// TODO: Return 400 Bad Request for invalid MongoDB/ObjectId format
router.get('/:id', getUserById);

// TODO: Implement PUT /users/:id - Full user profile update (admin only)
// TODO: Return 403 Forbidden for non-admin users attempting to update other profiles
// TODO: Return 409 Conflict when email/username already exists
router.patch('/:id', authenticate, validate(updateUserSchema), updateUser);

// TODO: Implement soft delete option (deactivate account) vs hard delete
// TODO: Return 403 Forbidden when user tries to delete another user's account
// TODO: Cascade delete related data: tasks, proposals, reviews, messages
router.delete('/:id', authenticate, deleteUser);

// TODO: Implement GET /users/:id/tasks - Get all tasks created by or assigned to user
// TODO: Implement GET /users/:id/proposals - Get all proposals submitted by user

export default router;