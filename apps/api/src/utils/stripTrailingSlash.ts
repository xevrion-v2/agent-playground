/**
 * Removes trailing slashes from a path-like string while preserving the root path.
 */
export function stripTrailingSlash(value: string): string {
  if (/^\/+$/.test(value)) {
    return "/";
  }

  return value.replace(/\/+$/, "");
}
