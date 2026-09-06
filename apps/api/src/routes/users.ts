import { Router } from "express";

const router = Router();
const allowedCreateUserFields = new Set(["email", "name"]);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u;

function invalidUserInput(message: string) {
  return {
    error: "Invalid user payload",
    message
  };
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body || typeof req.body !== "object" || Array.isArray(req.body)) {
    return res.status(400).json(invalidUserInput("Request body must be an object."));
  }

  const unknownFields = Object.keys(req.body).filter(
    (field) => !allowedCreateUserFields.has(field)
  );

  if (unknownFields.length > 0) {
    return res
      .status(400)
      .json(invalidUserInput(`Unsupported user field: ${unknownFields[0]}`));
  }

  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";

  if (!name) {
    return res.status(400).json(invalidUserInput("User name is required."));
  }

  if (!email || !emailPattern.test(email)) {
    return res.status(400).json(invalidUserInput("A valid user email is required."));
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      email,
      name
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
