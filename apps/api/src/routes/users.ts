import { Router, Request, Response } from "express";
import { randomUUID } from "crypto";

const router = Router();

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

// In-memory store for demo purposes
const users: Map<string, User> = new Map();

// Validation helper
function validateUserPayload(body: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body must be a JSON object"] };
  }
  
  const payload = body as Record<string, unknown>;
  
  // Check for disallowed fields
  const allowedFields = ["name", "email"];
  const disallowedFields = Object.keys(payload).filter(
    (key) => !allowedFields.includes(key)
  );
  
  if (disallowedFields.length > 0) {
    errors.push(`Disallowed fields: ${disallowedFields.join(", ")}. Only 'name' and 'email' are allowed.`);
  }
  
  // Validate name
  if (!payload.name || typeof payload.name !== "string") {
    errors.push("'name' is required and must be a string");
  } else if (payload.name.trim().length === 0) {
    errors.push("'name' cannot be empty");
  } else if (payload.name.trim().length > 100) {
    errors.push("'name' must be 100 characters or less");
  }
  
  // Validate email
  if (!payload.email || typeof payload.email !== "string") {
    errors.push("'email' is required and must be a string");
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(payload.email)) {
      errors.push("'email' must be a valid email address");
    }
  }
  
  return { valid: errors.length === 0, errors };
}

router.get("/", (_req, res) => {
  const userList = Array.from(users.values());
  res.json({
    data: userList,
    message: userList.length === 0 ? "No users found." : `Found ${userList.length} user(s).`,
  });
});

router.post("/", (req: Request, res: Response) => {
  // Validate the request body
  const validation = validateUserPayload(req.body);
  
  if (!validation.valid) {
    res.status(400).json({
      data: null,
      message: "Validation failed",
      errors: validation.errors,
    });
    return;
  }
  
  // Create user with server-generated id and timestamp
  const { name, email } = req.body;
  const newUser: User = {
    id: randomUUID(),
    name: name.trim(),
    email: email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
  };
  
  users.set(newUser.id, newUser);
  
  res.status(201).json({
    data: newUser,
    message: "User created successfully.",
  });
});

export default router;
