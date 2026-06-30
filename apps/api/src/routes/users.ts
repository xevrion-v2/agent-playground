import { Router } from "express";

const router = Router();

/**
 * GET /users - List all users
 * 
 * TODO: Implement user listing with the following features:
 * - Pagination (query params: page, limit)
 * - Filtering (query params: name, email)
 * - Sorting (query params: sortBy, order)
 * - Search functionality (query param: q)
 * - Return user count in response metadata
 * 
 * Example response:
 * {
 *   data: User[],
 *   meta: { total: number, page: number, limit: number }
 * }
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * GET /users/:id - Get user by ID
 * 
 * TODO: Implement user retrieval by ID
 * - Validate UUID format
 * - Return 404 if user not found
 * - Include proper error handling
 * 
 * Example response:
 * {
 *   data: User,
 *   message: string
 * }
 */
router.get("/:id", (req, res) => {
  res.status(501).json({
    data: null,
    message: "Get user by ID is not implemented yet."
  });
});

/**
 * PUT /users/:id - Update user
 * 
 * TODO: Implement user update with:
 * - Validate UUID format
 * - Validate update payload (partial user fields)
 * - Return 404 if user not found
 * - Return updated user object
 * - Prevent updating id or createdAt fields
 * 
 * Example response:
 * {
 *   data: User,
 *   message: string
 * }
 */
router.put("/:id", (req, res) => {
  res.status(501).json({
    data: null,
    message: "Update user is not implemented yet."
  });
});

/**
 * DELETE /users/:id - Delete user
 * 
 * TODO: Implement user deletion with:
 * - Validate UUID format
 * - Return 404 if user not found
 * - Return success message
 * - Consider soft delete vs hard delete
 * 
 * Example response:
 * {
 *   data: null,
 *   message: string
 * }
 */
router.delete("/:id", (req, res) => {
  res.status(501).json({
    data: null,
    message: "Delete user is not implemented yet."
  });
});

/**
 * POST /users - Create new user
 * 
 * TODO: Implement user creation with:
 * - Validate required fields (name, email)
 * - Validate email format
 * - Check for duplicate emails
 * - Generate UUID for user id
 * - Set createdAt timestamp
 * - Return 201 with created user
 * - Handle database errors gracefully
 * 
 * Example response:
 * {
 *   data: User,
 *   message: string
 * }
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

export default router;
