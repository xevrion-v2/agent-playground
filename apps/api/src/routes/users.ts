import { Router } from "express";

const router = Router();
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type CreateUserPayload = {
  email: string;
  name?: string;
};

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === "object" &&
    value !== null &&
    !Array.isArray(value)
  );
}

function normalizeUserPayload(body: unknown):
  | { ok: true; value: CreateUserPayload }
  | { ok: false; error: string } {
  if (!isPlainObject(body)) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const rawEmail = body.email;

  if (typeof rawEmail !== "string") {
    return { ok: false, error: "A valid email is required." };
  }

  const email = rawEmail.trim().toLowerCase();

  if (!EMAIL_PATTERN.test(email)) {
    return { ok: false, error: "A valid email is required." };
  }

  const user: CreateUserPayload = { email };

  if (typeof body.name === "string") {
    const name = body.name.trim().replace(/\s+/g, " ");

    if (name.length > 0) {
      user.name = name;
    }
  }

  return { ok: true, value: user };
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
      error: result.error
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...result.value
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
export { normalizeUserPayload };
