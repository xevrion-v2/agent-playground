// TODO: Implement GET /users - List all users with pagination and search filters
import { Router } from 'express';
import { getUserProfile, updateUserProfile, deleteUserAccount } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth.middleware';
const router = Router();

// Public routes
// TODO: GET /users/search - Search users by name, skill, or role with query params (q, role, limit, offset)
// TODO: Return 400 Bad Request if search query is missing or invalid
// TODO: Return 200 with empty array if no matches found

// TODO: GET /users/:id - Get public profile for a specific user by ID
// TODO: Return 404 Not Found if user does not exist
// TODO: Return 400 Bad Request if ID is not a valid UUID

// TODO: GET /users/:id/tasks - Get public task history for a user (completed, in-progress)
// TODO: Return 404 Not Found if user does not exist
// TODO: Return 200 with empty array if user has no visible tasks

// Protected routes
router.get('/me', authenticate, getUserProfile);
// TODO: GET /users/me - Get current authenticated user's full profile
// TODO: Return 401 Unauthorized if auth token is missing or invalid
// TODO: Return 200 with user object including private fields

router.patch('/me', authenticate, updateUserProfile);
// TODO: PATCH /users/me - Update current user's profile fields
// TODO: Return 400 Bad Request if update payload contains invalid fields
// TODO: Return 409 Conflict if email/username already taken
// TODO: Return 422 Unprocessable Entity if validation fails (e.g., invalid URL format)

router.delete('/me', authenticate, deleteUserAccount);
// TODO: DELETE /users/me - Soft-delete or hard-delete current user's account
// TODO: Return 409 Conflict if user has active tasks or pending payments
// TODO: Consider returning 204 No Content on successful deletion

export default router;