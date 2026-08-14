import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "TaskFlow profile route" });
});

export default router;
