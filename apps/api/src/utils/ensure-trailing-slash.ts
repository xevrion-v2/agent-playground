export function ensureTrailingSlash(value: string): string {
  if (value.length === 0) {
    return "/";
  }

  return value.endsWith("/") ? value : `${value}/`;
}
