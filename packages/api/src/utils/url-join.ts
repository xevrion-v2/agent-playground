/**
 * Safely joins URL parts into a single URL.
 * @param parts - The URL parts to join.
 * @returns The joined URL string.
 */
export function urlJoin(...parts: string[]): string {
  return parts
    .filter(part => part.length > 0)
    .map(part => part.replace(/^\/+|\/+$/g, ''))
    .join('/');
}