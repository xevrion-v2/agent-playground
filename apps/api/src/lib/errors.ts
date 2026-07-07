// ============================================================
// API 错误处理助手
// 提供统一的错误响应格式，方便前端消费
// ============================================================
import type { Request, Response, NextFunction } from "express";

// -------------------- 自定义错误类 --------------------
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string = "Resource") {
    super(`${resource} not found`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string = "Bad request") {
    super(message, 400);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

// -------------------- 全局错误处理中间件 --------------------
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      statusCode: err.statusCode,
    });
    return;
  }

  // 未知错误：记录日志，返回通用 500
  console.error("Unhandled error:", err);
  res.status(500).json({
    error: "Internal server error",
    statusCode: 500,
  });
}

// -------------------- 404 兜底处理 --------------------
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    error: "Route not found",
    statusCode: 404,
  });
}
