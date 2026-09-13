import { Router } from "express";
import { getUsers, createUser } from "../services/userService";

const router = Router();

router.get("/", (_req, res) => {
  const users = getUsers();
  res.json({ data: users, message: "Users retrieved successfully." });
});

router.post("/", (req, res) => {
  const user = createUser(req.body);
  res.status(201).json({ data: user, message: "User created successfully." });
});

export default router;
