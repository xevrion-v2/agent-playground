import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({ message: "TaskFlow tasks route" });
});

export default router;
