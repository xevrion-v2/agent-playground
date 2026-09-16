import { Router } from "express";

const router = Router();

// TODO: Implement real user listing with pagination, filtering, and sorting.
// TODO: Add validation for query parameters (page, limit, sort).
// TODO: Handle database errors gracefully with 500 response.
// TODO: Return 401 if authentication is required and token is missing/invalid.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body (name, email, password) before creating user.
// TODO: Return 400 for missing/invalid fields with clear error messages.
// TODO: Check for duplicate email/username and return 409 conflict.
// TODO: Hash password before storing; never return raw password in response.
// TODO: Handle database errors with 500 and sanitize error details.
// TODO: Return the newly created user resource with 201 on success.
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
