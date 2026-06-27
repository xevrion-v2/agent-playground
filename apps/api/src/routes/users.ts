import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

/**
 * GET /users
 * Returns a (currently empty) list of users.
 */
router.get("/", async (_req, res) => {
  const users = await listUsers();
  res.json({
    data: users,
    message: "User listing is not implemented yet."
  });
});

/**
 * POST /users
 * Creates a stubbed user record from the request body.
 */
router.post("/", async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

export default router;
