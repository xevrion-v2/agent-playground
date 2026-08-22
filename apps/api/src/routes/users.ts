import { Router } from "express";

import {
  UserValidationError,
  createUser,
  listUsers
} from "../services/userService.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: listUsers(),
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  try {
    res.status(201).json({
      data: createUser(req.body),
      message: "User creation is not implemented yet."
    });
  } catch (error) {
    if (error instanceof UserValidationError) {
      res.status(400).json({
        error: {
          message: error.message,
          details: error.details
        }
      });
      return;
    }

    throw error;
  }
});

export default router;
