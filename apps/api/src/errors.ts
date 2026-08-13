// API error response helper
export class AppError extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    this.name = 'AppError';
  }
}

export function errorResponse(res: any, statusCode: number, message: string) {
  return res.status(statusCode).json({ error: message });
}

export function notFound(res: any, message = 'Resource not found') {
  return errorResponse(res, 404, message);
}

export function badRequest(res: any, message = 'Bad request') {
  return errorResponse(res, 400, message);
}

export function serverError(res: any, message = 'Internal server error') {
  return errorResponse(res, 500, message);
}
