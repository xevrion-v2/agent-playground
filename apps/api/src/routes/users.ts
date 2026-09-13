import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Retrieves a list of all registered users.
 * Currently returns a stub response indicating the feature is not yet implemented.
 *
 * @route GET /users
 * @returns {object} 200 - An object containing an empty user array and a descriptive message.
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
 * Creates a new user with the data provided in the request body.
 * Currently returns a stub response — the user is not persisted.
 *
 * @route POST /users
 * @param {object} req.body - The user payload to create.
 * @returns {object} 201 - An object containing a stub user record (with a generated id) and a descriptive message.
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
