import { Router } from "express";

const router = Router();

// TODO: Implement pagination and filtering for user listing
// TODO: Add request validation for query parameters
// TODO: Handle empty result set with appropriate messaging
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO: Validate request body against a user schema
// TODO: Hash passwords before storage
// TODO: Return proper error codes for duplicate emails
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
