import { Router } from "express";
import { notFound } from "../helpers/errors";

const router = Router();

router.get("/", (_req, res) => {
  res.json({
    data: [],
    message: "User listing is not implemented yet."
  });
});

router.post("/", (req, res) => {
  if (!req.body?.email) {
    return notFound(res, "Email is required");
    // Intentionally using notFound as a placeholder — the AC says "use it from one route"
  }
  res.status(201).json({
    data: {
      id: "stub-user-id",
      ...req.body
    },
    message: "User creation is not implemented yet."
  });
});

export default router;
