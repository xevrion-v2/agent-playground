import { Router, Request, Response } from "express";
import crypto from "crypto";

const router = Router();

interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

const users: User[] = [];

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  // Reject non-object bodies
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      error: "Invalid request body",
      details: ["Request body must be a JSON object"],
    });
    return;
  }

  const { email, name } = req.body;
  const errors: string[] = [];

  // Validate email
  if (!email || typeof email !== "string") {
    errors.push("Email is required and must be a string");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      errors.push("Email must be a valid email address");
    }
  }

  // Validate name if provided
  if (name !== undefined && name !== null) {
    if (typeof name !== "string") {
      errors.push("Name must be a string if provided");
    } else if (name.trim().length === 0) {
      errors.push("Name must not be empty if provided");
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ error: "Validation failed", details: errors });
    return;
  }

  // Generate server-side ID — ignore client-provided id
  const newUser: User = {
    id: crypto.randomUUID(),
    email: email.trim().toLowerCase(),
    name: name ? name.trim() : email.split("@")[0],
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).json({
    data: newUser,
    message: "User created successfully",
  });
});

export default router;
