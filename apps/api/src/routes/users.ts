import { Router } from "express";
import { sendBadRequest } from "../helpers/errors";

const router = Router();

// Lightweight input validation helpers
function isValidEmail(email: unknown): email is string {
  return typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username: unknown): username is string {
  return typeof username === "string" && username.length >= 3 && username.length <= 30;
}

interface UserCreateBody {
  username?: unknown;
  email?: unknown;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { username, email } = req.body as UserCreateBody;

  // Validate required fields
  const errors: string[] = [];

  if (!username) {
    errors.push("username is required");
  } else if (!isValidUsername(username)) {
    errors.push("username must be between 3 and 30 characters");
  }

  if (!email) {
    errors.push("email is required");
  } else if (!isValidEmail(email)) {
    errors.push("email must be a valid email address");
  }

  if (errors.length > 0) {
    sendBadRequest(res, errors);
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      username,
      email,
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
