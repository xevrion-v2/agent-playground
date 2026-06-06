import { Router } from "express";
import { sendError } from "../utils/apiError";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    sendError(res, 400, "Missing required fields: name and email are required.");
    return;
  }

  res.status(201).json({
    data: {
      id: "stub-user-id",
      name,
      email,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;
