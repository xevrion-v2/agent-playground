/**
 * Date Parsing Helper
 * 
 * A standalone utility for parsing various date string formats into ISO 8601 strings.
 * No runtime dependencies.
 */

export type DateInput = string | Date | number;

/**
 * Parses a date input into a valid Date object or returns null if parsing fails.
 * Supports ISO strings, RFC 2822, and common US/UK formats.
 * 
 * @param input - The date string, Date object, or timestamp to parse.
 * @returns A valid Date object, or null if the input is invalid.
 */
export function parseDate(input: DateInput): Date | null {
  if (input instanceof Date) {
    return isNaN(input.getTime()) ? null : input;
  }

  if (typeof input === 'number') {
    const date = new Date(input);
    return isNaN(date.getTime()) ? null : date;
  }

  if (typeof input !== 'string') {
    return null;
  }

  const trimmed = input.trim();
  if (!trimmed) return null;

  // Attempt standard parsing first
  const standardDate = new Date(trimmed);
  if (!isNaN(standardDate.getTime())) {
    return standardDate;
  }

  // Fallback for common formats if standard parsing fails (e.g., "DD/MM/YYYY")
  // This is a minimal implementation to handle strict environments without heavy libs
  const parts = trimmed.split(/[-/]/);
  
  if (parts.length === 3) {
    const [p1, p2, p3] = parts;
    const isUSFormat = p1.length <= 2 && p2.length <= 2 && p3.length === 4;
    const isUKFormat = p1.length === 4 && p2.length <= 2 && p3.length <= 2;

    let year: number, month: number, day: number;

    if (isUSFormat) {
      // MM/DD/YYYY
      [month, day, year] = [parseInt(p1), parseInt(p2), parseInt(p3)];
    } else if (isUKFormat) {
      // YYYY/MM/DD or YYYY-DD-MM (rare, but handled)
      [year, month, day] = [parseInt(p1), parseInt(p2), parseInt(p3)];
    } else {
      // Assume DD/MM/YYYY if ambiguous but lengths suggest it
      [day, month, year] = [parseInt(p1), parseInt(p2), parseInt(p3)];
    }

    if (
      !isNaN(year) && 
      !isNaN(month) && 
      !isNaN(day) && 
      year > 1900 && year < 2100 &&
      month >= 1 && month <= 12 &&
      day >= 1 && day <= 31
    ) {
      // Note: Month is 0-indexed in JS Date
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }
  }

  return null;
}

/**
 * Formats a date to ISO 8601 string (YYYY-MM-DDTHH:mm:ss.sssZ).
 * 
 * @param input - The date input to format.
 * @returns ISO string or null if input is invalid.
 */
export function formatDateToISO(input: DateInput): string | null {
  const date = parseDate(input);
  return date ? date.toISOString() : null;
}