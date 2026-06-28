import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ status: "error", message: "name and email are required" });
  }
  res.status(201).json({
    status: "ok",
    data: {
      id: "stub-user-id",
      name,
      email
    }
  });
});

export default router;
