// TODO: Implement GET /users - List all users with pagination, filtering by role/skills, and search
import { Router } from 'express';
import { getUserProfile, updateUserProfile, deleteUserAccount } from "../controllers/user.controller";
import { authenticate } from "../middleware/auth";
const router = Router();

// Public routes
// TODO: Implement GET /users/:id - Get public user profile by ID
// TODO: Return 404 if user not found, 400 if invalid ID format
router.get("/:id", getUserProfile);

// Protected routes
// TODO: Implement PATCH /users/me - Update authenticated user's profile
// TODO: Validate request body against UserUpdateSchema (Zod)
// TODO: Return 400 for validation errors, 401 if unauthenticated, 409 if email/username already taken
router.patch("/me", authenticate, updateUserProfile);

// TODO: Implement DELETE /users/me - Soft delete authenticated user's account
// TODO: Cascade: anonymize profile, cancel active tasks, archive proposals
// TODO: Return 401 if unauthenticated, 403 if user has pending disputes, 404 if already deleted
router.delete("/me", authenticate, deleteUserAccount);

// TODO: Implement GET /users/me - Get full authenticated user profile (private fields)
// TODO: Return 401 if unauthenticated, include tasks, proposals, payments, notifications

// TODO: Implement GET /users/search - Search users by name, skills, or category
// TODO: Support query params: q, skills[], category, page, limit, sort
// TODO: Return 400 for invalid query parameters

// TODO: Implement POST /users/:id/verify - Admin-only route to verify freelancer identity
// TODO: Return 403 for non-admin users, 404 if user not found, 409 if already verified

export default router;