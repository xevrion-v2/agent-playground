import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a list of all registered users.
 *
 * @returns {200} JSON object with an empty data array and a status message.
 *   Currently returns a stub response until the persistence layer is wired up.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user record.
 *
 * @param {object} req.body - The user payload (e.g. name, email).
 * @returns {201} JSON object with a stub user id merged with the request body
 *   and a status message.
 *   Currently returns a stub response until the persistence layer is wired up.
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
