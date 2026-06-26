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
  // ── 1. Reject non-object bodies ──────────────────────────────────
  // express.json() in strict mode (the default) already rejects
  // primitives and null.  This guard is a safety net for edge cases
  // (e.g. if the middleware config changes) and for empty bodies.
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

  // ── 2. Validate & normalise with Zod ─────────────────────────────
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    const message = result.error.issues
      .map((i) => {
        // Prefix with field name when available
        const path = i.path.length > 0 ? `${i.path.join(".")}: ` : "";
        return `${path}${i.message}`;
      })
      .join("; ");
    res.status(400).json({ error: message });
    return;
  }

  const { email, name } = result.data;

  // ── 3. Generate server-side id (cuid-style) ─────────────────────
  const id = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 10)}`;

  res.status(201).json({
    data: {
      id,
      email,
      name: name ?? null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    message: "User created successfully.",
  });
});

export default router;
