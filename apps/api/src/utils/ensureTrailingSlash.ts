export function ensureTrailingSlash(value: string): string {
  return value.endsWith("/") ? value : `${value}/`;
}
