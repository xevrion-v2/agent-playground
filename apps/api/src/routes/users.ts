import { Router } from "express";

const router = Router();

// Store users in memory for tests
const users: any[] = [];

router.get("/", (_req, res) => {
  res.json({
    data: users,
    message: "User listing retrieved."
  });
});

router.post("/", (req, res) => {
  const newUser = {
    id: `user-${Date.now()}`,
    ...req.body
  };
  users.push(newUser);
  res.status(201).json({
    data: newUser,
    message: "User created."
  });
});

export default router;
