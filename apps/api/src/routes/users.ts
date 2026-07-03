import { Router } from "express";

const router = Router();

type User = {
  id: string;
  name: string;
  email: string;
};

const users: User[] = [];

const createUser = (name: string, email: string): User => {
  return {
    id: `user-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name,
    email
  };
};

router.get("/", (_req, res) => {
  res.json({
    data: users,
    message: "Users fetched."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body ?? {};
  if (typeof name !== "string" || typeof email !== "string" || !name || !email) {
    return res.status(400).json({ message: "name and email are required." });
  }

  const user = createUser(name, email);
  users.push(user);

  res.status(201).json({
    data: user,
    message: "User created."
  });
});

export function resetUsersForTest(): void {
  users.length = 0;
}

export default router;
