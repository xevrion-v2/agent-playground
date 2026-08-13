import { Router } from "express";

import { validateCreateUserPayload } from "./userValidation";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const validation = validateCreateUserPayload(req.body);

  if (!validation.ok) {
    return res.status(400).json({
      errors: validation.errors,
      message: "Invalid user payload."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...validation.data
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
