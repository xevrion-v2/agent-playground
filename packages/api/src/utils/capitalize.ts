/**
 * Capitalizes the first letter of a string.
 * @param value - The string to capitalize.
 * @param fallback - The fallback value if capitalization fails (default: '').
 * @returns The capitalized string or fallback.
 */
export function capitalize(value: unknown, fallback: string = ''): string {
  if (typeof value !== 'string' || value.length === 0) {
    return fallback;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}