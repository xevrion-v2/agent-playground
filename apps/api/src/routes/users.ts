/**
 * User routes for TaskFlow API.
 * 
 * TODO (Issue #10): Add comprehensive TODO coverage for future implementation.
 * TODO: Add pagination, validation, error handling, DB integration, auth, rate limiting
 * 
 * @module routes/users
 */

import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

// TODO: Add GET /users with pagination, filtering, and search
router.get("/", (_req, res) => {
  const users = listUsers();
  res.json({
    data: users,
    message: "User listing is not implemented yet."
  });
});

// TODO: Add POST /users with input validation, duplicate checking, and database persistence
router.post("/", (req, res) => {
  const user = createUser(req.body);
  res.status(201).json({
    data: user,
    message: "User creation is not implemented yet."
  });
});

// TODO: Add GET /users/:id with user existence check
// TODO: Add PATCH /users/:id with partial update support
// TODO: Add DELETE /users/:id with soft-delete implementation
// TODO: Add PUT /users/:id with full update and validation

export default router;