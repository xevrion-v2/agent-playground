import { Router, Request, Response } from "express";
import { sendError } from "../errorHandler";

const router = Router();

interface CreateUserBody {
  name?: string;
  email?: string;
}

function validateCreateUser(body: unknown): { valid: true; data: CreateUserBody } | { valid: false; error: string } {
  if (typeof body !== "object" || body === null) {
    return { valid: false, error: "Request body must be a JSON object" };
  }
  const data = body as Record<string, unknown>;

  if (!data.name || typeof data.name !== "string" || data.name.trim().length === 0) {
    return { valid: false, error: "Field 'name' is required and must be a non-empty string" };
  }
  if (!data.email || typeof data.email !== "string" || data.email.trim().length === 0) {
    return { valid: false, error: "Field 'email' is required and must be a non-empty string" };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email.trim())) {
    return { valid: false, error: "Field 'email' must be a valid email address" };
  }
  return { valid: true, data: data as CreateUserBody };
}

router.get("/", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.get("/:id", (req: Request, res: Response) => {
  sendError(res, 404, `User ${req.params.id} not found.`);
});

router.post("/", (req: Request, res: Response) => {
  const validation = validateCreateUser(req.body);
  if (!validation.valid) {
    sendError(res, 400, validation.error);
    return;
  }
  res.status(201).json({
    status: "ok",
    data: { id: "stub-user-id", name: validation.data.name, email: validation.data.email },
    message: "User creation is not implemented yet.",
  });
});

router.put("/:id", (req: Request, res: Response) => {
  sendError(res, 501, `User update not implemented yet.`);
});

router.delete("/:id", (req: Request, res: Response) => {
  sendError(res, 501, `User deletion not implemented yet.`);
});

export default router;
