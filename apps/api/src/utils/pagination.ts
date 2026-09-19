/**
 * Reusable pagination parsing for API endpoints.
 *
 * Accepts the two common pagination styles and normalizes them into a
 * single `{ limit, offset, page, pageSize }` object:
 * - page-based: `?page=2&pageSize=20`
 * - offset-based: `?limit=20&offset=40`
 *
 * All inputs are sanitized: non-numeric, fractional, negative, and
 * out-of-range values fall back to safe defaults, and `pageSize`/`limit`
 * are clamped to `maxPageSize` to protect the database from huge scans.
 */

export interface PaginationQuery {
  page?: unknown;
  pageSize?: unknown;
  limit?: unknown;
  offset?: unknown;
}

export interface Pagination {
  /** Number of items to fetch (clamped to maxPageSize). */
  limit: number;
  /** Number of items to skip. */
  offset: number;
  /** 1-based page number. */
  page: number;
  /** Effective page size. */
  pageSize: number;
}

export interface PaginationDefaults {
  pageSize?: number;
  maxPageSize?: number;
}

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_MAX_PAGE_SIZE = 100;

function toPositiveInt(value: unknown, fallback: number): number {
  const n = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isFinite(n)) return fallback;
  const int = Math.floor(n);
  return int > 0 ? int : fallback;
}

function toNonNegativeInt(value: unknown, fallback: number): number {
  const n = typeof value === "string" && value.trim() !== "" ? Number(value) : value;
  if (typeof n !== "number" || !Number.isFinite(n)) return fallback;
  const int = Math.floor(n);
  return int >= 0 ? int : fallback;
}

/**
 * Parses pagination parameters from a request query object.
 *
 * @example
 * parsePagination({ page: "2", pageSize: "10" })
 * // { limit: 10, offset: 10, page: 2, pageSize: 10 }
 *
 * parsePagination({ limit: "5", offset: "10" })
 * // { limit: 5, offset: 10, page: 3, pageSize: 5 }
 *
 * @param query - Raw query parameters (e.g. `req.query`).
 * @param defaults - Optional `pageSize` / `maxPageSize` overrides.
 * @returns Normalized pagination descriptor.
 */
export function parsePagination(
  query: PaginationQuery = {},
  defaults: PaginationDefaults = {},
): Pagination {
  const maxPageSize = toPositiveInt(defaults.maxPageSize, DEFAULT_MAX_PAGE_SIZE);
  const defaultPageSize = Math.min(
    toPositiveInt(defaults.pageSize, DEFAULT_PAGE_SIZE),
    maxPageSize,
  );

  // Explicit limit/offset wins when a valid limit is provided;
  // otherwise derive from page/pageSize.
  const explicitLimit = toPositiveInt(query.limit, 0);
  if (explicitLimit > 0) {
    const limit = Math.min(explicitLimit, maxPageSize);
    const offset = toNonNegativeInt(query.offset, 0);
    return {
      limit,
      offset,
      page: Math.floor(offset / limit) + 1,
      pageSize: limit,
    };
  }

  const pageSize = Math.min(toPositiveInt(query.pageSize, defaultPageSize), maxPageSize);
  const page = toPositiveInt(query.page, 1);
  return {
    limit: pageSize,
    offset: (page - 1) * pageSize,
    page,
    pageSize,
  };
}
