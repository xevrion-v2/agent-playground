import { Router } from "express";
import { z } from "zod";
import { sendError } from "../utils/errors";

const router = Router();

const UserCreateSchema = z.object({
  email: z.string().email("Invalid email format"),
  name: z.string().optional(),
});

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const result = UserCreateSchema.safeParse(req.body);
  
  if (!result.success) {
    return sendError(res, "Validation failed", {
      status: 400,
      code: "VALIDATION_ERROR",
      details: result.error.flatten().fieldErrors,
    });
  }

  const { email, name } = result.data;

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name: name || null,
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
