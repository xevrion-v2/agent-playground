import { Router } from "express";
import { errorResponse } from "../utils/errorResponse";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  // Example usage of error helper for invalid input
  if (!req.body.email) {
    return res.status(400).json(
      errorResponse(400, "Email is required", { field: "email" })
    );
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
