import { Router } from "express";
import { createUser, listUsers } from "../services/userService.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: listUsers(),
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    data: createUser(req.body),
    message: "User creation is not implemented yet."
  });
});

export default router;
