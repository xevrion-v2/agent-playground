/**
 * Extracts a human-readable message from an unknown error value.
 * Falls back to a default message for non-Error values.
 */
export function getErrorMessage(error: unknown, fallback = "An unknown error occurred"): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  return fallback;
}
