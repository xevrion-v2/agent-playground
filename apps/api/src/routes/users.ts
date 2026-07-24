import { Router } from "express";

const router = Router();

// TODO: Implement GET /users
// Expected behavior: Fetch a paginated list of users from the database.
// Query parameters: page (number), limit (number), search (string).
// Error cases:
// - 500 Internal Server Error: Database connection failure.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement POST /users
// Expected behavior: Create a new user in the database.
// Request body: { username: string, email: string, passwordHash?: string }
// Error cases:
// - 400 Bad Request: Missing required fields (username, email) or invalid format.
// - 409 Conflict: Email or username already exists.
// - 500 Internal Server Error: Database failure.
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
