import { Router } from "express";

const router = Router();

/** Expected shape for POST /users request body */
interface CreateUserBody {
  name?: string;
  email?: string;
}

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { name, email } = (req.body || {}) as CreateUserBody;

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    res.status(400).json({
      status: 400,
      data: null,
      error: { message: "name is required and must be a non-empty string" }
    });
    return;
  }

  if (!email || typeof email !== "string" || !email.includes("@")) {
    res.status(400).json({
      status: 400,
      data: null,
      error: { message: "email is required and must be a valid email address" }
    });
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
