import { Router } from "express";

import { validateCreateUser } from "../../middleware/validation";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", validateCreateUser, (req, res) => {
  res.status(201).json({
    data: {
      id: "stub-user-id",
      email: req.body.email,
      name: req.body.name || null
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
