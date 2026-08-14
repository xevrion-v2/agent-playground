export function collapseWhitespace(value: string): string {
  return value.trim().replace(/\s+/g, " ");
}
