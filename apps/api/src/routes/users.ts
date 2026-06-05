import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email, name } = req.body;

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
