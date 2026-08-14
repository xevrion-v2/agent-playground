import { Response } from 'express';

interface ErrorResponse {
  status: string;
  error: {
    code: string;
    message: string;
  };
}

export function sendError(res: Response, statusCode: number, code: string, message: string): void {
  const body: ErrorResponse = {
    status: 'error',
    error: { code, message },
  };
  res.status(statusCode).json(body);
}

export function sendNotFound(res: Response, resource: string): void {
  sendError(res, 404, 'NOT_FOUND', `${resource} not found`);
}

export function sendBadRequest(res: Response, message: string): void {
  sendError(res, 400, 'BAD_REQUEST', message);
}

export function sendServerError(res: Response, message?: string): void {
  sendError(res, 500, 'INTERNAL_ERROR', message || 'An unexpected error occurred');
}
