import { Router, Request, Response } from "express";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_FIELDS = new Set(["name", "email"]);

function validateCreateUser(body: unknown): { name: string; email: string } | { error: string } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { error: "Request body must be a JSON object." };
  }

  const record = body as Record<string, unknown>;

  const unknown = Object.keys(record).filter((k) => !ALLOWED_FIELDS.has(k));
  if (unknown.length > 0) {
    return { error: `Unknown field(s): ${unknown.join(", ")}.` };
  }

  const { name, email } = record;

  if (name === undefined || name === null || name === "") {
    return { error: "Field 'name' is required." };
  }
  if (typeof name !== "string") {
    return { error: "Field 'name' must be a string." };
  }
  const trimmedName = name.trim();
  if (trimmedName.length === 0) {
    return { error: "Field 'name' must not be blank." };
  }

  if (email === undefined || email === null || email === "") {
    return { error: "Field 'email' is required." };
  }
  if (typeof email !== "string") {
    return { error: "Field 'email' must be a string." };
  }
  if (!EMAIL_RE.test(email)) {
    return { error: "Field 'email' must be a valid email address." };
  }

  return { name: trimmedName, email };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const result = validateCreateUser(req.body);

  if ("error" in result) {
    res.status(400).json({ error: result.error });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: result.name,
      email: result.email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
