import { Router } from "express";

import { apiError, apiOk } from "../http";

const router = Router();
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  apiOk(res, 200, [], "User listing is not implemented yet.");
});

router.post("/", (req, res) => {
  const body = req.body;
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return apiError(res, 400, "Request body must be a JSON object");
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  if (!EMAIL_RE.test(email)) {
    return apiError(res, 400, "Valid email is required");
  }
  apiOk(
    res,
    201,
    { id: "stub-user-id", email, ...(typeof body.name === "string" ? { name: body.name.trim() } : {}) },
    "User creation is not implemented yet."
  );
});

export default router;
