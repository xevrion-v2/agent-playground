import { Request, Response, NextFunction } from "express";

const DEFAULT_TIMEOUT_MS = 30000;

export function requestTimeout(timeoutMs: number = DEFAULT_TIMEOUT_MS) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const timer = setTimeout(() => {
      if (!res.headersSent) {
        res.status(408).json({ error: "Request timeout" });
      }
    }, timeoutMs);
    
    res.on("finish", () => clearTimeout(timer));
    next();
  };
}
