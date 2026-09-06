import { Router } from "express";
import { ApiError } from "../utils/error-handler";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body.name) {
    throw ApiError.badRequest("Name is required");
  }
  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: req.body.name,
      ...req.body
    },
    message: "User created successfully."
  });
});

export default router;
