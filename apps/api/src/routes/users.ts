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

// TODO: Add pagination support (offset/limit query params)
// TODO: Add filtering by username or email
// TODO: Return actual user data from database
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Check for duplicate username/email before creating
// TODO: Hash password before storing (when auth is added)
// TODO: Return created user with generated ID from database
// TODO: Add rate limiting to prevent abuse
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

// TODO: Add GET /:id endpoint to fetch single user
// TODO: Add PUT /:id endpoint to update user
// TODO: Add DELETE /:id endpoint to delete user

export default router;
