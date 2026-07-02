import { Router } from "express";

const router = Router();

// Validation helpers
function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username: unknown): username is string {
  return typeof username === "string" && username.length >= 3 && username.length <= 30;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const errors: string[] = [];
  
  if (!isValidUsername(req.body.username)) {
    errors.push("Username is required and must be 3-30 characters");
  }
  
  if (!isValidEmail(req.body.email)) {
    errors.push("A valid email address is required");
  }
  
  if (errors.length > 0) {
    res.status(400).json({
      error: "Validation failed",
      messages: errors,
      statusCode: 400
    });
    return;
  }
  
  res.status(201).json({
    data: {
      id: "stub-user-id",
      username: req.body.username,
      email: req.body.email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
