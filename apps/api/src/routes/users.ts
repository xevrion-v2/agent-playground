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
 * Creates a new user. Validates request body before responding.
 * @route POST /users
 * @param {Object} req.body - User creation payload
 * @returns {Object} 201 - { data: { id: string, ...body }, message: string }
 * @returns {Object} 400 - { error: { code: string, message: string } }
 */
router.post("/", (req, res) => {
  // Validate required fields
  if (!req.body.email || typeof req.body.email !== "string") {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "email is required and must be a string",
      },
    });
    return;
  }

  if (!req.body.email.includes("@")) {
    res.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: "email must be a valid email address",
      },
    });
    return;
  }

  // TODO: Check for duplicate email before creating
  // TODO: Hash password before storing
  // TODO: Replace stub with actual database record creation
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
