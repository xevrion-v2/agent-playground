// TODO: Implement GET /users - List all users with pagination, filtering by role/skills, and search
import { Router } from 'express';
import { authenticate, requireRole } from '../middleware/auth';
import { validate } from '../middleware/validation';

router.use(authenticate);

// TODO: GET /users - Return paginated user list with query params: page, limit, search, role, skills
// TODO: Error case: Return 400 for invalid query parameters (negative page, invalid UUID format for skills)
// TODO: Error case: Return 403 if non-admin requests list of users with admin-only filters
router.get('/', requireRole(['admin', 'client', 'freelancer']), (req, res) => {
  res.status(200).json({ message: 'List users' });
});

// TODO: GET /users/:id - Return single user profile with populated skills, reviews, and task history
// TODO: Error case: Return 404 if user ID does not exist
// TODO: Error case: Return 400 if user ID is not a valid UUID
router.get('/:id', (req, res) => {
  res.status(200).json({ message: `Get user ${req.params.id}` });
});

// TODO: PUT /users/:id - Update user profile fields (name, bio, avatar, skills, hourlyRate)
// TODO: Error case: Return 403 if authenticated user is not the owner or admin
// TODO: Error case: Return 409 if email change conflicts with existing user
// TODO: Error case: Return 400 if skills array contains invalid skill IDs
router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update user ${req.params.id}` });
});

// TODO: DELETE /users/:id - Soft delete user account (set isActive=false, anonymize PII)
// TODO: Error case: Return 403 if authenticated user is not the owner or admin
// TODO: Error case: Return 409 if user has active tasks or pending payments
// TODO: Error case: Return 404 if user ID does not exist
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

// TODO: GET /users/:id/tasks - Return tasks associated with user (created or assigned based on role)
// TODO: Error case: Return 403 if requesting tasks of another user without permission
// TODO: GET /users/:id/reviews - Return reviews received by user with pagination
// TODO: Error case: Return 404 if user ID does not exist

export default router;