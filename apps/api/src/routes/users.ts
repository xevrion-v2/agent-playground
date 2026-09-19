import { Router } from "express";

const router = Router();

/**
 * Returns the placeholder user collection until the user service is wired to
 * persistent storage.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Echoes the submitted user payload with a stub id while user creation remains
 * a route-level placeholder.
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
