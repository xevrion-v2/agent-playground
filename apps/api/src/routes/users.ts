import { Router } from "express";

const router = Router();

// TODO: Add pagination support (page, limit query params)
// TODO: Add search/filter by name or email
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Add input validation (name, email required)
// TODO: Add duplicate email check
// TODO: Add password hashing
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
