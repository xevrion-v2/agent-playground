import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieves a list of registered users.
 * Currently returns a placeholder response until the service layer is implemented.
 *
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user record.
 * Currently returns a placeholder response mirroring the request body.
 *
 * @param {import("express").Request} req - Express request object containing user data
 * @param {import("express").Response} res - Express response object
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
