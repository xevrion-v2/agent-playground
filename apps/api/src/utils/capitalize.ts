/**
 * Capitalizes the first letter of a word or sentence.
 * Returns empty string for non-string input.
 */
export function capitalize(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
}
