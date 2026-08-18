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
      ...req.body,
      id: "stub-user-id"
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
