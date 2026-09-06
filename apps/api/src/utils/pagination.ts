/**
 * Parse pagination parameters from query string.
 * 
 * Returns normalized page, limit, offset values.
 * 
 * Examples:
 *   parsePagination({ page: "2", limit: "20" })
 *     → { page: 2, limit: 20, offset: 20 }
 *   parsePagination({})
 *     → { page: 1, limit: 10, offset: 0 }
 *   parsePagination({ page: "-1", limit: "1000" })
 *     → { page: 1, limit: 100, offset: 0 } (sanitized)
 */
export function parsePagination(query: Record<string, unknown>) {
  const page = Math.max(1, Math.min(10000, parseInt(String(query.page ?? 1), 10))) || 1;
  const limit = Math.max(1, Math.min(100, parseInt(String(query.limit ?? 10), 10))) || 10;
  const offset = (page - 1) * limit;
  
  return { page, limit, offset };
}
