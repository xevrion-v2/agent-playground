import { Router } from "express";

const router = Router();

// TODO: Replace stub with real user listing from database
// - Add pagination support (limit, offset or cursor-based)
// - Implement filtering by role, status, and creation date
// - Add field selection via query params (?fields=id,name,email)
// - Return proper error responses for DB connection failures
// - Add rate limiting to prevent abuse
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Replace stub with real user creation logic
// - Validate request body against schema (name, email required; email format)
// - Check for duplicate email before insertion
// - Generate secure unique ID (UUID v4 or nanoid) instead of hardcoded stub
// - Hash password if authentication fields are added later
// - Return 400 for invalid input, 409 for duplicate email, 500 for DB errors
// - Emit audit log entry on successful creation
// - Consider returning Location header pointing to new resource
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
