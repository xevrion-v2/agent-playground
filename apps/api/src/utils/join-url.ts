export function joinUrl(...parts: readonly string[]): string {
  const nonEmptyParts = parts.filter((part) => part.length > 0);

  if (nonEmptyParts.length === 0) {
    return "";
  }

  const keepsLeadingSlash = nonEmptyParts[0].startsWith("/");
  const joined = nonEmptyParts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/+$/g, "");
      }

      return part.replace(/^\/+|\/+$/g, "");
    })
    .filter((part) => part.length > 0)
    .join("/");

  if (keepsLeadingSlash && !joined.startsWith("/")) {
    return `/${joined}`;
  }

  return joined;
}
