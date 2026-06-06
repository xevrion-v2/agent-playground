import { Router } from "express";
import { asyncHandler } from "../middleware/async-handler";

const router = Router();

router.get("/", asyncHandler(async (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
}));

router.post("/", asyncHandler(async (req, res) => {
  const { username, email } = req.body;
  const errors: string[] = [];
  if (!username) errors.push("username is required");
  if (!email) errors.push("email is required");
  if (errors.length > 0) {
    res.status(400).json({ error: "Validation failed", details: errors });
    return;
  }
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
}));

export default router;
