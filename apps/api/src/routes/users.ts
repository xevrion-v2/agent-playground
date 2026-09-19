import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieves a list of all users.
 *
 * @param {import("express").Request} _req - Express request object (unused)
 * @param {import("express").Response} res - Express response object
 * @returns {void} Sends JSON response with user data array
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided request body data.
 *
 * @param {import("express").Request} req - Express request object containing user data in body
 * @param {import("express").Response} res - Express response object
 * @returns {void} Sends JSON response with created user stub data
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
