import { Router } from "express";

const router = Router();

/**
 * GET / - Retrieve all users
 * Returns a list of users. Currently returns an empty list as implementation is pending.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST / - Create a new user
 * Accepts user data in the request body and creates a new user record.
 * Currently returns a stub response as the full implementation is pending.
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
