import { Router } from "express";

const router = Router();

/**
 * GET /users
 * @todo Implement paginated user listing with cursor-based pagination
 * @todo Add query filters: role, status, search term
 * @todo Return 401 if Authorization header is missing
 * @todo Return 403 if requester lacks admin scope
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * @todo Validate request body against UserCreate Zod schema
 * @todo Hash password before persistence
 * @todo Return 409 if email already exists
 * @todo Send welcome email via transactional email service
 */
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
