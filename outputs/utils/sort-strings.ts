export function sortStrings(values: readonly string[], locale?: string): string[] {
  return [...values].sort((left, right) => left.localeCompare(right, locale));
}
