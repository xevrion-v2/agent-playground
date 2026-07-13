import { Router } from "express";

const router = Router();

/**
 * Retrieve a list of users.
 * Currently returns a stub response as the listing logic is not yet implemented.
 * 
 * @param _req - Express Request object (unused)
 * @param res - Express Response object
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Create a new user.
 * Currently returns a stub response containing the created user ID and the provided request body.
 * 
 * @param req - Express Request object containing the user payload in req.body
 * @param res - Express Response object
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
