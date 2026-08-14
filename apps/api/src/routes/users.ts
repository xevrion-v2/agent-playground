import { Router } from "express";

const router = Router();

// TODO: Add pagination support (query params: page, limit), filtering by role/status,
// TODO: handle 404 when no users match filters, return proper error shapes
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body fields (email format, password strength, name required)
// TODO: Reject duplicate email with 409 Conflict
// TODO: Return 422 Unprocessable Entity for invalid input shapes
// TODO: Sanitize req.body before echoing back (remove password field)
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
