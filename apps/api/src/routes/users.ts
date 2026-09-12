import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a placeholder user listing. The real listing is not implemented yet.
 *
 * @param _req - Express request (unused).
 * @param res  - Express response; responds with an empty `data` array and a status message.
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 *
 * Creates a stub user from the request body. The real creation flow is not
 * implemented yet, so the payload is echoed back with a generated stub id.
 *
 * @param req - Express request; the JSON body is spread into the returned stub user.
 * @param res  - Express response; responds with 201, the stub user, and a status message.
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
