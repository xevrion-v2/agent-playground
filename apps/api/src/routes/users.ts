import { Router, Request, Response } from "express";
import { createUser, getUsers, getUserCount } from "../services/userService";

const router = Router();

export interface CreateUserBody {
  email: string;
  name?: string;
}

export function validateCreateUser(body: unknown): { valid: boolean; errors: string[]; data?: CreateUserBody } {
  const errors: string[] = [];

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { valid: false, errors: ["Request body must be a JSON object"] };
  }

  const b = body as Record<string, unknown>;

  const email = b.email?.trim();
  if (!email || typeof email !== "string") {
    errors.push("Email is required and must be a string");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("Invalid email format");
  }

  if (b.name !== undefined && typeof b.name !== "string") {
    errors.push("Name must be a string if provided");
  }

  if (b.id !== undefined) {
    // Ignore client-controlled id - will be generated server-side
  }

  // Filter out unknown fields
  const allowedFields = ["email", "name"];
  const unknownFields = Object.keys(b).filter((k) => !allowedFields.includes(k));
  if (unknownFields.length > 0) {
    // We don't error on unknown fields, we just ignore them
  }

  if (errors.length > 0) {
    return { valid: false, errors };
  }

  return {
    valid: true,
    data: {
      email: email.toLowerCase(),
      name: b.name?.trim(),
    },
  };
}

router.get("/", async (_req: Request, res: Response) => {
  try {
    const users = await getUsers(0, 100);
    const count = await getUserCount();
    res.json({
      data: users,
      total: count,
      message: "Users retrieved successfully",
    });
  } catch (error) {
    console.error("Failed to fetch users:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to retrieve users",
    });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const validation = validateCreateUser(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Validation failed",
      details: validation.errors,
    });
  }

  try {
    const user = await createUser(validation.data!.email, validation.data!.name);
    res.status(201).json({
      data: user,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Failed to create user:", error);
    if (error instanceof Error && error.message.includes("Unique constraint")) {
      return res.status(409).json({
        error: "Conflict",
        message: "User with this email already exists",
      });
    }
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to create user",
    });
  }
});

export default router;