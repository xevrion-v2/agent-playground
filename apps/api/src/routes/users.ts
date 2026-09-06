import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const { email, name } = req.body;

  // Validate that a request body was provided
  if (!req.body || typeof req.body !== "object") {
    res.status(400).json({
      error: "Request body is required and must be a JSON object."
    });
    return;
  }

  // Validate required field: email
  if (!email || typeof email !== "string") {
    res.status(400).json({
      error: "Field 'email' is required and must be a non-empty string."
    });
    return;
  }

  // Validate email format (basic check)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      error: "Field 'email' must be a valid email address."
    });
    return;
  }

  // Validate optional field: name (must be a string if provided)
  if (name !== undefined && typeof name !== "string") {
    res.status(400).json({
      error: "Field 'name' must be a string when provided."
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      ...(name && { name })
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
