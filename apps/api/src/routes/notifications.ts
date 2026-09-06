import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "Notification route listing is not implemented yet."
  });
});

export default router;