import { Router } from "express";

const router = Router();

// TODO: Implement paginated user listing with filtering and sorting.
//       Support query parameters: ?page, ?limit, ?search, ?role, ?sortBy.
//       Return proper pagination metadata (total, page, totalPages).
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Implement full user creation with validation and error handling.
//       - Validate required fields (email, name)
//       - Check for duplicate email (return 409 Conflict)
//       - Hash password before storage
//       - Return 201 with created user data (excluding password)
//       - Return 400 for invalid request body (missing fields, bad format)
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO: Implement single user retrieval by ID.
//       - Return 200 with user data on success
//       - Return 404 if user not found
//       - Validate that the ID parameter is a valid format
router.get("/:id", (req, res) => {
  res.json({
    data: null,
    message: `User ${req.params.id} retrieval is not implemented yet.`
  });
});

// TODO: Implement user profile update.
//       - Support partial updates (PATCH semantics)
//       - Validate allowed fields only
//       - Return 200 with updated user data on success
//       - Return 404 if user not found
//       - Return 400 for invalid update payload
router.put("/:id", (req, res) => {
  res.json({
    data: null,
    message: `User ${req.params.id} update is not implemented yet.`
  });
});

// TODO: Implement soft-delete for users.
//       - Set deletedAt timestamp instead of permanent removal
//       - Return 204 No Content on success
//       - Return 404 if user not found
//       - Ensure soft-deleted users are excluded from listing queries
router.delete("/:id", (req, res) => {
  res.json({
    data: null,
    message: `User ${req.params.id} deletion is not implemented yet.`
  });
});

export default router;
