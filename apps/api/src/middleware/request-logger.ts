import type { RequestHandler } from "express";

export const requestLogger: RequestHandler = (req, res, next) => {
  const startedAt = Date.now();

  res.on("finish", () => {
    const durationMs = Date.now() - startedAt;
    console.info(
      `${req.method} ${req.originalUrl} ${res.statusCode} ${durationMs}ms`,
    );
  });

  next();
};

export default requestLogger;