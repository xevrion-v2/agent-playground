import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body || {};

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({ error: "Validation Error", message: "A valid email is required" });
    return;
  }

  if (name !== undefined && typeof name !== "string") {
    res.status(400).json({ error: "Validation Error", message: "Name must be a string" });
    return;
  }

  const allowedFields = ["email", "name"];
  const extraFields = Object.keys(req.body || {}).filter(k => !allowedFields.includes(k));
  if (extraFields.length > 0) {
    res.status(400).json({ error: "Validation Error", message: "Unexpected fields: " + extraFields.join(", ") });
    return;
  }

  res.status(201).json({
    data: { id: "stub-user-id", email, ...(name ? { name } : {}) },
    message: "User creation is not implemented yet."
  });
});

export default router;
