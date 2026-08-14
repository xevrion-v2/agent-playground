export function parseJsonString(value: string): string | undefined {
  try {
    const parsed: unknown = JSON.parse(value);
    return typeof parsed === "string" ? parsed : undefined;
  } catch {
    return undefined;
  }
}
