import { Router } from "express";
import { createUserSchema } from "../schemas/user.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  if (
    req.body === undefined ||
    req.body === null ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    res.status(400).json({
      error: "Request body must be a JSON object.",
    });
    return;
  }

  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues
      .map((i) => `${i.path.join(".") ? `${i.path.join(".")}: ` : ""}${i.message}`)
      .join("; ");
    res.status(400).json({ error: message });
    return;
  }

  const { email, name } = result.data;

  // Stub cuid — real id generation belongs in the data layer.
  const id = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

  res.status(201).json({
    data: {
      id,
      email,
      name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    message: "User created successfully.",
  });
});

export default router;
