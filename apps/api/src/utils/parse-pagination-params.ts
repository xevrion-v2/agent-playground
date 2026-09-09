/**
 * Parses pagination parameters (page, pageSize, limit, offset) from query values.
 * @param page - Page number string (1-indexed).
 * @param pageSize - Items per page string.
 * @param limit - Limit string (overrides pageSize if provided).
 * @param offset - Offset string.
 * @returns Paginated query params with validated integers, defaults: page=1, pageSize=20, limit=undefined, offset=0.
 *
 * @example
 * `	s
 * parsePaginationParams('2', '10', undefined, '5'); // => { page: 2, pageSize: 10, limit: undefined, offset: 5 }
 * parsePaginationParams(undefined, undefined, undefined, undefined); // => { page: 1, pageSize: 20, limit: undefined, offset: 0 }
 * `
 */
export function parsePaginationParams(
  page?: string,
  pageSize?: string,
  limit?: string,
  offset?: string,
): { page: number; pageSize: number; limit?: number; offset: number } {
  return {
    page: Math.max(1, parseInt(page ?? '1', 10) || 1),
    pageSize: Math.max(1, parseInt(pageSize ?? '20', 10) || 20),
    limit: limit ? Math.max(1, parseInt(limit, 10) || undefined) : undefined,
    offset: Math.max(0, parseInt(offset ?? '0', 10) || 0),
  };
}
