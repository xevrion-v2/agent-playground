import { Router } from "express";

import {
  listUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser
} from "../services/userService";

const router = Router();

/** GET /users — list all users */
router.get("/", (_req, res) => {
  const users = listUsers();
  res.json({
    data: users,
    message: "User listing is not implemented yet."
  });
});

/** POST /users — create a new user */
router.post("/", (req, res) => {
  const user = createUser(req.body);
  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

/** GET /users/:id — get a single user */
router.get("/:id", (req, res) => {
  const user = getUserById(req.params.id);
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }
  res.json({ data: user });
});

/** PATCH /users/:id — update a user */
router.patch("/:id", (req, res) => {
  const user = updateUser(req.params.id, req.body);
  res.json({
    data: user,
    message: "User update is not implemented yet."
  });
});

/** DELETE /users/:id — delete a user */
router.delete("/:id", (req, res) => {
  deleteUser(req.params.id);
  res.json({ message: "User deletion is not implemented yet." });
});

export default router;
