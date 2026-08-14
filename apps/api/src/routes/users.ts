import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Implement pagination and filtering for user list.
  // Expected behavior:
  // - Support 'limit' and 'page' query parameters for paginated results (default: limit=50, page=1).
  // - Support 'search' query parameter to filter users by name or email.
  // - Exclude sensitive fields like passwords or session hashes from the response data.
  // Potential error cases:
  // - Return HTTP 400 if pagination parameters are invalid (e.g. limit < 1 or page < 1).
  // - Return HTTP 500 on database connection or query failures.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Persist the created user in the database.
  // Expected behavior:
  // - Validate req.body schema (name must be non-empty string, email must be valid format, password must meet complexity requirements).
  // - Hash the password using a secure hashing algorithm (e.g. bcrypt or argon2) before storing.
  // - Insert the user record into the DB and return the newly created user object (excluding the hashed password).
  // Potential error cases:
  // - Return HTTP 400 Bad Request if validation checks fail.
  // - Return HTTP 409 Conflict if a user with the given email address already exists.
  // - Return HTTP 500 on DB insertion failure or unexpected server error.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
