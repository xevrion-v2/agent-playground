/**
 * User routes module.
 * Defines REST endpoints for user listing and creation.
 * Current implementations are stubs pending service-layer integration.
 */
import { Router } from "express";

const router = Router();

/**
 * Get a list of users.
 * @route GET /
 * @returns {object} 200 - Array of users (currently empty stub).
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user.
 * @route POST /
 * @param {object} req.body - User payload forwarded as the created record.
 * @returns {object} 201 - Stub user object echoing the submitted body.
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
