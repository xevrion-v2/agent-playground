import { Router, Request, Response } from "express";

const router = Router();

/**
 * @route GET /api/users
 * @description Get all users
 * @access Public
 * @returns {Object} List of users
 */
router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * @route POST /api/users
 * @description Create a new user
 * @access Public
 * @body {string} username - User's username
 * @body {string} email - User's email
 * @returns {Object} Created user data
 */
router.post("/", (req: Request, res: Response) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

/**
 * @route GET /api/users/:id
 * @description Get user by ID
 * @access Public
 * @param {string} id - User ID
 * @returns {Object} User data
 */
router.get("/:id", (req: Request, res: Response) => {
  res.json({
    data: {
      id: req.params.id,
      name: "Stub User",
      email: "stub@example.com"
    },
    message: "User retrieval is not implemented yet."
  });
});

/**
 * @route PUT /api/users/:id
 * @description Update user by ID
 * @access Public
 * @param {string} id - User ID
 * @body {string} username - Updated username
 * @body {string} email - Updated email
 * @returns {Object} Updated user data
 */
router.put("/:id", (req: Request, res: Response) => {
  res.json({
    data: {
      id: req.params.id,
      ...req.body
    },
    message: "User update is not implemented yet."
  });
});

/**
 * @route DELETE /api/users/:id
 * @description Delete user by ID
 * @access Public
 * @param {string} id - User ID
 * @returns {null} No content
 */
router.delete("/:id", (req: Request, res: Response) => {
  res.status(204).send();
});

export default router;
