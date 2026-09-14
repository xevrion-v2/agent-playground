/**
 * Date formatting utilities for API responses and internal use.
 * Provides consistent date formatting across the application.
 */

/**
 * Common date format patterns.
 */
export const DateFormat = {
  ISO: "YYYY-MM-DD",
  ISO_DATETIME: "YYYY-MM-DDTHH:mm:ss",
  ISO_DATETIME_TZ: "YYYY-MM-DDTHH:mm:ssZ",
  DISPLAY: "MM/DD/YYYY",
  DISPLAY_DATETIME: "MM/DD/YYYY HH:mm",
  EUROPEAN: "DD/MM/YYYY",
  EUROPEAN_DATETIME: "DD/MM/YYYY HH:mm",
  LONG: "MMMM D, YYYY",
  LONG_DATETIME: "MMMM D, YYYY HH:mm",
  SHORT: "MMM D, YYYY",
  TIME: "HH:mm:ss",
  TIME_SHORT: "HH:mm",
  RELATIVE: "relative",
} as const;

export type DateFormatType = (typeof DateFormat)[keyof typeof DateFormat];

/**
 * Month names (full).
 */
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

/**
 * Month names (short).
 */
export const MONTH_NAMES_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

/**
 * Day names (full).
 */
export const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
] as const;

/**
 * Day names (short).
 */
export const DAY_NAMES_SHORT = [
  "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
] as const;

/**
 * Pads a number to 2 digits with leading zero.
 */
function pad2(n: number): string {
  return n.toString().padStart(2, "0");
}

/**
 * Pads a number to 4 digits with leading zeros.
 */
function pad4(n: number): string {
  return n.toString().padStart(4, "0");
}

/**
 * Formats a date according to the specified pattern.
 *
 * Supported tokens:
 * - YYYY: 4-digit year
 * - YY: 2-digit year
 * - MM: 2-digit month (01-12)
 * - M: month (1-12)
 * - MMMM: full month name
 * - MMM: short month name
 * - DD: 2-digit day (01-31)
 * - D: day (1-31)
 * - dddd: full day name
 * - ddd: short day name
 * - HH: 2-digit hour (00-23)
 * - H: hour (0-23)
 * - hh: 2-digit hour (01-12)
 * - h: hour (1-12)
 * - mm: 2-digit minute (00-59)
 * - m: minute (0-59)
 * - ss: 2-digit second (00-59)
 * - s: second (0-59)
 * - A: AM/PM
 * - a: am/pm
 * - Z: timezone offset (+HH:mm)
 *
 * @param date - The date to format (Date object, timestamp, or date string)
 * @param format - The format pattern or predefined format
 * @returns The formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date("2026-09-12T14:30:00"), "YYYY-MM-DD") // "2026-09-12"
 * formatDate(new Date("2026-09-12T14:30:00"), "MM/DD/YYYY HH:mm") // "09/12/2026 14:30"
 * formatDate(new Date("2026-09-12T14:30:00"), "MMMM D, YYYY") // "September 12, 2026"
 * ```
 */
export function formatDate(
  date: Date | number | string,
  format: string | DateFormatType = DateFormat.ISO,
): string {
  const d = date instanceof Date ? date : new Date(date);

  if (isNaN(d.getTime())) {
    return "Invalid Date";
  }

  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const dayOfWeek = d.getDay();
  const hours = d.getHours();
  const hours12 = hours % 12 || 12;
  const minutes = d.getMinutes();
  const seconds = d.getSeconds();
  const isPM = hours >= 12;
  const timezoneOffset = -d.getTimezoneOffset();
  const tzHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const tzMinutes = Math.abs(timezoneOffset) % 60;
  const tzSign = timezoneOffset >= 0 ? "+" : "-";

  const tokens: Record<string, string> = {
    YYYY: pad4(year),
    YY: pad2(year % 100),
    MMMM: MONTH_NAMES[month],
    MMM: MONTH_NAMES_SHORT[month],
    MM: pad2(month + 1),
    M: String(month + 1),
    dddd: DAY_NAMES[dayOfWeek],
    ddd: DAY_NAMES_SHORT[dayOfWeek],
    DD: pad2(day),
    D: String(day),
    HH: pad2(hours),
    H: String(hours),
    hh: pad2(hours12),
    h: String(hours12),
    mm: pad2(minutes),
    m: String(minutes),
    ss: pad2(seconds),
    s: String(seconds),
    A: isPM ? "PM" : "AM",
    a: isPM ? "pm" : "am",
    Z: `${tzSign}${pad2(tzHours)}:${pad2(tzMinutes)}`,
  };

  let result = format;
  // Replace tokens in order of longest first to avoid partial matches
  const tokenOrder = [
    "YYYY", "YY", "MMMM", "MMM", "MM", "M",
    "dddd", "ddd", "DD", "D",
    "HH", "H", "hh", "h",
    "mm", "m", "ss", "s",
    "A", "a", "Z",
  ];

  for (const token of tokenOrder) {
    result = result.split(token).join(tokens[token]);
  }

  return result;
}

