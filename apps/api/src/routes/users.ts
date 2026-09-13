import { Router } from "express";

const router = Router();

/**
 * GET /users
 * @summary List all users
 * @description Returns a paginated list of users. Currently returns a stub
 *   response as full user listing is not yet implemented.
 * @returns {object} 200 - JSON with `data` (empty array) and descriptive `message`
 */
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * @summary Create a new user
 * @description Creates a user record. Accepts a JSON body with user fields.
 *   Currently returns a stub response with a placeholder ID merged with the
 *   incoming body. Full persistence is not yet implemented.
 * @param {object} req.body - User fields to be created
 * @returns {object} 201 - JSON with `data` (stub user including `id`) and descriptive `message`
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
