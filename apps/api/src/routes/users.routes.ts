// TODO: Implement user collection routes - consider merging with user.routes.ts or keeping separate for admin operations
import { Router } from 'express';
import { authenticate, requireAdmin } from '../middleware/auth.middleware';


// Admin-only routes
// router.get('/', authenticate, requireAdmin, getAllUsers);
// TODO: GET /users - Admin endpoint to list all users with filtering, sorting, pagination
// TODO: Support query params: role, isActive, isVerified, createdAfter, createdBefore, sortBy, order, limit, offset
// TODO: Return 403 Forbidden if non-admin attempts access
// TODO: Return 200 with paginated response including total count

// router.patch('/:id/role', authenticate, requireAdmin, updateUserRole);
// TODO: PATCH /users/:id/role - Update user role (client, freelancer, admin)
// TODO: Return 404 Not Found if user does not exist
// TODO: Return 400 Bad Request if role value is invalid
// TODO: Prevent self-demotion from admin to avoid lockout

// router.patch('/:id/status', authenticate, requireAdmin, updateUserStatus);
// TODO: PATCH /users/:id/status - Activate, suspend, or ban a user account
// TODO: Return 409 Conflict if attempting to suspend own admin account
// TODO: Log status changes for audit trail

// router.delete('/:id', authenticate, requireAdmin, deleteUser);
// TODO: DELETE /users/:id - Admin force-delete user account
// TODO: Cascade or reassign user's tasks, proposals, and payments before deletion
// TODO: Return 409 Conflict if user has unresolved disputes or pending payouts

export default router;