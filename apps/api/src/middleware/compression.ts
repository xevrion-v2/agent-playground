import { Request, Response, NextFunction } from "express";
import { createGzip } from "zlib";
import { promisify } from "util";

const gzip = promisify(createGzip);

export function compressionHandler(req: Request, res: Response, next: NextFunction): void {
  const acceptEncoding = req.headers["accept-encoding"] || "";
  
  if (acceptEncoding.includes("gzip")) {
    const originalSend = res.send.bind(res);
    res.send = function (body: any): Response {
      if (typeof body === "string" || Buffer.isBuffer(body)) {
        const compressed = (createGzip)(body);
        res.setHeader("Content-Encoding", "gzip");
        return originalSend(compressed);
      }
      return originalSend(body);
    } as any;
  }
  
  next();
}
