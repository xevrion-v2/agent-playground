import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  // TODO: Fetch users from the user service with pagination and search filters.
  // Handle invalid query parameters, authorization failures, and data-store errors.
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // TODO: Validate and create users through the service layer.
  // Handle missing required fields, duplicate emails, permission failures, and persistence errors.
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
