import { Router } from "express";
import { sendError } from "../utils/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const { username } = req.body;

  if (!username || typeof username !== "string" || username.trim() === "") {
    return sendError(
      res,
      400,
      "Username is required and must be a non-empty string."
    );
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
