import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body as { name?: unknown; email?: unknown };

  if (!name || typeof name !== "string" || !name.trim()) {
    res.status(400).json({
      error: "Invalid payload: 'name' must be a non-empty string."
    });
    return;
  }

  if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    res.status(400).json({
      error: "Invalid payload: 'email' must be a valid non-empty email string."
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: name.trim(),
      email: email.trim()
    },
    message: "User creation is not implemented yet."
  });
});

// Handle unsupported methods with 405
router.all("/", (_req: Request, res: Response) => {
  res.setHeader("Allow", "GET, POST");
  res.status(405).json({
    error: "Method not allowed. Supported methods: GET, POST"
  });
});

export default router;
