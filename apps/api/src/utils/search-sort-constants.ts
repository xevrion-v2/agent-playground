/**
 * Constants for search and sort directions.
 * @module utils/search-sort-constants
 */
export const SortDirection = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortDir = (typeof SortDirection)[keyof typeof SortDirection];
