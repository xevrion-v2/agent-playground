import { Router, Request, Response, NextFunction } from "express";

const router = Router();

router.get("/", (_req: Request, res: Response) => {
  res.json({ data: [], message: "User listing is not implemented yet." });
});

/**
 * Create a new user with email validation.
 */
router.post("/", (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, name } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(422).json({ error: { status: 422, message: "A valid email field is required" } });
    }

    const trimmed = email.trim();
    if (!trimmed.includes("@") || !trimmed.includes(".")) {
      return res.status(422).json({ error: { status: 422, message: "Email must contain @ and a domain" } });
    }

    if (name !== undefined && typeof name !== "string") {
      return res.status(422).json({ error: { status: 422, message: "Name must be a string if provided" } });
    }

    res.status(201).json({
      data: { id: "stub-user-id", email: trimmed, name: name || null },
      message: "User creation is not implemented yet."
    });
  } catch (err) {
    next(err);
  }
});

export default router;
