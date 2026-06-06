import { Router } from "express";
import { register, login } from "../controllers/authController";
import { validateRequest } from "../middleware/validateRequest";
import { createErrorResponse } from "../utils/apiError";
import { z } from "zod";

const router = Router();
  password: z.string().min(6),
});

// Example route using the API error helper
router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json(createErrorResponse("Unauthorized", 401));
  }
  res.json({ success: true, data: req.user });
});

router.post("/register", validateRequest(registerSchema), register);
router.post("/login", validateRequest(loginSchema), login);

export default router;