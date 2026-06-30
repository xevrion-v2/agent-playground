export function compactRecord<T>(
  record: Record<string, T | null | undefined>,
): Record<string, T> {
  const compacted: Record<string, T> = {};

  for (const [key, value] of Object.entries(record)) {
    if (value !== null && value !== undefined) {
      compacted[key] = value;
    }
  }

  return compacted;
}
