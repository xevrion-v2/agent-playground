import { Router } from "express";

const healthRouter = Router();

healthRouter.get("/", (_req, res) => {
  res.json({ status: "ok", data: { service: "taskflow-api" } });
});

export default healthRouter;
