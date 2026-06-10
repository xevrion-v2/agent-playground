import { Router } from "express";

const router = Router();

/**
 * Returns the users collection.
 *
 * This is a placeholder implementation until persistence is wired in, so it
 * intentionally returns an empty list with an explanatory message.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Accepts a user payload and echoes it with a stable stub id.
 *
 * The handler preserves the request body shape for early API consumers while
 * the real user service and database-backed creation flow are still pending.
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
