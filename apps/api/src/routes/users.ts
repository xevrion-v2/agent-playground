import { Router } from "express";

const router = Router();

/**
 * Handles the GET request to list users.
 * @param {import("express").Request} _req - The express request object.
 * @param {import("express").Response} res - The express response object.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Handles the POST request to create a user.
 * @param {import("express").Request} req - The express request object.
 * @param {import("express").Response} res - The express response object.
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
