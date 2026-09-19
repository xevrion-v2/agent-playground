import { Router } from "express";

const router = Router();

/**
 * GET /users
 * Retrieves a list of users
 * 
 * Returns an empty array with a stub message since this is not yet implemented.
 * 
 * @param _req - Express request object (unused)
 * @param res - Express response object containing user list data
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a new user with the provided data
 * 
 * @param req - Express request object containing user data in body
 * @param res - Express response object containing the created user data
 * 
 * @returns 201 status with created user data including stub ID
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
