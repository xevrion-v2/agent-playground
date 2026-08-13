import { Router } from "express";

import { sendApiError } from "../lib/apiError.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    return sendApiError(res, 400, "Request body must be a JSON object.");
  }

  const email = req.body.email;
  if (typeof email !== "string" || !email.includes("@")) {
    return sendApiError(res, 400, "A valid email string is required.");
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email: email.trim().toLowerCase(),
      ...(typeof req.body.name === "string" ? { name: req.body.name.trim() } : {}),
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
