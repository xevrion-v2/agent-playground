import { Router } from "express";

import { sendValidationError } from "../utils/errorHelper";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return sendValidationError(res, "A valid email is required to create a user.");
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
