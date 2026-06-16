import { Router } from "express";

const router = Router();

// TODO: Add pagination support (query params: page, limit)
// TODO: Add filtering by status, priority, or assignee
// TODO: Add search by name or email
// TODO: Add proper error handling middleware
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Add input validation middleware (name, email required)
// TODO: Add duplicate email check before creation
// TODO: Add database insertion logic
// TODO: Add proper error responses for validation failures
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
