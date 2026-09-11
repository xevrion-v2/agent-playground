import { Request, Response, NextFunction } from "express";

/**
 * Configuration options for payload limit middleware
 */
export interface PayloadLimitOptions {
  /** Maximum request body size in bytes (default: 10KB) */
  maxSize?: number;
  /** Custom error message (default: "Payload too large") */
  message?: string;
  /** Error code (default: "PAYLOAD_TOO_LARGE") */
  code?: string;
}

/**
 * Creates middleware to enforce maximum request body size
 * Returns 413 Payload Too Large when limit is exceeded
 */
export function payloadLimit(options: PayloadLimitOptions = {}) {
  const { maxSize = 10 * 1024, message = "Payload too large", code = "PAYLOAD_TOO_LARGE" } = options;

  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = req.headers["content-length"];

    if (contentLength) {
      const length = parseInt(contentLength, 10);
      if (length > maxSize) {
        return res.status(413).json({
          error: "PayloadTooLarge",
          message,
          code: "PAYLOAD_TOO_LARGE",
          statusCode: 413,
          timestamp: new Date().toISOString(),
          path: req.path,
        });
      }
    }

    // For chunked encoding or missing content-length, we rely on Express body parser limits
    // but we can also track incoming data size
    let receivedSize = 0;

    req.on("data", (chunk: Buffer) => {
      receivedSize += chunk.length;
      if (receivedSize > maxSize) {
        req.destroy();
        if (!res.headersSent) {
          res.status(413).json({
            error: "PayloadTooLarge",
            message,
            code: "PAYLOAD_TOO_LARGE",
            statusCode: 413,
            timestamp: new Date().toISOString(),
            path: req.path,
          });
        }
      }
    });

    req.on("end", () => {
      // Request completed within size limits
    });

    next();
  };
}

export const defaultPayloadLimit = payloadLimit({ maxSize: 10 * 1024 });