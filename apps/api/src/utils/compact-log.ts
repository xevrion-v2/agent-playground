/**
 * Safely formats a log message from unknown input.
 * Returns a compact string representation suitable for console/log output.
 */
export function compactLog(value: unknown): string {
  if (value === null) return "null";
  if (value === undefined) return "undefined";

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed.length === 0) return '""';
    return trimmed.length > 80 ? trimmed.slice(0, 77) + "..." : trimmed;
  }

  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }

  if (value instanceof Error) {
    return `${value.name}: ${value.message}`;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return "[]";
    return `[${value.length} items]`;
  }

  if (typeof value === "object") {
    try {
      const keys = Object.keys(value as Record<string, unknown>);
      if (keys.length === 0) return "{}";
      const prefix = keys.length <= 3
        ? keys.join(", ")
        : `${keys.length} keys`;
      return `{${prefix}}`;
    } catch {
      return String(value);
    }
  }

  return String(value);
}
