import { Router } from "express";

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const email = req.body?.email;

  if (email !== undefined && (typeof email !== "string" || !emailPattern.test(email))) {
    res.status(400).json({
      error: {
        message: "User email must be a valid email address."
      }
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
