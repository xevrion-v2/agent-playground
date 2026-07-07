/**
 * Truncates a string to a specified length with an optional ellipsis.
 * @param value - The string to truncate.
 * @param maxLength - The maximum length (default: 50).
 * @param ellipsis - The ellipsis string (default: '...').
 * @returns The truncated string.
 */
export function truncate(
  value: unknown,
  maxLength: number = 50,
  ellipsis: string = '...'
): string {
  if (typeof value !== 'string') {
    return '';
  }

  if (value.length <= maxLength) {
    return value;
  }

  return value.slice(0, maxLength - ellipsis.length) + ellipsis;
}