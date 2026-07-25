export function joinUrlPath(...parts: readonly string[]): string {
  const cleaned = parts
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
    .map((part) => part.replace(/^\/+|\/+$/g, ""));

  return cleaned.join("/");
}
