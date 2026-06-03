import { Router } from "express";

const router = Router();

// GET /users - List all users
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// POST /users - Create a new user
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// GET /users/:id - Get user by ID
router.get("/:id", (req, res) => {
  res.json({
    data: {
      id: req.params.id,
      name: "Stub User",
      email: "stub@example.com"
    },
    message: "User retrieval is not implemented yet."
  });
});

// PUT /users/:id - Update user
router.put("/:id", (req, res) => {
  res.json({
    data: {
      id: req.params.id,
      ...req.body
    },
    message: "User update is not implemented yet."
  });
});

// DELETE /users/:id - Delete user
router.delete("/:id", (req, res) => {
  res.status(204).send();
});

export default router;
