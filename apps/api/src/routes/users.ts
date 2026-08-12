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

  if (!username || typeof username !== "string" || username.trim() === "") {
    return res.status(400).json({
      error: "Bad Request",
      message: "Username is required and must be a non-empty string."
    });
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({
      error: "Bad Request",
      message: "A valid email address is required."
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      username,
      email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
