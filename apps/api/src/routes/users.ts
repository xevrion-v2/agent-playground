import { Router } from "express";
import { sendError } from "../utils";

const router = Router();

router.get("/", (_req, res) => {
  // Use error helper instead of standard json (Closes #7)
  return sendError(res, 501, "User listing is not implemented yet.");
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

export default router;
