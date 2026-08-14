/**
 * Joins URL segments into a single normalized URL string.
 * @param segments - URL segments to join.
 * @returns A normalized URL string.
 *
 * @example
 * ```ts
 * urlJoin('https://example.com', 'api', 'v1'); // => 'https://example.com/api/v1'
 * ```
 */
export function urlJoin(...segments: string[]): string {
  return segments.map((s, i) => {
    if (i === 0) return s.replace(/\/+$/, '');
    if (i === segments.length - 1) return s.replace(/^\/+/, '');
    return s.replace(/^\/+|\/+$/g, '');
  }).join('/');
}
