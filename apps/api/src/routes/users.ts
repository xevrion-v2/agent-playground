import { Router } from "express";

import { createUser, listUsers } from "../services/userService.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(listUsers());
});

router.post("/", (req, res) => {
  res.status(201).json(createUser(req.body));
});

export default router;
