export function normalizeWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}
