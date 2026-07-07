/**
 * Safely formats a log message from unknown input.
 * @param message - The log message to format.
 * @param fallback - The fallback message if formatting fails (default: '').
 * @returns The formatted log string.
 */
export function compactLog(message: unknown, fallback: string = ''): string {
  if (message === null || message === undefined) {
    return fallback;
  }

  if (typeof message === 'string') {
    return message.trim();
  }

  if (typeof message === 'object') {
    try {
      return JSON.stringify(message);
    } catch {
      return fallback;
    }
  }

  return String(message);
}