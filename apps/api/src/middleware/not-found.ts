import type { RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (req, res) => {
  res.status(404).json({
    error: `Route ${req.method} ${req.path} not found`,
  });
};

export default notFoundHandler;
