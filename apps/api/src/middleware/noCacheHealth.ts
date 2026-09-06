import { RequestHandler } from "express";

export const noCacheHealth: RequestHandler = (_req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  next();
};

export default noCacheHealth;
