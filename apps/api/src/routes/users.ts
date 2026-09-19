import { Router } from "express";

const router = Router();

/**
 * List users.
 *
 * @route GET /users
 * @param {import("express").Request} _req - Unused request object.
 * @param {import("express").Response} res - Express response used to return the payload.
 * @returns {object} JSON with a `data` array and a human-readable `message`.
 * @remarks Not implemented yet: currently returns an empty list.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a user.
 *
 * @route POST /users
 * @param {import("express").Request} req - Request whose body is spread into the created user.
 * @param {import("express").Response} res - Express response used to return the payload.
 * @returns {object} JSON with the created user stub and a `message`.
 * @remarks Not implemented yet: returns a stub user id.
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
