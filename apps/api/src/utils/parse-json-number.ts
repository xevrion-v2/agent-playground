export function parseJsonNumber(payload: string): number | null {
  try {
    const parsed: unknown = JSON.parse(payload);
    return typeof parsed === "number" && Number.isFinite(parsed) ? parsed : null;
  } catch {
    return null;
  }
}
