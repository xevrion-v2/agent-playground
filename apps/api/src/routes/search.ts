import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "Search route listing is not implemented yet.",
  });
});

export default router;
