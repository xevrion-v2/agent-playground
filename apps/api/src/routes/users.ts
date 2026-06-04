import { Router, Request, Response } from "express";

const router = Router();

/** Allowed fields for user creation to prevent mass assignment */
const ALLOWED_USER_FIELDS = ["name", "email"] as const;

function pickAllowed(body: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key of ALLOWED_USER_FIELDS) {
    if (typeof body[key] === "string" && (body[key] as string).length > 0) {
      result[key] = (body[key] as string).trim();
    }
  }
  return result;
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const safePayload = pickAllowed(req.body);

  if (!safePayload.name || !safePayload.email) {
    return res.status(400).json({
      error: "Validation failed",
      message: "name and email are required."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...safePayload
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
