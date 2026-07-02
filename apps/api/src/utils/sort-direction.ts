/**
 * Sort direction enum with string literals for API query parameters.
 *
 * @example
 * `	s
 * import { SortDirection } from './sort-direction';
 * const dir = SortDirection.ASC; // 'asc'
 * `
 */
export const SortDirection = {
  ASC: 'asc' as const,
  DESC: 'desc' as const,
} as const;

export type SortDirection = (typeof SortDirection)[keyof typeof SortDirection];
