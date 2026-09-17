import { Router } from "express";

const router = Router();

/**
 * Retrieves a list of users.
 * Currently returns a stub response as the listing is not fully implemented.
 * 
 * @route GET /
 * @param {express.Request} _req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * Creates a new user.
 * Currently returns a stub response along with the provided request body.
 * 
 * @route POST /
 * @param {express.Request} req - The Express request object containing the user data.
 * @param {express.Response} res - The Express response object.
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
