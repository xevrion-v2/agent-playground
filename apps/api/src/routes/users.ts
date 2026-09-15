import { Router } from "express";
import crypto from "crypto";

const router = Router();

interface CreateUserPayload {
  email?: string;
  name?: string;
}

interface User {
  id: string;
  email: string;
  name: string | null;
}

// In-memory user store (placeholder until Prisma is connected)
const users: User[] = [];

router.get("/", (_req, res) => {
  res.json({
    data: users,
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body as CreateUserPayload;

  // Validate required email field
  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({
      error: "Invalid or missing email address",
    });
    return;
  }

  // Validate optional name field
  if (name !== undefined && typeof name !== "string") {
    res.status(400).json({
      error: "Name must be a string",
    });
    return;
  }

  // Generate id server-side — reject client-supplied ids
  const user: User = {
    id: crypto.randomUUID(),
    email: email.trim().toLowerCase(),
    name: name?.trim() ?? null,
  };

  users.push(user);

  res.status(201).json({
    data: user,
  });
});

export default router;
