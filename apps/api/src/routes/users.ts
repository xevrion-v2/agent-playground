import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const { email, name } = req.body ?? {};

  if (!email || typeof email !== "string") {
    res.status(400).json({
      error: "Validation failed",
      details: [{ field: "email", message: "email is required and must be a string" }]
    });
    return;
  }

  if (name !== undefined && typeof name !== "string") {
    res.status(400).json({
      error: "Validation failed",
      details: [{ field: "name", message: "name must be a string" }]
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      ...(name !== undefined ? { name } : {})
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
