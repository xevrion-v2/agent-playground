export function parseJsonNumber(value: string): number | undefined {
  try {
    const parsed = JSON.parse(value);
    return typeof parsed === "number" && Number.isFinite(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}
