export function sortStrings(values: readonly string[], locale = "en"): string[] {
  return [...values].sort((left, right) => left.localeCompare(right, locale));
}
