/**
 * Safely extracts an error message from an unknown error object.
 * @param error - The error object.
 * @param fallback - The fallback message if extraction fails (default: 'Unknown error').
 * @returns The error message or fallback.
 */
export function getErrorMessage(error: unknown, fallback: string = 'Unknown error'): string {
  if (error === null || error === undefined) {
    return fallback;
  }

  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message || fallback;
  }

  if (typeof error === 'object' && 'message' in error) {
    const message = (error as { message: unknown }).message;
    if (typeof message === 'string') {
      return message;
    }
  }

  return fallback;
}