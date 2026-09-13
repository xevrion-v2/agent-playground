/**
 * Search sort field and direction constants for API query parameters.
 *
 * @example
 * `	s
 * import { SearchSort } from './search-sort';
 * const sort = SearchSort.FIELDS.CREATED_AT;
 * `
 */
export const SearchSort = {
  FIELDS: {
    CREATED_AT: 'created_at' as const,
    UPDATED_AT: 'updated_at' as const,
    NAME: 'name' as const,
    SCORE: 'score' as const,
    POPULARITY: 'popularity' as const,
  } as const,
  DIRECTIONS: {
    ASC: 'asc' as const,
    DESC: 'desc' as const,
  } as const,
} as const;

export type SearchSortField = (typeof SearchSort.FIELDS)[keyof typeof SearchSort.FIELDS];
export type SearchSortDirection = (typeof SearchSort.DIRECTIONS)[keyof typeof SearchSort.DIRECTIONS];
