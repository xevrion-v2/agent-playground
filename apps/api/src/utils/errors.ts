/**
 * Standardized error response helper for API endpoints
 * 
 * @param res - Express response object
 * @param statusCode - HTTP status code (default: 400)
 * @param message - Error message to return
 * @param details - Optional additional error details
 */
export function errorResponse(
  res: { status: (code: number) => { json: (data: object) => void } },
  statusCode: number = 400,
  message: string = "An error occurred",
  details?: string
) {
  const response: { error: string; message: string; details?: string } = {
    error: getErrorName(statusCode),
    message
  };
  
  if (details) {
    response.details = details;
  }
  
  return res.status(statusCode).json(response);
}

/**
 * Get standard HTTP error name from status code
 */
function getErrorName(statusCode: number): string {
  const errorNames: Record<number, string> = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    422: "Unprocessable Entity",
    500: "Internal Server Error"
  };
  return errorNames[statusCode] || "Error";
}
