export function parseJsonBoolean(payload: string): boolean | null {
  try {
    const parsed: unknown = JSON.parse(payload);
    return typeof parsed === "boolean" ? parsed : null;
  } catch {
    return null;
  }
}
