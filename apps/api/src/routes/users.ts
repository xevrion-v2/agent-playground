import { Router } from "express";
import { createUser, listUsers } from "../services/userService";

const router = Router();

router.get("/", async (_req, res) => {
  const users = await listUsers();
  res.json({
    data: users,
    message: "Users retrieved successfully."
  });
});

router.post("/", async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      data: user,
      message: "User created successfully."
    });
  } catch (err) {
    res.status(400).json({
      data: null,
      message: err instanceof Error ? err.message : "Failed to create user."
    });
  }
});

export default router;
