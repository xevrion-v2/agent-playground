import { Router, Request, Response, NextFunction } from "express";
import { ApiError, asyncHandler } from "../utils/errors";

const router = Router();

interface CreateUserBody {
  email: string;
  name?: string;
}

function validateCreateUser(req: Request, res: Response, next: NextFunction) {
  const body = req.body as CreateUserBody;

  if (!body.email || typeof body.email !== "string") {
    throw ApiError.badRequest("Email is required and must be a string");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    throw ApiError.badRequest("Invalid email format");
  }

  if (body.name !== undefined && typeof body.name !== "string") {
    throw ApiError.badRequest("Name must be a string if provided");
  }

  next();
}

router.get("/", asyncHandler(async (_req, res) => {
  res.json({
    status: "success",
    data: [],
    message: "User listing is not implemented yet."
  });
}));

router.post("/", validateCreateUser, asyncHandler(async (req, res) => {
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
}));

export default router;