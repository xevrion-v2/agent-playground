export class APIError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'APIError";
  }
}

export function createErrorResponse(message: string, statusCode: number = 500) {
  return {
    success: false,
    error: {
      message,
      statusCode,
    },
  };
}

export function handleAPIError(error: unknown) {
  if (error instanceof APIError) {
    return createErrorResponse(error.message, error.statusCode);
  }

  console.error("Unexpected error:", error);
  return createErrorResponse("Internal server error", 500);
}

export default APIError;