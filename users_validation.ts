import { Router, Request, Response } from "express";
import { z } from "zod";
const router = Router();
const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  role: z.enum(["client", "freelancer", "admin"]).optional(),
});
router.get("/", (_req: Request, res: Response) => {
  res.json({ data: [], message: "User listing is not implemented yet." });
});
router.post("/", (req: Request, res: Response) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: "Validation failed", details: result.error.flatten().fieldErrors });
    return;
  }
  res.status(201).json({
    data: { id: "stub-user-id", ...result.data },
    message: "User creation is not implemented yet."
  });
});
export default router;