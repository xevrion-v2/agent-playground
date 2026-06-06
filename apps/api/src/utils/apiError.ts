export class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const sendErrorResponse = (
  res: any,
  statusCode: number,
  message: string
) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      message,
      statusCode,
    },
  });
};

export const createNotFoundError = (resource: string) => {
  return new ApiError(404, `${resource} not found`);
};

export const createBadRequestError = (message: string) => {
  return new ApiError(400, message);
};

export const createUnauthorizedError = (message = 'Unauthorized') => {
  return new ApiError(401, message);
};

export const createForbiddenError = (message = 'Forbidden') => {
  return new ApiError(403, message);
};