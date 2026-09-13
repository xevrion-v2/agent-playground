export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function parsePagination(
  queryPage?: string | number,
  queryLimit?: string | number,
  maxLimit: number = 100,
  defaultLimit: number = 20
): PaginationParams {
  let page = Math.max(1, Math.floor(Number(queryPage) || 1));
  let limit = Math.min(maxLimit, Math.max(1, Math.floor(Number(queryLimit) || defaultLimit)));
  let offset = (page - 1) * limit;
  return { page, limit, offset };
}
