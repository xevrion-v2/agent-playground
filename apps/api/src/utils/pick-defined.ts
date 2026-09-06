export function pickDefined<T extends Record<string, unknown>>(value: T): Partial<T> {
  const entries = Object.entries(value).filter(([, entryValue]) => entryValue !== undefined);

  return Object.fromEntries(entries) as Partial<T>;
}
