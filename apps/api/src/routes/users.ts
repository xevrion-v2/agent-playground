import { Router } from "express";

const router = Router();

/**
 * Lists all users.
 * @param {import("express").Request} _req - Unused Express request object.
 * @param {import("express").Response} res - Express response object.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Creates a new user.
 * @param {import("express").Request} req - Express request containing the user payload.
 * @param {import("express").Response} res - Express response object.
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
