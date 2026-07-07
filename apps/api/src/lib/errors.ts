export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function sendError(res: any, error: unknown) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      error: error.name,
      message: error.message,
      details: error.details
    });
  }
  return res.status(500).json({
    error: "InternalServerError",
    message: "An unexpected error occurred"
  });
}
