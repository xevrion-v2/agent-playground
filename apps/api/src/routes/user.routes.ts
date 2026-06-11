// TODO: Implement GET /users - Retrieve paginated list of users with optional search/filter by role, skills, or availability
import { Router } from 'express';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();

// TODO: GET /users - list all users with pagination and filters
// TODO: Add validation for query params (page, limit, search) and return 400 for invalid inputs; return 500 for DB errors

// TODO: GET /users/:id - get public profile for a specific user
router.get('/:id', getUserProfile);
// TODO: PUT /users/:id - update own profile (requires auth)
router.put('/:id', authenticate, updateUserProfile);

// TODO: DELETE /users/:id - soft delete user account; return 404 if user not found, 403 if not owner/admin, 500 on DB failure
// TODO: DELETE /users/:id - delete own account (requires auth)
router.delete('/:id', authenticate, deleteUserAccount);

// TODO: GET /users/:id/tasks - get tasks created or assigned to user
// TODO: Handle case where user has no tasks (return empty array with 200)
// TODO: Return 404 if user ID does not exist; 500 for unexpected errors

export default router;

// TODO: POST /users/:id/verify - trigger email verification or identity verification flow
// TODO: Return 409 if already verified, 404 if user not found, 429 if rate limited