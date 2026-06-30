/**
 * Joins URL path segments safely, handling leading/trailing slashes.
 */
export function urlJoin(...parts: unknown[]): string {
  const segments: string[] = [];

  for (const part of parts) {
    if (part === null || part === undefined) continue;
    if (typeof part !== "string") {
      segments.push(String(part));
      continue;
    }
    const trimmed = part.trim();
    if (!trimmed) continue;
    segments.push(trimmed.replace(/^\/+|\/+$/g, ""));
  }

  return segments.join("/");
}
