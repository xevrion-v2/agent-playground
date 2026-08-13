export function normalizeWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, ' ');
}