/**
 * Joins URL segments into a single valid URL string.
 * Handles leading/trailing slashes and empty segments automatically.
 * 
 * @param segments - Array of URL path segments to join
 * @returns A normalized URL string
 */
export function urlJoin(...segments: string[]): string {
  return segments
    .filter((segment) => segment !== undefined && segment !== null && segment !== '')
    .map((segment) => segment.replace(/(^\/|\/$)/g, ''))
    .join('/')
    .replace(/^\/?/, '/');
}