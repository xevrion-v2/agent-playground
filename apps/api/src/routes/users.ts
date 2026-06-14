import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { username, email } = req.body;
  
  if (!username || !email) {
    return res.status(400).json({
      error: "Bad Request",
      message: "Missing required fields: username and email are required."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      username,
      email,
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
