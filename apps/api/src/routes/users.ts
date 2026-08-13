import { Router } from "express";

const router = Router();

interface CreateUserPayload {
  name?: string;
  email?: string;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body as CreateUserPayload;

  if (!name || typeof name !== "string") {
    return res.status(400).json({
      error: "Invalid or missing 'name' field. Must be a non-empty string.",
    });
  }

  if (!email || typeof email !== "string") {
    return res.status(400).json({
      error: "Invalid or missing 'email' field. Must be a non-empty string.",
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email,
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
