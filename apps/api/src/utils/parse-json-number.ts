export function parseJsonNumber(value: unknown): number | undefined {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return undefined;
  }

  try {
    const parsed = JSON.parse(String(value)) as unknown;
    return typeof parsed === "number" && Number.isFinite(parsed)
      ? parsed
      : undefined;
  } catch {
    return undefined;
  }
}
