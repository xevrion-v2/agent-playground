export function parseJsonRecord<T extends Record<string, unknown> = Record<string, unknown>>(
  value: string,
): T | undefined {
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === "object" && parsed !== null && !Array.isArray(parsed)) {
      return parsed as T;
    }
    return undefined;
  } catch {
    return undefined;
  }
}
