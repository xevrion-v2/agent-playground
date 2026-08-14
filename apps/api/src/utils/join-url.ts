export function joinUrl(...parts: readonly string[]): string {
  return parts
    .map((part, index) => {
      if (index === 0) {
        return part.replace(/\/+$/g, "");
      }

      return part.replace(/^\/+|\/+$/g, "");
    })
    .filter((part) => part.length > 0)
    .join("/");
}
