import { parseDate } from './date-parse';
export function parseDateRange(from: string | undefined, to: string | undefined): { from?: Date; to?: Date } {
  return { from: parseDate(from), to: parseDate(to) };
}
