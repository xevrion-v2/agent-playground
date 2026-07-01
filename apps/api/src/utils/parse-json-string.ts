export function parseJsonString(value: unknown): unknown {
  if (typeof value !== "string") {
    return undefined;
  }

  try {
    return JSON.parse(value) as unknown;
  } catch {
    return undefined;
  }
}
