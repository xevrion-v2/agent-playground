/**
 * Truncates a string to a specified length, adding an ellipsis if truncated.
 * Returns the original string if it's shorter than maxLength.
 */
export function truncate(value: string, maxLength: number = 80): string {
  if (typeof value !== "string") return "";
  if (value.length <= maxLength) return value;
  return value.slice(0, Math.max(0, maxLength - 3)) + "...";
}
