import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const body = req.body;
  const allowedFields = ["name", "email"];

  if (
    body === null ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).some((field) => !allowedFields.includes(field)) ||
    typeof body.name !== "string" ||
    typeof body.email !== "string"
  ) {
    res.status(400).json({
      error: "Invalid request body",
      message: "Request body must include only string name and email fields."
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name: body.name,
      email: body.email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
