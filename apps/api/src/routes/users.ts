import { Router } from "express";
import { validateCreateUserPayload } from "../validators/userPayload.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const result = validateCreateUserPayload(req.body);

  if (!result.valid) {
    res.status(result.status ?? 400).json({
      error: result.error,
    });
    return;
  }

  // Server-generated id — client-provided id is ignored by the validator
  const user = {
    id: crypto.randomUUID(),
    ...result.payload,
  };

  res.status(201).json({
    data: user,
    message: "User created",
  });
});

export default router;
