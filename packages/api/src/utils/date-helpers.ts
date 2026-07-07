/**
 * Formats a date to a string in ISO format (YYYY-MM-DD).
 * @param date - The date to format.
 * @param fallback - The fallback value if formatting fails (default: '').
 * @returns The formatted date string or fallback.
 */
export function formatDate(date: unknown, fallback: string = ''): string {
  if (date instanceof Date && !isNaN(date.getTime())) {
    return date.toISOString().split('T')[0];
  }

  if (typeof date === 'string' || typeof date === 'number') {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      return parsed.toISOString().split('T')[0];
    }
  }

  return fallback;
}

/**
 * Checks if a date is today.
 * @param date - The date to check.
 * @returns True if the date is today, false otherwise.
 */
export function isToday(date: unknown): boolean {
  if (date instanceof Date && !isNaN(date.getTime())) {
    const today = new Date();
    return date.getFullYear() === today.getFullYear() &&
           date.getMonth() === today.getMonth() &&
           date.getDate() === today.getDate();
  }

  if (typeof date === 'string' || typeof date === 'number') {
    const parsed = new Date(date);
    if (!isNaN(parsed.getTime())) {
      return isToday(parsed);
    }
  }

  return false;
}

/**
 * Gets the current date as a string in ISO format (YYYY-MM-DD).
 * @returns The current date as a string.
 */
export function today(): string {
  return new Date().toISOString().split('T')[0];
}

/**
 * Adds days to a date.
 * @param date - The date to add days to.
 * @param days - The number of days to add.
 * @returns The new date.
 */
export function addDays(date: Date | string | number, days: number): Date | null {
  const parsed = typeof date === 'string' || typeof date === 'number'
    ? new Date(date)
    : date;

  if (!(parsed instanceof Date) || isNaN(parsed.getTime())) {
    return null;
  }

  const result = new Date(parsed);
  result.setDate(result.getDate() + days);
  return result;
}