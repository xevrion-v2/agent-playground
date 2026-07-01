export function mergeRecords<T>(
  base: Record<string, T>,
  override: Record<string, T | undefined>,
): Record<string, T> {
  const merged: Record<string, T> = { ...base };

  for (const [key, value] of Object.entries(override)) {
    if (value !== undefined) {
      merged[key] = value;
    }
  }

  return merged;
}
