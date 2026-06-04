import { Router } from "express";

const router = Router();

/**
 * @summary List all users
 * @description Returns a list of all users. Currently returns an empty array as user listing is not yet implemented.
 * @route GET /users
 * @returns {object} 200 - An object containing an empty data array and a message
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * @summary Create a new user
 * @description Creates a new user with the provided request body. Currently returns a stub response as user creation is not yet implemented.
 * @route POST /users
 * @param {object} req.body - The user data to create
 * @returns {object} 201 - An object containing the created user data stub and a message
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
