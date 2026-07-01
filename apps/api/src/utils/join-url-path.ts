export function joinUrlPath(...parts: readonly string[]): string {
  if (parts.length === 0) {
    return "";
  }

  const normalized = parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/+$/g, "");
      }

      return part.replace(/^\/+|\/+$/g, "");
    })
    .filter((part, index) => part.length > 0 || index === 0);

  if (normalized.length === 0) {
    return "";
  }

  const [first, ...rest] = normalized;
  return [first, ...rest.filter(Boolean)].join("/");
}
