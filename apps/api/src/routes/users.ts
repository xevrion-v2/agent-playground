import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * TODO: Implement user listing with the following behavior:
 * - Support pagination via `?page` and `?limit` query params (default: page=1, limit=20)
 * - Support filtering via `?role` and `?status` query params
 * - Return total count in response metadata for client-side pagination
 * - Return 500 with error message on database failure
 * - Return 400 for invalid query parameter values
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * TODO: Implement user creation with the following behavior:
 * - Validate required fields: `name` (string, 1-100 chars), `email` (valid email format)
 * - Validate optional fields: `role` (one of: admin, user, viewer)
 * - Return 400 with validation error details when required fields are missing or invalid
 * - Return 409 if a user with the same email already exists
 * - Return 500 with error message on database write failure
 * - Sanitize input to prevent XSS (strip HTML tags from name)
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
 * TODO: GET /users/:id
 * - Return user object with all fields (excluding password hash)
 * - Return 404 if user not found
 * - Return 400 if id format is invalid
 *
 * TODO: PUT /users/:id
 * - Update only provided fields (partial update)
 * - Return 404 if user not found
 * - Return 400 for invalid field values
 * - Return 409 on email conflict
 *
 * TODO: DELETE /users/:id
 * - Soft-delete by setting `deleted_at` timestamp
 * - Return 404 if user not found or already deleted
 * - Return 204 on successful deletion
 */

export default router;
