import { Router, Request, Response, NextFunction } from "express";

const router = Router();

/** Lightweight validation for user creation payload. */
function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  const errors: string[] = [];
  const { email, name } = req.body ?? {};

  if (!email || typeof email !== "string") {
    errors.push("`email` is required and must be a string.");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("`email` must be a valid email address.");
  }

  if (name !== undefined && typeof name !== "string") {
    errors.push("`name` must be a string.");
  }

  if (Object.keys(req.body ?? {}).length === 0) {
    errors.push("Request body must not be empty.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", validateCreateUser, (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
