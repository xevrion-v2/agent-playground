import { Router } from "express";
import { sendBadRequest } from "../helpers/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    status: "ok",
    data: [],
    message: "User listing is not implemented yet.",
  });
});

router.post("/", (req, res) => {
  const { email } = req.body ?? {};

  if (!email || typeof email !== "string") {
    sendBadRequest(res, "email is required and must be a string", {
      field: "email",
    });
    return;
  }

  res.status(201).json({
    status: "ok",
    data: {
      id: "stub-user-id",
      email,
    },
    message: "User creation is not implemented yet.",
  });
});

export default router;