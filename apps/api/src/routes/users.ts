import { Router, Request, Response, NextFunction } from "express";

const router = Router();

interface CreateUserBody {
  email: string;
  name?: string;
}

function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  const body = req.body as CreateUserBody;

  if (!body.email || typeof body.email !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Email is required and must be a string"
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid email format"
    });
  }

  if (body.name !== undefined && typeof body.name !== "string") {
    return res.status(400).json({
      status: "error",
      message: "Name must be a string if provided"
    });
  }

  next();
}

router.get("/", (_req, res) => {
  res.json({
    status: "success",
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validateCreateUser, (req, res) => {
  const body = req.body as CreateUserBody;
  res.status(201).json({
    status: "success",
    data: {
      id: "stub-user-id",
      email: body.email,
      name: body.name
    },
    message: "User creation is not implemented yet."
  });
});

export default router;