import { Router } from "express";

import { listUsers, createUser } from "../services/userService";

const router = Router();

/**
 * GET /users
 * @summary List all users
 * @description Returns a paginated list of users.
 *   Delegates to {@link listUsers} in the user service layer.
 * @returns {object} 200 - JSON with `data` (empty array) and descriptive `message`
 */
router.get("/", async (_req, res) => {
  const result = await listUsers();
  res.json(result);
});

/**
 * POST /users
 * @summary Create a new user
 * @description Creates a user record from the JSON body.
 *   Delegates to {@link createUser} in the user service layer.
 * @param {object} req.body - User fields to be created
 * @returns {object} 201 - JSON with `data` (stub user including `id`) and descriptive `message`
 */
router.post("/", async (req, res) => {
  const result = await createUser(req.body);
  res.status(201).json(result);
});

export default router;
