import { Router } from "express";
import { validateUserCreation } from "../lib/validate-user.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // 1. Reject non-object bodies (express.json() parses arrays/null as well)
  if (req.body === null || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "INVALID_BODY",
      message: "Request body must be a JSON object."
    });
  }

  const validation = validateUserCreation(req.body);
  if (!validation.ok) {
    return res.status(400).json({
      error: validation.error,
      message: validation.message
    });
  }

  // 4. Server-side id — never trust client-supplied id
  const generatedId = `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

  // 3. Normalized output — only include allowed fields
  res.status(201).json({
    data: {
      id: generatedId,
      email: validation.data.email,
      name: validation.data.name
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
