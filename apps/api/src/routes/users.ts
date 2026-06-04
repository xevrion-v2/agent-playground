import { Router } from "express";
import { sendError } from "../helpers/errorHandler";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return sendError(res, 400, "Request body must not be empty.");
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
