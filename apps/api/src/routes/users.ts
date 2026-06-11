import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Returns a list of users.
 * Currently not implemented; returns an empty array with a placeholder message.
 *
 * @param _req - Express request object (unused).
 * @param res - Express response object.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user.
 * Currently not implemented; echoes back the provided data with a stub ID and a placeholder message.
 *
 * @param req - Express request object containing the user data in the body.
 * @param res - Express response object.
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
