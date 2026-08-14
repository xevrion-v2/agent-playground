import { isValidDate } from './valid-date-guard';
export function parseDate(value: string | undefined): Date | undefined {
  if (!value) return undefined;
  const d = new Date(value);
  return isValidDate(d) ? d : undefined;
}
