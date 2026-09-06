export function lowercaseRecordKeys<T>(record: Record<string, T>): Record<string, T> {
  const normalized: Record<string, T> = {};

  for (const [key, value] of Object.entries(record)) {
    normalized[key.toLowerCase()] = value;
  }

  return normalized;
}
