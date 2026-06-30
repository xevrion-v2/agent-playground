import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of users. Currently returns an empty array with a placeholder message.
 * @route GET /users
 * @returns {Object} 200 - { data: [], message: string }
 */
router.get("/", (_req, res) => {
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
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
