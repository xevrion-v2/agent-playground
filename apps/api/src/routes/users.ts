import { Router } from "express";

const router = Router();

/**
 * Returns the current user collection.
 *
 * This endpoint is a stub and currently responds with an empty list until
 * user persistence is implemented.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Creates a stub user response from the request body.
 *
 * This endpoint does not persist data yet. It returns HTTP 201 with a
 * placeholder ID and the submitted fields.
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
