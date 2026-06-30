import { Router } from "express";

const router = Router();

// TODO: Implement paginated user listing with query params (page, limit, sort, filter)
// TODO: Add error handling for invalid query parameters (400 Bad Request)
// TODO: Support optional expansion of related resources via ?include= parameter
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body against UserCreate schema (name, email required, etc.)
// TODO: Return 409 Conflict if email already exists
// TODO: Return 422 if validation fails with field-level error details
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Add GET /:id route — return user by id or 404
// TODO: Add PATCH /:id route — partial update with merge validation, 404 if not found
// TODO: Add DELETE /:id route — soft delete with confirmation response, 404 if not found

export default router;
