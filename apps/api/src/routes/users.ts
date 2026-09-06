import { Router } from "express";
import { errorResponse } from "../utils/errors";

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
  const { email, name } = req.body || {};
  
  // Validate required fields
  if (!email) {
    return errorResponse(res, 400, "Email is required", "Missing required field: email");
  }
  
  // Basic email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return errorResponse(res, 422, "Invalid email format", "Email must be a valid email address");
  }
  
  // Name validation (if provided, must be a non-empty string)
  if (name !== undefined && typeof name !== "string") {
    return errorResponse(res, 422, "Invalid name format", "Name must be a string");
  }
  
  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name: name || null
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
