import { Router } from "express";
import {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} from "../services/userService";

const router = Router();

/**
 * GET /users
 *
 * Returns the full list of users.
 *
 * @returns {{ data: User[], message: string }} JSON response with an array of
 *   user objects. Returns an empty array while persistence is not yet wired up.
 */
router.get("/", (_req, res) => {
  res.json({
    data: listUsers(),
    message: "User listing is not implemented yet.",
  });
});

/**
 * GET /users/:id
 *
 * Returns a single user by ID.
 *
 * @param {string} req.params.id - The user's unique identifier.
 * @returns {{ data: User | null, message: string }} The matching user or null.
 */
router.get("/:id", (req, res) => {
  const user = getUserById(req.params.id);
  res.json({
    data: user,
    message: "User lookup is not implemented yet.",
  });
});

/**
 * POST /users
 *
 * Creates a new user from the request body.
 *
 * @returns {{ data: User, message: string }} The newly created user with a
 *   stub ID until persistence is in place.
 */
router.post("/", (req, res) => {
  res.status(201).json({
    data: createUser(req.body),
    message: "User creation is not implemented yet.",
  });
});

/**
 * PATCH /users/:id
 *
 * Partially updates an existing user.
 *
 * @param {string} req.params.id - The user's unique identifier.
 * @returns {{ data: User | null, message: string }} The updated user or null.
 */
router.patch("/:id", (req, res) => {
  const user = updateUser(req.params.id, req.body);
  res.json({
    data: user,
    message: "User update is not implemented yet.",
  });
});

/**
 * DELETE /users/:id
 *
 * Deletes a user by ID.
 *
 * @param {string} req.params.id - The user's unique identifier.
 * @returns {{ data: { deleted: boolean }, message: string }}
 */
router.delete("/:id", (req, res) => {
  const deleted = deleteUser(req.params.id);
  res.json({
    data: { deleted },
    message: "User deletion is not implemented yet.",
  });
});

export default router;
