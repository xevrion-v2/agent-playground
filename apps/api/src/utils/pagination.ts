export interface PaginationParams {
  page: number;
  pageSize: number;
  limit: number;
  offset: number;
}

export interface PaginationOptions {
  defaultPage?: number;
  defaultPageSize?: number;
  maxPageSize?: number;
}

export type PaginationQuery = Record<string, unknown>;

export const DEFAULT_PAGINATION = {
  page: 1,
  pageSize: 20,
  maxPageSize: 100
} as const;

const firstQueryValue = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
};

const parseInteger = (value: unknown): number | null => {
  const firstValue = firstQueryValue(value);

  if (typeof firstValue === "number" && Number.isInteger(firstValue)) {
    return firstValue;
  }

  if (typeof firstValue !== "string" || !/^\d+$/.test(firstValue.trim())) {
    return null;
  }

  return Number.parseInt(firstValue, 10);
};

const parsePositiveInteger = (value: unknown, fallback: number): number => {
  const parsed = parseInteger(value);

  return parsed && parsed > 0 ? parsed : fallback;
};

const parseNonNegativeInteger = (value: unknown): number | null => {
  const parsed = parseInteger(value);

  return parsed !== null && parsed >= 0 ? parsed : null;
};

export const parsePaginationQuery = (
  query: PaginationQuery,
  options: PaginationOptions = {}
): PaginationParams => {
  const maxPageSize = parsePositiveInteger(
    options.maxPageSize,
    DEFAULT_PAGINATION.maxPageSize
  );
  const defaultPage = parsePositiveInteger(
    options.defaultPage,
    DEFAULT_PAGINATION.page
  );
  const defaultPageSize = Math.min(
    parsePositiveInteger(options.defaultPageSize, DEFAULT_PAGINATION.pageSize),
    maxPageSize
  );

  const page = parsePositiveInteger(query.page, defaultPage);
  const requestedPageSize = query.pageSize ?? query.page_size ?? query.limit;
  const pageSize = Math.min(
    parsePositiveInteger(requestedPageSize, defaultPageSize),
    maxPageSize
  );
  const limit = Math.min(
    parsePositiveInteger(query.limit, pageSize),
    maxPageSize
  );
  const offset = parseNonNegativeInteger(query.offset) ?? (page - 1) * pageSize;

  return {
    page,
    pageSize,
    limit,
    offset
  };
};

export const parsePagination = parsePaginationQuery;
