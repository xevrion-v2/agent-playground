import { Request, Response, NextFunction } from "express";
export function cacheControl(maxAge: number = 300) {
  return (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Cache-Control", `public, max-age=${maxAge}`);
    next();
  };
}
