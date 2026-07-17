export function stripTrailingSlash(value: string): string {
  if (value === "/") {
    return value;
  }

  return value.replace(/\/+$/g, "");
}
