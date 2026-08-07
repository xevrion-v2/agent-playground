import { Router, Request, Response, NextFunction } from "express";

const router = Router();

function validateUserData(req: Request, res: Response, next: NextFunction) {
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({
      error: "Validation failed",
      message: "'name' is required and must be a non-empty string."
    });
    return;
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({
      error: "Validation failed",
      message: "'email' is required and must be a valid email address."
    });
    return;
  }

  next();
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validateUserData, (req, res) => {
  const { name, email } = req.body;
  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
