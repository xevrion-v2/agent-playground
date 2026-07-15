export function lowercaseRecordKeys<T>(
  record: Readonly<Record<string, T>>,
): Record<string, T> {
  const result: Record<string, T> = {};
  for (const [key, value] of Object.entries(record)) {
    result[key.toLowerCase()] = value;
  }
  return result;
}
