import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (
    req.body === null ||
    typeof req.body !== "object" ||
    Array.isArray(req.body)
  ) {
    return res.status(400).json({
      message: "Invalid request body"
    });
  }

  const { email, name } = req.body as {
    email?: unknown;
    name?: unknown;
  };

  if (typeof email !== "string") {
    return res.status(400).json({
      message: "Invalid email"
    });
  }

  const normalizedEmail =
    email.trim().toLowerCase();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(normalizedEmail)) {
    return res.status(400).json({
      message: "Invalid email"
    });
  }

  if (
    name !== undefined &&
    typeof name !== "string"
  ) {
    return res.status(400).json({
      message: "Invalid name"
    });
  }

  const normalizedName =
    typeof name === "string"
      ? name.trim()
      : undefined;

  const newUser = {
    id: "stub-user-id",
    email: normalizedEmail,
    name: normalizedName
  };

  return res.status(201).json({
    data: newUser,
    message:
      "User creation is not implemented yet."
  });
});

export default router;
