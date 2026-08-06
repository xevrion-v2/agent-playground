import { Router, Request, Response } from "express";

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let userCounter = 0;

function generateId(): string {
  userCounter += 1;
  return `user-${Date.now()}-${userCounter}`;
}

interface ValidationError {
  field: string;
  message: string;
}

export function validateUserPayload(payload: unknown):
  | { ok: true; data: { id: string; email: string; name?: string } }
  | { ok: false; errors: ValidationError[] } {
  if (payload === null || payload === undefined) {
    return {
      ok: false,
      errors: [{ field: "body", message: "Request body is required" }],
    };
  }

  if (typeof payload !== "object" || Array.isArray(payload)) {
    return {
      ok: false,
      errors: [{ field: "body", message: "Request body must be a JSON object" }],
    };
  }

  const obj = payload as Record<string, unknown>;
  const errors: ValidationError[] = [];

  if (typeof obj.email !== "string" || !EMAIL_RE.test(obj.email.trim())) {
    errors.push({ field: "email", message: "A valid email address is required" });
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const email = (obj.email as string).trim().toLowerCase();
  const name =
    typeof obj.name === "string" && obj.name.trim().length > 0
      ? obj.name.trim()
      : undefined;

  return {
    ok: true,
    data: { id: generateId(), email, name },
  };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const result = validateUserPayload(req.body);

  if (!result.ok) {
    return res.status(400).json({
      data: null,
      message: `Validation failed: ${result.errors.map((e) => e.message).join("; ")}`,
      errors: result.errors,
    });
  }

  res.status(201).json({
    data: result.data,
    message: "User created successfully.",
  });
});

export default router;
