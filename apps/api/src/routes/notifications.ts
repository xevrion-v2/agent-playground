import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "TaskFlow notifications route placeholder. Notification endpoints are not implemented yet."
  });
});

export default router;
