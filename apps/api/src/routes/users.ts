import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

// Lightweight input validation: reject empty or non-object request bodies
router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      data: null,
      message: "Request body must be a non-empty JSON object."
    });
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