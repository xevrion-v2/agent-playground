import { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: { code: "NOT_FOUND", message: "endpoint not found" } });
};

export default notFoundHandler;
