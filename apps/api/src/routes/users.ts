import { Router } from "express";

const router = Router();

/**
 * TODO(user-routes): Implement full user CRUD operations.
 *
 * Planned routes:
 * - GET    /users          List users with pagination and filtering
 * - POST   /users          Create a new user
 * - GET    /users/:id      Get a single user by ID
 * - PUT    /users/:id      Update an existing user
 * - DELETE /users/:id      Delete a user
 *
 * Common error cases to handle:
 * - 400 Bad Request: Invalid input, missing required fields
 * - 401 Unauthorized: Missing or invalid authentication
 * - 403 Forbidden: Authenticated but lacks permission
 * - 404 Not Found: User ID does not exist
 * - 409 Conflict: Email already registered
 * - 422 Unprocessable Entity: Semantically invalid input
 */

/**
 * TODO(GET /users): Implement user listing.
 *
 * Expected behavior:
 * - Accept query params: page, limit, sort, search, role
 * - Return paginated response with data array and metadata (total, page, limit)
 * - Support filtering by role, status, and creation date range
 * - Support sorting by createdAt, name, email
 *
 * Error cases:
 * - 400: Invalid page or limit values
 * - 401: User not authenticated
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * TODO(POST /users): Implement user creation.
 *
 * Expected behavior:
 * - Validate request body: email (required, unique), name (optional), password (required)
 * - Hash password before storing (use bcrypt or argon2)
 * - Check for duplicate email before creating
 * - Return 201 Created with the new user object (exclude password hash)
 * - Optionally send welcome email
 *
 * Error cases:
 * - 400: Missing required fields or invalid email format
 * - 409: Email already registered
 * - 422: Password does not meet complexity requirements
 * - 500: Database or email service failure
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
 * TODO(GET /users/:id): Implement user retrieval by ID.
 *
 * Expected behavior:
 * - Look up user by ID from the database
 * - Return user object if found
 * - Support ?include=proposals,jobs to include related data
 *
 * Error cases:
 * - 400: Invalid user ID format
 * - 404: User with given ID does not exist
 */
// router.get("/:id", (req, res) => { ... });

/**
 * TODO(PUT /users/:id): Implement user update.
 *
 * Expected behavior:
 * - Validate update fields (email, name, password)
 * - Ensure user can only update their own profile (unless admin)
 * - Re-hash password if changed
 * - Return updated user object
 *
 * Error cases:
 * - 400: Invalid input
 * - 401: Not authenticated
 * - 403: Cannot update another user's profile
 * - 404: User not found
 * - 409: New email already in use
 */
// router.put("/:id", (req, res) => { ... });

/**
 * TODO(DELETE /users/:id): Implement user deletion.
 *
 * Expected behavior:
 * - Soft-delete user (set deletedAt) rather than hard delete
 * - Revoke all active sessions for the deleted user
 * - Admin-only or self-delete only
 * - Return 204 No Content on success
 *
 * Error cases:
 * - 401: Not authenticated
 * - 403: Cannot delete another user (unless admin)
 * - 404: User not found
 */
// router.delete("/:id", (req, res) => { ... });

export default router;
