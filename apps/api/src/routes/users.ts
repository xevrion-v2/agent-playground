import { Router, Request, Response } from "express";
import { z } from "zod";

const router = Router();

// Input validation schema
const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
});

// Whitelist of allowed fields
const ALLOWED_FIELDS = ["name", "email"];

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req: Request, res: Response) => {
  try {
    // Validate input
    const validatedData = createUserSchema.parse(req.body);
    
    // Whitelist fields only
    const { name, email } = validatedData;
    
    res.status(201).json({
      data: {
        id: "stub-user-id",
        name,
        email,
      },
      message: "User creation is not implemented yet."
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: error.errors,
      });
    }
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

export default router;
