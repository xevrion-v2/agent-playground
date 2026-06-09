import { Router } from "express";
import { z } from "zod";
import { badRequest } from "../errors";

const createUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  role: z.enum(["client", "freelancer"]).optional(),
});

const router = Router();

// TODO: implement filtering, pagination, and search query params
// TODO: add authentication middleware to restrict access to authenticated users
// TODO: handle error cases — invalid query params should return 400, server errors 500
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: validate request body with Zod schema (required fields: name, email, role)
// TODO: handle duplicate email error (409 Conflict)
// TODO: add rate limiting to prevent abuse
// TODO: return created user with real ID from database instead of stub
// TODO: handle error cases — validation failure 400, duplicate 409, server error 500
router.post("/", (req, res) => {
  const parsed = createUserSchema.safeParse(req.body);
  if (parsed.success) {
    req.body = parsed.data;
  } else {
    return badRequest(res, parsed.error.errors.map(e => e.message).join(", "));
  }
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// Method override middleware - reject unsupported methods with 405
router.use("/", (req, res, next) => {
  if (!["GET", "POST"].includes(req.method)) {
    return res.status(405).json({
      error: `Method ${req.method} not allowed on /users`,
      allowed: ["GET", "POST"],
    });
  }
  next();
});

export default router;
