export function parseJsonArray(input: string): unknown[] | undefined {
  try {
    const parsed: unknown = JSON.parse(input);
    return Array.isArray(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}
