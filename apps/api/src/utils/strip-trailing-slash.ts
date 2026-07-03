export function stripTrailingSlash(value: string): string {
  if (value === "") {
    return "";
  }

  if (/^\/+$/.test(value)) {
    return "/";
  }

  return value.replace(/\/+$/, "");
}
