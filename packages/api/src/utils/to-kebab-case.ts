/**
 * Converts a string to kebab-case.
 * @param value - The string to convert.
 * @param fallback - The fallback value if conversion fails (default: '').
 * @returns The kebab-case string or fallback.
 */
export function toKebabCase(value: unknown, fallback: string = ''): string {
  if (typeof value !== 'string') {
    return fallback;
  }

  return value
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}