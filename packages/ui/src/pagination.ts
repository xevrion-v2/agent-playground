/**
 * Pagination helper — parses page, pageSize, limit, offset from query params.
 * ponytail: returns sensible defaults, no zod/validation needed.
 */

interface PaginationInput {
  page?: string | number;
  pageSize?: string | number;
  limit?: string | number;
  offset?: string | number;
}

export function parsePagination({ page, pageSize, limit, offset }: PaginationInput): { page: number; pageSize: number; limit: number; offset: number } {
  const p = Math.max(1, Number(page) || 1);
  const ps = Math.max(1, Math.min(100, Number(pageSize) || Number(limit) || 20));
  const o = Math.max(0, Number(offset) || (p - 1) * ps);
  return { page: p, pageSize: ps, limit: ps, offset: o };
}

export default parsePagination;
