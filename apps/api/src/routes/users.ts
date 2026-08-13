/**
 * User Routes Module
 * 
 * Defines HTTP route handlers for user-related endpoints.
 * These routes handle CRUD operations for user accounts.
 * 
 * @module routes/users
 */

import { Router } from "express";
import { getAllUsers, createUser } from "../services/userService";

const router = Router();

/**
 * GET /
 * 
 * Retrieves a list of all users in the system.
 * 
 * @route GET /users
 * @returns {Object} Response object with user data array and message
 * @returns {User[]} response.data - Array of user objects
 * @returns {string} response.message - Status message
 * 
 * @example Response (200):
 * ```json
 * {
 *   "data": [],
 *   "message": "User listing is not implemented yet."
 * }
 * ```
 */
router.get("/", async (_req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      data: users,
      message: users.length === 0 
        ? "User listing is not implemented yet." 
        : `Found ${users.length} users`
    });
  } catch (error) {
    res.status(500).json({
      data: [],
      message: "Error retrieving users",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

/**
 * POST /
 * 
 * Creates a new user account in the system.
 * 
 * @route POST /users
 * @param {Object} req.body - The user data to create
 * @param {string} req.body.email - The user's email address (required)
 * @param {string} req.body.name - The user's display name (required)
 * @param {string} [req.body.role='user'] - The user's role (optional)
 * 
 * @returns {Object} Response object with created user data and message
 * @returns {User} response.data - The created user object
 * @returns {string} response.message - Status message
 * 
 * @example Request:
 * ```json
 * {
 *   "email": "john@example.com",
 *   "name": "John Doe"
 * }
 * ```
 * 
 * @example Response (201):
 * ```json
 * {
 *   "data": {
 *     "id": "user-123",
 *     "email": "john@example.com",
 *     "name": "John Doe",
 *     "role": "user"
 *   },
 *   "message": "User created successfully"
 * }
 * ```
 */
router.post("/", async (req, res) => {
  try {
    const userData = req.body;
    const newUser = await createUser(userData);
    
    res.status(201).json({
      data: newUser,
      message: "User created successfully"
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: "Error creating user",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
});

export default router;
