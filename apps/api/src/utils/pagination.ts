export type PaginationInput = {
  page?: string | number;
  pageSize?: string | number;
};

export type Pagination = {
  page: number;
  pageSize: number;
  limit: number;
  offset: number;
};

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 20;
const MAX_PAGE_SIZE = 100;

function toPositiveInteger(value: string | number | undefined, fallback: number): number {
  if (value === undefined || value === null) {
    return fallback;
  }
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }
  return parsed;
}

/**
 * Normalizes page and pageSize input parameters to return a validated
 * page, pageSize, limit, and offset object.
 *
 * @param {PaginationInput} [input={}] - The pagination input.
 * @returns {Pagination} The normalized pagination parameters.
 */
export function normalizePagination(input: PaginationInput = {}): Pagination {
  const page = toPositiveInteger(input.page, DEFAULT_PAGE);
  const pageSize = Math.min(
    toPositiveInteger(input.pageSize, DEFAULT_PAGE_SIZE),
    MAX_PAGE_SIZE,
  );

  return {
    page,
    pageSize,
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };
}
