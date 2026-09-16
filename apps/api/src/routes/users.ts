import { Router } from "express";

const router = Router();

// TODO: Query users from the database with pagination (page, limit query params)
// TODO: Support filtering by name or email via query params
// TODO: Return 500 if the database query fails
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate required fields (name, email) and return 400 on missing input
// TODO: Hash password before storing if auth is added
// TODO: Check for duplicate email and return 409 Conflict
// TODO: Return 500 if the database insert fails
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
