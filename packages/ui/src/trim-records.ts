// ponytail: record value trimming
export function trimRecordValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const r: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) r[k] = typeof v === 'string' ? v.trim() : v;
  return r as Partial<T>;
}
