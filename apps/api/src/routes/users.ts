import { Router } from "express";
import { BadRequestError, NotFoundError } from "../lib/errors";

const router = Router();

// 模拟数据存储
const users: Array<{ id: string; name: string; email: string }> = [];

router.get("/", (_req, res) => {
  res.json({
    data: users,
    message: users.length === 0 ? "No users found" : "Users retrieved successfully",
  });
});

router.get("/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  if (!user) {
    throw new NotFoundError("User");
  }
  res.json({ data: user });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    throw new BadRequestError("Name is required and must be a non-empty string");
  }
  if (!email || typeof email !== "string" || !email.includes("@")) {
    throw new BadRequestError("A valid email is required");
  }

  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
  };

  users.push(newUser);

  res.status(201).json({
    data: newUser,
    message: "User created successfully",
  });
});

export default router;
