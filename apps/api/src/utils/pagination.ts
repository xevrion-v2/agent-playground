/**
 * Reusable pagination parsing utilities for API endpoints.
 * Handles page, page size, limit, and offset values with sensible defaults.
 */

// Default pagination constants
export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;
export const MIN_PAGE = 1;
export const MIN_PAGE_SIZE = 1;

/**
 * Parsed pagination parameters.
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  limit: number;
  offset: number;
}

/**
 * Parses a query value into a positive integer, falling back to default.
 *
 * @param value - The raw query value (string, number, or undefined)
 * @param defaultValue - The default value if parsing fails
 * @param min - The minimum allowed value
 * @param max - The maximum allowed value
 * @returns A valid positive integer
 */
export const parsePositiveInt = (
  value: string | number | undefined,
  defaultValue: number,
  min: number = 1,
  max: number = Number.MAX_SAFE_INTEGER
): number => {
  if (value === undefined || value === null) {
    return defaultValue;
  }

  const parsed = typeof value === "number" ? value : parseInt(value, 10);

  if (isNaN(parsed) || !isFinite(parsed)) {
    return defaultValue;
  }

  return Math.min(Math.max(Math.floor(parsed), min), max);
};

/**
 * Parses pagination parameters from a query object.
 *
 * @param query - The Express request query object
 * @returns Parsed pagination params with page, pageSize, limit, and offset
 *
 * @example
 *   const { page, pageSize, limit, offset } = parsePagination(req.query);
 *   const users = await userService.findAll({ limit, offset });
 */
export const parsePagination = (query: {
  page?: string | number;
  pageSize?: string | number;
  limit?: string | number;
  offset?: string | number;
}): PaginationParams => {
  // Parse page (1-indexed)
  const page = parsePositiveInt(query.page, DEFAULT_PAGE, MIN_PAGE);

  // Parse page size, capped at MAX_PAGE_SIZE
  const pageSize = parsePositiveInt(
    query.pageSize,
    DEFAULT_PAGE_SIZE,
    MIN_PAGE_SIZE,
    MAX_PAGE_SIZE
  );

  // Parse explicit limit, defaulting to pageSize
  const limit = parsePositiveInt(
    query.limit,
    pageSize,
    MIN_PAGE_SIZE,
    MAX_PAGE_SIZE
  );

  // Parse explicit offset, defaulting to (page - 1) * pageSize
  const offset =
    query.offset !== undefined
      ? parsePositiveInt(query.offset, 0, 0)
      : (page - 1) * pageSize;

  return {
    page,
    pageSize,
    limit,
    offset,
  };
};

/**
 * Builds a pagination response metadata object.
 *
 * @param page - Current page number
 * @param pageSize - Page size
 * @param total - Total number of items
 * @returns Pagination metadata with total, pages, page, pageSize, hasNext, hasPrev
 */
export const buildPaginationMeta = (
  page: number,
  pageSize: number,
  total: number
): {
  total: number;
  pages: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
} => {
  const pages = Math.ceil(total / pageSize) || 0;
  return {
    total,
    pages,
    page,
    pageSize,
    hasNext: page < pages,
    hasPrev: page > 1,
  };
};

export default {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  parsePositiveInt,
  parsePagination,
  buildPaginationMeta,
};
