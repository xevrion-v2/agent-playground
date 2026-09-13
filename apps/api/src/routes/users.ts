import { Router } from "express";
import { randomUUID } from "node:crypto";

const router = Router();
const allowedCreateFields = new Set(["email", "name"]);

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body = req.body;

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return res.status(400).json({
      error: "Invalid user payload.",
      message: "Request body must be a JSON object."
    });
  }

  const invalidFields = Object.keys(body).filter((field) => !allowedCreateFields.has(field));
  if (invalidFields.length > 0) {
    return res.status(400).json({
      error: "Invalid user payload.",
      message: `Unsupported field(s): ${invalidFields.join(", ")}`
    });
  }

  res.status(201).json({
    data: {
      id: randomUUID(),
      ...body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
