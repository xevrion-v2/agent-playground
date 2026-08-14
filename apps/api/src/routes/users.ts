import { Router, Request, Response } from "express";

const router = Router();

// Validation helper: checks that required string fields are present and non-empty
function validateUserBody(body: Record<string, unknown>): string | null {
  if (!body || typeof body !== "object") {
    return "Request body must be a JSON object.";
  }
  if (!body.name || typeof body.name !== "string" || body.name.trim() === "") {
    return "Field 'name' is required and must be a non-empty string.";
  }
  if (!body.email || typeof body.email !== "string" || body.email.trim() === "") {
    return "Field 'email' is required and must be a non-empty string.";
  }
  // Basic email shape check
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(body.email as string)) {
    return "Field 'email' must be a valid email address.";
  }
  return null;
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  const validationError = validateUserBody(req.body);
  if (validationError) {
    res.status(400).json({
      data: null,
      message: validationError
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
