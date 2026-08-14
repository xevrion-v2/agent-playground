export function parseJsonBoolean(value: string): boolean | undefined {
  try {
    const parsed: unknown = JSON.parse(value);
    return typeof parsed === "boolean" ? parsed : undefined;
  } catch {
    return undefined;
  }
}
