export function parseJsonString(payload: string): string | null {
  try {
    const parsed: unknown = JSON.parse(payload);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return null;
  }
}
