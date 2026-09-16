import { Router } from "express";
import { createUserSchema } from "../validators";
import { randomUUID } from "crypto";

const router = Router();

const users: Array<{ id: string; username: string; email: string; displayName?: string; createdAt: Date }> = [];

router.get("/", (_req, res) => {
  res.json({
    data: users,
    message: "User listing"
  });
});

router.post("/", (req, res) => {
  const result = createUserSchema.safeParse(req.body);
  
  if (!result.success) {
    res.status(400).json({
      error: "Validation failed",
      details: result.error.flatten().fieldErrors
    });
    return;
  }

  const user = {
    id: randomUUID(),
    username: result.data.username,
    email: result.data.email,
    displayName: result.data.displayName,
    createdAt: new Date()
  };
  
  users.push(user);

  res.status(201).json({ data: user, message: "User created" });
});

export default router;
