import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeUserPayload(body: unknown) {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return {
      ok: false as const,
      errors: ["Request body must be a JSON object."]
    };
  }

  const payload = body as Record<string, unknown>;
  const errors: string[] = [];
  const rawEmail = payload.email;
  const rawName = payload.name;

  if (typeof rawEmail !== "string" || rawEmail.trim() === "") {
    errors.push("email is required.");
  }

  const email = typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (email && !emailPattern.test(email)) {
    errors.push("email must be valid.");
  }

  if (rawName !== undefined && typeof rawName !== "string") {
    errors.push("name must be a string when provided.");
  }

  if (errors.length > 0) {
    return {
      ok: false as const,
      errors
    };
  }

  const normalizedName = typeof rawName === "string" ? rawName.trim() : "";

  return {
    ok: true as const,
    data: {
      email,
      ...(normalizedName ? { name: normalizedName } : {})
    }
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = normalizeUserPayload(req.body);

  if (!result.ok) {
    return res.status(400).json({
      errors: result.errors,
      message: "Invalid user payload."
    });
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...result.data
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
