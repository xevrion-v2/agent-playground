import { Router } from "express";
import { ApiError, sendError } from "../lib/api-error";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ data: [], message: "User listing is not implemented yet." });
});

router.post("/", (req, res) => {
  if (req.body == null || typeof req.body !== "object" || Array.isArray(req.body)) {
    sendError(res, ApiError.badRequest("Validation Error"), "Request body must be a JSON object");
    return;
  }

  const { email, name } = req.body;

  if (typeof email !== "string" || email.trim() === "") {
    sendError(res, ApiError.badRequest("Validation Error"), "Email is required and must be a valid email");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    sendError(res, ApiError.badRequest("Validation Error"), "Please provide a valid email address");
    return;
  }

  if (name !== undefined && name !== null && (typeof name !== "string" || Array.isArray(name))) {
    sendError(res, ApiError.badRequest("Validation Error"), "Name must be a string");
    return;
  }

  res.status(201).json({
    data: { id: "stub-user-id", email, name: name !== undefined ? name : null },
    message: "User creation is not implemented yet.",
  });
});

export default router;
