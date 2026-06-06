export class APIError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

export const createAPIError = (
  statusCode: number,
  message: string,
  code?: string
): APIError => {
  return new APIError(statusCode, message, code);
};

export const sendAPIErrorResponse = (error: APIError | Error, res: any) => {
  const statusCode = error instanceof APIError ? error.statusCode : 500;
  return res.status(statusCode).json({ error: error.message });
};