import { Router } from "express";

const router = Router();

// TODO: Replace stub with real Prisma-backed implementation.
//  GET /users should:
//   • Accept optional query params: ?page=&limit= for pagination
//   • Validate that page/limit are positive integers (default page=1, limit=20)
//   • Query Prisma User model with pagination (skip/take)
//   • Return { data: users[], page, totalPages }
//   • Return 401 if caller is not authenticated (auth middleware TBD)
//   • Return 500 on database errors with a generic error message
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Replace stub with real Prisma-backed implementation.
//  POST /users should:
//   • Validate req.body with a schema (e.g. zod): { email: string (required, valid email), name?: string }
//   • Return 400 if email is missing or malformed
//   • Check Prisma for duplicate email before inserting (unique constraint)
//   • Return 409 Conflict if email already exists
//   • Create user via Prisma and return 201 with the created user (omit internal fields)
//   • Return 500 on database errors
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Add more routes as needed:
//   • GET /users/:id – fetch single user, return 404 if not found
//   • PUT /users/:id – update user profile, validate input
//   • DELETE /users/:id – soft-delete user, return 204

export default router;
