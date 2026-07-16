import { Router } from "express";

const router = Router();

// TODO: Implement pagination support (offset/limit query params)
// TODO: Add filtering by username, email, or role
// TODO: Return actual user data from the database instead of an empty array
// TODO: Add sorting options (createdAt, name, etc.)
// TODO: Consider adding search functionality
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body (ensure name and email are present and valid)
// TODO: Check for duplicate username/email before creating
// TODO: Hash password when authentication is added
// TODO: Return the created user with a server-generated ID
// TODO: Add rate limiting to prevent abuse
// TODO: Normalize email to lowercase for consistency
// TODO: Consider adding email verification step
// TODO: Return proper error responses for validation failures
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: GET /:id - Fetch a single user by ID
// TODO: PUT /:id - Update user profile information
// TODO: DELETE /:id - Soft-delete a user account
// TODO: GET /:id/jobs - List jobs posted by a specific user
// TODO: GET /:id/proposals - List proposals submitted by a specific user

export default router;
