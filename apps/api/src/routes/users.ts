import { Router } from "express";

const router = Router();

/**
 * GET /users
 * @summary Retrieve a list of all users.
 * @description Returns an empty data array with a placeholder message.
 *              Full user listing is not yet implemented.
 * @returns {object} 200 - JSON response with an empty data array and status message.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * @summary Create a new user.
 * @description Accepts a request body with user fields and returns a stub
 *              response containing the generated id merged with the input.
 *              Full user creation logic is not yet implemented.
 * @param {object} req.body - User properties to create.
 * @returns {object} 201 - JSON response with the stub user object and status message.
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
