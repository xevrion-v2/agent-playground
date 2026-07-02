import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

/**
 * GET /users
 * 
 * Retrieves all registered users in the system.
 * 
 * @route GET /users
 * @returns {object} 200 - An envelope containing the list of users and a message.
 */
router.get("/", async (_req, res) => {
  const users = await listUsers();
  res.json({
    data: users,
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * 
 * Registers a new user.
 * 
 * @route POST /users
 * @param {object} req.body - The request payload containing registration details.
 * @returns {object} 201 - An envelope containing the created user and a message.
 */
router.post("/", async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

export default router;
