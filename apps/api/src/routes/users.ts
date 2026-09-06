import { Router } from "express";

const router = Router();

// TODO: Implement user listing with Prisma queries, pagination, and filtering.
// Expected: GET /users?page=1&limit=20 → { data: User[], meta: { total, page, limit } }
// Error cases: 500 on DB failure, 401 if unauthenticated.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement user creation with validated input, duplicate email handling,
// and proper error responses. Replace stub response with real Prisma create.
// Expected: POST /users { name, email } → 201 { data: User }
// Error cases: 400 on validation failure, 409 on duplicate email, 500 on DB failure.
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
