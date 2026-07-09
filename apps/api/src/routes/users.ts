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
    status: "ok",
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  // Reject non-object bodies
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    res.status(400).json({
      status: "error",
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
    const trimmedEmail = email.trim();
    if (trimmedEmail.length > 254) {
      errors.push("Email must be 254 characters or fewer");
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.push("Email must be a valid email address");
      }
    }
  }

  // Validate name if provided
  if (name != null) {
    if (typeof name !== "string") {
      errors.push("Name must be a string if provided");
    } else {
      const trimmedName = name.trim();
      if (trimmedName.length === 0) {
        errors.push("Name must not be empty if provided");
      } else if (trimmedName.length > 100) {
        errors.push("Name must be 100 characters or fewer");
      }
    }
  }

  if (errors.length > 0) {
    res.status(400).json({ status: "error", error: "Validation failed", details: errors });
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
    status: "ok",
    data: newUser,
    message: "User created successfully",
  });
});

export default router;
