import { Request, Response, NextFunction } from "express";

const ALLOWED_ORIGINS = [
  "http://localhost:3000",
  "http://localhost:5173",
];

export function corsHandler(req: Request, res: Response, next: NextFunction): void {
  const origin = req.headers.origin || "";
  
  if (ALLOWED_ORIGINS.includes(origin) || !origin) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    
    if (req.method === "OPTIONS") {
      res.status(204).end();
      return;
    }
  }
  
  next();
}
