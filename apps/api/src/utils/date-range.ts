/**
 * Preset date ranges for API query parameters.
 *
 * @example
 * `	s
 * import { DateRange } from './date-range';
 * const range = DateRange.LAST_7_DAYS; // '7d'
 * `
 */
export const DateRange = {
  LAST_24_HOURS: '24h' as const,
  LAST_7_DAYS: '7d' as const,
  LAST_30_DAYS: '30d' as const,
  LAST_90_DAYS: '90d' as const,
  LAST_YEAR: '1y' as const,
  ALL_TIME: 'all' as const,
} as const;

export type DateRange = (typeof DateRange)[keyof typeof DateRange];