/**
 * Formats a date as an ISO string (YYYY-MM-DD).
 *
 * @param date - The date to format
 * @returns The ISO date string
 */
export function formatISODate(date: Date | number | string): string {
  return formatDate(date, DateFormat.ISO);
}

/**
 * Formats a date as an ISO datetime string (YYYY-MM-DDTHH:mm:ss).
 *
 * @param date - The date to format
 * @returns The ISO datetime string
 */
export function formatISODateTime(date: Date | number | string): string {
  return formatDate(date, DateFormat.ISO_DATETIME);
}

/**
 * Formats a date for display (MM/DD/YYYY).
 *
 * @param date - The date to format
 * @returns The display date string
 */
export function formatDisplayDate(date: Date | number | string): string {
  return formatDate(date, DateFormat.DISPLAY);
}

/**
 * Formats a datetime for display (MM/DD/YYYY HH:mm).
 *
 * @param date - The date to format
 * @returns The display datetime string
 */
export function formatDisplayDateTime(date: Date | number | string): string {
  return formatDate(date, DateFormat.DISPLAY_DATETIME);
}

/**
 * Formats a date in long format (MMMM D, YYYY).
 *
 * @param date - The date to format
 * @returns The long date string
 */
export function formatLongDate(date: Date | number | string): string {
  return formatDate(date, DateFormat.LONG);
}

/**
 * Formats a time (HH:mm:ss).
 *
 * @param date - The date to format
 * @returns The time string
 */
export function formatTime(date: Date | number | string): string {
  return formatDate(date, DateFormat.TIME);
}

/**
 * Formats a time in short format (HH:mm).
 *
 * @param date - The date to format
 * @returns The short time string
 */
export function formatTimeShort(date: Date | number | string): string {
  return formatDate(date, DateFormat.TIME_SHORT);
}

/**
 * Formats a date as a relative time string (e.g., "2 hours ago").
 *
 * @param date - The date to format
 * @param now - The current date (default: new Date())
 * @returns The relative time string
 *
 * @example
 * ```ts
 * formatRelative(new Date(Date.now() - 3600000)) // "1 hour ago"
 * formatRelative(new Date(Date.now() - 86400000)) // "1 day ago"
 * formatRelative(new Date(Date.now() + 3600000)) // "in 1 hour"
 * ```
 */
