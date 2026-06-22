import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Retrieves a paginated list of all registered users.
 * Intended to support optional query parameters for filtering
 * (e.g. by role, search term) and pagination (page, limit).
 *
 * @returns {Object} JSON with `data` (user array) and optional `total` count.
 */
router.get("/", (_req, res) => {
  // TODO: add query param parsing (page, limit, role, search)
  // TODO: integrate with UserService.findAll() with pagination support
  // TODO: return 400 for invalid query parameters
  // TODO: exclude sensitive fields (password hash) from response
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a new user with the provided profile payload.
 * Validation and hashing of sensitive fields (e.g. password)
 * should be handled in a corresponding service layer.
 *
 * @body {Object} req.body - User profile fields (email, name, password, etc.)
 * @returns {Object} JSON with `data` containing the created user record.
 */
router.post("/", (req, res) => {
  // TODO: validate required fields (email, name, password)
  // TODO: check for duplicate email before creating
  // TODO: hash password before storing
  // TODO: return 409 if email already exists
  // TODO: return 422 for invalid input format
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

/**
 * GET /users/:id
 *
 * Fetches a single user by their unique identifier.
 * Stub — returns a placeholder until the service is wired up.
 */
router.get("/:id", (req, res) => {
  // TODO: validate that :id is a UUID format
  // TODO: integrate with UserService.findById(id)
  // TODO: return 404 if user not found
  res.json({
    data: { id: req.params.id },
    message: "User detail is not implemented yet."
  });
});

/**
 * PATCH /users/:id
 *
 * Updates profile fields for an existing user.
 * Stub — returns a placeholder until the service is wired up.
 */
router.patch("/:id", (req, res) => {
  // TODO: validate that :id exists before applying updates
  // TODO: whitelist allowed fields (prevent role escalation)
  // TODO: return 404 if user not found, 409 on conflicts
  res.json({
    data: { id: req.params.id, ...req.body },
    message: "User update is not implemented yet."
  });
});

/**
 * DELETE /users/:id
 *
 * Soft-deletes or permanently removes a user record.
 * Stub — returns a placeholder until the service is wired up.
 */
router.delete("/:id", (req, res) => {
  // TODO: verify caller has admin role or is the target user
  // TODO: consider soft-delete (set deletedAt) vs hard delete
  // TODO: cascade or block deletion if user has active proposals
  res.json({
    data: { id: req.params.id },
    message: "User deletion is not implemented yet."
  });
});

export default router;
