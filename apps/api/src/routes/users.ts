import { Router } from "express";
import crypto from "crypto";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Reject non-object JSON bodies
  if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
    return res.status(400).json({
      error: "Request body must be a JSON object."
    });
  }

  // Require a valid email
  const rawEmail = req.body.email;
  if (typeof rawEmail !== "string" || !rawEmail.trim()) {
    return res.status(400).json({
      error: "Email is required."
    });
  }

  const email = rawEmail.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: "Invalid email format."
    });
  }

  // Normalize email/name values
  const normalizedEmail = email.toLowerCase();
  let normalizedName: string | null = null;
  if (req.body.name !== undefined) {
    if (req.body.name === null) {
      normalizedName = null;
    } else if (typeof req.body.name === "string") {
      normalizedName = req.body.name.trim();
    } else {
      return res.status(400).json({
        error: "Name must be a string or null."
      });
    }
  }

  // Ignore client-controlled id and unrelated fields, generate id server-side
  const userId = crypto.randomUUID();

  res.status(201).json({
    data: {
      id: userId,
      email: normalizedEmail,
      name: normalizedName
    },
    message: "User created successfully."
  });
});

export default router;
