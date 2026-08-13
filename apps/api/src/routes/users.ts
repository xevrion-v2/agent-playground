import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req: Request, res: Response) => {
  const errors: string[] = [];

  const name = typeof req.body?.name === "string" ? req.body.name.trim() : undefined;
  const email = typeof req.body?.email === "string" ? req.body.email.trim() : undefined;

  if (!name || name.length === 0) {
    errors.push("name is required and must be a non-empty string");
  }

  if (!email || email.length === 0) {
    errors.push("email is required and must be a non-empty string");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.push("email must be a valid email address");
  }

  if (errors.length > 0) {
    res.status(400).json({
      status: "error",
      message: "Validation failed",
      errors,
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
