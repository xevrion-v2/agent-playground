import { Router, Request, Response } from "express";

const router = Router();

// Input validation helper
function sanitizeUserInput(body: Record<string, unknown>) {
  const allowedFields = ["name", "email"];
  const sanitized: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (key in body && typeof body[key] === "string") {
      sanitized[key] = (body[key] as string).trim().slice(0, 255);
    }
  }
  return sanitized;
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const sanitized = sanitizeUserInput(req.body);

  if (!sanitized.name || !sanitized.email) {
    return res.status(400).json({
      error: "Validation error",
      message: "name and email are required string fields."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...sanitized
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
