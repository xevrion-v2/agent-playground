import { Router } from "express";

const router = Router();

/**
 * GET /users
 *
 * Returns a stub list of all users. Currently returns an empty array,
 * as user listing has not been implemented yet.
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
 * Creates a new user with the provided request body payload.
 * Currently returns a stub response with a generated `stub-user-id`
 * and echoes back the request body.  Full CRUD persistence is not
 * implemented yet.
 *
 * @param req.body - Partial user data that will be echoed in the response.
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
