import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of users. Currently returns an empty array with a placeholder message.
 * @route GET /users
 * @returns {Object} 200 - { data: [], message: string }
 */
router.get("/", (_req, res) => {
  // TODO: Replace stub with actual database query using Prisma
  // TODO: Add pagination support (offset/limit query params)
  // TODO: Implement filtering by role, status, or search term
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user. Currently returns a stub user ID with submitted fields.
 * @route POST /users
 * @param {Object} req.body - User creation payload
 * @returns {Object} 201 - { data: { id: string, ...body }, message: string }
 */
router.post("/", (req, res) => {
  // TODO: Add Zod validation schema for request body
  // TODO: Check for duplicate email before creating
  // TODO: Hash password before storing
  // TODO: Replace stub with actual database record creation
  // TODO: Return the created user record from database
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
