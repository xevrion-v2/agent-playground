import { Router } from "express";
import { apiError } from "../helpers/error";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    res.status(400).json(apiError({
      status: 400,
      message: "Invalid request body"
    }));
    return;
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
