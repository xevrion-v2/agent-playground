import { Router } from "express";

const router = Router();

// GET /users
// TODO: Implement user listing.
// Expected behaviour:
//   - Return a paginated list of users: { data: User[], total: number, page: number }
//   - Support optional query params: ?page=1&limit=20
//   - Require authentication (authMiddleware) — unauthenticated requests → 401
//   - Admin role can list all users; non-admin users see only their own record
// Error cases:
//   - 401 Unauthorized — missing or invalid token
//   - 403 Forbidden — insufficient role
//   - 500 Internal Server Error — database failure
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// POST /users
// TODO: Implement user creation.
// Expected behaviour:
//   - Accept { email: string, name?: string } in the request body
//   - Validate email format; reject unknown/extra fields
//   - Generate id server-side (do NOT trust a caller-supplied id)
//   - Hash password before persistence (bcrypt, argon2, etc.) when a password field is added
//   - Return the created user: { data: User } with HTTP 201
// Error cases:
//   - 400 Bad Request — invalid or missing required fields
//   - 409 Conflict — email already registered
//   - 500 Internal Server Error — database failure
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
