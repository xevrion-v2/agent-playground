import { Router } from "express";
import { listUsers, createUser } from "../services/userService";

const router = Router();

router.get("/", async (_req, res, next) => {
  try {
    const result = await listUsers();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const result = await createUser(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
