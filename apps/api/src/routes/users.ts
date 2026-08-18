import { Router } from "express";

const router = Router();

/**
 * TODO: Implement user listing with pagination, filtering, and sorting
 * - Add query params: page, limit, sort, order, search
 * - Integrate with Prisma User model
 * - Add proper error handling
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * TODO: Implement user creation with validation
 * - Validate email format and uniqueness
 * - Hash password with bcrypt
 * - Generate JWT token on creation
 * - Send welcome email notification
 */
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

/**
 * TODO: GET /users/:id - Get user by ID
 * - Fetch user from database
 * - Return 404 if not found
 * - Exclude sensitive fields (password hash)
 */

/**
 * TODO: PUT /users/:id - Update user
 * - Validate input with Zod schema
 * - Check authorization (user can only update own profile)
 * - Return updated user
 */

/**
 * TODO: DELETE /users/:id - Delete user
 * - Soft delete (set deletedAt timestamp)
 * - Cascade delete related data
 * - Return 204 No Content
 */

export default router;
