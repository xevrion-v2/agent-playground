// ponytail: defined-value picker
export function pickDefinedValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const r: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) if (v !== undefined) r[k] = v;
  return r as Partial<T>;
}
