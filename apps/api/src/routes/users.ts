import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

router.get("/", (_req, res) => {
  res.json(listUsers());
});

router.post("/", (req, res) => {
  res.status(201).json(createUser(req.body));
});

export default router;
