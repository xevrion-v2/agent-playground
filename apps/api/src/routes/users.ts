import { Router } from "express";
import { apiError } from "../utils/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object") {
    return apiError(res, 400, "Request body must be a JSON object");
  }
  if (!req.body.email || typeof req.body.email !== "string") {
    return apiError(res, 400, "email is required and must be a string");
  }
  const email = req.body.email.trim();
  if (!email.includes("@")) {
    return apiError(res, 400, "email must contain @");
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
