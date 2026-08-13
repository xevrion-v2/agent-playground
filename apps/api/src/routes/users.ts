import { Router } from "express";
import { errorResponse } from "../utils/errors";

const router = Router();

/**
 * GET /users
 * Retrieves a list of users
 *
 * TODO: Implement user listing from database
 * TODO: Add pagination support (limit, offset)
 * TODO: Add filtering by role/status if needed
 *
 * Error cases:
 * - 401 Unauthorized: If authentication is required
 * - 500 Internal Server Error: If database query fails
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
 * TODO: Store user in database with hashed password
 * TODO: Send verification email
 * TODO: Return full user object without sensitive data
 *
 * Error cases:
 * - 400 Bad Request: Missing required fields
 * - 409 Conflict: Email already exists
 * - 422 Unprocessable Entity: Invalid field formats
 * - 500 Internal Server Error: If database insert fails
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

// Handle unsupported methods for /users route
router.all("/", (_req, res) => {
  res.setHeader("Allow", "GET, POST");
  res.status(405).json({
    error: "Method Not Allowed",
    message: "The requested method is not supported for this endpoint. Supported methods: GET, POST"
  });
});

export default router;