export function formatRelative(date: Date | number | string, now: Date = new Date()): string {
  const d = date instanceof Date ? date : new Date(date);
  const diff = d.getTime() - now.getTime();
  const absDiff = Math.abs(diff);

  const seconds = Math.floor(absDiff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  const suffix = diff < 0 ? "ago" : "";
  const prefix = diff > 0 ? "in " : "";

  if (years > 0) return `${prefix}${years} year${years > 1 ? "s" : ""}${suffix ? " " + suffix : ""}`;
  if (months > 0) return `${prefix}${months} month${months > 1 ? "s" : ""}${suffix ? " " + suffix : ""}`;
  if (weeks > 0) return `${prefix}${weeks} week${weeks > 1 ? "s" : ""}${suffix ? " " + suffix : ""}`;
  if (days > 0) return `${prefix}${days} day${days > 1 ? "s" : ""}${suffix ? " " + suffix : ""}`;
  if (hours > 0) return `${prefix}${hours} hour${hours > 1 ? "s" : ""}${suffix ? " " + suffix : ""}`;
  if (minutes > 0) return `${prefix}${minutes} minute${minutes > 1 ? "s" : ""}${suffix ? " " + suffix : ""}`;
  if (seconds > 0) return `${prefix}${seconds} second${seconds > 1 ? "s" : ""}${suffix ? " " + suffix : ""}`;

  return "just now";
}

/**
 * Parses a date string into a Date object.
 *
 * @param dateStr - The date string to parse
 * @param format - The format of the date string (optional, auto-detects if not provided)
 * @returns The parsed Date object
 *
 * @example
 * ```ts
 * parseDate("2026-09-12") // Date object for September 12, 2026
 * parseDate("09/12/2026", "MM/DD/YYYY") // Date object for September 12, 2026
 * ```
 */
export function parseDate(dateStr: string, format?: string): Date {
  if (!format) {
    return new Date(dateStr);
  }

  const now = new Date();
  const result: Record<string, number> = {
    year: now.getFullYear(),
    month: now.getMonth(),
    day: 1,
    hours: 0,
    minutes: 0,
    seconds: 0,
  };

  let formatIndex = 0;
  let dateIndex = 0;

  while (formatIndex < format.length && dateIndex < dateStr.length) {
    const char = format[formatIndex];

    if (char === "Y" && format.substring(formatIndex, formatIndex + 4) === "YYYY") {
      result.year = parseInt(dateStr.substring(dateIndex, dateIndex + 4), 10);
      dateIndex += 4;
      formatIndex += 4;
    } else if (char === "Y" && format.substring(formatIndex, formatIndex + 2) === "YY") {
      result.year = 2000 + parseInt(dateStr.substring(dateIndex, dateIndex + 2), 10);
      dateIndex += 2;
      formatIndex += 2;
    } else if (char === "M" && format.substring(formatIndex, formatIndex + 2) === "MM") {
      result.month = parseInt(dateStr.substring(dateIndex, dateIndex + 2), 10) - 1;
      dateIndex += 2;
      formatIndex += 2;
    } else if (char === "D" && format.substring(formatIndex, formatIndex + 2) === "DD") {
      result.day = parseInt(dateStr.substring(dateIndex, dateIndex + 2), 10);
      dateIndex += 2;
      formatIndex += 2;
    } else if (char === "H" && format.substring(formatIndex, formatIndex + 2) === "HH") {
      result.hours = parseInt(dateStr.substring(dateIndex, dateIndex + 2), 10);
      dateIndex += 2;
      formatIndex += 2;
    } else if (char === "m" && format.substring(formatIndex, formatIndex + 2) === "mm") {
      result.minutes = parseInt(dateStr.substring(dateIndex, dateIndex + 2), 10);
      dateIndex += 2;
      formatIndex += 2;
    } else if (char === "s" && format.substring(formatIndex, formatIndex + 2) === "ss") {
      result.seconds = parseInt(dateStr.substring(dateIndex, dateIndex + 2), 10);
      dateIndex += 2;
      formatIndex += 2;
    } else {
      formatIndex++;
      dateIndex++;
    }
  }

  return new Date(
    result.year,
    result.month,
    result.day,
    result.hours,
    result.minutes,
    result.seconds,
  );
}

/**
 * Checks if a date is valid.
 *
 * @param date - The date to check
 * @returns True if the date is valid, false otherwise
 */
export function isValidDate(date: unknown): date is Date {
  if (date instanceof Date) {
    return !isNaN(date.getTime());
  }
  if (typeof date === "string" || typeof date === "number") {
    const d = new Date(date);
    return !isNaN(d.getTime());
  }
  return false;
}

/**
 * Checks if a date is today.
 *
 * @param date - The date to check
 * @returns True if the date is today, false otherwise
 */
export function isToday(date: Date | number | string): boolean {
  const d = date instanceof Date ? date : new Date(date);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

/**
 * Checks if a date is in the past.
 *
 * @param date - The date to check
 * @returns True if the date is in the past, false otherwise
 */
export function isPast(date: Date | number | string): boolean {
  const d = date instanceof Date ? date : new Date(date);
  return d.getTime() < Date.now();
}

/**
 * Checks if a date is in the future.
 *
 * @param date - The date to check
 * @returns True if the date is in the future, false otherwise
 */
export function isFuture(date: Date | number | string): boolean {
  const d = date instanceof Date ? date : new Date(date);
  return d.getTime() > Date.now();
}

/**
 * Adds days to a date.
 *
 * @param date - The date to add days to
 * @param days - The number of days to add
 * @returns A new Date object with the days added
 */
export function addDays(date: Date | number | string, days: number): Date {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

/**
 * Adds hours to a date.
 *
 * @param date - The date to add hours to
 * @param hours - The number of hours to add
 * @returns A new Date object with the hours added
 */
export function addHours(date: Date | number | string, hours: number): Date {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setTime(d.getTime() + hours * 60 * 60 * 1000);
  return d;
}

/**
 * Gets the start of the day (midnight).
 *
 * @param date - The date
 * @returns A new Date object set to midnight
 */
export function startOfDay(date: Date | number | string): Date {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Gets the end of the day (23:59:59.999).
 *
 * @param date - The date
 * @returns A new Date object set to the end of the day
 */
export function endOfDay(date: Date | number | string): Date {
  const d = date instanceof Date ? new Date(date) : new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

/**
 * Gets the difference in days between two dates.
 *
 * @param date1 - The first date
 * @param date2 - The second date
 * @returns The difference in days (positive if date1 is after date2)
 */
export function differenceInDays(date1: Date | number | string, date2: Date | number | string): number {
  const d1 = date1 instanceof Date ? date1 : new Date(date1);
  const d2 = date2 instanceof Date ? date2 : new Date(date2);
  const diff = d1.getTime() - d2.getTime();
  return Math.round(diff / (1000 * 60 * 60 * 24));
}

export default formatDate;
