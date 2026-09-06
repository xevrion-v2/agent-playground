import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  const email = "email" in body ? body.email : undefined;
  const name = "name" in body ? body.name : undefined;

  const data: Record<string, unknown> = { id: "stub-user-id" };
  if (email !== undefined) {
    data.email = email;
  }
  if (name !== undefined) {
    data.name = name;
  }

  res.status(201).json({
    data,
    message: "User creation is not implemented yet.",
  });
});

export default router;
