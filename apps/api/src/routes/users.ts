import { Router } from "express";

const router = Router();

// TODO: Replace this placeholder with a database-backed user query that supports
// pagination, filtering, and authorization-aware field selection.
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Replace this stub with validated user creation, persistence, and
// consistent error handling for duplicate or invalid user records.
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
