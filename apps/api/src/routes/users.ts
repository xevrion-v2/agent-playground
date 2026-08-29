import { Router } from "express";
import crypto from 'crypto';

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
  const allowedFields = ['name', 'email', 'role'] as const;
  type AllowedField = typeof allowedFields[number];

  if (!req.body || typeof req.body !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  const sanitized: Record<AllowedField, unknown> = {} as any;
  for (const key of allowedFields) {
    if (key in req.body) {
      sanitized[key] = req.body[key];
    }
  }

  const id = crypto.randomUUID();
  res.status(201).json({ id, ...sanitized });

router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
