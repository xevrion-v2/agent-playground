import { Router } from "express";
import { sendBadRequest } from "../helpers/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  const errors: string[] = [];
  
  if (!req.body.username || typeof req.body.username !== "string" || req.body.username.length < 3 || req.body.username.length > 30) {
    errors.push("Username is required and must be 3-30 characters");
  }
  
  if (!req.body.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(req.body.email)) {
    errors.push("A valid email address is required");
  }
  
  if (errors.length > 0) {
    sendBadRequest(res, errors);
    return;
  }
  
  res.status(201).json({
    data: {
      id: "stub-user-id",
      username: req.body.username,
      email: req.body.email
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
