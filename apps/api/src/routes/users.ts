import { Router } from "express";

const router = Router();

/**
 * List all users.
 *
 * Returns an empty placeholder array until the user store is implemented.
 *
 * @route   GET /users
 * @returns {{ data: never[]; message: string }} Empty user listing stub
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user.
 *
 * Accepts a JSON body and returns a stub user object. Only the `name` and
 * `email` fields are extracted from the request body to prevent mass
 * assignment of unintended properties.
 *
 * @route   POST /users
 * @param   {string} req.body.name  - Display name for the new user
 * @param   {string} req.body.email - Email address for the new user
 * @returns {{ data: { id: string; name?: string; email?: string }; message: string }}
 */
router.post("/", (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
