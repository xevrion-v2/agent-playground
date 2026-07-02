import { Router } from "express";

const router = Router();

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const readRequiredString = (body: Record<string, unknown>, field: string): string | null => {
  const value = body[field];

  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!isRecord(req.body)) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Request body must be a JSON object."
    });
  }

  const name = readRequiredString(req.body, "name");
  const email = readRequiredString(req.body, "email");

  if (!name || !email || !email.includes("@")) {
    return res.status(400).json({
      error: "Validation failed",
      message: "Name and a valid email address are required."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
      name,
      email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
