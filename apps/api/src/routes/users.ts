import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Fetch users from database with pagination, sorting, and filtering support.
  // TODO: Handle potential database errors and return appropriate HTTP status codes (e.g. 500 Internal Server Error).
  // TODO: Ensure requesting user has administrative permissions before returning user list.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate request body schema (e.g., email required, optional name string) using Zod or custom validator.
  // TODO: Check if email already exists in database and return 409 Conflict if user already registered.
  // TODO: Hash password before saving if authentication credentials are added to the schema.
  // TODO: Persist user record in PostgreSQL database via Prisma client and return the created record.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;

