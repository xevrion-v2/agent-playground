import { Router } from "express";

const router = Router();

// TODO(#20): implement user listing with pagination and filtering
router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// TODO(#21): implement user creation with validation and DB persistence
router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

// TODO(#22): implement user update endpoint
// TODO(#23): implement user delete endpoint

export default router;
