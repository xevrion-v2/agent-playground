// TODO: Implement GET /users - List all users with pagination, filtering by role/skills, and search
import { Router } from 'express';
import {
  getUserById,

const router = Router();

// TODO: GET /users - Return paginated list of users; support query params: page, limit, role, search
// TODO: Handle error case: invalid pagination params should return 400 Bad Request
router.get('/', getAllUsers);

// TODO: GET /users/:id - Return single user profile by ID; include related skills and tasks
// TODO: Handle error case: user not found should return 404 Not Found
// TODO: Handle error case: invalid UUID format should return 400 Bad Request
router.get('/:id', getUserById);

// TODO: POST /users - Create new user account; validate required fields (email, password, role)
// TODO: Handle error case: duplicate email should return 409 Conflict
// TODO: Handle error case: weak password should return 400 Bad Request with validation details
router.post('/', createUser);

// TODO: PUT /users/:id - Update user profile; restrict fields based on auth role (user can only update self, admin can update any)
// TODO: Handle error case: unauthorized update attempt should return 403 Forbidden
// TODO: Handle error case: attempting to change immutable fields (email) should return 400 Bad Request
router.put('/:id', updateUser);

// TODO: DELETE /users/:id - Soft delete user account; only admins or the user themselves can delete
// TODO: Handle error case: unauthorized delete should return 403 Forbidden
// TODO: Handle error case: already deleted user should return 410 Gone
router.delete('/:id', deleteUser);

export default router;