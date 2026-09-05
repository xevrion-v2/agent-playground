import { Router } from "express";

const router = Router();

/**
 * Returns the current user collection placeholder until persistent user
 * listing is implemented.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Creates a stub user response from the request payload until the user
 * service is backed by persistence.
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
