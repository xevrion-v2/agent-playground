import { Router } from "express";

const router = Router();

/**
 * GET /users - Retrieve a list of all users.
 *
 * Returns a paginated user listing. Currently returns a stub
 * response while the full implementation is in progress.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users - Create a new user account.
 *
 * Accepts user details in the request body and returns
 * the created user with a generated ID. Currently returns
 * a stub response while the full implementation is in progress.
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
