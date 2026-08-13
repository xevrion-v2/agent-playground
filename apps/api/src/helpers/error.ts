/** Standard API error response helper */

interface ApiErrorParams {
  status?: number;
  message: string;
  details?: unknown;
}

export function apiError({ status = 500, message, details }: ApiErrorParams) {
  return {
    status,
    data: null,
    error: {
      message,
      ...(details !== undefined ? { details } : {}),
    },
  };
}
