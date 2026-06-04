import { Router } from "express";
import { sendError } from "../utils/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email } = req.body || {};

  if (!email) {
    return sendError(res, "Email field is required to create a user", {
      status: 400,
      error: "ValidationError"
    });
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;

