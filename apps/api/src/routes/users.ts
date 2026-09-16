import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Implement pagination (limit, cursor/offset) for large datasets.
  // TODO: Add database query to fetch users and map to domain models.
  // TODO: Handle authorization/role-based access control for listing users.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Add request body schema validation (e.g., using Zod or Joi).
  // TODO: Add password hashing logic before database persistence.
  // TODO: Insert the user record into the database.
  // TODO: Handle duplicate email/username uniqueness errors (return 409 Conflict).
  // TODO: Handle internal database connection errors (return 500 Internal Server Error).
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
