import { Router } from "express";
import { userService } from "../services/userService";

const router = Router();

/**
 * GET /users
 * Retrieves a list of all users.
 */
router.get("/", async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.json({
      data: users,
      message: "User listing retrieved successfully."
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * POST /users
 * Creates a new user.
 */
router.post("/", async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({
      data: user,
      message: "User created successfully."
    });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
