import { Router } from "express";
import { getUsers, createUser } from "../services/userService";

const router = Router();

router.get("/", (_req, res) => {
  const users = getUsers();
  res.json({ data: users, message: "Users retrieved successfully." });
});

router.get("/:id", (req, res) => {
  res.json({ data: null, message: `TODO: Get user by ID ${req.params.id}` });
});

router.post("/", (req, res) => {
  const user = createUser(req.body);
  res.status(201).json({ data: user, message: "User created successfully." });
});

router.put("/:id", (req, res) => {
  res.json({ data: null, message: `TODO: Update user ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.json({ data: null, message: `TODO: Delete user ${req.params.id}` });
});

export default router;
