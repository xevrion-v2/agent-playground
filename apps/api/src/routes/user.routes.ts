// TODO: Implement GET /users - List all users with pagination, filtering by role/skills, and search
import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';

// GET /users - List all users (public, paginated)
// TODO: Add pagination (limit/offset), search by name/email, filter by role/skills
// TODO: Return 400 for invalid query parameters (negative page, invalid sort field)
router.get('/', userController.getUsers);

// GET /users/:id - Get single user by ID
// TODO: Validate UUID format in param, return 404 if user not found
// TODO: Return 400 for invalid UUID format, 404 for non-existent user
router.get('/:id', userController.getUserById);

// PATCH /users/:id - Update user profile (owner or admin only)
// TODO: Prevent role escalation (non-admins cannot change own role)
// TODO: Return 403 if non-owner/non-admin attempts update, 404 if user not found
// TODO: Return 409 if email/username already taken by another user
router.patch('/:id', authenticate, userController.updateUser);

// DELETE /users/:id - Soft delete user (admin only)
// TODO: Implement soft delete, cascade or handle related records
// TODO: Return 403 if non-admin attempts delete, 404 if user not found
// TODO: Consider 409 if user has active tasks/proposals that must be resolved first
router.delete('/:id', authenticate, requireRole('ADMIN'), userController.deleteUser);

// TODO: GET /users/:id/tasks - Get tasks created by or assigned to user
// TODO: GET /users/:id/proposals - Get proposals submitted by user
// TODO: GET /users/:id/reviews - Get reviews for user with pagination
// TODO: POST /users/:id/verify - Trigger email verification flow
// TODO: POST /users/:id/resend-verification - Resend verification email

export default router;