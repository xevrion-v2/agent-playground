export function joinUrlPath(...parts: string[]): string {
  if (parts.length === 0) {
    return "";
  }
  return parts
    .map((part, index) => {
      const segment = part.trim();
      if (index === 0) {
        return segment.replace(/\/+$/, "");
      }
      return segment.replace(/^\/+|\/+$/g, "");
    })
    .filter((segment) => segment.length > 0)
    .join("/");
}
