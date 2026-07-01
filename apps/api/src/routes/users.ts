/**
 * User routes
 *
 * Provides user listing and creation stubs for the TaskFlow API.
 *
 * @module routes/users
 */
import { Router } from "express";

const router = Router();

// TODO: Replace with paginated user listing.
// - Accept query params: ?page=1&limit=20
// - Return typed users array with total count
// - Apply auth middleware when available
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Replace with validated user creation.
// - Validate email/password via Zod schema
// - Hash password before persisting
// - Return created user without sensitive fields
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
