/**
 * Pagination parsing helper for API endpoints
 * @param page - Current page number (default: 1)
 * @param pageSize - Number of items per page (default: 10)
 * @returns Pagination object with offset and limit values
 */
export function parsePagination(page?: number, pageSize?: number): {
  offset: number;
  limit: number;
  page: number;
  pageSize: number;
} {
  const validPage = Math.max(1, Math.floor(page ?? 1));
  const validPageSize = Math.max(1, Math.min(100, Math.floor(pageSize ?? 10)));
  
  return {
    page: validPage,
    pageSize: validPageSize,
    offset: (validPage - 1) * validPageSize,
    limit: validPageSize,
  };
}

/**
 * Extract pagination params from query object
 * @param query - Express query object
 * @returns Parsed pagination values
 */
export function getPaginationFromQuery(query: Record<string, unknown>): {
  offset: number;
  limit: number;
  page: number;
  pageSize: number;
} {
  const page = query.page ? parseInt(String(query.page), 10) : undefined;
  const pageSize = query.pageSize ?? query.limit ?? query.size ? 
    parseInt(String(query.pageSize ?? query.limit ?? query.size), 10) : undefined;
  
  return parsePagination(page, pageSize);
}