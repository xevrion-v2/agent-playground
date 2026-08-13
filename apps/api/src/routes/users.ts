import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const { name, email } = req.body;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({
      error: true,
      message: "Invalid request: \"name\" is required and must be a non-empty string."
    });
    return;
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({
      error: true,
      message: "Invalid request: \"email\" is required and must be a valid email address."
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim().toLowerCase(),
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
