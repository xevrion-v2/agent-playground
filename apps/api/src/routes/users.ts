import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

router.all("/", (req, res) => {
  res.set("Allow", "GET, POST");
  res.status(405).json({
    error: {
      code: "METHOD_NOT_ALLOWED",
      message: `Method ${req.method} is not allowed for /users.`
    }
  });
});

export default router;
