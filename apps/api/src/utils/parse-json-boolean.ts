export function parseJsonBoolean(value: unknown): boolean | undefined {
  if (typeof value !== "boolean") {
    return undefined;
  }

  try {
    const parsed = JSON.parse(String(value)) as unknown;
    return typeof parsed === "boolean" ? parsed : undefined;
  } catch {
    return undefined;
  }
}
