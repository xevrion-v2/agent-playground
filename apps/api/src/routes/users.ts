import { Router } from "express";
import { validateUserPayload } from "../utils/validateUserPayload";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const validation = validateUserPayload(req.body);

  if (!validation.valid) {
    return res.status(400).json({
      error: "Invalid or dangerous payload detected",
      details: validation.errors,
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...validation.data,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;